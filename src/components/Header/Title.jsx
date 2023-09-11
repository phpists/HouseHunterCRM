import { useLocation } from "react-router-dom";
import { styled } from "styled-components";

export const Title = () => {
  const { pathname } = useLocation();

  const handleGetTitle = () => {
    switch (pathname) {
      case "/":
        return "Доброго ранку, Юрію!";
      case "/clients":
        return "Клієнти";
      case "/requests":
        return "Запити";
      case "/objects":
        return "Об'єкти";
      case "/note":
        return "Нотатник";
      case "/calendar":
        return "Календар";
      case "/structure":
        return "Структура";
      case "/company":
        return "Моя компанія";
      case "/request":
        return "Створення нового запиту";
      default:
        return pathname.split("/")[1] === "client"
          ? "Клієнт"
          : pathname.split("/")[1] === "object"
          ? "Картка об’єкта"
          : "";
    }
  };

  return <StyledTitle className="mb-1">{handleGetTitle()}</StyledTitle>;
};

const StyledTitle = styled.h1`
  color: #fff;
  font-family: Overpass;
  font-size: 32px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 40.12px */
  letter-spacing: 0.64px;
`;
