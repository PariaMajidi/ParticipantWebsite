const getTime = () => {
  const date = new Date();

  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}`;
};

module.exports = getTime;
