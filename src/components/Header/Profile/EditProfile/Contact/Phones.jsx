import { styled } from "styled-components";
import { AddButton } from "./AddButton";
import { useState } from "react";
import { RemoveBtn } from "./RemoveBtn";
import { ProfileField } from "../../../../ProfileField";

export const Phones = () => {
  const [phoneAdded, setPhoneAdded] = useState(false);

  return (
    <StyledPhones>
      <div className="main-phone flex items-center justify-between">
        <ProfileField
          value="+38 (097) 707 62 58"
          label="Номер телефону"
          className="phone-field"
        />
        <AddButton onClick={() => setPhoneAdded(true)} />
      </div>
      {phoneAdded && (
        <div className="main-phone flex items-center justify-between">
          <ProfileField
            value="+38 (097) 707 62 90"
            label="Номер телефону"
            className="phone-field"
          />
          <RemoveBtn onClick={() => setPhoneAdded(false)} />
        </div>
      )}
    </StyledPhones>
  );
};

const StyledPhones = styled.div`
  .phone-field {
    width: 200px;
  }
`;
