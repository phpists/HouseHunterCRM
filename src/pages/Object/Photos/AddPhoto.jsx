import { styled } from "styled-components";
import { ReactComponent as PlusIcon } from "../../../assets/images/plus.svg";

export const AddPhoto = ({ small, onAdd }) => {
  return (
    <StyledAddPhoto
      className="flex flex-col items-center justify-center add-btn"
      small={small}
      onClick={onAdd}
    >
      <div className="title flex items-end">
        <PlusIcon /> Додати файл
      </div>
      <div className="subtitle">
        Перетягніть або завантажте будь-який файл розміром не більше 30 МБ
      </div>
    </StyledAddPhoto>
  );
};

const StyledAddPhoto = styled.div`
  border-radius: 10px;
  border: 1px solid #fff;
  background: rgba(255, 255, 255, 0.05);
  width: 400px;
  height: 87px;
  transition: all 0.3s;
  cursor: pointer;
  .title {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    svg {
      margin-right: 6px;
      transition: all 0.3s;
      g {
        opacity: 1;
      }
    }
  }
  .subtitle {
    color: #fff;
    text-align: center;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
    width: 245px;
    max-width: 90%;
    height: 0;
    transition: all 0.3s;
    overflow: hidden;
  }
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    svg {
      opacity: 0;
      width: 0;
      overflow: hidden;
    }
    .subtitle {
      height: 30px;
      margin-top: 3px;
    }
  }
  ${({ small }) =>
    small &&
    `
    width: 100%;
    height: 100%;
  `}
  @media (max-width: 1500px) {
    width: 350px;
  }
  @media (max-width: 1430px) {
    width: 330px;
  }
  @media (max-width: 1400px) {
    width: 280px;
  }
  @media (max-width: 1300px) {
    width: 100%;
    height: 87px;
  }
`;
