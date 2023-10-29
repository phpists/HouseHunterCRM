import styled from "styled-components";
import { Header } from "./Header/Header";
import { List } from "./List";
import { useEffect, useState } from "react";
import {
  useLazyGetAllObjectsQuery,
  useLazyGetObjectsCountQuery,
} from "../../store/objects/objects.api";
import { useActions } from "../../hooks/actions";

export const Objects = () => {
  const [getAllObjects] = useLazyGetAllObjectsQuery();
  const [getObjectsCount] = useLazyGetObjectsCountQuery();
  const { saveObjectsCount } = useActions();
  const [selected, setSelected] = useState([]);
  const [objects, setObjects] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSelect = (index) =>
    setSelected(
      !!selected.find((i) => i === index)
        ? selected.filter((i) => i !== index)
        : [...selected, index]
    );

  const handleGetObjectsCount = () => {
    getObjectsCount().then((resp) => saveObjectsCount(resp?.data?.count ?? 0));
  };

  const handleGetObjects = () =>
    getAllObjects({ only_favorite: isFavorite ?? undefined }).then((resp) =>
      setObjects(
        resp?.data ? Object.entries(resp?.data)?.map((obj) => obj[1]) : []
      )
    );

  useEffect(() => {
    handleGetObjects();
    handleGetObjectsCount();
  }, []);

  const handleToggleFavoritesStatus = () => {
    setObjects(
      objects.map((req) => {
        if (!!selected.find((s) => s === req[0])) {
          let request = [];
          request[0] = req[0];
          request[1] = { ...req[1], favorite: !req[1]?.favorite };
          return request;
        }
        return req;
      })
    );
    setSelected([]);
  };

  const handleDeleteSuccess = () => {
    setObjects(objects.filter((obj) => !selected.find((s) => s === obj.id)));
    setSelected([]);
    handleGetObjectsCount();
  };

  useEffect(() => {
    handleGetObjects();
  }, [isFavorite]);

  return (
    <StyledObjects>
      <Header
        selectedCount={selected.length}
        selected={selected}
        onFavorite={handleToggleFavoritesStatus}
        isFavorite={isFavorite}
        onIsFavotite={() => setIsFavorite(!isFavorite)}
        onDelete={handleDeleteSuccess}
      />
      <List selected={selected} onSelect={handleSelect} data={objects ?? []} />
    </StyledObjects>
  );
};

const StyledObjects = styled.div`
  padding: 15px 20px;
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  position: relative;
`;
