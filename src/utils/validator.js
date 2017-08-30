import * as constants from '../constants';

const validator = (value, requirement) => {
  let message = null;
  requirement.forEach((r) => {
    switch (r) {
      case constants.NOT_EMPTY:
        if (!value || !value.trim()) {
          message = 'this field is required';
        }
        break;
      case constants.IS_NUMBER:
        if (isNaN(value)) {
          message = 'only numbers are allowed';
        }
        break;
      case constants.ANY_SELECTED:
        if (value === 'default') {
          message = 'payer was not selected';
        }
        break;
      case constants.ANY_CHECKED:
        if (value < 1) {
          message = 'at least one participant should be included';
        }
        break;
      default:
        message = null;
    }
  });
  return message;
};

module.exports = {
  validator,
};
