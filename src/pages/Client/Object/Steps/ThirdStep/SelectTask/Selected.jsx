import { styled } from "styled-components";
import { DateTag } from "../../TaskCard/DateTag";
import { MainInfo } from "../../TaskCard/MainInfo/MainInfo";
import { Price } from "../../TaskCard/Price";

export const Selected = () => (
  <StyledSelected className="w-full">
    <div className="flex items-center justify-between header">
      <DateTag />
      <Price />
    </div>
    <div className="flex items-center justify-between ">
      <MainInfo open={false} />
    </div>
  </StyledSelected>
);

const StyledSelected = styled.div`
  .header {
    margin-bottom: 22px;
  }
`;
