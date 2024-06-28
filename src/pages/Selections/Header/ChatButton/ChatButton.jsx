import styled from "styled-components";
import { ReactComponent as ChatIcon } from "../../../../assets/images/chat.svg";
import { useEffect, useState } from "react";
import { Chat } from "../../../../components/Chat/Chat";
import { useParams } from "react-router-dom";

export const ChatButton = ({ newMessege }) => {
  const { id } = useParams();
  const [active, setActive] = useState(false);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setIsNew(newMessege);
  }, [newMessege]);

  const handleOpen = () => {
    setIsNew(false);
    setActive(!active);
  };

  return (
    <>
      {active && <Chat onClose={() => setActive(false)} requestObjectId={id} />}
      <StyledChatButton onClick={handleOpen} active={active}>
        <ChatIcon className="chat-btn-icon" />
        {isNew === 1 ? (
          <div className="flex align-center justify-center">1</div>
        ) : null}
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
    active ? "#5D63FFB2" : "var(--btn-transparent-bg)"};
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
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
  div {
    position: absolute;
    top: -2px;
    right: -2px;
    border-radius: 100px;
    background: var(--active-bg);
    color: var(--element-inside-bg);
    leading-trim: both;
    text-edge: cap;
    font-family: Open Sans;
    font-size: 10px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 1.1;
    letter-spacing: 0.2px;
    padding: 2px;
    height: 14px;
    min-width: 14px;
  }
`;
