export interface IOption<V = string> {
  label: string;
  value: V;

  [key: string]: unknown;
}
