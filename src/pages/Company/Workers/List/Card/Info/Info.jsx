import { styled } from "styled-components";
import { Avatar } from "./Avatar";
import { Name } from "./Name";
import { Status } from "../../../../../../components/Status";
import { Subtitle } from "./Subtitle";

export const Info = ({ isSelected }) => (
  <StyledInfo className="flex items-center">
    <Avatar />
    <div>
      <div className="flex items-start">
        <Name isSelected={isSelected} />
        <Status status={2} />
      </div>
      <Subtitle />
    </div>
  </StyledInfo>
);

const StyledInfo = styled.div``;
