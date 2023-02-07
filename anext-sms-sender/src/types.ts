/**
 * The type definitions
 */

import { SMSErrorCode } from './SMSErrorCode';

export const enum SMSEnvironment {
  Production,
  Sandbox,
}

export type LoggerArg = (string|number|any[]|Object);

export interface LoggerInterface {
  log(message: string, ...args: LoggerArg[])
  info(message: string, ...args: LoggerArg[])
  warn(message: string, ...args: LoggerArg[])
  error(message: string, ...args: LoggerArg[])
  debug(message: string, ...args: LoggerArg[])
}

export interface SMSSenderConfig {
  appSid: string,
  senderId: string,
  environment?: SMSEnvironment,
  timeoutSeconds?: number,
  logger?: LoggerInterface,
}

export interface SendSMSOptions {
  recipient: string,
  text: string,
  correlationId?: string,
}

export interface SendSMSResponse {
  message: string,
  trackingId: string,
  success: boolean,
  status: string,
}

export interface SMSSender {
  sendSMS(options: SendSMSOptions): Promise<SendSMSResponse>,
}

export interface SMSError {
  code: SMSErrorCode,
  message: string,
}
