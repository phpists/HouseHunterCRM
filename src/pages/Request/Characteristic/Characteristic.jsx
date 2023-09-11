import { styled } from "styled-components";
import { Ranger } from "../../../components/Ranger/Ranger";
import { Divider } from "../Divider";
import { ToggleOption } from "../ToggleOption";
import { SelectTags } from "../../../components/SelectTags/SelectTags";

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
      <SelectTags label="Тип угоди" />
      <ToggleOption label="Все крім цього" className="toggle-opt" />
      <Divider />
      <SelectTags label="Тип нерухомості" />
      <ToggleOption label="Все крім цього" className="toggle-opt" />
      <Divider />
      <SelectTags label="Тип стін" />
      <ToggleOption label="Все крім цього" className="toggle-opt" />
      <Divider />
      <div className="opt-group">
        <ToggleOption label="Діти" className="toggle-opt" />
        <ToggleOption label="Тварини" className="toggle-opt" />
      </div>
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
  .opt-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 7px;
  }
`;
