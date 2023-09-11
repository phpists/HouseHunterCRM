import styled from "styled-components";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";
import { Divider } from "./Divider";
import { Ranger } from "../../../../components/Ranger/Ranger";

export const Main = () => (
  <StyledMain className="section">
    <SelectTags value="Оберіть категорію" label="Категорія" />
    <Divider />
    <SelectTags value="Оберіть локацію" label="Локація" />
    <Divider />
    <Ranger
      label="Ціновий діапазон"
      mainTypes={[
        <>
          M<sup>2</sup>
        </>,
        "Обєкт",
      ]}
      currency
      big
    />
    <Divider />
    <Ranger label="Кількість кімнат/Приміщень" />
  </StyledMain>
);

const StyledMain = styled.div``;
