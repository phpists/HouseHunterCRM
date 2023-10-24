import styled from "styled-components";
import { Field } from "../Field";
import { Divider } from "./Divider";
import { ProfileField } from "../ProfileField";
import { useGetPhonesCodesQuery } from "../../store/auth/auth.api";

export const PersonalData = ({ data, onChangeField }) => {
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
        />
        <Field
          placeholder="Почніть писати"
          value={data?.last_name ?? ""}
          onChange={(val) => onChangeField("last_name", val)}
          label="Прізвище"
          full
          className="field-wrapper"
        />
      </div>
      <Divider />
      <Field
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
          onChangeField("phones", [{ ...data?.phones[0], code: cod }])
        }
        phonesCodes={phonesCodes}
      />
      <Divider />
      <Field
        value={data?.email ?? ""}
        onChange={(val) => onChangeField("email", val)}
        placeholder="Почніть писати"
        label="Пошта"
        full
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
