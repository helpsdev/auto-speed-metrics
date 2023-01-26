const { wait } = require('./myUtil.js');

(async () => {
  console.log('before');
  await wait(1000);
  console.log('after');
})();