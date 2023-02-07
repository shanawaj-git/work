/**
 * Unifonic interface types
 */
export interface ResponseData {
    MessageID: number,
    CorrelationID: string,
    Status: string,
    NumberOfUnits: number,
    Cost: number,
    Balance: number,
    Recipient: string,
    TimeCreated: string,
    CurrencyCode: string
}

export interface UnifonicSendSMSResponse {
    success: boolean,
    message: string,
    errorCode: string,
    data: ResponseData,
  }
