import { styled } from "styled-components";
import { Divider } from "../Divider";
import { Option } from "../../../../components/Option";
import { ProfileField } from "../../../../components/ProfileField";
import { Select } from "../../../../components/Select/Select";

export const Info = () => {
  return (
    <StyledCategories>
      <Divider title="Характеристики" className="first-divider" />
      <div className="fields">
        <Select
          value="Житловий фонд від 2011"
          label="Тип будинку"
          labelActive="Тип будинку"
          hideArrowDefault
        />
        <div className="field-group">
          <ProfileField
            value="167 м2"
            label="Загальна площа"
            className="field"
            grey
          />
          <ProfileField
            value="45 м2"
            label="Площа кухні / теріторії"
            className="field"
            grey
          />
        </div>
        <Select
          value="Від власника"
          label="Тип угоди"
          labelActive="Тип угоди"
          hideArrowDefault
        />
        <Select
          value="Новобудови"
          label="Тип нерухомості"
          labelActive="Тип нерухомості"
          hideArrowDefault
        />
        <Select
          value="Цегла"
          label="Тип стін"
          labelActive="Тип стін"
          hideArrowDefault
        />
        <div className="field-group">
          <ProfileField value="22-й" label="Поверх" className="field" grey />
          <ProfileField
            value="45"
            label="Поверховість"
            className="field"
            grey
          />
        </div>
        <ProfileField
          value="4 кімнати"
          label="Кількість кімнат"
          className="field"
          grey
        />
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
  .fields {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    grid-auto-rows: max-content;
  }
  .field-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
  }
`;
