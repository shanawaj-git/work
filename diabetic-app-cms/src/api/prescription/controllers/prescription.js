'use strict';

/**
 *  prescription controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const PrescriptionStatus = require('../services/PrescriptionStatus');

const PRESCRIPTIONS_UPLOAD_FOLDER = 'prescriptions';
const getUploadService = service => strapi.plugin('upload').service(service);

const getPrescriptionsFolderId = async  () => {
    const { getStructure } = await getUploadService('folder');
    return (await getStructure()).find(f => f.name === PRESCRIPTIONS_UPLOAD_FOLDER).id;
}

const uploadPrescriptionImage = async (file, ctx) => {
  const {
    credentials: { firstName, lastName },
  } = ctx.state.auth;
  const fileName = `${firstName}-${lastName}-${new Date().toISOString()}.${file.name
    .split(".")
    .pop()}`;
  const data = {
    fileInfo: {
      name: fileName,
      folder: await getPrescriptionsFolderId(),
    },
  };
  return (
    await getUploadService('upload').upload({
      data,
      files: file,
    })
  )[0];
};

const deleteUploadedPrescriptionCopy = async fileData => {
    return await getUploadService('upload').remove(fileData);
}

const createPrescriptionData = async (ctx, { id: fileId }) => {
  const {
    credentials: { id: patientId, firstName, lastName },
  } = ctx.state.auth;
  const prescription = {
    patient: patientId,
    prescriptionCopy: fileId,
    firstName,
    lastName,
    status: PrescriptionStatus.New,
  };

  return await strapi.query("api::prescription.prescription").create({
    data: prescription,
  });
};

const uploadPrescription = async (ctx) => {
  const fileData = await uploadPrescriptionImage(ctx.request.files.image, ctx);
  try {
    ctx.created(await createPrescriptionData(ctx, fileData));
  } catch (err) {
    await deleteUploadedPrescriptionCopy(fileData);
    throw err;
  }
};

const prescriptionsControllerModule = (module.exports = createCoreController(
  "api::prescription.prescription",
  ({ strapi }) => ({
    upload: uploadPrescription,
  })
));

prescriptionsControllerModule.PRESCRIPTIONS_UPLOAD_FOLDER =
  PRESCRIPTIONS_UPLOAD_FOLDER;
prescriptionsControllerModule.uploadPrescription = uploadPrescription;
