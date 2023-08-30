import { styled } from "styled-components";
import { Socmedia } from "./Socmedia";
import { useState } from "react";
import { ProfileField } from "../../../../../components/ProfileField";
import { AddButton } from "./AddButton";
import { RemoveBtn } from "./RemoveBtn";

export const Phone = ({ isFirst, onRemove, onAdd }) => {
  const [viber, setViber] = useState(false);
  const [telegram, setTelegram] = useState(false);

  return (
    <StyledPhone className="flex items-center">
      <div className="socmedias">
        <Socmedia
          type="viber"
          active={viber}
          onClick={() => setViber(!viber)}
          className="viber-card"
        />
        <Socmedia
          type="telegram"
          active={telegram}
          onClick={() => setTelegram(!telegram)}
        />
      </div>
      <ProfileField
        value="+38 (097) 707 62 58"
        label="Телефон"
        className="w-full mr-1.5"
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
  .socmedias {
    margin-right: 3px;
  }
  .viber-card {
    margin-bottom: 3px;
  }
`;
