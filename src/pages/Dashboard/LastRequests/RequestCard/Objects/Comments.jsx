import styled from "styled-components";
import chatIcon from "../../../../../assets/images/chat.svg";

export const Comments = ({ onOpenChat, isNew }) => (
  <StyledComments
    className="flex items-center justify-center"
    onClick={onOpenChat}
  >
    <img src={chatIcon} alt="" />
    {isNew ? <div className="flex align-center justify-center">1</div> : null}
  </StyledComments>
);

const StyledComments = styled.button`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 9px;
  background: rgba(93, 99, 255, 0.7);
  transition: all 0.3s;
  position: relative;
  div {
    position: absolute;
    top: -2px;
    right: -2px;
    border-radius: 100px;
    background: #fff;
    color: #363636;
    leading-trim: both;
    text-edge: cap;
    font-family: Open Sans;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: 0.2px;
    padding: 2px;
    height: 14px;
    min-width: 14px;
  }
  img {
    height: 17px;
  }
  &:hover {
    background: #5d63ff;
  }
`;
