import { sanitizePhoneNumber, isValidPhoneNumber } from '../phoneNumber';

describe('phoneNumber util', () => {
  describe('sanitizePhoneNumber', () => {
    it('should append 971 to local number starting with 05xxx', () => {
      const input = '0526234727';
      expect(sanitizePhoneNumber(input)).toEqual('971526234727');
    });

    it('should append 971 to local number starting with 5xxx', () => {
      const input = '526234727';
      expect(sanitizePhoneNumber(input)).toEqual('971526234727');
    });

    it('should remove all spaces', () => {
      const input = '526 234 727';
      expect(sanitizePhoneNumber(input)).toEqual('971526234727');
    });

    it('should remove + sign and parantheses', () => {
      const input = '+971 (52)6 234 727';
      expect(sanitizePhoneNumber(input)).toEqual('971526234727');
    });
  });

  describe('isValidPhoneNumber', () => {
    it('phone should not have non numeric characters', () => {
      const input = '0526xxx234727';
      expect(isValidPhoneNumber(input)).toEqual(false);
    });

    it('phone should not be more than 12 characters', () => {
      const input = '526234727526234727';
      expect(isValidPhoneNumber(input)).toEqual(false);
    });

    it('should start with 971', () => {
      const input = '44526234727';
      expect(isValidPhoneNumber(input)).toEqual(false);
    });

    it('valid phone number', () => {
      const input = '971526234727';
      expect(isValidPhoneNumber(input)).toEqual(true);
    });
  });
});
