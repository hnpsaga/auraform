export default function Features() {
  return (
    <div>
      <h1>Features</h1>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Type Inference</h2>
        <p>
          MakeForm infers TypeScript types directly from your schema. No manual interfaces required.
          Use <code>InferValues&lt;typeof schema&gt;</code> to get the form value type.
        </p>
      </section>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Validation</h2>
        <p>
          Built-in validators include <code>required</code>, <code>min</code>, <code>max</code>,{' '}
          <code>pattern</code>, <code>email</code>, <code>phone</code>, and <code>custom</code>.
          Validators are pure functions that return an error message string or null.
        </p>
      </section>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Dynamic Rendering</h2>
        <p>
          Use <code>FormRenderer</code> to render a complete form directly from a schema. Supported
          types include text, textarea, email, phone, number, date, checkbox, radio, select,
          multi-select, and custom fields.
        </p>
      </section>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Renderer Overrides</h2>
        <p>
          Replace any built-in field renderer with a custom component via the <code>renderers</code>{' '}
          prop on <code>FormRenderer</code>. Useful for integrating with design systems or component
          libraries.
        </p>
      </section>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Custom Renderers</h2>
        <p>
          Create entirely new field types using <code>customField</code> combined with{' '}
          <code>renderers.custom</code>. Custom renderers participate in validation, state
          management, and submission automatically.
        </p>
      </section>

      <section style={{ marginBottom: '1.5rem' }}>
        <h2>Styling Overrides</h2>
        <p>
          Customize styling without replacing renderers using the <code>classNames</code> prop.
          Default classes are preserved and custom classes are appended. Supports any CSS framework
          including Tailwind and Bootstrap.
        </p>
      </section>
    </div>
  );
}
