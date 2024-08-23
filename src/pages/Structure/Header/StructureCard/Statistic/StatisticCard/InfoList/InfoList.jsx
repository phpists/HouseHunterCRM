import styled from "styled-components";
import { InfoCard } from "./InfoCard";
import React from "react";
import { Divider } from "./Divider";

export const InfoList = ({ infoData }) => {
  return (
    <StyledInfoList>
      {infoData.map(({ title, value, link }, i) => (
        <React.Fragment key={i}>
          <InfoCard title={title} value={value} link={link} />
          {i < infoData.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </StyledInfoList>
  );
};

const StyledInfoList = styled.div``;
