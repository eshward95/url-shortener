function objectIdToBase10(objectId) {
  return parseInt(objectId.toString().slice(0, 10), 16);
}

const checkMissingKeys = (requiredKeys, requestBody) => {
  const missingKeys = requiredKeys.filter(
    (key) => !requestBody.hasOwnProperty(key)
  );
  return missingKeys;
};

const validURL = (str) => {
  try {
    new URL(str);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = { objectIdToBase10, checkMissingKeys, validURL };
