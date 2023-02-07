const { ROLE_PATIENT } = require("../../../tests/services/constants/constants");

const getService = (strapi, name) => strapi.plugin("users-permissions").service(name);

const getPermissions = async (strapi) => getService(strapi, "users-permissions").getActions();

const isPatientRoleExisting = async (strapi) =>
  (await getService(strapi, "role").find()).find((role) => role.name === ROLE_PATIENT);

const createPatientRole = async (strapi) => {
  strapi.log.info("Start: The setup task to create role 'Patient'");
  if (!(await isPatientRoleExisting(strapi))) {
    const permissions = await getPermissions(strapi);
    const role = {
      name: ROLE_PATIENT,
      description: "The role assigned to patients",
      permissions,
      users: [],
    };
    getService(strapi, "role").createRole(role);
    strapi.log.info("The role 'Patient' is created");
  }
  strapi.log.info("End: The setup task to create role 'Patient'");
};

module.exports = { createPatientRole };
