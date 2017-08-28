export default (value, requirement) => {
  let message = null;
  Object.keys(requirement).forEach((key) => {
    switch (key) {
      case '$notEmpty':
        if (!value || !value.trim()) {
          message = 'this field is required';
        }
        break;
      case '$isNumber':
        if (isNaN(value)) {
          message = 'only numbers are allowed';
        }
        break;
      case '$anySelected':
        if (value === 'default') {
          message = 'payer was not selected';
        }
        break;
      case '$checkedNumber':
        if (value < requirement.$checkedNumber) {
          message = 'at least one participant should be included';
        }
        break;
      default:
        message = null;
    }
  });
  return message;
};
