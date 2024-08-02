export interface IOption<V = string> extends Record<string, unknown> {
  label: string;
  value: V;
}
