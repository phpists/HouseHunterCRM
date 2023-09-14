import styled from "styled-components";
import { Client } from "./Client/Client";
import { Date } from "./Date/Date";
import { Info } from "./Info/Info";
import { Comment } from "./Comment";
import { Objects } from "./Objects/Objects";
import { Actions } from "./Actions/Actions";

export const RequestCard = ({ selected, onSelect }) => {
  const handleClick = (e) =>
    e.target.classList.contains("clickable") && onSelect();

  return (
    <StyledRequestCard
      selected={selected}
      onClick={handleClick}
      className="clickable"
    >
      <Client />
      <Date />
      <Info />
      <Comment />
      <Objects />
      <Actions />
    </StyledRequestCard>
  );
};

const StyledRequestCard = styled.div`
  display: grid;
  grid-template-columns: repeat(6, max-content);
  gap: 14px;
  border-radius: 10px;
  background: #3d3d3d;
  padding: 10px;
  justify-content: space-between;
  border: 1px solid transparent;
  ${({ selected }) => selected && "border: 1px solid #fff;"}
  cursor: pointer
`;
