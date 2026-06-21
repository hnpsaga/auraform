import {
  useForm,
  FormRenderer,
  textField,
  selectField,
  checkboxField,
  required,
} from '@hnpsaga/makeform';
import type {
  PrimitiveFieldRendererProps,
  CheckboxRendererProps,
  SelectRendererProps,
} from '@hnpsaga/makeform';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const schema = {
  name: textField({
    label: 'Full Name',
    validators: [required()],
  }),
  country: selectField({
    label: 'Country',
    options: [
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'United Kingdom', value: 'uk' },
      { label: 'India', value: 'in' },
    ],
  }),
  acceptTerms: checkboxField({
    label: 'I accept the terms and conditions',
    validators: [required()],
  }),
};

function MuiTextRenderer({
  id,
  name,
  value,
  onChange,
  className,
}: PrimitiveFieldRendererProps<string>) {
  return (
    <TextField
      id={id}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      label={name}
      variant="outlined"
      size="small"
      fullWidth
    />
  );
}

function MuiSelectRenderer({ id, name, value, options, onChange, className }: SelectRendererProps) {
  return (
    <FormControl fullWidth size="small" className={className}>
      <InputLabel id={`${id}-label`}>{name}</InputLabel>
      <Select
        labelId={`${id}-label`}
        id={id}
        name={name}
        value={value}
        label={name}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function MuiCheckboxRenderer({ id, name, checked, onChange, className }: CheckboxRendererProps) {
  return (
    <FormControlLabel
      className={className}
      control={
        <Checkbox
          id={id}
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
      }
      label={name}
    />
  );
}

const renderers = {
  text: MuiTextRenderer,
  select: MuiSelectRenderer,
  checkbox: MuiCheckboxRenderer,
};

export default function MuiDemo() {
  const form = useForm(schema);

  const handleSubmit = form.handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2));
  });

  return (
    <div>
      <h1>Material UI Integration</h1>
      <p>
        MakeForm works with third-party UI libraries through its renderer override system. This page
        demonstrates Material UI components (TextField, Select, Checkbox) integrated as MakeForm
        field renderers. State management, validation, and submission are handled by MakeForm.
      </p>

      <section
        style={{
          maxWidth: '32rem',
          padding: '1.5rem',
          border: '1px solid #e0e0e0',
          borderRadius: '0.5rem',
        }}
      >
        <FormRenderer form={form} schema={schema} renderers={renderers} />

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleSubmit}
            style={{
              padding: '0.5rem 1.5rem',
              background: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Submit
          </button>
          <button
            onClick={() => form.reset()}
            style={{
              padding: '0.5rem 1.5rem',
              background: '#6b7280',
              color: '#fff',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
        </div>
      </section>

      <div
        style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: '#f3f4f6',
          borderRadius: '0.375rem',
        }}
      >
        <h3>Current Form State</h3>
        <pre style={{ margin: 0 }}>{JSON.stringify(form.getState(), null, 2)}</pre>
      </div>
    </div>
  );
}
