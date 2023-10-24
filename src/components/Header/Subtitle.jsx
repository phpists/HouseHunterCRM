import { useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useAppSelect } from "../../hooks/redux";

export const Subtitle = () => {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { clientsCount } = useAppSelect((state) => state.clients);
  const { requestsCount } = useAppSelect((state) => state.requests);

  const handleGetEnding = (val) => (val > 0 && val < 8 ? "а" : "ів");

  const handleGetSubtitle = () => {
    switch (pathname) {
      case "/":
        return "Що нового трапилося за сьгодні";
      case "/clients":
        return `Всього ${clientsCount} клієнт${handleGetEnding(clientsCount)}`;
      case "/requests":
        return `${requestsCount} запит${handleGetEnding(requestsCount)}`;
      case "/objects":
        return "Понад 1 000 нових";
      case "/note":
        return "345 нових об'єктів із трьох темплейтів";
      case "/calendar":
        return "Перегляд об'єкту через 40 хвилин";
      case "/structure":
        return "Всього 296 агентів";
      case "/company":
        return "12 працівників";
      case "/request":
        return "Запит об'єкта";
      case "/calls":
        return "Всього 1 782 дзвінків";
      default:
        return pathname.split("/")[1] === "client"
          ? "Створенний  03.10.2022  13:19"
          : pathname.split("/")[1] === "object"
          ? `${id ? "Редагування" : "Створення"} об'єкта`
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
