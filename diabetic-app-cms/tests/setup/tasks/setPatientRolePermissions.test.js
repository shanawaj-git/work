const deepmerge = require("deepmerge");
const patientPermissions = require("../../../src/setup/tasks/data/patientPermissions");
const {
  setPatientRolePermissions,
} = require("../../../src/setup/tasks/setPatientRolePermissions");
const { getLogger } = require("../../helpers/logger");
const { ROLE_PATIENT } = require("../../services/constants/constants");
const mockPermissions = require("./data/mockPermissions");

describe("Set up task: setPatientRolePermissions", () => {
  const mockPatientRole = {
    id: 1,
    name: ROLE_PATIENT,
    description: "The role assigned to patients",
    permissions: mockPermissions,
    users: [],
  };

  let strapi, roleServiceMock, permissionsServiceMock;

  beforeEach(() => {
    roleServiceMock = {
      find: jest.fn().mockResolvedValue([mockPatientRole]),
      updateRole: jest.fn(),
    };
    permissionsServiceMock = {
      getActions: jest.fn().mockResolvedValue(mockPermissions),
    };
    const serviceMap = {
      role: roleServiceMock,
      "users-permissions": permissionsServiceMock,
    };
    strapi = {
      log: getLogger(),
      plugin: () => ({
        service: (name) => serviceMap[name],
      }),
    };
  });

  afterEach(() => {
    strapi = null;
    roleServiceMock = null;
    permissionsServiceMock = null;
  });

  it("should update the patient role with the necesssary permissions", async () => {
    await setPatientRolePermissions(strapi);
    expect(roleServiceMock.updateRole).toBeCalledWith(mockPatientRole.id, {
      ...mockPatientRole,
      permissions: deepmerge(mockPermissions, patientPermissions),
    });
  });
});
