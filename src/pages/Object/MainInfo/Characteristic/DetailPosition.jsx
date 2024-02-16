import { useState } from "react";
import { styled } from "styled-components";
import { ReactComponent as Arrows } from "../../../../assets/images/arrows.svg";
import { Divider } from "../Divider";
import { ProfileField } from "../../../../components/ProfileField";
import {
  handleCheckIsField,
  handleCheckIsFieldExist,
} from "../../../../utilits";

export const DetailPosition = ({ data, onChangeField, fields }) => {
  const [open, setOpen] = useState(false);

  return (
    <StyledDetailPosition open={open}>
      <Arrows className="arrows" onClick={() => setOpen(!open)} />
      <Divider title="додати Точну адресу" />
      <div className="fields">
        {open && (
          <>
            <div className="field-group">
              {handleCheckIsFieldExist(fields?.other_field, "street") && (
                <ProfileField
                  label="Вулиця"
                  placeholder="Введіть значення"
                  className="field"
                  grey
                  value={data?.street}
                  onChange={(val) => onChangeField("street", val)}
                />
              )}
              {handleCheckIsFieldExist(
                fields?.main_field,
                "address_house_number"
              ) && (
                <ProfileField
                  placeholder="Введіть значення"
                  value={data?.address_house_number}
                  onChange={(val) => onChangeField("address_house_number", val)}
                  label="Будинок"
                  className="field"
                  grey
                />
              )}
            </div>
            <div className="field-group">
              {handleCheckIsFieldExist(
                fields?.other_field,
                "address_entrance_number"
              ) && (
                <ProfileField
                  placeholder="Введіть значення"
                  value={data?.address_entrance_number}
                  onChange={(val) =>
                    onChangeField("address_entrance_number", val)
                  }
                  label="Підїзд"
                  className="field"
                  grey
                  type="number"
                />
              )}
              {handleCheckIsFieldExist(
                fields?.other_field,
                "address_apartment_number"
              ) && (
                <ProfileField
                  placeholder="Введіть значення"
                  value={data?.address_apartment_number}
                  onChange={(val) =>
                    onChangeField("address_apartment_number", val)
                  }
                  label="Квартира"
                  className="field"
                  grey
                  type="number"
                />
              )}
            </div>
          </>
        )}
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
    display: flex;
    gap: 4px;
  }
`;
