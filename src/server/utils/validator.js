const validateOnEmptiness = data =>
  (data !== '') && !!data.trim();

module.exports = {
  validateOnEmptiness,
};
