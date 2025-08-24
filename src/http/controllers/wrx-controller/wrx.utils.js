// limitPower & limitEnergy & powerReading (same logic)
function commonSliceValue(intoData) {
  const cutIMEI = intoData.slice(8, intoData.length);
  const cutOfficialByte = cutIMEI.slice(2, intoData.length);
  return cutOfficialByte.slice(0, cutOfficialByte.length - 4);
}

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

export function parseLimitsPower({ response }) {
  if (!response) {
    return;
  }

  const getValue = commonSliceValue(response);

  return {
    value: getValue,
    unit: 'watts',
  };
}

export function parseLimitEnergy({ response }) {
  if (!response) {
    return;
  }

  const getValue = commonSliceValue(response);

  return {
    value: getValue,
    unit: 'kWh',
  };
}

export function parsePowerReading({ response }) {
  if (!response) {
    return;
  }

  const getValue = commonSliceValue(response);

  return {
    value: getValue,
    unit: 'watts',
  };
}

export function parseValueOfEnergy({ response }) {
  if (!response) {
    return;
  }

  const cutIMEI = response.slice(8, response.length);
  const cutOfficialByte = cutIMEI.slice(2, response.length);
  const cutCRC = cutOfficialByte.slice(0, cutOfficialByte.length - 4);
  const sliceValues = cutCRC.match(/.{1,8}/g);
  const formatValues = sliceValues.map((value) => value.slice(0, 6) + '.' + value.slice(6, 8));

  return formatValues.map((tariff, idx) => ({ name: `Tariff_${idx + 1}`, value: tariff, unit: 'kWh' }));
}

export function parseBatteryVoltage({ response }) {
  if (!response) {
    return;
  }

  const cutIMEI = response.slice(8, response.length);
  const cutOfficialByte = cutIMEI.slice(2, response.length);
  const cutCRC = cutOfficialByte.slice(0, cutOfficialByte.length - 4);
  const currentValue = cutCRC.match(/.{1,2}/g).join('.');

  return {
    value: currentValue,
    unit: 'volt',
  };
}

export function parsePowerNetParameters({ response }) {
  if (!response) {
    return;
  }

  const cutIMEI = response.slice(8, response.length);
  const cutOfficialByte = cutIMEI.slice(2, response.length);
  const cutCRC = cutOfficialByte.slice(0, cutOfficialByte.length - 4);

  // 2 bytes
  const voltageRaw = cutCRC.slice(0, 4);
  // 2 bytes
  const currentRaw = cutCRC.slice(4, 8);
  // 3 bytes
  const powerRaw = cutCRC.slice(8, 14);

  return {
    voltage: {
      value: voltageRaw,
      unit: 'volt',
    },
    current: {
      value: currentRaw,
      unit: 'ampere',
    },
    power: {
      value: powerRaw,
      unit: 'watts',
    },
  };
}
