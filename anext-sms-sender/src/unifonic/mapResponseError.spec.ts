import { SMSErrorCode } from '../SMSErrorCode';
import { mapResponseError, ResponseCodeErrorMap } from './mapResponseError';

describe('mapResponseError', () => {
  it('returns the error as mapped when maaping exists', () => {
    const mappedRespCode = parseInt(Object.keys(ResponseCodeErrorMap)[0], 10);
    expect(mapResponseError(mappedRespCode)).toEqual(ResponseCodeErrorMap[mappedRespCode]);
  });

  it('returns GENERIC error when maaping for response code doesnot exist', () => {
    //-1 can never be a valid http response code
    expect(mapResponseError(-1)).toEqual(SMSErrorCode.GENERIC_ERROR);
  });
});
