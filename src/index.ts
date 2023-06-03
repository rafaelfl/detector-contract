import dotenv from 'dotenv';
import { FuzzySet, MembershipFunctionType } from 'javascript-fuzzylogic';

import { DetectorScheduler } from './plugins/scheduler/DetectorScheduler';
import { SimplePluginPolicy } from './plugins/scheduler/policies/SimplePluginPolicy';
import { SlitherPlugin } from './plugins/slither/SlitherPlugin';
import { MythrilPlugin } from './plugins/mythril/MythrilPlugin';

const main = async () => {
  dotenv.config();

  const DEBUG_MODE = process.env.DEBUG === 'true';

  const slitherPlugin = new SlitherPlugin();
  const mythrilPlugin = new MythrilPlugin();

  const pluginsList = [mythrilPlugin, slitherPlugin];

  const detectorScheduler = new DetectorScheduler(new SimplePluginPolicy(pluginsList), DEBUG_MODE);

  const result = await detectorScheduler.execute('./contracts/killbilly.sol');

  for (const res of result) {
    console.log(` ---------------------------------------`);
    console.log(` ::::: detector: ${res.detectorName}`);
    console.log(` ::::: result: ${res.json}`);
    console.log(` ---------------------------------------`);
  }

  const serviceGood = new FuzzySet('good');

  serviceGood.generateMembershipValues({
    type: MembershipFunctionType.Triangular,
    parameters: {
      left: 20,
      center: 60,
      right: 80,
      minValue: 0,
      maxValue: 100,
      step: 10,
    },
  });

  console.log(serviceGood.values);
};

main();
