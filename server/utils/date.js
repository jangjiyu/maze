const calculateTwoMinutesAgo = () => {
  const twoMinutesAgo = new Date().setMinutes(new Date().getMinutes() - 2);

  return new Date(twoMinutesAgo);
};

module.exports = calculateTwoMinutesAgo;
