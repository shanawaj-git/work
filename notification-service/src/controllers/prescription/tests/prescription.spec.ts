import { mapPrescriptionDataToSmsInput } from '../mappers';
import { EventType } from 'src/domain/Topic';
describe('mapPrescriptionDataToSmsInput', () => {
  const input = {
    prescription: {
      patient: {
        mobileNumber: '971xxxxxxxxx',
        name: {
          first: 'name',
          last: 'user',
        },
      },
      prescriptionNumber: '123dasd123',
    },
    eventType: EventType.PresciptionReceived,
  };

  it('should map prescription data to sms input', () => {
    expect(mapPrescriptionDataToSmsInput(input)).toMatchSnapshot();
  });

  it('should throw in case of undefined event type', () => {
    const missingEventTypeInput = {
      ...input,
      eventType: undefined,
    };
    try {
      mapPrescriptionDataToSmsInput(missingEventTypeInput),
        expect(false).toBe(true);
    } catch {
      expect(true).toBe(true);
    }
  });
});
