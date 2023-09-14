import ReactInputMask from "react-input-mask";
import styled from "styled-components";

export const Input = ({ label, className, phone }) => {
  return (
    <StyledInput className={`${className}`}>
      <div className="label">{label}</div>
      {phone ? (
        <ReactInputMask mask="+38(999)999-99-99" />
      ) : (
        <input type="text" autoComplete="off" />
      )}
    </StyledInput>
  );
};

const StyledInput = styled.div`
  margin-bottom: 15px;
  .label {
    color: rgba(255, 255, 255, 0.6);
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
    background: #474747;
    padding: 10px;
    color: #fff;
    leading-trim: both;
    text-edge: cap;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: 120%;
    width: 100%;
  }
`;
