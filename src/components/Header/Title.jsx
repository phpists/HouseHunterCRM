import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { useAppSelect } from "../../hooks/redux";

export const Title = () => {
  const { pathname } = useLocation();
  const { user } = useAppSelect((state) => state.auth);

  const handleGetTitle = () => {
    switch (pathname) {
      case "/":
        return `Доброго ранку, ${
          user?.first_name?.length > 25
            ? `${user?.first_name?.subsring(0, 25)}...`
            : user?.first_name
        }!`;
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
      case "/calls":
        return "Дзвінки";
      default:
        return pathname.split("/")[1] === "client"
          ? "Клієнт"
          : pathname.split("/")[1] === "create-request" ||
            pathname.split("/")[1] === "edit-request"
          ? "Картка запиту"
          : pathname.split("/")[1] === "create-object" ||
            pathname.split("/")[1] === "edit-object"
          ? "Картка об’єкта"
          : pathname.split("/")[1] === "selections"
          ? "Підбірки"
          : pathname.split("/")[1] === "objects"
          ? "Об'єкти"
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
  @media (max-width: 1200px) {
    font-size: 24px;
    line-height: 1;
  }
`;
