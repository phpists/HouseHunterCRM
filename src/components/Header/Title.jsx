import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { useAppSelect } from "../../hooks/redux";
import { handleCheckAccess } from "../../utilits";

export const Title = () => {
  const { pathname } = useLocation();
  const { user, accessData } = useAppSelect((state) => state.auth);
  const { selectionName } = useAppSelect((state) => state.selections);

  const handleGetHour = () => new Date().getHours();

  const handleGetTime = () => {
    const hours = handleGetHour();
    if (hours >= 6 && hours <= 12) {
      return "ранку";
    } else if (hours >= 12 && hours <= 18) {
      return "дня";
    } else if (hours >= 18 && hours <= 23) {
      return "вечора";
    } else {
      return "ночі";
    }
  };

  const handleGetTitle = () => {
    switch (pathname) {
      case "/":
        return `Доброго ${handleGetTime()}, ${
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
        return handleCheckAccess(accessData, "calls", "view") ? "Ліди" : "";
      case "/advertising":
        return "Реклама";
      case "/ad":
        return "Реклама 2";
      case "/advertising-setting":
        return "Реклама";
      default:
        return pathname.split("/")[1] === "client"
          ? "Клієнт"
          : pathname.split("/")[1] === "create-request" ||
            pathname.split("/")[1] === "edit-request"
          ? "Картка запиту"
          : pathname.split("/")[1] === "create-object" ||
            pathname.split("/")[1] === "edit-object"
          ? "Картка об’єкта"
          : pathname.split("/")[1] === "edit-ad"
          ? "Картка об’єкта"
          : pathname.split("/")[1] === "selections"
          ? selectionName ?? "Підбірки"
          : pathname.split("/")[1] === "objects"
          ? "Об'єкти"
          : "";
    }
  };

  return <StyledTitle className="mb-1">{handleGetTitle()}</StyledTitle>;
};

const StyledTitle = styled.h1`
  color: var(--main-color);
  font-family: Overpass;
  font-size: 32px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%; /* 40.12px */
  letter-spacing: 0.64px;
  max-width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 1200px) {
    font-size: 24px;
    line-height: 1;
  }
`;
