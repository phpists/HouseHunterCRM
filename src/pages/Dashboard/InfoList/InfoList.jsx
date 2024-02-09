import React from "react";
import styled from "styled-components";
import { Item } from "./Item";
import { Divider } from "./Divider";

export const InfoList = ({ items }) => (
  <StyledInfoList className="hide-scroll">
    {items.map(({ title, value }, i) => (
      <React.Fragment key={i}>
        <Item title={title} value={value} />
        {i < items.length - 1 && <Divider />}
      </React.Fragment>
    ))}
  </StyledInfoList>
);

const StyledInfoList = styled.div`
  margin-top: 20px;
  max-height: 45px;
  overflow: auto;
`;
