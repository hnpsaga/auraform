import { useState } from 'react';
import { useForm, FormRenderer, textField, emailField, required, email } from '@hnpsaga/makeform';

const schema = {
  name: textField({
    label: 'Name',
    validators: [required()],
  }),

  email: emailField({
    label: 'Email',
    validators: [required(), email()],
  }),
};

export default function SubmissionDemo() {
  const form = useForm(schema);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = form.handleSubmit((values) => {
    setMessage(`Form submitted successfully! Values: ${JSON.stringify(values)}`);
  });

  return (
    <div>
      <h1>Submission Demo</h1>
      <p>
        Demonstrates <code>form.handleSubmit()</code>. Invalid submissions are blocked and all
        fields are marked as touched.
      </p>

      <FormRenderer form={form} schema={schema} />

      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: '0.5rem 1.5rem',
            background: '#6366f1',
            color: '#fff',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
        <button
          onClick={() => {
            form.reset();
            setMessage(null);
          }}
          style={{
            padding: '0.5rem 1.5rem',
            background: '#6b7280',
            color: '#fff',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
        <button
          onClick={() => form.markAllTouched()}
          style={{
            padding: '0.5rem 1.5rem',
            background: '#d97706',
            color: '#fff',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
          }}
        >
          Mark All Touched
        </button>
      </div>

      {message && (
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: '#d1fae5',
            border: '1px solid #6ee7b7',
            borderRadius: '0.375rem',
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
