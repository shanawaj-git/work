const {
  createPatientRole,
} = require("../../../src/setup/tasks/createPatientRole");
const { getLogger } = require("../../helpers/logger");
const { ROLE_PATIENT } = require("../../services/constants/constants");
const mockPermissions = require("./data/mockPermissions");

describe("Set up task: createPatientRole", () => {
  let strapi, roleServiceMock, permissionsServiceMock;

  beforeEach(() => {
    roleServiceMock = {
      find: jest.fn(),
      createRole: jest.fn(),
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

  it("should create the Patient role if not existing", async () => {
    roleServiceMock.find.mockResolvedValue([]);
    await createPatientRole(strapi);
    expect(roleServiceMock.createRole).toBeCalledWith({
      name: ROLE_PATIENT,
      description: "The role assigned to patients",
      permissions: mockPermissions,
      users: [],
    });
  });

  it("should not create the Patient role if already existing", async () => {
    roleServiceMock.find.mockResolvedValue([
      {
        name: ROLE_PATIENT,
      },
    ]);
    await createPatientRole(strapi);
    expect(roleServiceMock.createRole).not.toBeCalled();
  });
});
