import ReactInputMask from "react-input-mask";
import styled from "styled-components";

export const Input = ({ label, className, phone, value, onChange, error }) => (
  <StyledInput className={`${className}`} error={error?.toString()}>
    <div className="label">{label}</div>
    {phone ? (
      <ReactInputMask
        mask="+38(999)999-99-99"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    ) : (
      <input
        type="text"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    )}
  </StyledInput>
);

const StyledInput = styled.div`
  margin-bottom: 15px;
  .label {
    color: var(--white-color);
    text-align: center;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: 120%;
    margin-bottom: 4px;
    text-align: left;
  }
  input {
    border-radius: 6px;
    background: var(--second-bg);
    padding: 10px;
    color: ${({ error }) => (error === "true" ? "#ff2e2e" : "var(--color-2)")};

    leading-trim: both;
    text-edge: cap;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: 120%;
    width: 100%;
    transition: all 0.3s;
    ${({ error }) => error === "true" && "border: 1px solid #ff2e2e;"}
  }
`;
