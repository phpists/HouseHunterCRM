import styled from "styled-components";
import { InfoText } from "./InfoText";
import { Date } from "./Date";

export const InfoCard = () => (
  <StyledInfoCard className="flex items-center justify-between clickable">
    <InfoText />
    <Date />
  </StyledInfoCard>
);

const StyledInfoCard = styled.div`
  margin-bottom: 8px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.05);
  padding: 6px 10px;
`;
