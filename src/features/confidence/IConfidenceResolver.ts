export interface IConfidenceResolver {
  calculateConfidence(tpr: number, fpr: number): number;
}
