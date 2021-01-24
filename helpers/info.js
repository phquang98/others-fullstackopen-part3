// retard line breaking
export const generateRes = (data) => {
  const dbInfo = `Phonebook has info for ${data.length} people`;
  const timestampReqReceived = Date();
  return `${dbInfo}<br>${timestampReqReceived}`;
};

