import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { CardTitle } from "./CardTitle";
import { Main } from "./Main/Main";
import { Characteristic } from "./Characteristic/Characteristic";
import { Base } from "./Base/Base";

export const Request = () => {
  return (
    <StyledRequest>
      <Header />
      <div className="request-content">
        <div>
          <CardTitle title="Головне" />
          <Main />
        </div>
        <div>
          <CardTitle title="Технічні характеристики" />
          <Characteristic />
        </div>
        <div>
          <CardTitle title="Вібір бази" />
          <Base />
        </div>
      </div>
    </StyledRequest>
  );
};

const StyledRequest = styled.div`
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  padding: 15px 20px;
  .request-content {
    border-radius: 15px;
    background: #2b2b2b;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }
  .request-card {
    height: calc(100svh - 302px);
    overflow: auto;
    border-radius: 14px;
  }
`;
