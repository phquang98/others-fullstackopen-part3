export const generateIdRes = (idParam, dbParam) => {
  const found = dbParam.find((item) => item.id === Number(idParam));
  if (!found) {
    return `That id do not existed in the database`;
  }
  const textRes = `Name: ${found.name}<br>Number: ${found.number}`;
  //   console.log(found);
  //   console.log(dbParam);
  return textRes;
};

export const deleteId = (idParam, dbParam) => {
  return dbParam.filter((item) => item.id !== Number(idParam));
};

export const validateReqBody = (bodyClt, dbParam) => {
  if (bodyClt.name === undefined || bodyClt.number === undefined) {
    return "Must provide both name and number";
  } else if (dbParam.find((item) => item.name === bodyClt.name)) {
    return "Name existed already!";
  }
  return "Name and number provided!";
};
