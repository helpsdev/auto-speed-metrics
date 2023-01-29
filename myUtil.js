async function wait (ms){
  return new Promise((resolve) => setTimeout(() => {
    resolve();
  }, ms));
}

function isTwoDigit(number){
  return number.toString().length === 2;
}

function getFolderName(params){
  const { now, pageName } = params;
  const oneBasedMonth = now.getMonth() + 1;
  const monthNumber = getTwoDigitVersion(oneBasedMonth); 

  return `${now.getFullYear()}/${monthNumber}/${pageName}`;
}
function getFileName(details){
  const {now, pageName, pageStrategy} = details;

  return `${getTwoDigitVersion(now.getDate())}_${getTwoDigitVersion(now.getHours())}${getTwoDigitVersion(now.getMinutes())}_${pageName}_${pageStrategy}`;
}

function getTwoDigitVersion(number){
  if (isTwoDigit(number)) {
    return number.toString();
  }

  if (number.toString().length > 2) {
    throw new Error(`Can't get the two digit version for the number ${number}`);
  }

  return `0${number}`;
}

module.exports = {
  wait,
  isTwoDigit,
  getFileName,
  getFolderName,
  getTwoDigitVersion
};