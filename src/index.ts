import dotenv from 'dotenv';

import { IConfidenceResolver, FuzzyConfidenceResolver } from './confidence';

import { ResultDetection } from './plugins/types/ResultDetection';
import { DetectorScheduler } from './plugins/scheduler/DetectorScheduler';
import { SimplePluginPolicy } from './plugins/scheduler/policies/SimplePluginPolicy';
import { SlitherPlugin } from './plugins/slither/SlitherPlugin';
import { MythrilPlugin } from './plugins/mythril/MythrilPlugin';
import { Detectors } from './plugins/constants';

const detectors = {
  // SWC-106 - Unprotected SELFDESTRUCT Instruction
  selfDestruct: {
    [Detectors.SLITHER]: {
      // True positive rate/Recall - Ratio of detected vulnerabilities to the number that really exists in the code
      // TPR = TP / (TP + FN)
      // in which TP (true positives) is the number of true vulnerabilities detected in the code
      // and FN (false negatives) is the total number of existing vulnerabilities not detected in the code
      truePositiveRate: 0.98125,
      // TP = 157
      // FN = 3
      // TPR = 157 / (157 + 3) = 0.98125

      // False positive rate - Ratio of false alarms for vulnerabilities that does not really exists in the code
      // FPR = FP / (FP + TN)
      // in which FP (false positive) is the total number of detected vulnerabilities that do not exist in the code
      // and TN (true negative) is the number of not detected vulnerabilities that do not exist in the code
      falsePositiveRate: 0.66875,

      // FP = 107
      // TN = 53
      // FPR = 107 / (107 + 53) = 0.66875

      // Precision calculation ==> Prec = TP / (TP + FP) ==> 157/(157 + 107) ==> 0.5946969697
      // Fuzzy calculation ==> 0.75
    },

    [Detectors.MYTHRIL]: {
      truePositiveRate: 0.72,
      falsePositiveRate: 0.38,
    },
  },
};

const main = async () => {
  dotenv.config();

  const DEBUG_MODE = process.env.DEBUG === 'true';

  const slitherPlugin = new SlitherPlugin();
  const mythrilPlugin = new MythrilPlugin();

  const pluginsList = [mythrilPlugin, slitherPlugin];

  const detectorScheduler = new DetectorScheduler(new SimplePluginPolicy(pluginsList), DEBUG_MODE);

  const result = await detectorScheduler.execute('./contracts/killbilly.sol');

  const confidenceResolver: IConfidenceResolver = new FuzzyConfidenceResolver();

  let averageConfidence = 0.0,
    confidenceCount = 0;

  for (const res of result) {
    const detectResult: ResultDetection = JSON.parse(res.json);

    if (!detectResult?.success) {
      console.error(`Error running detector ${res.detectorName}: ${detectResult.error}`);
      continue;
    }

    const tpr = detectors[detectResult.results[0].vulnerabilityType]?.[res.detectorName].truePositiveRate ?? 0.0;
    const fpr = detectors[detectResult.results[0].vulnerabilityType]?.[res.detectorName].falsePositiveRate ?? 0.0;

    const confidence = confidenceResolver.calculateConfidence(tpr, fpr);

    console.log(` ---------------------------------------`);
    console.log(` ::::: detector: ${res.detectorName}`);
    console.log(` ::::: tpr: ${tpr}`);
    console.log(` ::::: fpr: ${fpr}`);
    console.log(` ::::: result: ${res.json}`);
    console.log(` ::::: confidence: ${confidence}`);
    console.log(` ---------------------------------------`);

    averageConfidence += confidence;
    confidenceCount++;
  }

  console.log(`\n :::: Average confidence ${averageConfidence / confidenceCount}`);
};

main();
