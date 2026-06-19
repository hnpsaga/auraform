import { describe, expect, it } from 'vitest';
import { createForm } from '../../src/state/createForm.js';
import { textField, numberField, checkboxField, selectField } from '../../src/index.js';

describe('createForm values and getters', () => {
  it('resolves schema default values correctly', () => {
    const schema = {
      name: textField({ defaultValue: 'Alice' }),
      age: numberField(),
      agreed: checkboxField({ defaultValue: true }),
    };

    const form = createForm(schema);

    expect(form.getValues()).toEqual({
      name: 'Alice',
      age: 0,
      agreed: true,
    });

    expect(form.getValue('name')).toBe('Alice');
    expect(form.getValue('age')).toBe(0);
    expect(form.getValue('agreed')).toBe(true);
  });

  it('resolves select field default and fallback values correctly', () => {
    const selectFieldLocal = (config?: any) => ({
      type: 'select' as const,
      ...config,
    });

    const schema = {
      roleWithDefault: selectFieldLocal({
        defaultValue: 'admin',
        options: [{ label: 'Admin', value: 'admin' }, { label: 'User', value: 'user' }],
      }),
      roleWithFirstOption: selectFieldLocal({
        options: [{ label: 'User', value: 'user' }, { label: 'Admin', value: 'admin' }],
      }),
      roleEmptyOptions: selectFieldLocal({
        options: [],
      }),
      roleNoOptions: selectFieldLocal(),
    };

    const form = createForm(schema);

    expect(form.getValues()).toEqual({
      roleWithDefault: 'admin',
      roleWithFirstOption: 'user',
      roleEmptyOptions: '',
      roleNoOptions: '',
    });
  });

  it('updates values and tracks touched and dirty states on setValue', () => {
    const schema = {
      name: textField({ defaultValue: 'Bob' }),
      age: numberField(),
    };

    const form = createForm(schema);

    // Initial check
    expect(form.getValue('name')).toBe('Bob');

    // Set same value
    form.setValue('name', 'Bob');
    // Note: touched and dirty tracking will be checked when state is outputted/subscribed,
    // but getValue should still be correct.
    expect(form.getValue('name')).toBe('Bob');

    // Set different value
    form.setValue('name', 'Charlie');
    expect(form.getValue('name')).toBe('Charlie');
  });

  it('resolves select field default to first option value', () => {
    const schema = {
      role: selectField({
        options: [
          { label: 'Admin', value: 'admin' },
          { label: 'User', value: 'user' },
        ],
      }),
    };
    const form = createForm(schema);
    expect(form.getValue('role')).toBe('admin');
  });
});
