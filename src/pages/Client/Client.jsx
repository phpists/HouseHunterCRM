import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { Profile } from "./Profile/Profile";
import { Objects } from "./Objects/Objects";
import { useState } from "react";
import { Object } from "./Object/Object";
import { ProfileMobile } from "./ProfileMobile/ProfileMobile";

export const Client = () => {
  const [selectedObject, setSelectedObject] = useState(0);

  return (
    <StyledClient>
      <Header />
      <div className="client-content hide-scroll">
        <Profile className="item-desktop" />
        <ProfileMobile />
        <Objects
          selected={selectedObject}
          onSelect={(value) => setSelectedObject(value)}
        />
        <Object className="item-desktop" />
      </div>
    </StyledClient>
  );
};

const StyledClient = styled.div`
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  padding: 18px 20px 20px;
  position: relative;
  .client-content {
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    gap: 20px;
  }
  @media (max-width: 1550px) {
    padding: 20px;
    .client-content {
      grid-template-columns: 1fr;
      height: calc(100svh - 250px);
      overflow: auto;
    }

    .item-desktop {
      display: none;
    }
  }

  @media (max-width: 700px) {
    width: 100svw;
    margin-left: -24px;
    padding: 20px 24px;
    .client-content {
      overflow-x: hidden;
    }
  }
`;
