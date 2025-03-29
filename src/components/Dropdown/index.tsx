import "./index.css";

interface Props {
  value: string;
  onChange: any;
  labelText: string;
  name?: string;
  setValue?: string;
  setOption?: string;
  placeholder: string;
  errorMsg?: any;
  required?: boolean;
  onBlur?: any;
  data: Array<any>;
  disabled?: boolean;
  sm?: boolean;
}

export const Dropdown = ({
  value,
  onChange,
  labelText,
  name,
  setValue = "value",
  setOption = "name",
  placeholder,
  errorMsg,
  required = false,
  onBlur,
  data,
  disabled = false,
  sm = false,
}: Props) => {
  return (
    <div className="dropdown-container">
      <label className={`input-label ${sm ? "input-label-sm" : ""}`}>
        {labelText}
        {required ? <span style={{ color: "red" }}>*</span> : null}
      </label>
      <select
        disabled={disabled}
        value={value || placeholder}
        className={`dropdown-input ${sm ? "dropdown-input-sm" : ""}`}
        onChange={onChange}
        name={name}
        onBlur={onBlur}
      >
        <option value={placeholder} disabled>
          {placeholder}
        </option>
        {data?.map((each, index) => (
          <option key={index} value={each[setValue]}>
            {each[setOption]}
          </option>
        ))}
      </select>
      {errorMsg && <p className="input-field-error-msg">{errorMsg}</p>}
    </div>
  );
};
