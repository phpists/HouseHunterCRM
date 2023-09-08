import { styled } from "styled-components";
import { Ranger } from "../Ranger/Ranger";
import { Divider } from "../Divider";
import { Select } from "../Select/Select";
import { ToggleOption } from "../ToggleOption";

export const Characteristic = () => {
  return (
    <StyledCharacteristic className="request-card hide-scroll">
      <Ranger
        label="Кількість кімнат/Приміщень"
        max={100}
        defaultStart={1}
        defaultEnd={20}
      />
      <Divider />
      <Ranger
        label="Загальна площа"
        max={100}
        defaultStart={20}
        defaultEnd={40}
        mainType={
          <>
            m<sup>2</sup>
          </>
        }
      />
      <Divider />
      <Ranger
        label="Поверх/Поверховість"
        max={100}
        defaultStart={2}
        defaultEnd={15}
      />
      <Divider />
      <Ranger
        label="Площа території"
        max={110}
        defaultStart={25}
        defaultEnd={45}
        mainType={
          <>
            m<sup>2</sup>
          </>
        }
      />
      <Divider />
      <Select label="Тип угоди" />
      <ToggleOption label="Все крім цього" className="toggle-opt" />
      <Divider />
      <Select label="Тип нерухомості" />
      <ToggleOption label="Все крім цього" className="toggle-opt" />
      <Divider />
      <Select label="Тип стін" />
      <ToggleOption label="Все крім цього" className="toggle-opt" />
    </StyledCharacteristic>
  );
};

const StyledCharacteristic = styled.div`
  padding: 8px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  .toggle-opt {
    margin-top: 6.5px;
  }
`;
