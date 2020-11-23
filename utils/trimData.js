const trimData = (data, ...params) => {
  const inputData = data;
  // eslint-disable-next-line no-param-reassign
  if (!params.length) params = Object.keys(data);

  params.forEach(key => {
    inputData[key] = data[key].trim();
  });

  return inputData;
};

export default trimData;
