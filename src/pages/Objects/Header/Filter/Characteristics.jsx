import styled from "styled-components";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";
import { Divider } from "./Divider";
import { ToggleOption } from "./ToggleOption";
import { Ranger } from "../../../../components/Ranger/Ranger";

export const Characteristics = () => (
  <StyledCharacteristics className="section">
    <SelectTags value="Оберіть тип будівлі" label="Тип будівлі" />
    <Divider />
    <ToggleOption label="Все окрім цього" />
    <Divider />
    <SelectTags value="Оберіть тип стін" label="Тип стін" />
    <Divider />
    <Ranger label="Поверх/Поверховість" />
    <div className="otp-group">
      <ToggleOption label="Не перший" />
      <ToggleOption label="Не останній" />
    </div>
    <div className="otp-group">
      <ToggleOption label="Перший" />
      <ToggleOption label="Останній" />
    </div>
    <Divider />
    <Ranger label="Загальна площа" mainType="м²" />
    <Divider />
    <Ranger label="Площа кухні" mainType="м²" />
    <Divider />
    <SelectTags value="Оберіть" label="Планування" />
    <Divider />
    <SelectTags value="Оберіть" label="Санвузол" />
    <Divider />
    <SelectTags value="Оберіть" label="Опалення" />
    <Divider />
    <SelectTags value="Оберіть" label="Тип ремонту" />
    <Divider />
    <SelectTags value="Оберіть" label="Кількість місць" />
  </StyledCharacteristics>
);

const StyledCharacteristics = styled.div`
  .otp-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    margin-top: 6px;
  }
`;
