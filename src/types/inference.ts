import type { BaseField } from './field.js';

/**
 * Infers the value type of a single form field.
 *
 * Works by extracting the generic type parameter `TValue` from `BaseField<TValue>`.
 * Since every field type (`TextField`, `NumberField`, etc.) extends `BaseField<TValue>`
 * with a specific value type, TypeScript's `infer` keyword captures that type directly.
 *
 * Examples:
 *   - `TextField` extends `BaseField<string>`  → infers `string`
 *   - `NumberField` extends `BaseField<number>` → infers `number`
 *   - `CheckboxField` extends `BaseField<boolean>` → infers `boolean`
 *   - `SelectField<'admin' | 'user'>` extends `BaseField<'admin' | 'user'>` → infers `'admin' | 'user'`
 *
 * @limitation
 * If a field type does not extend `BaseField<TValue>`, inference yields `never`.
 */
export type InferField<TField> = TField extends BaseField<infer TValue> ? TValue : never;

/**
 * Infers the value types of an entire form schema object.
 *
 * Maps over each key in `TSchema` and applies `InferField` to the corresponding
 * field, producing a plain object type where each key maps to its inferred value.
 *
 * Example:
 * ```ts
 * const schema = {
 *   name: textField(),
 *   age: numberField(),
 *   role: selectField({ options: [{ label: 'Admin', value: 'admin' }] }),
 * };
 *
 * type Values = InferValues<typeof schema>;
 * // { name: string; age: number; role: 'admin' }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InferValues<TSchema extends Record<string, any>> = {
  [K in keyof TSchema]: InferField<TSchema[K]>;
};
