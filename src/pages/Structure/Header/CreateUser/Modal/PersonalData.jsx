import styled from "styled-components";
import { Field } from "../../../../../components/Field";
import { Divider } from "./Divider";
import { useGetPhonesCodesQuery } from "../../../../../store/auth/auth.api";

export const PersonalData = ({ data, onChangeField, errors }) => {
  const { data: phonesCodes } = useGetPhonesCodesQuery();

  return (
    <StyledPersonalData>
      <div className="input-group">
        <Field
          placeholder="Почніть писати"
          label="Ім’я"
          full
          value={data?.first_name}
          onChange={(val) => onChangeField("first_name", val)}
          error={!!errors?.find((e) => e === "first_name")}
        />
        <Field
          placeholder="Почніть писати"
          label="Призвище"
          full
          value={data?.last_name}
          onChange={(val) => onChangeField("last_name", val)}
          error={!!errors?.find((e) => e === "last_name")}
        />
      </div>
      <Divider />
      <Field
        label="Телефон"
        full
        phone
        placeholder="+38 (___) ___-__- __"
        value={data?.phones[0]?.phone}
        onChange={(val) =>
          onChangeField("phones", [{ ...data?.phones[0], phone: val }])
        }
        phoneCode={data?.phones[0]?.code}
        onChangePhoneCode={(cod) =>
          onChangeField("phones", [{ ...data?.phones[0], code: cod }])
        }
        phonesCodes={phonesCodes}
        noResetValueOnCodeChange
        error={!!errors?.find((e) => e === "phones")}
      />
      <Divider />
      <Field
        placeholder="Почніть писати"
        label="Пошта"
        full
        value={data?.email}
        onChange={(val) => onChangeField("email", val)}
        error={!!errors?.find((e) => e === "email")}
      />
      <Divider />
      <Field
        placeholder="Почніть писати"
        label="Пароль"
        full
        value={data?.password}
        onChange={(val) => onChangeField("password", val)}
        error={!!errors?.find((e) => e === "password")}
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
`;
