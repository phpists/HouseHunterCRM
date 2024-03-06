import { ProfileField } from "../../../../components/ProfileField";
import { handleCheckIsFieldExist } from "../../../../utilits";
import { ToggleContent } from "./ToggleContent";

export const DetailPosition = ({ data, onChangeField, fields }) => {
  return (
    <ToggleContent title="додати Точну адресу">
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
              onChange={(val) => onChangeField("address_entrance_number", val)}
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
              onChange={(val) => onChangeField("address_apartment_number", val)}
              label="Квартира"
              className="field"
              grey
              type="number"
            />
          )}
        </div>
      </>
    </ToggleContent>
  );
};
