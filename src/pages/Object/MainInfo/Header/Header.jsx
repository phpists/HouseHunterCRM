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
          active={
            data?.obj_is_actual === "1" &&
            (data?.dt_end_agreement === "0" || !data?.dt_end_agreement)
          }
          onChange={() => onChangeField("obj_is_actual", "1")}
        />
        <MlsButton
          data={data}
          visible={
            data?.obj_is_actual === "1" &&
            (data?.dt_end_agreement === "0" || !data?.dt_end_agreement)
          }
          value={
            data?.mls === "1" &&
            (data?.dt_end_agreement === "0" || !data?.dt_end_agreement)
          }
          onChange={() => onChangeField("mls", data?.mls === "1" ? "0" : "1")}
        />
      </div>
      <StatusData
        value={
          data?.dt_end_agreement === "0" ? undefined : data?.dt_end_agreement
        }
        onChange={(val) => onChangeField("dt_end_agreement", val)}
      />
      <StatusButton
        type="not_actual"
        active={
          data?.obj_is_actual === "0" &&
          (data?.dt_end_agreement === "0" || !data?.dt_end_agreement)
        }
        onChange={() => onChangeField("obj_is_actual", "0")}
      />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  margin-bottom: 13px;
  .active-wrapper {
    display: grid;
    grid-template-columns: max-content max-content;
  }
  @media (max-width: 550px) {
    grid-template-columns: 1fr !important;
    gap: 10px;
  }
  @media (max-width: 1300px) {
    .active-wrapper {
      display: grid;
      grid-template-columns: 1fr max-content;
    }
  }
`;
