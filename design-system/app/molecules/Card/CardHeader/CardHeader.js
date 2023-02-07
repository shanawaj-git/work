import React from 'react';
import PropTypes from 'prop-types';

import Typography, { TypographyType } from 'atoms/Typography';
import { TextWithIcon } from 'molecules/TextWithIcon/TextWithIcon';
import Image from 'atoms/Image';

export const CardHeader = props => {
  const {
    title,
    subTitle,
    subTitleIcon,
    description,
    descriptionIcon,
    subDescription,
    subDescriptionIcon,
    headerImage,
    className,
    footerIcon,
    footerText,
  } = props;
  return (
    <div className={className}>
      <div className="card-header-wrapper">
        <div>
          <div className="card-header-image">
            <Image src={headerImage} alt={title} />
          </div>
          <div className="card-header-body">
            {title && (
              <Typography
                typographyType={TypographyType.HEAD_LINE}
                className="card-header-title"
              >
                {title}
              </Typography>
            )}
            {subTitle && (
              <TextWithIcon
                icon={subTitleIcon}
                text={subTitle}
                className="card-header-subTitle"
              />
            )}
            {description && (
              <TextWithIcon
                icon={descriptionIcon}
                text={description}
                className="card-header-description"
              />
            )}
            {subDescription && (
              <TextWithIcon
                icon={subDescriptionIcon}
                text={subDescription}
                className="card-header-subDescription"
              />
            )}
          </div>
        </div>
        <TextWithIcon
          icon={footerIcon}
          text={footerText}
          className="card-header-footer"
        />
      </div>
    </div>
  );
};

CardHeader.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  subTitleIcon: PropTypes.string,
  description: PropTypes.string,
  descriptionIcon: PropTypes.string,
  subDescription: PropTypes.string,
  subDescriptionIcon: PropTypes.string,
  footerIcon: PropTypes.string,
  footerText: PropTypes.string,
  headerImage: PropTypes.string,
  className: PropTypes.string,
};
