import styled from "styled-components";
import { Title } from "./Title";
import { Description } from "./Description";
import { Status } from "./Status";
import { handleFormatDate } from "../../../../../../utilits";

export const Info = ({ publicateDate, status, title, rubricId }) => (
  <StyledInfo>
    <div>
      <Title title={title} />
      <Description rubricId={rubricId} />
    </div>
    <div>
      <Status status={status} />
      <Description
        text={`з ${handleFormatDate(Number(publicateDate) * 1000)}`}
      />
    </div>
  </StyledInfo>
);

const StyledInfo = styled.div`
  background: var(--dark-card-bg);
  padding: 10px;
  border-radius: 9px;
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 20px;
  width: 100%;
`;
