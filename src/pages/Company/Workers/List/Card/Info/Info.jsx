import { styled } from "styled-components";
import { Avatar } from "./Avatar";
import { Name } from "./Name";
import { Status } from "../../../../../../components/Status";
import { Subtitle } from "./Subtitle";
import { Tag } from "./Tag";

export const Info = ({
  isSelected,
  name,
  photo,
  phone,
  level,
  namePermision,
}) => (
  <StyledInfo className="flex items-center">
    <Avatar photo={photo} level={level} />
    <div className="flex flex-col items-start">
      <div className="flex items-start">
        <Name isSelected={isSelected} name={name} />
        {/* <Status status={2} /> */}
      </div>
      <Tag level={level} namePermision={namePermision} />
      <Subtitle phone={phone} />
    </div>
  </StyledInfo>
);

const StyledInfo = styled.div`
  @media (max-width: 800px) {
    width: 100%;
  }
`;
