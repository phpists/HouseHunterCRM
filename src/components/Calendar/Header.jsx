import { styled } from "styled-components";
import { ReactComponent as ArrowBack } from "../../assets/images/calendar-back.svg";
import { ReactComponent as ArrowNext } from "../../assets/images/calendar-next.svg";
import { ReactComponent as Close } from "../../assets/images/close.svg";
import ReactInputMask from "react-input-mask";
import { useEffect, useState } from "react";

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

export const Header = ({ value, onChangeMonth, onChangeYear, onClose }) => {
  const [year, setYear] = useState(value?.getFullYear());

  const handleGetTitle = (date) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${MONTHS[month]}`;
  };

  const handleChangeYear = (val) => {
    if (!isNaN(val)) {
      onChangeYear(val);
    }
    setYear(val);
  };

  useEffect(() => {
    setYear(value?.getFullYear());
  }, [value]);

  return (
    <StyledHeader className="flex items-center justify-between calendar-header">
      <span className="flex items-center">
        <span className="title-header ">{handleGetTitle(value)}</span>
        <ReactInputMask
          className="ml-1"
          mask={"9999"}
          value={year}
          onChange={(e) => handleChangeYear(e.target.value)}
        />
      </span>
      <div className="flex items-center">
        <ArrowBack className="mr-6" onClick={() => onChangeMonth(-1)} />
        <ArrowNext onClick={() => onChangeMonth(1)} />
      </div>
      {onClose ? <Close className="close-icon" onClick={onClose} /> : null}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  color: var(--main-color);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: 21px;
  padding: 15px 16px;
  width: 100%;
  border-bottom: 1px solid var(--bg-20);
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
  .close-icon {
    margin-left: auto;
    g {
      transition: all 0.3s;
    }
    &:hover {
      g {
        opacity: 1;
      }
    }
  }
  input {
    border-radius: 4px;
    border: 1px solid var(--bg-20);
    background: var(--card-bg-2);
    padding: 10px;
    width: 60px;
    height: 24px;
    margin-right: 5px;
  }
  .title-header {
    width: 70px;
    text-align: left;
  }
`;
