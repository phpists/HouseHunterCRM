import styled from "styled-components";
import { ReactComponent as ChatIcon } from "../../../../assets/images/chat.svg";
import { useState } from "react";
import { Chat } from "../../../../components/Chat/Chat";
import { useParams } from "react-router-dom";

export const ChatButton = () => {
  const { id } = useParams();
  const [active, setActive] = useState(false);

  return (
    <>
      {active && <Chat onClose={() => setActive(false)} requestObjectId={id} />}
      <StyledChatButton onClick={() => setActive(!active)} active={active}>
        <ChatIcon className="chat-btn-icon" />
      </StyledChatButton>
    </>
  );
};

const StyledChatButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  background: ${({ active }) =>
    active ? "#5D63FFB2" : "rgba(255, 255, 255, 0.18)"};
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: ${({ active }) =>
      active ? "#5D63FF" : "rgba(255, 255, 255, 0.38)"};
  }
  &:active {
    background: ${({ active }) =>
      active ? "#5D63FF" : "rgba(255, 255, 255, 0.60)"};
  }
  .chat-btn-icon {
    width: 16.842px;
    height: 16.842px;
  }
`;
