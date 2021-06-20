const getTime = () => {
  const date = new Date()

  return `${date
    .toLocaleString('FR-fr')
    .replace(',', '')}.${date.getMilliseconds()}`
}

module.exports = getTime
