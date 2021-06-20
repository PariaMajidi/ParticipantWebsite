const createPool = (files, repetitions) =>
  files
    .map(({ id, name, webContentLink }) => ({
      id,
      name,
      url: webContentLink,
    }))
    .reduce(
      (acc, file) => [...acc, ...new Array(repetitions).fill(0).map(r => file)],
      []
    )

export default createPool
