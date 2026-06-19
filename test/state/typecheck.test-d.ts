import { expectTypeOf, test } from 'vitest';
import { createForm, textField, numberField } from '../../src/index.js';

test('createForm type inference matches expected typing', () => {
  const schema = {
    name: textField(),
    age: numberField(),
  };

  const form = createForm(schema);

  // getValue/getValues inference
  expectTypeOf(form.getValues()).toEqualTypeOf<{ name: string; age: number }>();
  expectTypeOf(form.getValue('name')).toEqualTypeOf<string>();
  expectTypeOf(form.getValue('age')).toEqualTypeOf<number>();

  // setValue type assertions
  expectTypeOf(form.setValue('name', 'John')).toEqualTypeOf<void>();
  // @ts-expect-error - number cannot be assigned to name
  expectTypeOf(form.setValue('name', 123)).toEqualTypeOf<void>();
});
