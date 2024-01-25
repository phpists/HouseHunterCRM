import { useState } from "react";
import { Field } from "../../Field";
import { AddButton } from "./AddButton";
import { AdditionalPhone } from "./AdditionalPhone";
import { useGetPhonesCodesQuery } from "../../../store/auth/auth.api";
import { Socmedias } from "./Socmedias";

export const Phones = ({
  phones,
  onChange,
  errors,
  noResetValueOnCodeChange,
}) => {
  const { data: phonesCodes } = useGetPhonesCodesQuery();

  const handleChangePhone = (index, value) =>
    onChange(phones?.map((p, i) => (i === index ? value : p)));

  const handleAddPhone = () => onChange([...phones, { code: "1", phone: "" }]);
  const handleRemovePhone = (index) =>
    onChange(phones?.filter((p, i) => i !== index));

  return (
    <div>
      <div className="flex items-center">
        <Socmedias
          viber={phones[0]?.viber}
          telegram={phones[0]?.telegram}
          onChange={(field, val) =>
            handleChangePhone(0, { ...phones[0], [field]: val })
          }
        />
        <Field
          label="Телефон"
          full
          phone
          value={phones[0]?.phone}
          onChange={(val) => handleChangePhone(0, { ...phones[0], phone: val })}
          placeholder="+38 (___) ___-__- __"
          phoneCode={phones[0]?.code}
          onChangePhoneCode={(cod) =>
            handleChangePhone(0, { ...phones[0], code: cod, phone: "" })
          }
          phonesCodes={phonesCodes}
          error={
            !!errors?.find((e) => e === "phones") &&
            phones[0]?.phone?.length === 0
          }
          noResetValueOnCodeChange={noResetValueOnCodeChange}
        />
      </div>
      {phones.slice(1).map((phone, i) => (
        <>
          <div className="divider" />
          <AdditionalPhone
            key={i}
            onRemove={() => handleRemovePhone(1 + i)}
            phone={phone}
            onChangeValue={(val) => handleChangePhone(1 + i, val)}
            phonesCodes={phonesCodes}
            errors={errors}
          />
        </>
      ))}
      <div className="divider" />
      <AddButton onClick={handleAddPhone} />
    </div>
  );
};

{
  /* <Field
label="Телефон"
full
phone
value={data?.phones[0]?.phone}
onChange={(val) =>
  onChangeField("phones", [{ ...data?.phones[0], phone: val }])
}
placeholder="+38 (___) ___-__- __"
phoneCode={data?.phones[0]?.code}
onChangePhoneCode={(cod) =>
  onChangeField("phones", [
    { ...data?.phones[0], code: cod, phone: "" },
  ])
}
phonesCodes={phonesCodes}
error={!!errors?.find((e) => e === "phones")}
noResetValueOnCodeChange={noResetValueOnCodeChange}
/> */
}
