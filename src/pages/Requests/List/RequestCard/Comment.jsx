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
  @media (min-width: 1750px) {
    width: 20svw;
    max-width: 500px;
  }
  @media (min-width: 1900px) {
    width: 22svw;
    max-width: 550px;
  }
  @media (max-width: 1600px) {
    width: 100%;
  }
`;
