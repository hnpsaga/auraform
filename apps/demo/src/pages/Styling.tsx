import {
  useForm,
  FormRenderer,
  textField,
  emailField,
  passwordField,
  required,
  email,
  min,
} from '@hnpsaga/makeform';

const schema = {
  fullName: textField({
    label: 'Full Name',
    validators: [required()],
  }),
  emailAddress: emailField({
    label: 'Email Address',
    validators: [required(), email()],
  }),
  password: passwordField({
    label: 'Password',
    validators: [required(), min(8)],
  }),
};

const customClasses = {
  form: 'styling-custom-form',
  grid: 'styling-custom-grid',
  field: 'styling-custom-field',
  label: 'styling-custom-label',
  input: 'styling-custom-input',
  error: 'styling-custom-error',
};

const tailwindClasses = {
  form: 'styling-tw-form',
  grid: 'styling-tw-grid',
  field: 'styling-tw-field',
  label: 'styling-tw-label',
  input: 'styling-tw-input',
  error: 'styling-tw-error',
};

function ExampleDefault() {
  const form = useForm(schema);
  return (
    <div>
      <h3>Example A: Default Theme</h3>
      <p>MakeForm out-of-the-box appearance. No classNames overrides.</p>
      <FormRenderer form={form} schema={schema} />
    </div>
  );
}

function ExampleCustom() {
  const form = useForm(schema);
  return (
    <div>
      <h3>Example B: Custom classNames</h3>
      <p>Custom CSS classes applied to form elements. Default styles are preserved.</p>
      <FormRenderer form={form} schema={schema} classNames={customClasses} />
    </div>
  );
}

function ExampleTailwind() {
  const form = useForm(schema);
  return (
    <div>
      <h3>Example C: Utility-Style Customization</h3>
      <p>Customization using utility-like CSS classes through the classNames API.</p>
      <FormRenderer form={form} schema={schema} classNames={tailwindClasses} />
    </div>
  );
}

export default function Styling() {
  return (
    <div>
      <h1>Styling Showcase</h1>
      <p>
        MakeForm provides a default theme and two customization paths: <strong>classNames</strong>{' '}
        for cosmetic changes and <strong>renderer overrides</strong> for full UI replacement.
      </p>

      <style>{`
        .styling-custom-form {
          border: 2px solid #6366f1;
          border-radius: 0.5rem;
          padding: 1.5rem;
          background: #faf5ff;
        }
        .styling-custom-grid {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .styling-custom-field {
          padding: 0.5rem;
          border-left: 3px solid #6366f1;
        }
        .styling-custom-label {
          color: #4f46e5;
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .styling-custom-input {
          border: 2px solid #c4b5fd;
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          background: #fff;
          transition: border-color 0.2s;
        }
        .styling-custom-input:focus {
          border-color: #6366f1;
          outline: none;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }
        .styling-custom-error {
          color: #dc2626;
          font-size: 0.8rem;
          font-weight: 500;
          border-left: 3px solid #dc2626;
          padding-left: 0.5rem;
        }

        .styling-tw-form {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 0.75rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .styling-tw-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .styling-tw-field {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .styling-tw-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #334155;
        }
        .styling-tw-input {
          border: 1px solid #cbd5e1;
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .styling-tw-input:focus {
          border-color: #6366f1;
          outline: none;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }
        .styling-tw-error {
          color: #dc2626;
          font-size: 0.75rem;
          margin-top: 0.25rem;
        }
      `}</style>

      <section style={{ marginBottom: '2.5rem' }}>
        <ExampleDefault />
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <ExampleCustom />
      </section>

      <section style={{ marginBottom: '2.5rem' }}>
        <ExampleTailwind />
      </section>
    </div>
  );
}
