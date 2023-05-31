import { SlitherPlugin } from './plugins/slither/SlitherPlugin';

const main = async () => {
  console.log('hello world');

  const slitherPlugin = new SlitherPlugin();

  const output = await slitherPlugin.run('./contracts/killbilly.sol');

  console.log(' >>>>> output: ', JSON.stringify(JSON.parse(output ?? '')));
};

main();
