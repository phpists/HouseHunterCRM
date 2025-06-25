import { styled } from "styled-components";
import { Ranger } from "../Ranger/Ranger";

export const VolumeEngine = ({ values, onChange, error, label, max = 100 }) => {
  return (
    <StyledPrice
      error={error?.toString()}
      className={`${error && "error-field"}`}
    >
      <Ranger
        label={label}
        max={max}
        values={values}
        onChange={onChange}
        noRange
      />
    </StyledPrice>
  );
};

const StyledPrice = styled.div`
  border-radius: 9px;
  ${({ error }) => error === "true" && "border: 1px solid red;"}
`;
