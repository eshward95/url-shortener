const characters = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const BASE = characters.length;
const encoder = (num) => {
  let str = "";
  while (num > 0) {
    let value = num % BASE;
    num = Math.floor(num / BASE);
    str = characters[Math.floor(value)] + str;
  }
  return str;
};

const decoder = (str) => {
  let decoded = 0;
  while (str) {
    const index = characters.indexOf(str[0]);
    const power = str.length - 1;
    decoded += index * BASE ** power;
    str = str.substring(1);
  }
  return decoded;
};

module.exports = { encoder, decoder };
