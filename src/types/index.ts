export interface GenericObject {
  [key: string]: string | number | boolean | GenericObject | GenericObject[] | undefined | null;
}
