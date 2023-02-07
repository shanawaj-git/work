import * as fns from '../functions';

describe('functions', () => {
  describe('getStyleValue', () => {
    it('without internal state', () => {
      const propKey = 'colorStyle';
      const props = {
        colorStyle: 'default',
      };
      const attribute = 'color';
      const stylesObj = {
        default: {
          color: 'red',
        },
      };
      expect(
        fns.getStyleValue(props, attribute, null, propKey, stylesObj),
      ).toBe(stylesObj.default.color);
    });

    it('with internal state and has value', () => {
      const propKey = 'colorStyle';
      const props = {
        colorStyle: 'default',
      };
      const attribute = 'color';
      const stylesObj = {
        default: {
          color: 'red',
          hover: {
            color: 'black',
          },
        },
      };
      expect(
        fns.getStyleValue(props, attribute, 'hover', propKey, stylesObj),
      ).toBe(stylesObj.default.hover.color);
    });

    it('with internal state but without value', () => {
      const propKey = 'colorStyle';
      const props = {
        colorStyle: 'default',
      };
      const attribute = 'color';
      const stylesObj = {
        default: {
          color: 'red',
          hover: {},
        },
      };
      expect(
        fns.getStyleValue(props, attribute, 'hover', propKey, stylesObj),
      ).toBe(stylesObj.default.color);
    });

    it('stylesObj not contain input key', () => {
      const propKey = 'colorStyle';
      const props = {
        colorStyle: 'notcontain',
      };
      const attribute = 'color';
      const stylesObj = {
        default: {
          color: 'red',
          hover: {},
        },
      };
      expect(
        fns.getStyleValue(props, attribute, null, propKey, stylesObj),
      ).toBe('');
    });
  });

  describe('AVAILABLE_SIZES', () => {
    it('should return array', () => {
      expect(fns.AVAILABLE_SIZES).toBeInstanceOf(Array);
    });
  });

  describe('AVAILABLE_COLORSTYLES', () => {
    it('should return array', () => {
      expect(fns.AVAILABLE_COLORSTYLES).toBeInstanceOf(Array);
    });
  });

  describe('selectSpinnerVariant', () => {
    it('sark spinner', () => {
      expect(fns.selectSpinnerVariant('outlined')).toEqual('dark');
    });

    it('light spinner', () => {
      expect(fns.selectSpinnerVariant('contained')).toEqual('light');
    });
  });
});
