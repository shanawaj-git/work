const { createPatientRole } = require("./tasks/createPatientRole");
const {
  setPatientRolePermissions,
} = require("./tasks/setPatientRolePermissions");

const setupTasks = [createPatientRole, setPatientRolePermissions];

const initSetup = async (strapi) => {
  strapi.log.info("Start: Setup tasks");
  for (const task of setupTasks) {
    await task(strapi);
  }
  strapi.log.info("End: Setup tasks");
};

module.exports = { initSetup };
