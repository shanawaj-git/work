import React from 'react';
import PropTypes from 'prop-types';
import Typography, { TypographyType } from 'atoms/Typography';
import { MedicineCardWrapper } from './StyledMedicineCard';

const MedicineCard = props => {
  const { className, image, title, subTitle, description, bodyText } = props;
  return (
    <div className={className}>
      <MedicineCardWrapper>
        <div className="medicine-card-header">
          <img src={image} alt={title} />

          <div className="medicine-card-details-wrapper">
            <div className="medicine-card-header-details">
              <Typography
                typographyType={TypographyType.SUB_HEAD}
                className="card-header-title"
              >
                {title}
              </Typography>

              <Typography
                typographyType={TypographyType.SUB_HEAD}
                className="card-header-subTitle"
              >
                {subTitle}
              </Typography>

              <Typography
                typographyType={TypographyType.SUB_HEAD}
                className="card-header-description"
              >
                {description}
              </Typography>
            </div>
          </div>
        </div>
        <div className="medicine-card-body">
          <p>{bodyText}</p>
        </div>
      </MedicineCardWrapper>
    </div>
  );
};

export default MedicineCard;

MedicineCard.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  bodyText: PropTypes.string.isRequired,
};
