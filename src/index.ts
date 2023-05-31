import { SlitherPlugin } from './plugins/SlitherPlugin';

const main = async () => {
  console.log('hello world');

  const slitherPlugin = new SlitherPlugin();

  const output = await slitherPlugin.run('./contracts/killbilly.sol');

  console.log(' >>>>> output: ', JSON.parse(output ?? ''));
};

main();
