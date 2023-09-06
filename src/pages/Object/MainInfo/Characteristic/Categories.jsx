import { styled } from "styled-components";
import { Divider } from "../Divider";
import { Option } from "../../../../components/Option";

export const Categories = () => {
  const Tech = [
    { title: "Електрочайник", value: "" },
    { title: "Кавомашина", value: "" },
    { title: "Духова шафа", value: "" },
    { title: "Мікрохвильова піч", value: "" },
    { title: "Пральна машина", value: "" },
    { title: "Сушильна машина", value: "" },
    { title: "Мікрохвильова піч", value: "" },
    { title: "Холодильник", value: "" },
    { title: "Посудомийна машина", value: "" },
    { title: "Холодильник", value: "Праска" },
  ];

  const Media = [
    { title: "Wi-Fi", value: "" },
    { title: "Телевизор", value: "" },
    { title: "Швидкісний інтернет", value: "" },
    { title: "Кабельне, цифрове ТБ", value: "" },
  ];

  const Comfort = [
    { title: "Кондиціонер", value: "" },
    { title: "Грати на вікнах", value: "" },
    { title: "Сигналізація", value: "" },
    { title: "Пожежна сигналізація", value: "" },
    { title: "Відеоспостереження", value: "" },
    { title: "Консьєрж", value: "" },
    { title: "Панорамні вікна", value: "" },
    { title: "Кабельне, цифрове ТБ", value: "" },
    { title: "Гостевой паркинг", value: "" },
    { title: "Лифт", value: "" },
    { title: "Хоз. помещение", value: "" },
    { title: "Грузовой лифт", value: "" },
    { title: "Підігрів підлог", value: "" },
    { title: "Умный дом", value: "" },
  ];

  const Comunication = [
    { title: "Газ", value: "" },
    { title: "Електрика", value: "" },
    { title: "Вивіз відходів", value: "" },
    { title: "Центр. водопровід", value: "" },
    { title: "Канализация септик", value: "" },
    { title: "Скважина", value: "" },
  ];

  const Infrasture = [
    { title: "Дитячий садок", value: "" },
    { title: "Школа", value: "" },
    { title: "Бювет", value: "" },
    { title: "Зупинка транспорту", value: "" },
    { title: "Метро", value: "" },
    { title: "Ринок", value: "" },
    { title: "Магазин, кіоск", value: "" },
    { title: "Супермаркет, ТРЦ", value: "" },
    { title: "Парк, зелена зона", value: "" },
    { title: "Аптека", value: "" },
    { title: "Лікарня, поліклініка", value: "" },
    { title: "Центр міста", value: "" },
    { title: "Ресторан, кафе", value: "" },
    { title: "Відділення пошти", value: "" },
  ];

  const Additional = [
    { title: "Тільки сім'ям", value: "" },
    { title: "З господарями", value: "" },
    { title: "Можна студентам", value: "" },
    { title: "Можна іноземцям", value: "" },
    { title: "Можна з дітьми", value: "" },
    { title: "Можна з вихованцями", value: "" },
    { title: "Можна курити", value: "" },
    { title: "Можна с тваринами", value: "" },
  ];

  return (
    <StyledCategories>
      <Divider title="Побутова техніка" className="first-divider" />
      <div className="options">
        {Tech.map((opt, i) => (
          <Option key={i} title={opt.title} className="opt" />
        ))}
      </div>
      <Divider title="Мультимедіа" />
      <div className="options">
        {Media.map((opt, i) => (
          <Option key={i} title={opt.title} className="opt" />
        ))}
      </div>
      <Divider title="Комфорт" />
      <div className="options">
        {Comfort.map((opt, i) => (
          <Option key={i} title={opt.title} className="opt" />
        ))}
      </div>
      <Divider title="Комунікації" />
      <div className="options">
        {Comunication.map((opt, i) => (
          <Option key={i} title={opt.title} className="opt" />
        ))}
      </div>
      <Divider title="Інфраструктура (до 500 м.)" />
      <div className="options">
        {Infrasture.map((opt, i) => (
          <Option key={i} title={opt.title} className="opt" />
        ))}
      </div>
      <Divider title="Додатково" />
      <div className="options">
        {Additional.map((opt, i) => (
          <Option key={i} title={opt.title} className="opt" />
        ))}
      </div>
    </StyledCategories>
  );
};

const StyledCategories = styled.div`
  border-radius: 10px;
  background: #323232;
  padding: 4px;
  margin-top: 20px;
  .first-divider {
    margin: -12px 0 0px;
    .title {
      background: #323232 !important;
      opacity: 1;
      color: rgba(255, 255, 255, 0.4);
      border: none;
    }
    div {
      opacity: 0;
    }
  }
  .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3px 4px;
  }
  .opt {
    border: none;
    cursor: pointer;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    border-radius: 6px;
    padding: 6px 6px 5px 8px;
  }
`;
