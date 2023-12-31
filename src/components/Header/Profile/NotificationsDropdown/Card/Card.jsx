import styled from "styled-components";
import { Header } from "./Header";
import { Divider } from "./Divider";
import { Message } from "./Message";
import React from "react";

export const Card = ({ type, messages }) => {
  return (
    <StyledCard>
      <Header type={type} />
      <Divider />
      {messages.map((msg, i) => (
        <React.Fragment key={i}>
          <Message message={msg} />
          {i < messages.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </StyledCard>
  );
};

const StyledCard = styled.div`
  border-radius: 9px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #3d3d3d;
  padding-top: 8px;
`;
