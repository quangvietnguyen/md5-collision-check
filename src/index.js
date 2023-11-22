const CryptoJS = require('crypto-js');

function md5(data) {
  const hash = CryptoJS.MD5(data);
  return hash.words.join('-');
}

function hash() {
  process.stdout.write('\nstart');
  let index = -1;
  const maps = new Array();
  for (let i = 0; i < 10; i++) {
    maps[i] = new Map();
  }

  for (let i = 100000000; i < 1000000000; i++) {
    if ((i - 100000000) % 16777216 > 0) {
      process.stdout.write(`\rindex: ${index} - ${i}`);
      for (let j = 0; j <= index; j++) {
        if (maps[j].has(md5(i.toString()))) {
          console.log('collision');
          break;
        }
      }
      maps[index].set(md5(i.toString()), true);
    } else {
      index++;
    }
  }

  process.stdout.write('\nend');
}

hash();
