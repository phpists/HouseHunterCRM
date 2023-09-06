import { useState } from "react";
import { styled } from "styled-components";
import { ReactComponent as Arrows } from "../../../../assets/images/arrows.svg";
import { Divider } from "../Divider";
import { Select } from "../../../../components/Select/Select";
import { ProfileField } from "../../../../components/ProfileField";

export const DetailPosition = () => {
  const [open, setOpen] = useState(false);

  return (
    <StyledDetailPosition open={open}>
      <Arrows className="arrows" onClick={() => setOpen(!open)} />
      <Divider title="додати Точну адресу" />
      <div className="fields">
        {open && (
          <>
            <div className="field-group">
              <ProfileField
                value="22-й"
                label="Вулиця"
                className="field"
                grey
              />
              <ProfileField value="45" label="Будинок" className="field" grey />
            </div>
            <div className="field-group">
              <ProfileField value="3" label="Підїзд" className="field" grey />
              <ProfileField
                value="45"
                label="Квартира"
                className="field"
                grey
              />
            </div>
          </>
        )}
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
    </StyledDetailPosition>
  );
};

const StyledDetailPosition = styled.div`
  .arrows {
    margin: 0 auto;
    transition: all 0.3s;
    cursor: pointer;
    transform: rotate(${({ open }) => (open ? 180 : 0)}deg);
    &:hover {
      path {
        stroke-opacity: 1;
      }
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
