import messages from './messages';
const deliveryStepImage1 = require('images/deliveryStepImage1.png');
const deliveryStepImage2 = require('images/deliveryStepImage2.png');

export const deliverySteps = [
  {
    id: 1,
    deliveryStepTitle: messages.deliveryStep1Title,
    deliveryStepTitleDescription: messages.deliveryStep1TitleDescription,
    deliveryImage: deliveryStepImage1,
  },
  {
    id: 2,
    deliveryStepTitle: messages.deliveryStep2Title,
    deliveryStepTitleDescription: messages.deliveryStep2TitleDescription,
    deliveryImage: deliveryStepImage2,
  },
];
