import { styled } from "styled-components";
import { Card } from "./Card/Card";
import { Empty } from "../../../components/Empty/Empty";
import { Loader } from "../../../components/Loader";
import { useEffect } from "react";

export const List = ({
  innerRef,
  data,
  loading,
  selectedParent,
  onSelectParent,
  onEdit,
  search,
}) => {
  useEffect(() => {
    if (innerRef) {
      innerRef.current.scrollTop = 0;
    }
  }, [selectedParent]);

  return (
    <>
      <StyledList ref={innerRef}>
        {data
          ?.filter((l) => l.id_parent === selectedParent)
          ?.filter(({ name, search_key_json }) =>
            search?.length > 0
              ? name.toLowerCase()?.includes(search?.toLowerCase()) ||
                search_key_json.toLowerCase()?.includes(search?.toLowerCase())
              : true
          )?.length === 0 ? (
          <Empty loading={loading} />
        ) : (
          data
            ?.filter((l) => l.id_parent === selectedParent)
            ?.filter(({ name, search_key_json }) =>
              search?.length > 0
                ? name.toLowerCase()?.includes(search?.toLowerCase()) ||
                  search_key_json.toLowerCase()?.includes(search?.toLowerCase())
                : true
            )
            ?.map(({ id, name, search_key_json, id_parent }) => (
              <Card
                key={id}
                name={name}
                keys={search_key_json}
                onSelect={
                  data?.find((l) => l.id_parent === id)
                    ? () => onSelectParent(id)
                    : undefined
                }
                onEdit={() => onEdit({ id, name, search_key_json, id_parent })}
              />
            ))
        )}
        <div className="loader relative">
          {loading && data?.length > 0 && (
            <div className="loading-more">
              <Loader white />
            </div>
          )}
        </div>
      </StyledList>
    </>
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
  @media (max-width: 500px) {
    height: calc(100svh - 302px + 98px);
  }
`;
