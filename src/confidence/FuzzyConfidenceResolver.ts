import {
  DefuzzicationType,
  FuzzyInferenceSystem,
  FuzzySet,
  LinguisticVariable,
  MembershipFunctionType,
} from 'javascript-fuzzylogic';
import { IConfidenceResolver } from './IConfidenceResolver';

export class FuzzyConfidenceResolver implements IConfidenceResolver {
  private inputLow: FuzzySet;
  private inputMedium: FuzzySet;
  private inputHigh: FuzzySet;

  private outputVeryLow: FuzzySet;
  private outputLow: FuzzySet;
  private outputMedium: FuzzySet;
  private outputHigh: FuzzySet;
  private outputVeryHigh: FuzzySet;

  private fis: FuzzyInferenceSystem;

  constructor() {
    ///////////////////////// membership functions
    // We start by creating our fuzzy sets (or membership functions) that will make up our variables

    this.inputLow = new FuzzySet('low');
    this.inputLow.generateMembershipValues({
      type: MembershipFunctionType.Triangular,
      parameters: {
        left: 0,
        center: 0,
        right: 50,
        minValue: 0,
        maxValue: 100,
        step: 1,
      },
    });

    this.inputMedium = new FuzzySet('medium');
    this.inputMedium.generateMembershipValues({
      type: MembershipFunctionType.Triangular,
      parameters: {
        left: 0,
        center: 50,
        right: 100,
        minValue: 0,
        maxValue: 100,
        step: 1,
      },
    });

    this.inputHigh = new FuzzySet('high');
    this.inputHigh.generateMembershipValues({
      type: MembershipFunctionType.Triangular,
      parameters: {
        left: 50,
        center: 100,
        right: 100,
        minValue: 0,
        maxValue: 100,
        step: 1,
      },
    });

    /////////////////////////////////////// output

    this.outputVeryLow = new FuzzySet('verylow');
    this.outputVeryLow.generateMembershipValues({
      type: MembershipFunctionType.Triangular,
      parameters: {
        left: 0,
        center: 0,
        right: 25,
        minValue: 0,
        maxValue: 100,
        step: 1,
      },
    });

    this.outputLow = new FuzzySet('low');
    this.outputLow.generateMembershipValues({
      type: MembershipFunctionType.Triangular,
      parameters: {
        left: 0,
        center: 25,
        right: 50,
        minValue: 0,
        maxValue: 100,
        step: 1,
      },
    });

    this.outputMedium = new FuzzySet('medium');
    this.outputMedium.generateMembershipValues({
      type: MembershipFunctionType.Triangular,
      parameters: {
        left: 25,
        center: 50,
        right: 75,
        minValue: 0,
        maxValue: 100,
        step: 1,
      },
    });

    this.outputHigh = new FuzzySet('high');
    this.outputHigh.generateMembershipValues({
      type: MembershipFunctionType.Triangular,
      parameters: {
        left: 50,
        center: 75,
        right: 100,
        minValue: 0,
        maxValue: 100,
        step: 1,
      },
    });

    this.outputVeryHigh = new FuzzySet('veryhigh');
    this.outputVeryHigh.generateMembershipValues({
      type: MembershipFunctionType.Triangular,
      parameters: {
        left: 75,
        center: 100,
        right: 100,
        minValue: 0,
        maxValue: 100,
        step: 1,
      },
    });

    //////////////////////////////////////////////

    // Then, we tie these fuzzy sets to variables
    const tprVariable = new LinguisticVariable('tpr')
      .addSet(this.inputLow)
      .addSet(this.inputMedium)
      .addSet(this.inputHigh);

    const fprVariable = new LinguisticVariable('fpr')
      .addSet(this.inputLow)
      .addSet(this.inputMedium)
      .addSet(this.inputHigh);

    const confidenceVariable = new LinguisticVariable('confidence')
      .addSet(this.outputVeryLow)
      .addSet(this.outputLow)
      .addSet(this.outputMedium)
      .addSet(this.outputHigh)
      .addSet(this.outputVeryHigh);

    // Now that we have variables with sets, we attach them to a fuzzy inference system
    this.fis = new FuzzyInferenceSystem('ConfidenceFIS')
      .addInput(tprVariable)
      .addInput(fprVariable)
      .addOutput(confidenceVariable);

    // Finally we add rules to our system, written in natural language
    // The values must match our variables and their fuzzy sets
    this.fis.addRule('IF tpr IS low AND fpr IS low THEN confidence IS verylow');
    this.fis.addRule('IF tpr IS low AND fpr IS medium THEN confidence IS low');
    this.fis.addRule('IF tpr IS low AND fpr IS high THEN confidence IS low');

    this.fis.addRule('IF tpr IS medium AND fpr IS low THEN confidence IS medium');
    this.fis.addRule('IF tpr IS medium AND fpr IS medium THEN confidence IS medium');
    this.fis.addRule('IF tpr IS medium AND fpr IS high THEN confidence IS high');

    this.fis.addRule('IF tpr IS high AND fpr IS low THEN confidence IS high');
    this.fis.addRule('IF tpr IS high AND fpr IS medium THEN confidence IS veryhigh');
    this.fis.addRule('IF tpr IS high AND fpr IS high THEN confidence IS veryhigh');
  }

  calculateConfidence(tpr: number, fpr: number): number {
    const normTpr = Math.trunc(tpr * 100);
    const normFpr = Math.trunc(fpr * 100);

    const result = this.fis.solve('Mamdani', { tpr: normTpr, fpr: 100 - normFpr }, DefuzzicationType.MeanOfMaxima);

    return result / 100.0;
  }
}
