import styled from "styled-components";
import { Modal } from "../../../../components/Modal/Modal";
import { MapComponent } from "./MapComponent";
import { useState } from "react";
import { Button } from "../../../../components/Button";
import axios from "axios";

export const MapModal = ({ onClose, onSuccess }) => {
  const [polygon, setPolygon] = useState(null);
  const [loading, setLoading] = useState(false);

  const getStreetsInPolygon = async (polygon) => {
    try {
      // Створюємо рядок з координатами полігону
      const polygonString = polygon
        .map((coord) => `${coord?.lat} ${coord?.lng}`)
        .join(" ");

      // Створюємо запит до Overpass API
      const query = `[out:json][timeout:25]; ( way[highway](poly:"${polygonString}"); ); out;`;
      const response = await axios.get(
        `https://overpass-api.de/api/interpreter?data=${query}`
      );

      // Отримуємо вулиці з відповіді
      const streets = response.data.elements
        .filter((element) => element.type === "way" && element.tags.highway)
        .map((element) => element.tags.name);

      return streets;
    } catch (error) {
      console.error("Помилка:", error);
      return [];
    }
  };

  const handleChangePolygon = (val) => {
    setPolygon(val);
  };

  const handleSubmit = () => {
    setLoading(true);
    getStreetsInPolygon(polygon?.[0]).then((streets) => {
      setLoading(false);
      const streetsFiltered = streets
        ?.filter((str) => str)
        ?.map((str) => str?.replace("вулиця", ""));
      onSuccess(streetsFiltered ?? []);
      onClose();
    });
  };

  return (
    <StyledMapModal>
      <Modal onClose={onClose} title="Карта">
        <MapComponent polygon={polygon} onChangePolygon={handleChangePolygon} />
        <Button
          title="Підтвердити"
          disabled={!polygon}
          className="submmit-btn"
          onClick={handleSubmit}
          loading={loading}
        />
      </Modal>
    </StyledMapModal>
  );
};

const StyledMapModal = styled.div`
  .modal {
    width: 100vw;
    max-width: 800px;
  }
  .submmit-btn {
    width: 100%;
    margin-top: 20px;
  }
`;
