export function parseDateTime({ response }) {
  if (!response) {
    return;
  }

  const cutIMEI = response.slice(10, response.length);
  const cutOfficialByte = cutIMEI.slice(2, response.length);
  const cutCRC = cutOfficialByte.slice(0, cutOfficialByte.length - 4);

  const getTime = cutCRC.slice(0, 6);
  const getDate = cutCRC.slice(6, cutCRC.length);

  const hours = Number(getTime.slice(0, 2));
  const minutes = Number(getTime.slice(2, 4));
  const seconds = Number(getTime.slice(4, 6));

  const day = Number(getDate.slice(0, 2));
  const month = Number(getDate.slice(2, 4)) - 1;
  const year = 2000 + Number(getDate.slice(4, 6));

  return new Date(year, month, day, hours, minutes, seconds);
}
