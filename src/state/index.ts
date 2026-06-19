export interface FormState {
  values: Record<string, unknown>;
  touched: Record<string, boolean>;
  errors: Record<string, string>;
}
