import { styled } from "styled-components";
import { Divider } from "./Divider";
import { Phones } from "../../../components/Phones/Phones";
import { Socmedia } from "../../../components/Socmedia";
import { useState } from "react";

export const Contacts = () => {
  const [viber, setViber] = useState(false);
  const [telegram, setTelegram] = useState(false);

  return (
    <StyledContacts>
      <div className="title">Контакти клієнта</div>
      <div className="flex items-center">
        <div className="client-info">
          <div className="name">Юрій Олексійович</div>
          <div className="label">Клієнт</div>
        </div>
        <Divider />
        <div className="socmedias">
          <Socmedia
            type="viber"
            active={true}
            onClick={() => setViber(!viber)}
            className="viber-card"
            open
          />
          <Socmedia
            type="telegram"
            active={true}
            onClick={() => setTelegram(!telegram)}
            open
          />
        </div>
        <Phones top />
      </div>
    </StyledContacts>
  );
};

const StyledContacts = styled.div`
  padding: 10px 15px;
  border-radius: 10px;
  background: #3d3d3d;
  .title {
    color: #fff;
    font-family: Overpass;
    font-size: 20px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 23.6px */
    letter-spacing: 0.4px;
    opacity: 0.4;
    margin-bottom: 15px;
  }
  .name {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
  }
  .label {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  .socmedias {
    display: grid;
    grid-template-columns: max-content;
    gap: 3px;
    margin-right: 10px;
  }
`;
