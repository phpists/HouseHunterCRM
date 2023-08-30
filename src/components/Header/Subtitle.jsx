import { useLocation } from "react-router-dom";
import { styled } from "styled-components";

export const Subtitle = () => {
  const { pathname } = useLocation();

  const handleGetSubtitle = () => {
    switch (pathname) {
      case "/":
        return "Що нового трапилося за сьгодні";
      case "/clients":
        return "Всього 1 782 клієнтів";
      case "/requests":
        return "1 837 нових запитів";
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
      default:
        return pathname.split("/")[1] === "client"
          ? "Створенний  03.10.2022  13:19"
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
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.3px;
  opacity: 0.4;
`;
