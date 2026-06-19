import type { SelectField } from '../types/field.js';

export type SelectFieldConfig<TValue extends string = string> = Omit<SelectField<TValue>, 'type'>;

export function selectField<const TValue extends string>(
  config: SelectFieldConfig<TValue>,
): SelectField<TValue> {
  return {
    type: 'select',
    ...config,
  };
}
