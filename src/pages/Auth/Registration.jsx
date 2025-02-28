import { styled } from "styled-components";
import { Description } from "./Description";
import { Title } from "./Title";
import { Input } from "./Input";
import arrowIcon from "../../assets/images/arrow.svg";
import { Button } from "../../components/Button";
import {
  useGetPhonesCodesQuery,
  useLazyRegisterQuery,
} from "../../store/auth/auth.api";
import { useEffect, useState } from "react";
import {
  emailValidation,
  handleGetLocationAllPath,
  handleRemovePhoneMask,
  handleResponse,
} from "../../utilits";
import { InfoText } from "./InfoText";
import { Links } from "./Links";
import { AgreeCheckbox } from "./AgreeCheckbox";
import { useGetLocationsQuery } from "../../store/requests/requests.api";
import { Select } from "../../components/Select/Select";

export const Registration = ({ onSuccess, onLogin }) => {
  const [registrate] = useLazyRegisterQuery();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [phoneCode, setPhoneCode] = useState("1");
  const [location, setLocation] = useState("");
  const [agree, setAgree] = useState(false);
  const { data: phonesCodes } = useGetPhonesCodesQuery();
  const { data: locationsList } = useGetLocationsQuery();
  const [formatedLocations, setFormatedLocations] = useState([]);

  const handleFormatLocations = () => {
    const locList = Object.entries(locationsList)?.map((loc) => loc[1]);
    const locations = Object.entries(locationsList)
      .sort((a, b) => Number(b[1].id_parent) - Number(a[1].id_parent))
      ?.map((loc) => loc[1])
      .filter((loc) => Number(loc?.id_parent) === 0)
      .map(({ id, id_parent, name }) => {
        return handleGetLocationAllPath(locList, id, id_parent, name);
      });

    setFormatedLocations(locations);
  };

  useEffect(() => {
    if (locationsList) {
      handleFormatLocations();
    }
  }, [locationsList]);

  const handleChangeEmail = (val) => {
    setEmail(val);
    setErrors({ email: emailValidation(val) });
  };

  const handleChangePhoneCode = (cod) => {
    setPhoneCode(cod);
    setPhone("");
  };

  const handleSubmit = () => {
    const referalId = localStorage.getItem("referalId");
    const data = {
      password,
      id_phone_code: phoneCode,
      phone: handleRemovePhoneMask(phone),
      name,
      mod: "account",
      action: "create",
      email,
      ref_id: referalId ?? undefined,
      id_location: location,
    };

    registrate(data).then((resp) => {
      handleResponse(resp, onSuccess);
    });
  };

  return (
    <StyledRegistration className="flex flex-col items-center">
      <Title title="Зареєструватись" className="mb-1" />
      <Description
        description={
          <>
            Заповніть невелику форму та подайте <br />
            заявку на модерацію, щоб почати <br />
            користуватися сервісом.
          </>
        }
        className="mb-10"
      />
      <Input
        placeholder="Ім’я"
        className="input"
        value={name}
        onChange={(val) => setName(val)}
      />
      <Input
        placeholder="Телефон"
        className="input"
        phone
        value={phone}
        onChange={(val) => setPhone(val)}
        phoneCode={phoneCode}
        onChangePhoneCode={handleChangePhoneCode}
        phonesCodes={phonesCodes}
      />
      <Input
        placeholder="Email"
        className="input"
        value={email}
        onChange={handleChangeEmail}
        error={errors.email}
      />
      <Select
        className="input password-input input-select"
        placeholder="Оберіть локацію"
        options={formatedLocations}
        value={location}
        onChange={(val) => setLocation(val)}
        error={errors.location}
      />
      <Input
        placeholder="Пароль"
        className="input password-input"
        password
        value={password}
        onChange={(val) => setPassword(val)}
      />
      <AgreeCheckbox value={agree} onChange={() => setAgree(!agree)} />
      <Button
        title="Зареєструватись"
        icon={arrowIcon}
        onClick={handleSubmit}
        disabled={
          name?.length === 0 ||
          phone?.includes("_") ||
          phone?.length === 0 ||
          email.length === 0 ||
          password.length === 0 ||
          errors.email ||
          location?.length === 0 ||
          !agree
        }
      />
      <Links />
      <InfoText text="Увійти" onClick={onLogin} className="info-text" />
    </StyledRegistration>
  );
};

const StyledRegistration = styled.div`
  overflow: auto;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: c;
  .input {
    width: 270px;
    margin-bottom: 15px;
  }
  .password-input {
    margin-bottom: 27px;
  }
  .input-select {
    border: 1px solid var(--bg-20);
  }
`;
