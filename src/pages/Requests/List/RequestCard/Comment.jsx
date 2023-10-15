import styled from "styled-components";
import { ProfileField } from "../../../../components/ProfileField";

export const Comment = () => (
  <StyledComment>
    <ProfileField
      label="Коментар"
      value="Здам затишну, 2-к квартиру Оболонський проспект.м.Героїв Дніпра - 2 хвилини пішки!!Квартира у відмінному стані.Розглядаємо орендарів - без дітей та без домашніх тварин.Повністю укомплектована меблями та побутовою технікою.В комнаті ліжко, диван, стінка, шафа-купе. Домофон."
      textarea
      className="field"
    />
  </StyledComment>
);

const StyledComment = styled.div`
  width: 200px;
  .field {
    border-radius: 9px;
    background: #363636;
    padding: 10px 20px 10px 10px;
    height: 100%;
    &:hover {
      background: rgba(255, 255, 255, 0.3) !important;
    }
    &.active {
      background: #fff !important;
    }
  }
  .value {
    height: 83px !important;
    overflow: auto;
  }
  @media (max-width: 1399.9px) {
    width: 100%;
  }
  @media (min-width: 1400px) {
    width: 15svw;
    max-width: 500px;
  }
  @media (min-width: 1750px) {
    width: 25svw;
    max-width: 700px;
  }
  @media (min-width: 1900px) {
    width: 30svw;
    max-width: 550px;
  }
`;
