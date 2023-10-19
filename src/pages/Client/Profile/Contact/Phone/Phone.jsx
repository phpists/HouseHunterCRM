import { styled } from "styled-components";
import { Socmedia } from "../../../../../components/Socmedia";
import { useState } from "react";
import { ProfileField } from "../../../../../components/ProfileField";
import { AddButton } from "./AddButton";
import { RemoveBtn } from "./RemoveBtn";

export const Phone = ({
  isFirst,
  onRemove,
  onAdd,
  phone,
  viber,
  telegram,
  onChange,
  onSave,
  code,
  phonesCodes,
}) => {
  return (
    <StyledPhone className="flex items-center">
      <div className="socmedias">
        <Socmedia
          type="viber"
          active={viber === "1"}
          onClick={() => onChange("viber", viber === "1" ? "0" : "1")}
          className="viber-card"
        />
        <Socmedia
          type="telegram"
          active={telegram === "1"}
          onClick={() => onChange("telegram", telegram === "1" ? "0" : "1")}
        />
      </div>
      <ProfileField
        value={phone}
        placeholder="Введіть телефон"
        label="Телефон"
        className="w-full mr-1.5 phone-input"
        onChange={(val) => onChange("phone", val)}
        onSave={onSave}
        phone
        phoneCode={code}
        onChangePhoneCode={(cod) => onChange("code", cod)}
        phonesCodes={phonesCodes}
      />
      {isFirst ? (
        <AddButton onClick={onAdd} />
      ) : (
        <RemoveBtn onClick={onRemove} />
      )}
    </StyledPhone>
  );
};

const StyledPhone = styled.div`
  /* z-index: 10; */
  position: relative;
  .socmedias {
    margin-right: 3px;
  }
  .viber-card {
    margin-bottom: 3px;
  }

  .phone-input {
    width: 180px !important;
  }
  .phone-input .value {
    width: 140px;
  }
`;
