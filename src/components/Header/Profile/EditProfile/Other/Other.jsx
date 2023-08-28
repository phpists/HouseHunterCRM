import { styled } from "styled-components";
import { Section } from "../Section";
import { BusyStatus } from "./BusyStatus";
import { Job } from "./Job/Job";

export const Other = () => (
  <StyledOther>
    <Section>
      <div className="fields">
        <BusyStatus />
        <div className="divider" />
        <Job />
      </div>
    </Section>
  </StyledOther>
);

const StyledOther = styled.div`
  width: 100%;
  .divider {
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    margin: 6px 0;
  }
`;
