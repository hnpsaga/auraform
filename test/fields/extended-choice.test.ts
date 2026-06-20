import { describe, expect, test } from 'vitest';
import { radioField, multiSelectField } from '../../src/index.js';

describe('extended choice field builders', () => {
  test('radioField sets correct type and accepts options', () => {
    const field = radioField({
      label: 'Gender',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ],
    });
    expect(field.type).toBe('radio');
    expect(field.options).toHaveLength(2);
    expect(field.options[0]?.value).toBe('male');
  });

  test('multiSelectField sets correct type and accepts options', () => {
    const field = multiSelectField({
      label: 'Skills',
      options: [
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
      ],
    });
    expect(field.type).toBe('multi-select');
    expect(field.options).toHaveLength(2);
  });
});
