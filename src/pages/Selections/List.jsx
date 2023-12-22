import styled from "styled-components";
import { ObjectCard } from "../../components/ObjectCard/ObjectCard";
import { useGetAccessQuery } from "../../store/auth/auth.api";
import { handleCheckAccess } from "../../utilits";
import { Empty } from "../../components/Empty/Empty";

export const List = ({
  data,
  onFindSimilar,
  selected,
  onSelect,
  onHide,
  onFavorite,
}) => {
  const { data: accessData } = useGetAccessQuery();

  return (
    <StyledList className="hide-scroll">
      {data?.length === 0 ? (
        <Empty />
      ) : (
        data.map((d, i) => (
          <ObjectCard
            key={i}
            selected={!!selected.find((j) => j === d?.id)}
            onSelect={() => onSelect(d?.id)}
            data={d}
            onToggleFavoriteStatus={onFavorite ? () => onFavorite(d?.id) : null}
            onFindSimilar={() => onFindSimilar(d)}
            isEdit={handleCheckAccess(accessData, "objects", "edit")}
            onHide={() => onHide(d?.id)}
          />
        ))
      )}
    </StyledList>
  );
};

const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  height: calc(100svh - 225px);
  overflow: auto;
  gap: 10px;
  @media (max-width: 800px) {
    height: calc(100svh - 200px);
  }
`;
