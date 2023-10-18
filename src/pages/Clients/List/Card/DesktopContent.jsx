import styled from "styled-components";
import { MainInfo } from "./MainInfo/MainInfo";
import { Phones } from "../../../../components/Phones/Phones";
import { Divider } from "./Divider";
import { PhoneInfo } from "./PhoneInfo";
import { Objects } from "./Objects/Objects";
import { Arrow } from "./Arrow";
import { Comment } from "../../../../components/Comment";
import { MoreButton } from "../../../../components/MoreButton/MoreButton";

export const DesktopContent = ({
  name,
  id,
  dateCreate,
  phones,
  requestsCount,
  objectsCount,
  comment,
}) => (
  <StyledDesktopContent className="flex items-center justify-between hide-scroll card">
    <MainInfo name={name} id={id} dateCreate={dateCreate} />
    <Phones phones={phones?.map(({ phone }) => phone)} />
    <Divider />
    <PhoneInfo phone={phones?.map(({ phone }) => phone)[0] ?? ""} name={name} />
    <Divider />
    <Comment comment={comment} />
    <Divider />
    <Objects requestsCount={requestsCount} objectsCount={objectsCount} />
    <div className="flex items-center">
      <MoreButton />
      <Arrow id={id} />
    </div>
  </StyledDesktopContent>
);

const StyledDesktopContent = styled.div`
  min-width: max-content;
  &:hover {
    .arrow svg {
      transform: rotate(0deg);
      opacity: 1;
    }
  }
  .more {
    opacity: 1;
    transform: translateX(0px);
  }
  @media (max-width: 1399.5px) {
    display: none;
  }
`;
