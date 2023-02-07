import { mapOtpDataToSmsInput } from '../mappers';
import { EventType } from 'src/domain/Topic';
describe('mapOtpDataToSmsInput', () => {
  const input = {
    otpData: {
      otp: '233344',
      phoneNumber: '+971526234727',
    },
    eventType: EventType.OtpGenerated,
  };

  it('should map otp data to sms input', () => {
    expect(mapOtpDataToSmsInput(input)).toMatchSnapshot();
  });

  it('should throw in case of undefined event type', () => {
    const missingEventTypeInput = {
      ...input,
      eventType: undefined,
    };

    expect(() => mapOtpDataToSmsInput(missingEventTypeInput)).toThrow(
      'missing template code',
    );
  });
});
