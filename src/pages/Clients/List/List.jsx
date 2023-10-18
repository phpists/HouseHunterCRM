import { styled } from "styled-components";
import { Card } from "./Card/Card";

export const List = ({ selected, onSelect, clients }) => {
  return (
    <StyledList className="hide-scroll">
      {clients.map(
        (
          {
            full_name,
            id,
            dt_add,
            phones,
            all_req,
            all_obj,
            comment,
            first_name,
            last_name,
          },
          i
        ) => (
          <Card
            key={i}
            selected={!!selected.find((s) => s === i)}
            onSelect={() => onSelect(i)}
            name={`${first_name} ${last_name}`}
            id={id}
            dateCreate={dt_add}
            phones={phones}
            requestsCount={all_req}
            objectsCount={all_obj}
            comment={comment}
          />
        )
      )}
    </StyledList>
  );
};

const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  overflow: auto;
  height: calc(100svh - 232px);
  grid-auto-rows: max-content;
  @media (max-width: 1400px) {
    height: calc(100svh - 302px + 68px);
  }
`;
