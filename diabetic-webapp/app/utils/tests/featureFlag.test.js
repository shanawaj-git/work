import { getUnleashConfig } from '../featureFlag';

describe('featureFlag', () => {
  it('should get unleash configs for dev env', () => {
    process.env.NODE_ENV = 'development';
    expect(getUnleashConfig()).toMatchSnapshot();
  });

  it('should get unleash configs for staging env', () => {
    process.env.NODE_ENV = 'staging';
    expect(getUnleashConfig()).toMatchSnapshot();
  });

  it('should get unleash configs for production env', () => {
    process.env.NODE_ENV = 'production';
    expect(getUnleashConfig()).toMatchSnapshot();
  });
});
