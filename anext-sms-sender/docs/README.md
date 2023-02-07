# Introduction
`@albathanext/anext-sms-sender` shall be used to send SMS from different modules of AlbathaNext solutions. This library abstracts the implementation of actual SMS sending using the selected provider.

### Installation

```
$ npm install @albathanext/anext-sms-sender
```
### Usage example
``` ts
import SMSSender, { SMSEnvironment } from "@albathanext/anext-sms-sender";

try {
    const sendSMSResponse = await new SMSSender({
            appSid: '{appSidvalue}',
            senderId: '{senderIdValue}',
            environment: SMSEnvironment.Production,
          }).sendSMS({
            recipient: '971xxxxxxxx',
            text: 'Testing 123',
          });
} catch (smsError) {
    console.log('Error Code:', smsError.code, ', Error Message:', smsError.message )
}
```
### API Reference

##### SMSSender
The SMS sender has the following type definition

```ts
interface SMSSender {
  sendSMS(options: SendSMSOptions): Promise<SendSMSResponse>,
}
```
**```constructor(config)```**

*`Parameters`*
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `config` | [SMSSenderConfig](#smssenderconfig) | **Required**. The SMS Sender Configuration |

**```sendSMS(options) ```**

*`Parameters`*
| Parameter | Type | Description |
| :--- | :--- | :--- |
| `options` | [SendSMSOptions](#sendsmsoptions) | **Required**. The options for sending the SMS |

*`Returns`*
[SendSMSResponse](#sendsmsresponse)

*`throws`*
[SMSError](#smserror)

##### SMSSenderConfig
SMSSenderConfig varies from provider gto provider

**Unifonic**
For [Unifonic](https://www.unifonic.com/) the following configurations are accepted

| Field | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `appSid` | `string` |  | **Required**. The SID from Unifonic |
| `senderId` | `string` |  | **Required**. The Unifonic SenderID |
| `environment` | [SMSEnvironment](#smsenvironment) | `SMSEnvironment.Sandbox` | **Optional**. The environment |
| `timeoutSeconds` | `number` | `60` | **Optional**. The client timeout in seconds |
| `logger` | [LoggerInterface](#loggerinterface) | `null` | **Optional**. The logger if to be used |

##### SendSMSOptions
SendSMSOptions has the folowing fields accepted

| Field | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `recipient` | `string` |  | **Required**. The recipient contact number |
| `text` | `string` |  | **Required**. The message body text |
| `correlationId` | `string` | `null` | **Optional**. If the message to be mapped to a correlaton id |

##### SendSMSResponse
SendSMSResponse has the folowing fields returned

| Field | Type | Description |
| :--- | :--- | :--- |
| `message` | `string` | The response message |
| `trackingId` | `string` | The message id for tracking |
| `success` | `boolean` | Whether success or not |
| `status` | `string` | The status text from the SMS Provider |

##### SMSError
SMS has the folowing fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `code` | [SMSErrorCode](#smserrorcode) | The error code |
| `message` | `string` | The error message |

##### SMSErrorCode
The following are the existing `enum` values

| Enum Value | Error Code | Description |
| :--- | :--- | :--- |
|  `AUTH_FAILURE`  |  `SMSERR_001`  |   |
|  `MISSING_AUTH_PARAM`  |  `SMSERR_002`  |   |
|  `INVALID_PARAM_FORMAT`  |  `SMSERR_003`  |   |
|  `DUPLICATE_MESSAGE`  |  `SMSERR_004`  |   |
|  `PAGE_LIMIT_EXCEEDED`  |  `SMSERR_005`  |   |
|  `TOO_MANY_REQUESTS`  |  `SMSERR_006`  |   |
|  `INVALID_ENCODING`  |  `SMSERR_007`  |   |
|  `INCOMPATIBLE_API_VERSION`  |  `SMSERR_008`  |   |
|  `RECEPIENT_MISSING`  |  `SMSERR_051`  |   |
|  `RECEPIENT_FORMAT_INVALID`  |  `SMSERR_052`  |   |
|  `RECEPIENT_INVALID`  |  `SMSERR_053`  |   |
|  `RECEPIENT_TOO_MANY_ENTRIES`  |  `SMSERR_054`  |   |
|  `MESSAGE_BODY_TOO_LONG`  |  `SMSERR_101`  |   |
|  `MESSAGE_BODY_INVALID`  |  `SMSERR_102`  |   |
|  `MESSAGE_BODY_MISSING`  |  `SMSERR_103`  |   |
|  `MESSAGE_BODY_EMPTY`  |  `SMSERR_104`  |   |
|  `SENDER_FORMAT_INVALID`  |  `SMSERR_151`  |   |
|  `SENDER_APPSID_MISMATCH`  |  `SMSERR_152`  |   |
|  `SENDER_INVALID`  |  `SMSERR_153`  |   |
|  `CORRELATION_ID_FORMAT_INVALID`  |  `SMSERR_201`  |   |
|  `GENERIC_ERROR`  |  `SMSERR_501`  |   |
|  `REQUEST_ERROR`  |  `SMSERR_999`  |   |

##### SMSEnvironment
The following are the `enum` values for environments

| Value | Description |
| :--- | :--- |
|  `Production`  |   |
|  `Sandbox`  | To support sandbox testing environments(not provided by unifonic)  |

##### LoggerInterface
The logger interface is defined as the following
```ts
interface LoggerInterface {
  log: function,
  info: function,
  warn: function,
  error: function,
  debug: function,
}
```