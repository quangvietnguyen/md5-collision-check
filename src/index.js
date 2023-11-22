const CryptoJS = require('crypto-js');

function md5(data) {
  const hash = CryptoJS.MD5(data);
  return hash.words.join('-');
}

function hash(min, max) {
  process.stdout.write('\nstart');
  let index = -1;
  const maps = new Array();
  for (let i = 0; i < 10; i++) {
    maps[i] = new Map();
  }

  for (let i = min; i < max; i++) {
    if ((i - min) % 16777216 > 0) {
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

hash(100000000, 1000000000);
