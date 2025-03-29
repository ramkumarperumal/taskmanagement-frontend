import "./index.css";

interface Props {
  value: string;
  onChange: any;
  label: string;
  name: string;
  placeholder: string;
  type: string;
  errormsg: any;
  required?: boolean;
  onBlur: any;
  disabled?: boolean;
}

export const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type,
  onBlur,
  name,
  errormsg,
  required = false,
  disabled = false,
}: Props) => {
  return (
    <>
      <div className="input-container">
        <label className="input-label">
          {label}
          {required ? <span className="label-required">*</span> : null}
        </label>
        <input
          className="input-field"
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          onBlur={onBlur}
          placeholder={placeholder}
          type={type}
        />
        {errormsg && <p className="input-field-error-msg">{errormsg}</p>}
      </div>
    </>
  );
};
