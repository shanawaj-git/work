const padding = ({ locale }: any, paddingValue: any) => {
  const isEn = locale === 'en';
  const style = {};
  style[isEn ? 'paddingLeft' : 'paddingRight'] = paddingValue || '10px';
  return style;
};
export default padding;
