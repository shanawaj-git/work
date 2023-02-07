enum Topic {
  Prescription = 'prescriptions',
  Authentication = 'authentication',
}

export enum EventType {
  // prescriptions
  PresciptionReceived = 'prescriptions.received',

  // autehntication
  OtpGenerated = 'authentication.otpGenerated',
}

export const EVENT_TYPE_PER_TOPIC = {
  [Topic.Prescription]: [EventType.PresciptionReceived],
  [Topic.Authentication]: [EventType.OtpGenerated],
};

export default Topic;
