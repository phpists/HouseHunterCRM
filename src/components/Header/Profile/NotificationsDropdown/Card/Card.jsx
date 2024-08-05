import styled from "styled-components";
import { Header } from "./Header";
import { Divider } from "./Divider";
import { Message } from "./Message";
import React from "react";

export const Card = ({ type, messages, info, links, onClose }) => {
  return (
    <StyledCard>
      <Header type={type} info={info} onClose={onClose} />
      <Divider />
      {messages.map((msg, i) => (
        <React.Fragment key={i}>
          <Message message={msg} info={info} link={links?.[i] ?? links[0]} />
          {i < messages.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </StyledCard>
  );
};

const StyledCard = styled.div`
  border-radius: 9px;
  border: 1px solid var(--bg-10);
  background: var(--card-bg);
  padding-top: 8px;
`;
