import styled from "styled-components";
import { Header } from "./Header/Header";
import { Content } from "./Content/Content";

const AdvertisingSetting = () => {
  return (
    <StyledAdvertisingSetting>
      <Header />
      <Content />
    </StyledAdvertisingSetting>
  );
};

const StyledAdvertisingSetting = styled.div`
  background: var(--dark-card-bg);
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  padding: 15px 20px;
  @media (max-width: 800px) {
    padding: 20px 10px;
  }
  @media (max-width: 800px) {
    padding: 20px 10px;
    width: 100svw;
    margin-left: -23px;
  }
  @media (max-width: 500px) {
    margin-left: -13px;
  }
`;

export default AdvertisingSetting;
