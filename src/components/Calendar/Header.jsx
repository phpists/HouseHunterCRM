import { styled } from "styled-components";
import { ReactComponent as ArrowBack } from "../../assets/images/calendar-back.svg";
import { ReactComponent as ArrowNext } from "../../assets/images/calendar-next.svg";

export const Header = ({ value, onChangeMonth }) => {
  const handleGetTitle = (date) => {
    const MONTHS = [
      "Січень",
      "Лютий",
      "Березень",
      "Квітень",
      "Травень",
      "Червень",
      "Липень",
      "Серпень",
      "Вересень",
      "Жовтень",
      "Листопад",
      "Грудень",
    ];

    const month = date.getMonth();
    const year = date.getFullYear();
    return `${MONTHS[month]} ${year}`;
  };

  return (
    <StyledHeader className="flex items-center justify-between calendar-header">
      <span>{handleGetTitle(value)}</span>
      <div className="flex items-center">
        <ArrowBack className="mr-6" onClick={() => onChangeMonth(-1)} />
        <ArrowNext onClick={() => onChangeMonth(1)} />
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  color: #fff;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 21px;
  padding: 15px 16px;
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 20px;
  svg {
    cursor: pointer;
    path {
      transition: all 0.3s;
    }
    &:hover {
      path {
        stroke-opacity: 1;
      }
    }
  }
`;
