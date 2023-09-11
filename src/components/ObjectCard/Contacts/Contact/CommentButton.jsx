import styled from "styled-components";
import chatIcon from "../../../../assets/images/chat.svg";

export const CommentButton = ({ onClick, active }) => {
  return (
    <StyledCommentButton
      onClick={onClick}
      active={active}
      className="flex items-center justify-center"
    >
      <img src={chatIcon} alt="" />
    </StyledCommentButton>
  );
};

const StyledCommentButton = styled.button`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 9px;
  margin-right: 8px;
  background: ${({ active }) =>
    active ? "rgba(93, 99, 255, 0.70)" : "rgba(255, 255, 255, 0.18)"};
  transition: all 0.3s;
  &:hover {
    background: ${({ active }) =>
      active ? "#5D63FF" : "rgba(255, 255, 255, 0.38)"};
  }
  &:active {
    background: ${({ active }) =>
      active ? "#5D63FF" : "rgba(255, 255, 255, 0.60))"};
  }
  img {
    height: 16px;
    width: 16px;
  }
`;
