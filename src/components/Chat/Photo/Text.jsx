import { styled } from "styled-components";
import { MessageFooter } from "../MessageFooter";

export const Text = ({ text, isOwner, date, isSelected }) => (
  <StyledText isOwner={isOwner}>
    <div>{text}</div>
    <MessageFooter date={date} isOwner={!!isOwner} isSelected={isSelected} />
  </StyledText>
);

const StyledText = styled.div`
  color: #fff;
  font-size: 15px;
  font-weight: 400;
  line-height: 118%;
  letter-spacing: 0.3px;
  padding: 8px 11px 5px;
  background: ${({ isOwner }) => (isOwner ? "#5D63FF" : "#5c5c5c")};
  border-radius: 13px;
  &::before {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    ${({ isOwner }) => (isOwner ? "right: -12.3px;" : "left: -12.3px;")}
    width: 0;
    height: 0;
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    border-bottom: 13px solid
      ${({ isOwner }) => (isOwner ? "#5D63FF" : "#5c5c5c")};
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0px;
    ${({ isOwner }) => (isOwner ? "right: -24px;" : "left: -24px;")}
    height: 26px;
    width: 24px;
    border-radius: 100%;
    z-index: 100;
    background: ${({ isOwner }) => (isOwner ? "#5D63FF" : "var(--chat-bg)")};
  }
`;
