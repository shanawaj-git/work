import PropTypes from 'prop-types';
import React from 'react';
import Typography, { TypographyType } from 'atoms/Typography';
import { colorSelector } from '../../themes';
import { canBeRenderedInTypographyComponent } from '../../utils/utils';

const DEFAULT_COLOR = colorSelector('G500');

const Article = ({
  title,
  description,
  titleProps = {
    typographyType: TypographyType.TITLE_1,
    color: DEFAULT_COLOR,
  },
  descriptionProps = {
    typographyType: TypographyType.FOOT_NOTE,
    color: DEFAULT_COLOR,
  },
  divider,
  dividerProps = {},
}) => (
  <div data-testid="article-component">
    {title && canBeRenderedInTypographyComponent(title) ? (
      <Typography data-testid="article-component-title" {...titleProps}>
        <span> {title}</span>
      </Typography>
    ) : (
      <div {...titleProps}>{title}</div>
    )}
    {divider && (
      <div
        data-testid="article-component-divider"
        {...dividerProps}
        className={[
          `w-10 h-0 border-solid border-2 my-4 border-[${colorSelector(
            'P300',
          )}]`,
          dividerProps.className,
        ].join(' ')}
      />
    )}
    {description && canBeRenderedInTypographyComponent(description) ? (
      <Typography
        data-testid="article-component-description"
        {...descriptionProps}
      >
        <span> {description}</span>
      </Typography>
    ) : (
      <div {...titleProps}>{description}</div>
    )}
  </div>
);

Article.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  titleProps: PropTypes.any,
  descriptionProps: PropTypes.any,
  divider: PropTypes.bool,
  dividerProps: PropTypes.object,
};
export default Article;
