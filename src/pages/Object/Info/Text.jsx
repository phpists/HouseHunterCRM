import { styled } from "styled-components";
import { ProfileField } from "../../../components/ProfileField";

export const Text = () => {
  return (
    <StyledText>
      <ProfileField value="Заголовок" big className="title" />
      <ProfileField
        value="ЗаголЗдам затишну, 2-к квартиру Оболонський проспект.м.Героїв Дніпра - 2 хвилини пішки!!Квартира у відмінному стані.Розглядаємо орендарів - без дітей та без домашніх тварин.Повністю укомплектована меблями та побутовою технікою.В комнаті ліжко, диван, стінка, шафа-купе. Домофон.овок"
        textarea
        className="title"
        contentHeight
      />
      <ProfileField
        value="Дуже топова хата, Юра треба брати вже"
        label="Коментар"
        className="title"
      />
    </StyledText>
  );
};

const StyledText = styled.div`
  padding: 15px;
  border-radius: 10px;
  background: #3d3d3d;
  margin-bottom: 10px;
  height: calc(100svh - 364px);
  .title {
    margin-bottom: 10px;
    .value {
      font-weight: 300;
    }
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
`;
