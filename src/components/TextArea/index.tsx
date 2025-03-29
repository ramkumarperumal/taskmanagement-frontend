interface Props {
  value: string;
  onChange: any;
  labelText: string;
  name: string;
  placeholder: string;
  errorMsg?: any;
  required?: boolean;
  onBlur?: any;
  customClass?: string;
  rows?: number;
}

export const Textarea = ({
  value,
  onChange,
  labelText,
  name,
  placeholder,
  errorMsg,
  required,
  onBlur,
  rows = 10,
  customClass = "",
}: Props) => {
  return (
    <div className={`input-container ${customClass}`}>
      <label className="input-label">
        {labelText}
        {required ? <span className="label-required">*</span> : null}
      </label>
      <textarea
        onChange={onChange}
        rows={rows}
        name={name}
        placeholder={placeholder}
        onBlur={onBlur}
        value={value}
      />
      {errorMsg && <p className="input-field-error-msg">{errorMsg}</p>}
    </div>
  );
};
