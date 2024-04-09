import { useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useAppSelect } from "../../hooks/redux";
import { useEffect } from "react";

export const Subtitle = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { clientsCount } = useAppSelect((state) => state.clients);
  const { requestsCount } = useAppSelect((state) => state.requests);
  const { objectsCount } = useAppSelect((state) => state.objects);
  const { callsCount } = useAppSelect((state) => state.calls);
  const { selectionsCount } = useAppSelect((state) => state.selections);
  const { workersCount } = useAppSelect((state) => state.structure);
  const { workersCount: companyWorkers } = useAppSelect(
    (state) => state.billing
  );

  const handleGetEnding = (val) => (val > 0 && val < 8 ? "а" : "ів");

  const handleGetSubtitle = () => {
    switch (pathname) {
      case "/":
        return "Що нового трапилося за сьогодні";
      case "/clients":
        return `Всього ${clientsCount} клієнт${handleGetEnding(clientsCount)}`;
      case "/requests":
        return `${requestsCount} запит${handleGetEnding(requestsCount)}`;
      case "/objects":
        return `${objectsCount ?? "0"} об'єктів`;
      case "/note":
        return "345 нових об'єктів із трьох темплейтів";
      case "/calendar":
        return "Перегляд об'єкту через 40 хвилин";
      case "/structure":
        return `Всього ${workersCount ?? 0} агентів`;
      case "/company":
        return `${companyWorkers} працівників`;
      case "/request":
        return "Запит об'єкта";
      case "/calls":
        return `Всього ${callsCount} дзвінків`;
      default:
        return pathname.split("/")[1] === "client"
          ? "Створенний  03.10.2022  13:19"
          : pathname.split("/")[1] === "create-request"
          ? "Створення запиту"
          : pathname.split("/")[1] === "edit-request"
          ? `Редагування запиту`
          : pathname.split("/")[1] === "create-object"
          ? "Створення об'єкта"
          : pathname.split("/")[1] === "edit-object"
          ? `Редагування об'єкта`
          : pathname.split("/")[1] === "selections"
          ? `Всього ${selectionsCount} об'єктів`
          : pathname.split("/")[1] === "objects"
          ? ""
          : "";
    }
  };

  return (
    <StyledSubtitle className="mb-1">{handleGetSubtitle()}</StyledSubtitle>
  );
};

const StyledSubtitle = styled.div`
  color: #fff;
  font-family: Open Sans;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.3px;
  opacity: 0.4;
`;
