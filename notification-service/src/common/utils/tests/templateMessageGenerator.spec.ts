import {
  buildMessageBody,
  LANGUAGE,
  TEMPLATE_TYPE,
} from '../templateMessageGenerator';
import { TemplateCodes } from 'src/controllers/prescription/mappers';

describe('buildMessageBody', () => {
  it('should generate message body in case template and params exist', () => {
    const input = {
      templateCode: TemplateCodes.NEW_PRESECRIPTION,
      params: {
        patientName: 'test',
        prescriptionUrl: 'localHost.com',
      },
      templateType: TEMPLATE_TYPE.SMS,
      language: LANGUAGE.EN,
    };

    expect(buildMessageBody(input)).toMatchSnapshot();
  });

  it('should through an error in case params are missing', () => {
    const input = {
      templateCode: TemplateCodes.NEW_PRESECRIPTION,
      params: {},
      templateType: TEMPLATE_TYPE.SMS,
      language: LANGUAGE.EN,
    };
    try {
      buildMessageBody(input);
      expect(false).toBe(true);
    } catch {
      expect(true).toBe(true);
    }
  });

  it('should through an error in case template code doesnot exist', () => {
    const input = {
      templateCode: undefined,
      params: {},
      templateType: TEMPLATE_TYPE.SMS,
      language: LANGUAGE.EN,
    };

    try {
      buildMessageBody(input);
      expect(false).toBe(true);
    } catch {
      expect(true).toBe(true);
    }
  });

  it('should through an error in case template code doesnot exist', () => {
    const input = {
      templateCode: 'null',
      params: {},
      templateType: TEMPLATE_TYPE.SMS,
      language: undefined,
    };

    try {
      buildMessageBody(input);
      expect(false).toBe(true);
    } catch {
      expect(true).toBe(true);
    }
  });

  it('should through an error in case template code doesnot exist', () => {
    const input = {
      templateCode: TemplateCodes.NEW_PRESECRIPTION,
      params: {},
      templateType: undefined,
      language: LANGUAGE.EN,
    };

    try {
      buildMessageBody(input);
      expect(false).toBe(true);
    } catch {
      expect(true).toBe(true);
    }
  });

  it('should through an error in case template code is not matching any template code', () => {
    const input = {
      templateCode: 'unknown template',
      params: {
        patientName: 'test',
        prescriptionUrl: 'localHost.com',
      },
      templateType: TEMPLATE_TYPE.SMS,
      language: undefined,
    };

    try {
      buildMessageBody(input);
      expect(false).toBe(true);
    } catch {
      expect(true).toBe(true);
    }
  });
});
