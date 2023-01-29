const { 
  wait,
  isTwoDigit,
  getFileName,
  getFolderName,
  getTwoDigitVersion
} = require('./myUtil');

test('waits 1 second before continue', async () => {
  //Arrange
  jest.spyOn(global, 'setTimeout');
  //Act
  await wait(1);
  //Assert
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1);
});

test('isTwoDigit returns true if passed number is double digit', () => {
  //Arrange
  const doubleDigitNumber = 10;
  //Act
  const result = isTwoDigit(doubleDigitNumber);
  //Assert
  expect(result).toBeTruthy();
});

test('isTwoDigit returns false if passed number is single digit', () => {
  //Arrange
  const singleDigit = 6;
  //Act
  const result = isTwoDigit(singleDigit);
  //Assert
  expect(result).toBeFalsy();
});

test('isTwoDigit returns false if passed number is three or more digits', () => {
  //Arrange
  const threeDigitNumber = 100;
  const fourDigitNumber = 3425;
  //Act
  const threeDigitNumberResult = isTwoDigit(threeDigitNumber);
  const fourDigitNumberResult = isTwoDigit(fourDigitNumber);
  //Assert
  expect(threeDigitNumberResult).toBeFalsy();
  expect(fourDigitNumberResult).toBeFalsy();
});

test('getFileName returns a filename with the form DD_HHMM_PAGE-NAME_PAGE-STRATEGY', () => {
  //Arrange
  const pageName = 'home';
  const pageStrategy = 'MOBILE';
  const now = new Date(2023, 0, 29, 15, 8, 0);
  const singleDigitDate = new Date(2023, 0, 1, 5, 8, 0);
  //Act
  const result = getFileName({pageName, pageStrategy, now});
  const singleDigitDateResult = getFileName({pageName, pageStrategy, now: singleDigitDate});
  //Assert
  expect(result).toMatch('29_1508_home_MOBILE');
  expect(singleDigitDateResult).toMatch('01_0508_home_MOBILE');
});

test('getFolderName returns a folder path of the form YYYY/MM/PAGENAME', () => {
  //Arrange
  const pageName = 'home';
  const now = new Date(2023, 0, 29);
  //Act
  const result = getFolderName({pageName, now});
  //Assert
  expect(result).toMatch('2023/01/home');
});

test('getTwoDigitVersion returns a two digit version of a number', () => {
  //Arrange
  const oneDigitNumber = 1;
  //Act
  const result = getTwoDigitVersion(oneDigitNumber);
  //Assert
  expect(result).toMatch('01');
});

test('getTwoDigitVersion returns untouched a two digit number', () => {
  //Arrange
  const twoDigitNumber = 50;
  //Act
  const result = getTwoDigitVersion(twoDigitNumber);
  //Assert
  expect(result).toMatch('50');
});

test('getTwoDigitVersion throws error when passed a three or more digit number', () => {
  //Arrange
  const threeDigitNumber = 456;
  const sixDigitNumber = 456234;
  //Act
  //Assert
  expect(() => getTwoDigitVersion(threeDigitNumber)).toThrow();
  expect(() => getTwoDigitVersion(sixDigitNumber)).toThrow();
});