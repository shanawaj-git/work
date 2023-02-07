import { getAPIClientInstance } from './client';
import { PrescriptionUploadResponse } from './types';

const Urls = {
  UPLOAD_PRESCRIPTION: '/api/prescriptions/upload',
};

enum Errors {
  ServerException = 'Server Exception while Uploading Image',
}

const uploadPrescription = async (
  prescriptionImage: File,
): Promise<PrescriptionUploadResponse> => {
  let formData = new FormData();
  formData.append('image', prescriptionImage);
  const {
    data: { id },
  } = await getAPIClientInstance().post(Urls.UPLOAD_PRESCRIPTION, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return { id };
};

export {
  uploadPrescription,
  Urls as PrescriptionApiUrls,
  Errors as PrescriptionApiErrors,
};
