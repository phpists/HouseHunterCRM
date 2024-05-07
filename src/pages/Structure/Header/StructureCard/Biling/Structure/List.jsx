import { styled } from "styled-components";
import { Avatar } from "./Avatar";
import empty from "../../../../../../assets/images/small-avatar-green.svg";
import { handleGetRoleAvatar } from "../../../../../../utilits";
import { MoreButton } from "./MoreButton";

export const List = ({ photos, level }) => (
  <StyledList className="flex items-center" count={photos.length}>
    {photos.slice(0, 5).map((photo, i) => (
      <Avatar
        key={i}
        photo={photo?.length > 0 ? photo : handleGetRoleAvatar(level)}
        zIndex={i - photos.length * -1}
      />
    ))}
    {photos?.length > 5 ? (
      <MoreButton
        count={photos.slice(5)?.length}
        zIndex={photos?.length * 10}
      />
    ) : null}
  </StyledList>
);

const StyledList = styled.div`
  border-radius: 20px;
  background: var(--bg-33);
  padding: 4px;
  width: 98px;
  overflow: hidden;
  flex-shrink: 0;
  div:not(:first-child) {
    margin-left: -22.6px;
  }
  @media (max-width: 850px) {
    width: 100%;
    flex-shrink: 1;
  }
`;
