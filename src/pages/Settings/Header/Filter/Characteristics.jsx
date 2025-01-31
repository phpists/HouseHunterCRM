import { styled } from "styled-components";
import { Select } from "../../../../components/Select/Select";
import { ToggleOption } from "./ToggleOption";
import { Divider } from "./Divider";
import { Ranger } from "./Ranger/Ranger";

export const Characteristics = () => {
  return (
    <StyledCharacteristics>
      <Select
        value="Чешка"
        label="Тип будівлі"
        labelActive="Оберіть тип будівлі"
      />
      <ToggleOption label="Все окрім цього" className="mt-1.5" />
      <Divider />
      <Select
        value="Цегляний"
        label="Тип стін"
        labelActive="Оберіть тип стін"
      />
      <Divider />
      <Ranger label="Поверх" defaultStart={2} defaultEnd={24} max={40} />
      <div className="toggle-group mb-1.5">
        <ToggleOption label="Не перший" />
        <ToggleOption label="Не останній" />
      </div>
      <div className="toggle-group">
        <ToggleOption label="Перший" />
        <ToggleOption label="Останній" />
      </div>
      <Divider />
      <Ranger
        label="Загальна площа"
        defaultStart={30}
        defaultEnd={122}
        max={300}
        type={
          <>
            m<sup>2</sup>
          </>
        }
      />
      <Divider />
      <Ranger
        label="Площа кухні"
        defaultStart={30}
        defaultEnd={80}
        max={300}
        type={
          <>
            m<sup>2</sup>
          </>
        }
      />
      <Divider />
      <Select
        value="Роздільна"
        label="Планування"
        labelActive="Оберіть планування"
      />
      <Divider />
      <Select
        value="Роздільна"
        label="Санвузол"
        labelActive="Оберіть санвузол"
      />
      <Divider />
      <Select
        value="Індивідуальне"
        label="Опалення"
        labelActive="Оберіть опалення"
      />
      <Divider />
      <Select
        value="Авторський"
        label="Тип ремонту"
        labelActive="Оберіть тип ремонту"
      />
      <Divider />
      <Select
        value="3"
        label="Кількість місць"
        labelActive="Оберіть кількість місць"
      />
    </StyledCharacteristics>
  );
};

const StyledCharacteristics = styled.div`
  margin-bottom: 25px;
  border-radius: 9px;
  background: var(--bg-10);
  padding: 6px;
  .toggle-group {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 7px;
  }
`;
