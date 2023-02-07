const {
  describe,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
  it,
  expect,
} = require("@jest/globals");

const { setupStrapi, tearDown } = require("../../helpers/strapi");
jest.setTimeout(20000);
const {
  uploadPrescription,
} = require("../../../src/api/prescription/controllers/prescription");

const {
  mockCtx,
  mockStructureData,
  mockFileData,
  mockPrescription,
} = require("./prescription-testdata");

describe("prescription test", () => {
  const mockSavedEntity = { ...mockPrescription, id: 1 };

  beforeAll(async () => {
    await setupStrapi();
  });

  afterAll(async () => {
    await tearDown();
  });

  describe("prescription controller test", () => {
    let mockStructure, mockUpload, mockCreate, querySpy, mockRemove;

    beforeEach(() => {
      mockCreate = jest.fn();
      mockUpload = jest.fn();
      mockRemove = jest.fn();
      mockStructure = jest.spyOn(
        strapi.plugin("upload").service("folder"),
        "getStructure"
      );
      mockUpload = jest.spyOn(
        strapi.plugin("upload").service("upload"),
        "upload"
      );
      mockRemove = jest.spyOn(
        strapi.plugin("upload").service("upload"),
        "remove"
      );
      querySpy = jest.spyOn(strapi, "query").mockReturnValue({
        create: mockCreate,
      });
    });

    afterEach(() => {
      querySpy = null;
      mockStructure.mockRestore();
      mockCreate.mockRestore();
      mockUpload.mockRestore();
      mockRemove.mockRestore();
    });

    it(" Should creates and responds with the prescription details successfully ", async () => {
      mockStructure.mockReturnValue(mockStructureData);
      mockUpload.mockReturnValue(mockFileData);
      mockCreate.mockReturnValue(mockSavedEntity);

      await uploadPrescription(mockCtx);

      expect(querySpy).toBeCalledWith("api::prescription.prescription");
      expect(mockCreate).toBeCalledWith({
        data: mockPrescription,
      });
      expect(mockCtx.created).toBeCalledWith(mockSavedEntity);
    });

    it(" Should upload the prescription image successfully ", async () => {
      mockStructure.mockReturnValue(mockStructureData);
      mockUpload.mockReturnValue(mockFileData);
      mockCreate.mockReturnValue(mockSavedEntity);

      await uploadPrescription(mockCtx);
      const {
        credentials: { firstName, lastName },
      } = mockCtx.state.auth;

      expect(mockUpload).toBeCalledTimes(1);
      const arg = mockUpload.mock.calls[0][0];
      expect(arg).toEqual({
        data: {
          fileInfo: {
            folder: 1,
            name: expect.stringMatching(
              new RegExp(
                `^${firstName}-${lastName}-\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z.png$`
              )
            ),
          },
        },
        files: {
          name: expect.stringMatching(mockCtx.request.files.image.name),
          size: 1265494,
          type: "image/png",
        },
      });
    });

    it(" Should delete uploaded image when prescription creation throws exception ", async () => {
      mockStructure.mockReturnValue(mockStructureData);
      mockUpload.mockReturnValue(mockFileData);
      mockCreate.mockRejectedValue(new Error("some error"));
      mockRemove.mockReturnValue({});

      await expect(uploadPrescription(mockCtx)).rejects.toThrow("some error");
      expect(mockRemove).toBeCalled();
    });
  });
});
