import { styled } from "styled-components";
import { StatusButton } from "./StatusButton";
import { StatusData } from "./StatusData";
import { MlsButton } from "./MlsButton";
import { useEffect } from "react";

export const Header = ({ className, data, onChangeField }) => {
  useEffect(() => {
    if (data?.obj_is_actual === "0") {
      onChangeField("msl", "0");
    }
  }, [data?.obj_is_actual]);

  return (
    <StyledHeader className={`flex items-center ${className}`}>
      <div className="active-wrapper">
        <StatusButton
          type="actual"
          active={data?.obj_is_actual === "1"}
          onChange={() => onChangeField("obj_is_actual", "1")}
        />
        {data?.obj_is_actual === "1" ? (
          <MlsButton
            value={data?.mls === "1"}
            onChange={() => onChangeField("mls", data?.mls === "1" ? "0" : "1")}
          />
        ) : null}
      </div>
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
  .active-wrapper {
    display: grid;
    grid-template-columns: 1fr max-content;
  }
  @media (max-width: 550px) {
    grid-template-columns: 1fr !important;
    gap: 10px;
  }
`;
