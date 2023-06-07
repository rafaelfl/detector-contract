import fs from 'fs';

const main = async () => {
  const buf = fs.readFileSync('./contracts/returnvalue.sol');

  const obj = {
    sourceCode: buf.toString(),
  };

  console.log(JSON.stringify(obj));
};

main();
