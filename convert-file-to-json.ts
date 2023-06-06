import fs from 'fs';

const main = async () => {
  const buf = fs.readFileSync('./contracts/returnvalue.sol');

  //   console.log(' >>> buf', buf.toString());

  const obj = {
    sourceCode: buf.toString(),
  };

  console.log(JSON.stringify(obj));
};

main();
