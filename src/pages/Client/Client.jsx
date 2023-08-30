import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { Profile } from "./Profile/Profile";
import { Objects } from "./Objects/Objects";
import { useState } from "react";
import { Object } from "./Object/Object";

export const Client = () => {
  const [selectedObject, setSelectedObject] = useState(0);

  return (
    <StyledClient>
      <Header />
      <div className="client-content">
        <Profile />
        <Objects
          selected={selectedObject}
          onSelect={(value) => setSelectedObject(value)}
        />
        <Object />
      </div>
    </StyledClient>
  );
};

const StyledClient = styled.div`
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  padding: 18px 20px 20px;
  .client-content {
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    gap: 20px;
  }
`;
