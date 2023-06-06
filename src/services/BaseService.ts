import { GenericObject } from '../types';

export abstract class BaseService {
  static getResult: (object: GenericObject) => Promise<GenericObject>;
}
