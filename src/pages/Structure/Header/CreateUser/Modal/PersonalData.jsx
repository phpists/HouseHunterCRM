import styled from "styled-components";
import { Field } from "../../../../../components/Field";
import { Divider } from "./Divider";
import { useGetPhonesCodesQuery } from "../../../../../store/auth/auth.api";
import { Phones } from "../../../../../components/UserInfoCard/Phones/Phones";

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
        noResetValueOnCodeChange
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
  background: var(--bg-10);
  text-align: left;
  .input-group {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 6px;
  }
`;
