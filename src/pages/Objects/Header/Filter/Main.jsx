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
      defaultStart={0}
      defaultEnd={100}
    />
    <Divider />
    <Ranger
      label="Кількість кімнат/Приміщень"
      defaultStart={0}
      defaultEnd={100}
    />
  </StyledMain>
);

const StyledMain = styled.div`
  .first-angle,
  .second-angle {
    &::after {
      background: #4e4e4e !important;
    }
  }
`;
