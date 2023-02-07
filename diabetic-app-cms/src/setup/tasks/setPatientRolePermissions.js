const deepmerge = require("deepmerge");

const { ROLE_PATIENT } = require("../../../tests/services/constants/constants");
const patientPermissions = require("./data/patientPermissions");

const getService = (strapi, name) => strapi.plugin("users-permissions").service(name);

const getPermissions = async (strapi) => getService(strapi, "users-permissions").getActions();

const getPatientRole = async (strapi) =>
  (await getService(strapi, "role").find()).find((role) => role.name === ROLE_PATIENT);

const populatePatientPermissions = async (strapi) =>
  deepmerge(await getPermissions(strapi), patientPermissions);

const setPatientRolePermissions = async (strapi) => {
  strapi.log.info("Start: The setup task to set 'Patient' role permissions");
  const patientRole = {
    ...await getPatientRole(strapi),
    permissions: await populatePatientPermissions(strapi),
  };
  await getService(strapi, "role").updateRole(patientRole.id, patientRole);
  strapi.log.info("Updated the role permissions for 'Patient'");
  strapi.log.info("End: The setup task to set 'Patient' role permission");
};

module.exports = { setPatientRolePermissions };
