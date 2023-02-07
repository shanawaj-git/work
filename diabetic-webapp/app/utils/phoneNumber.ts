const LOCAL_PHONE_NUMBER_PREFIX = '05';
const LOCAL_PHONE_NUMBER_WITHOUT_LEADING_ZERO = '5';
const PHONE_NUMBER_COUNTRY_CODE = '971';
const PHONE_NUMBER_DIGITS_COUNT = 12;

export const sanitizePhoneNumber = (input: string): string => {
  // regex to remove spaces, `+`, `(` and `)`
  const phoneWithoutSpecialCharacters = input.replace(/\ |\)|\(|\+/g, '');

  if (phoneWithoutSpecialCharacters.startsWith(LOCAL_PHONE_NUMBER_PREFIX)) {
    return `${PHONE_NUMBER_COUNTRY_CODE}${phoneWithoutSpecialCharacters.substring(
      1,
    )}`;
  }
  if (
    phoneWithoutSpecialCharacters.startsWith(
      LOCAL_PHONE_NUMBER_WITHOUT_LEADING_ZERO,
    )
  ) {
    return `${PHONE_NUMBER_COUNTRY_CODE}${phoneWithoutSpecialCharacters}`;
  }

  return phoneWithoutSpecialCharacters;
};

export const isValidPhoneNumber = (phoneNumber: string): boolean =>
  phoneNumber.length === PHONE_NUMBER_DIGITS_COUNT &&
  phoneNumber.startsWith(PHONE_NUMBER_COUNTRY_CODE) &&
  isNumeric(phoneNumber);

export const isNumeric = (value: string): boolean => /^-?\d*$/.test(value);

export const concatSupportPhoneNumber = (value: string): string =>
  'tel:'.concat(value);
