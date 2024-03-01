import { styled } from "styled-components";
import empty from "../../../../../../assets/images/small-avatar-green.svg";
import { handleGetRoleAvatar } from "../../../../../../utilits";
import { useInView } from "react-intersection-observer";

export const Avatar = ({ photo, level }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <StyledAvatar
      avataricon={
        !inView ? "" : photo?.length > 0 ? photo : handleGetRoleAvatar(level)
      }
      ref={ref}
    />
  );
};

const StyledAvatar = styled.div`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 8px;
  background: url(${({ avataricon }) => avataricon}) center/cover no-repeat;
  margin-right: 12px;
`;
