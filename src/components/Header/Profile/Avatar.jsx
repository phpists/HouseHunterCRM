import { styled } from "styled-components";
import avatarIcon from "../../../assets/images/small-avatar-green.svg";
import { useAppSelect } from "../../../hooks/redux";

export const Avatar = () => {
  const { user } = useAppSelect((state) => state.auth);

  return (
    <StyledAvatar
      avatarIcon={user?.photo?.length > 0 ? user?.photo : avatarIcon}
      className="clickable"
    />
  );
};

const StyledAvatar = styled.div`
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 10px;
  background: url(${({ avatarIcon }) => avatarIcon}) center/cover no-repeat;
`;
