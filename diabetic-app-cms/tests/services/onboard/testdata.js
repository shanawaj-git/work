module.exports = {
  mockActualMessage:
    "Hi PFname5, Welcome to . You will receive reminders to refill your prescription as well as order updates right here. For any contact support, you can reach out to us through the 24/7 helpline at ",
  mockFailureSmsResponse: {
    message: "",
    trackingId: "41000342891390",
    success: false,
    status: "Failed",
  },
  mockSuccessSmsResponse: {
    message: "",
    trackingId: "41000342891390",
    success: true,
    status: "Sent",
  },
  mockMessage: {
    onboardingSmsTemplate:
      "Hi {{patientName}}, Welcome to {{pharmacyName}}. You will receive reminders to refill your prescription as well as order updates right here. For any contact support, you can reach out to us through the 24/7 helpline at {{contactSupportNumber}}",
    paymentSmsTemplate: "",
  },
  mockZeroCoPaymentMessage: {
    zeroCoPaymentSmsTemplate:
      "Dear {{patientName}}, Your prescription is approved by the insurance, and the co-payment amount is {{currency}} {{amount}}. Please look out for the delivery driver",
  },
  mockUser: {
    id: 1,
    username: "971529029932",
    email: "patient3@example.com",
    provider: "local",
    confirmed: true,
    blocked: false,
    createdAt: "2022-08-24T07:11:19.291Z",
    updatedAt: "2022-08-24T10:30:32.855Z",
    firstName: "PFname5",
    middleName: "PMName5",
    lastName: "PLName5",
    mobileNumber: "971529029932",
    emiratesId: "1984-2004-1112222-9",
    reminderFrequency: 90,
    passwordExpiresAt: new Date(new Date().getTime() + 5 * 60000),
    maxUnsuccessfulLoginCount: 0,
    lastUnsuccessfulLoginTime: new Date(),
  },

  mockReminder: {
    date: "2022-11-22",
    status: "Scheduled",
    createdAt: "2022-08-24T11:05:32.510Z",
    updatedAt: "2022-08-24T11:30:33.307Z",
  },
};
