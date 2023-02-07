import axios from 'axios';

import UnifonicSMSSender, { DefaultConfig } from './UnifonicSMSSender';
import { SMSEnvironment } from '../types';
import { EnvEndpoints, RequestParams, ResponseTypes, Urls } from './UnifonicConstants';
import SMSError from '../SMSError';
import { SMSErrorCode } from '../SMSErrorCode';

describe('UnifonicSMSSender', () => {
  const baseConfig = {
    appSid: 'test-app-sid',
    senderId: 'test-sender-id',
  };

  let
    axiosPostMock,
    axiosUseRequestInterceptorMock,
    axiosUseResponseInterceptorMock,
    axiosClientMock,
    axiosCreateSpy;

  beforeEach(() => {
    axiosPostMock = jest.fn();
    axiosUseRequestInterceptorMock = jest.fn();
    axiosUseResponseInterceptorMock = jest.fn();
    axiosClientMock = {
      post: axiosPostMock,
      interceptors: {
        request: {
          use: axiosUseRequestInterceptorMock,
        },
        response: {
          use: axiosUseResponseInterceptorMock,
        },
      },

    };

    axiosCreateSpy = jest.spyOn(axios, 'create').mockReturnValue(axiosClientMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor()', () => {
    it('should call \'axios.create\' with correct baseURL for Production environment', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const client = new UnifonicSMSSender({
        ...baseConfig,
        environment: SMSEnvironment.Production,
      });

      expect(axiosCreateSpy).toBeCalledWith(
        expect.objectContaining({
          baseURL: EnvEndpoints[SMSEnvironment.Production],
        }),
      );
    });

    it('should call \'axios.create\' with correct baseURL for Sandbox environment', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const client = new UnifonicSMSSender({
        ...baseConfig,
        environment: SMSEnvironment.Sandbox,
      });

      expect(axiosCreateSpy).toBeCalledWith(
        expect.objectContaining({
          baseURL: EnvEndpoints[SMSEnvironment.Sandbox],
        }),
      );
    });

    it('should call \'axios.create\' with correct value for timeout as passed', () => {
      const timeoutSec = 60;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const client = new UnifonicSMSSender({
        ...baseConfig,
        timeoutSeconds: timeoutSec,
      });

      expect(axiosCreateSpy).toBeCalledWith(
        expect.objectContaining({
          timeout: timeoutSec * 1000,
        }),
      );
    });

    it('should call \'axios.create\' with default values for timeout and environment fields', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const client = new UnifonicSMSSender({
        ...baseConfig,
      });

      expect(axiosCreateSpy).toBeCalledWith(
        expect.objectContaining({
          baseURL: EnvEndpoints[DefaultConfig.environment],
          timeout: DefaultConfig.timeoutSeconds * 1000,
        }),
      );
    });

    it('should attach appropriate logger when passed in potions', () => {
      const mockLogger = {
        info: jest.fn(),
        error: jest.fn(),
        log: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const client = new UnifonicSMSSender({
        ...baseConfig,
        logger: mockLogger,
      });

      expect(axiosUseRequestInterceptorMock).toBeCalledTimes(1);
      expect(axiosUseResponseInterceptorMock).toBeCalledTimes(1);
    });
  });

  describe('sendSMS()', () => {
    const dummySMSOptions = {
      recipient: '0123456789',
      text: 'A dummy SMS text',
      correlationId: 'dummy-corr-id',
    };

    const dummySuccessResponse = {
      data: {
        success: true,
        message: 'A dummy success response message',
        data: {
          MessageID: 3200017889310,
          CorrelationID: '',
          Status: 'Queued',
          NumberOfUnits: 0,
          Cost: 0,
          Balance: 0,
          Recipient: '966505980169',
          TimeCreated: '2018-05-07 06:41:53.237',
          CurrencyCode: '',
        },
      },
    };

    it('should pass correct parameters to axios \'post\' method', async () => {
      axiosPostMock.mockResolvedValue(dummySuccessResponse);

      const smsSender = new UnifonicSMSSender({ ...baseConfig });
      await smsSender.sendSMS(dummySMSOptions);

      expect(axiosPostMock).toBeCalledWith(
        Urls.MESSAGES,
        new URLSearchParams({
          [RequestParams.APP_SID]: baseConfig.appSid,
          [RequestParams.SENDER_ID]: baseConfig.senderId,
          [RequestParams.RESPONSE_TYPE]: ResponseTypes.JSON,
          [RequestParams.RECIPIENT]: dummySMSOptions.recipient,
          [RequestParams.BODY]: dummySMSOptions.text,
          [RequestParams.CORRELATION_ID]: dummySMSOptions.correlationId,
        }),
      );
    });

    it('should resolve the correct response based on axios \'post\' response', () => {
      axiosPostMock.mockResolvedValue(dummySuccessResponse);

      const smsSender = new UnifonicSMSSender({ ...baseConfig });

      return expect(smsSender.sendSMS(dummySMSOptions)).resolves.toEqual(
        {
          message: dummySuccessResponse.data.message,
          trackingId: `${dummySuccessResponse.data.data.MessageID}`,
          success: true,
          status: dummySuccessResponse.data.data.Status,
        },
      );
    });

    it('should reject with \'SMSError\' when \'success\' is false', () => {
      const dummyPostErrorResponse = {
        status: 401,
        data: {
          success: false,
          message: 'A dummy error message',
          errorCode: 'ERR-TEST-CODE',
          data: null,
        },
      };

      axiosPostMock.mockResolvedValue(dummyPostErrorResponse);

      const smsSender = new UnifonicSMSSender({ ...baseConfig });

      return expect(smsSender.sendSMS(dummySMSOptions)).rejects.toThrow(SMSError);
    });

    it('should reject with \'SMSError\' \'post\' error response', () => {
      const dummyError = {
        status: 401,
        response: {
          data: {
            message: 'A dummy Unifonic specific error',
            errorCode: 'ERR-DUMMY',
          },
        },
      };
      axiosPostMock.mockRejectedValue(dummyError);

      const smsSender = new UnifonicSMSSender({ ...baseConfig });

      return expect(smsSender.sendSMS(dummySMSOptions))
        .rejects
        .toThrow(SMSError);
    });

    it('should reject with REQUEST_ERROR when reponse is not available', () => {
      const dummyError = {
        message: 'Some request error',
      };
      axiosPostMock.mockRejectedValue(dummyError);

      const smsSender = new UnifonicSMSSender({ ...baseConfig });

      return expect(smsSender.sendSMS(dummySMSOptions))
        .rejects.toMatchObject({
          code: SMSErrorCode.REQUEST_ERROR,
        });
    });
  });
});
