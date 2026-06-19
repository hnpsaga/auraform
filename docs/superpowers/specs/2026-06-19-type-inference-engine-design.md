# Design Document: MakeForm V1 – Phase 3 Type Inference Engine

## Objectives

The goal of Phase 3 is to implement type inference in the `makeform` library, allowing consumers to derive form values directly from schema definitions.

Target usage:

```ts
const schema = {
  name: textField(),
  age: numberField(),
  subscribed: checkboxField(),
};

type FormValues = InferValues<typeof schema>;
// Expected: { name: string; age: number; subscribed: boolean; }
```

Additionally, `selectField` options should automatically infer literal union types (e.g. `"admin" | "user"`) without requiring developers to declare options `as const`.

---

## Architecture and Design

We use a unified approach where all fields extend `BaseField<TValue>`. This keeps type inference simple, extensible, and clean.

### Inference Strategy

By defining:

```ts
export type InferField<TField> = TField extends BaseField<infer TValue> ? TValue : never;
```

any field implementing `BaseField<TValue>` automatically maps to its value type `TValue`.

For `selectField`, we make the builder and field types generic on `TValue extends string`. Using TypeScript 5.0's `const` modifier on the type parameter allows automatic literal inference:

```ts
export function selectField<const TValue extends string>(
  config: SelectFieldConfig<TValue>,
): SelectField<TValue>;
```

---

## Detailed File Changes

### 1. `src/types/field.ts`

- Update `SelectOption` to accept `TValue extends string`.
- Update `SelectField` to accept `TValue extends string`.

### 2. `src/fields/select.ts`

- Make `SelectFieldConfig` accept `TValue extends string`.
- Update `selectField` function signature with `const TValue extends string` type parameter.

### 3. `src/types/inference.ts` (New File)

- Implement `InferField<TField>` using conditional inference.
- Implement `InferValues<TSchema>` using mapped types.

### 4. `src/types/index.ts`

- Export everything from `./inference.js`.

---

## Testing Strategy

We will verify implementation correctness using Vitest's `expectTypeOf()` assertions inside type test files:

- Individual field inference check.
- Select literal union inference check.
- Multi-field schema inference check.
- Stability with large/growing schemas.
