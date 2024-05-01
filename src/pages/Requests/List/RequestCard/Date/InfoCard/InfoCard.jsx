import styled from "styled-components";
import { InfoText } from "./InfoText";
import { Date } from "./Date";

export const InfoCard = ({ category, date }) => (
  <StyledInfoCard className="flex items-center justify-between clickable">
    <InfoText category={category} />
    <Date date={date} />
  </StyledInfoCard>
);

const StyledInfoCard = styled.div`
  margin-bottom: 8px;
  border-radius: 9px;
  background: var(--card-bg-2);
  padding: 6px 10px;

  @media (min-width: 1550px) {
    flex-direction: row;
  }
`;
