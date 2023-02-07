module.exports = {
  mockStructureData: [{ id: 1, name: "prescriptions", children: [] }],
  mockFileData: [
    {
      id: 32,
      name: "shanawaj-khan-2022-09-14T08:27:15.200Z.png",
      alternativeText: null,
    },
  ],
  mockCtx: {
    state: {
      auth: {
        credentials: {
          id: 16,
          username: "971529029931",
          email: "1@gmail.com",
          provider: "local",
          password:
            "$2a$10$BMDZ8TAcJanDR.g0u0P4quAcOARYQu/bqliYepkTxR2tcyQr6T6Ka",
          resetPasswordToken: null,
          confirmationToken: null,
          confirmed: true,
          blocked: false,
          createdAt: "2022-09-02T02:42:28.031Z",
          updatedAt: "2022-09-13T07:48:48.227Z",
          passwordExpiresAt: "2022-09-13T07:53:21.018Z",
          firstName: "shanawaj",
          middleName: null,
          lastName: "khan",
          mobileNumber: null,
          emiratesId: "1984-2004-1112222-6",
          reminderFrequency: 30,
        },
      },
    },
    request: {
      files: {
        image: {
          size: 1265494,
          name: "Screenshot 2022-09-02 at 10.46.34 AM.png",
          type: "image/png",
        },
      },
    },
    created: jest.fn(),
  },
  mockPrescription: {
    firstName: "shanawaj",
    lastName: "khan",
    patient: 16,
    prescriptionCopy: 32,
    status: "New",
  },
};
