import { styled } from "styled-components";
import { Phone } from "./Phone/Phone";
import React, { useEffect, useState } from "react";
import { Divider } from "./Divider";
import { ProfileField } from "../../../../components/ProfileField";
import { useGetPhonesCodesQuery } from "../../../../store/auth/auth.api";

export const Contact = ({ phones, email, onChangeField }) => {
  const { data: phonesCodes } = useGetPhonesCodesQuery();

  const INIT_PHONE = {
    phone: "",
    code: "1",
    viber: "0",
    telegram: "0",
  };

  const handleChangeField = (index, fieldName, value) =>
    onChangeField(
      "phone",
      phones.map((phone, i) =>
        i === index ? { ...phone, [fieldName]: value } : phone
      )
    );

  const handleAddPhone = () => onChangeField("phone", [...phones, INIT_PHONE]);
  const handleRemovePhone = (index) => {
    onChangeField(
      "phone",
      phones.filter((p, i) => i !== index)
    );
  };

  const handleChangePhone = (index, fieldName, value) =>
    value && handleChangeField(index, fieldName, value);

  return (
    <StyledContact>
      {phones.map(({ phone, code, viber, telegram }, i) => (
        <React.Fragment key={i}>
          <Phone
            phone={phone}
            viber={viber}
            telegram={telegram}
            onChange={(fieldName, value) =>
              handleChangePhone(i, fieldName, value)
            }
            onRemove={() => handleRemovePhone(i)}
            onAdd={handleAddPhone}
            isFirst={i === 0}
            code={code}
            phonesCodes={phonesCodes}
          />
          <Divider />
        </React.Fragment>
      ))}
      <ProfileField
        value={email}
        label="Пошта"
        onChange={(val) => onChangeField("email", val)}
      />
    </StyledContact>
  );
};

const StyledContact = styled.div`
  padding: 3px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.2);
  margin-bottom: 18px;
`;
