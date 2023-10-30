import { styled } from "styled-components";
import { StatusButton } from "./StatusButton";
import { StatusData } from "./StatusData";

export const Header = ({ className, data, onChangeField }) => {
  return (
    <StyledHeader className={`flex items-center ${className}`}>
      <StatusButton
        type="actual"
        active={data?.obj_is_actual === "1"}
        onChange={() => onChangeField("obj_is_actual", "1")}
      />
      <StatusData
        value={data?.obj_is_actual_dt}
        onChange={(val) => onChangeField("obj_is_actual_dt", val)}
      />
      <StatusButton
        type="not_actual"
        active={data?.obj_is_actual === "0"}
        onChange={() => onChangeField("obj_is_actual", "0")}
      />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 13px;
`;
