import { styled } from "styled-components";
import { Phone } from "./Phone/Phone";
import { useState } from "react";
import { Divider } from "./Divider";
import { ProfileField } from "../../../../components/ProfileField";

export const Contact = () => {
  const [phones, setPhones] = useState([]);
  return (
    <StyledContact>
      <Phone isFirst onAdd={() => setPhones([...phones, 1])} />
      {phones.map((phone, i) => (
        <>
          <Divider />
          <Phone onRemove={() => setPhones(phones.filter((p, j) => i !== j))} />
        </>
      ))}
      <Divider />
      <ProfileField value="yuriyo@gmail.com" label="Пошта" />
    </StyledContact>
  );
};

const StyledContact = styled.div`
  padding: 3px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.2);
  margin-bottom: 18px;
`;
