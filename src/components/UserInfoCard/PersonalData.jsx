import styled from "styled-components";
import { Field } from "../Field";
import { Divider } from "./Divider";
import { ProfileField } from "../ProfileField";
import { useGetPhonesCodesQuery } from "../../store/auth/auth.api";
import { Phones } from "./Phones/Phones";

export const PersonalData = ({
  data,
  onChangeField,
  errors = [],
  noResetValueOnCodeChange,
}) => {
  const { data: phonesCodes } = useGetPhonesCodesQuery();

  return (
    <StyledPersonalData>
      <div className="input-group">
        <Field
          placeholder="Почніть писати"
          value={data?.first_name ?? ""}
          onChange={(val) => onChangeField("first_name", val)}
          label="Ім’я"
          full
          className="field-wrapper"
          error={!!errors?.find((e) => e === "first_name")}
        />
        <Field
          placeholder="Почніть писати"
          value={data?.last_name ?? ""}
          onChange={(val) => onChangeField("last_name", val)}
          label="Прізвище"
          full
          className="field-wrapper"
          error={!!errors?.find((e) => e === "last_name")}
        />
      </div>
      <Divider />
      <Field
        placeholder="Дата народження"
        value={data?.dt_birthday}
        onChange={(val) => onChangeField("dt_birthday", val)}
        label="Дата народження"
        className="field-wrapper"
        error={!!errors?.find((e) => e === "dt_birthday")}
        type="date"
      />
      <Divider />
      <Phones
        phones={data?.phones}
        onChange={(val) => onChangeField("phones", val)}
        errors={errors}
        noResetValueOnCodeChange={noResetValueOnCodeChange}
      />
      {/* <Field
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
      /> */}
      <Divider />
      <Field
        value={data?.email ?? ""}
        onChange={(val) => onChangeField("email", val)}
        placeholder="Почніть писати"
        label="Пошта"
        full
        error={!!errors?.find((e) => e === "email")}
      />
      <Divider />
      <Field
        value={data?.password ?? ""}
        onChange={(val) => onChangeField("password", val)}
        placeholder="Почніть писати"
        label="Пароль"
        full
        hide
      />
    </StyledPersonalData>
  );
};

const StyledPersonalData = styled.div`
  margin-bottom: 15px;
  padding: 6px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  text-align: left;
  .input-group {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 6px;
  }
  .field-wrapper {
    .value {
      width: 100px;
    }
  }
`;
