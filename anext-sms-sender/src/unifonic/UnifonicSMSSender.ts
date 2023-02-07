import axios, { AxiosInstance } from 'axios';
import * as AxiosLogger from 'axios-logger';

import { SMSSender, SMSSenderConfig, SMSEnvironment, SendSMSOptions, SendSMSResponse, LoggerInterface } from '../types';
import { EnvEndpoints, Urls, RequestParams, ResponseTypes } from './UnifonicConstants';
import { UnifonicSendSMSResponse } from './types';
import SMSError from '../SMSError';
import { SMSErrorCode } from '../SMSErrorCode';
import { mapResponseError } from './mapResponseError';

export const DefaultConfig = {
  environment: SMSEnvironment.Sandbox,
  timeoutSeconds: 60,
};

const LOGGER_TAG = 'Unifonic SMS Client';

type BasicParams = {
  [key: string]: string,
}

export default class UnifonicSMSSender implements SMSSender {
  constructor(config: SMSSenderConfig) {
    const {
      environment = DefaultConfig.environment,
      timeoutSeconds = DefaultConfig.timeoutSeconds,
    } = config;

    this.unifonicHttpClient = axios.create({
      baseURL: EnvEndpoints[environment],
      timeout: timeoutSeconds * 1000, //in millis
    });
    this.basicParams = {
      [RequestParams.APP_SID]: config.appSid,
      [RequestParams.SENDER_ID]: config.senderId,
      [RequestParams.RESPONSE_TYPE]: ResponseTypes.JSON,
    };
    if (config.logger) {
      this.attachLogger(config.logger);
    }
  }

  public async sendSMS(options: SendSMSOptions): Promise<SendSMSResponse> {
    try {
      const requestURLParams = {
        ...this.basicParams,
        [RequestParams.RECIPIENT]: options.recipient,
        [RequestParams.BODY]: options.text,
      };

      if (options.correlationId) {
        requestURLParams[RequestParams.CORRELATION_ID] = options.correlationId;
      }

      const response = await this.unifonicHttpClient.post(
        Urls.MESSAGES,
        new URLSearchParams(requestURLParams),
      );
      const { message, success, data }: UnifonicSendSMSResponse = response.data;
      if (success) {
        return {
          message,
          trackingId: `${data?.MessageID}`,
          success,
          status: data?.Status,
        };
      }
      throw new SMSError(mapResponseError(response.status), message);
    } catch (err) {
      if (err instanceof SMSError) {
        throw err;
      }
      const { response: { status = undefined, data: { message: respMessage = null } = {} } = {}, message } = err;
      throw status ? new SMSError(mapResponseError(status), respMessage)
        : new SMSError(SMSErrorCode.REQUEST_ERROR, message);
    }
  }

  /** Private Fields / Methods */
  private unifonicHttpClient: AxiosInstance;
  private basicParams: BasicParams;

  private attachLogger(logger: LoggerInterface) {
    const defaultConfig = {
        prefixText: LOGGER_TAG,
        headers: false,
        params: false,
        data: false,
        logger: logger.info,
      }, client = this.unifonicHttpClient;

    const requestLogger = (req) => AxiosLogger.requestLogger(req, {
      ...defaultConfig,
    });

    const responseLogger = (resp) => AxiosLogger.responseLogger(resp, {
      ...defaultConfig,
    });

    const errorLogger = (err) => AxiosLogger.errorLogger(err, {
      ...defaultConfig,
      headers: true,
      data: true,
      logger: logger.error,
    });

    client.interceptors.request.use(requestLogger, errorLogger);
    client.interceptors.response.use(responseLogger, errorLogger);
  }
}
