const validateOnEmptiness = data => Object.keys(data).every(prop => !(data[prop] === '') || !!data[prop].trim());

module.exports = {
  validateOnEmptiness,
};
