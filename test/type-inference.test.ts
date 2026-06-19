import { expectTypeOf, test } from 'vitest';
import { textField, numberField, checkboxField, selectField } from '../src/index.js';
import type { InferField, InferValues } from '../src/index.js';

// Helper type aliases: infer the return type of each field builder so we
// can use them in type-level assertions without any runtime variables.
type TextField = ReturnType<typeof textField>;
type NumberField = ReturnType<typeof numberField>;
type CheckboxField = ReturnType<typeof checkboxField>;
type SelectFieldLiteral = ReturnType<typeof selectField<'admin' | 'user'>>;

test('single field inference maps core fields to their types', () => {
  expectTypeOf<InferField<TextField>>().toEqualTypeOf<string>();
  expectTypeOf<InferField<NumberField>>().toEqualTypeOf<number>();
  expectTypeOf<InferField<CheckboxField>>().toEqualTypeOf<boolean>();
});

test('multi-field schema inference maps keys to field types', () => {
  type Schema = {
    name: TextField;
    age: NumberField;
    subscribed: CheckboxField;
  };

  type Inferred = InferValues<Schema>;

  expectTypeOf<Inferred>().toEqualTypeOf<{
    name: string;
    age: number;
    subscribed: boolean;
  }>();
});

test('select field literal union inference works', () => {
  expectTypeOf<InferField<SelectFieldLiteral>>().toEqualTypeOf<
    'admin' | 'user'
  >();
});

test('multi-field schema with select literal inference works', () => {
  type Schema = {
    name: TextField;
    age: NumberField;
    subscribed: CheckboxField;
    role: SelectFieldLiteral;
  };

  type Inferred = InferValues<Schema>;

  expectTypeOf<Inferred>().toEqualTypeOf<{
    name: string;
    age: number;
    subscribed: boolean;
    role: 'admin' | 'user';
  }>();
});

