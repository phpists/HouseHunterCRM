import styled from "styled-components";
import { DesktopContent } from "./DesktopContent";
import { MobileContent } from "./MobileContent";

export const RequestCard = ({
  selected,
  onSelect,
  data,
  id,
  onDelete,
  onFavorite,
  isEdit,
  isDelete,
  onOpenChat,
}) => {
  const handleClick = (e) =>
    e.target.classList.contains("clickable") && onSelect();

  return (
    <StyledRequestCard
      selected={selected}
      onClick={handleClick}
      className="clickable"
    >
      <DesktopContent
        data={data}
        id={id}
        onDelete={onDelete}
        onFavorite={onFavorite}
        isEdit={isEdit}
        isDelete={isDelete}
        onOpenChat={onOpenChat}
      />
      <MobileContent
        data={data}
        id={id}
        onDelete={onDelete}
        onFavorite={onFavorite}
        isEdit={isEdit}
        isDelete={isDelete}
        onOpenChat={onOpenChat}
      />
    </StyledRequestCard>
  );
};

const StyledRequestCard = styled.div`
  border-radius: 10px;
  background: #3d3d3d;
  padding: 10px;
  justify-content: space-between;
  border: 1px solid transparent;
  ${({ selected }) => selected && "border: 1px solid #fff;"}
  cursor: pointer;
  .value {
    white-space: unset;
  }
`;
