import styled from "styled-components";
import { Tag } from "../../Info/Header/Tag";

export const Status = () => (
  <StyledStatus>
    <Tag title="Статус" color="green" />
    <div className="date">з 05.06.2024</div>
  </StyledStatus>
);

const StyledStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--second-bg);
  padding: 10px;
  border-radius: 6px;
  gap: 5px;
  .clickable {
    width: max-content;
  }
  .date {
    margin-top: 5px;
    color: var(--main-color);
    font-family: Overpass;
    font-size: 12px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%;
    letter-spacing: 0.24px;
    opacity: 0.4;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 170px;
    overflow: hidden;
  }
`;
