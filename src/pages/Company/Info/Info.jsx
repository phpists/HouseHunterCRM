import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { About } from "./About/About";
import { Cards } from "./Cards/Cards";
import { Address } from "./Address";
import { WebSite } from "./WebSite";
import { TarifHeader } from "./TarifHeader/TarifHeader";

export const Info = ({ tarifOpen, onCloseTarif }) => {
  return (
    <StyledInfo>
      <TarifHeader onCloseTarif={onCloseTarif} tarifOpen={tarifOpen} />
      <div className="info-content">
        <Header tarifOpen={tarifOpen} />
        {!tarifOpen && (
          <>
            <About />
            <Cards />
          </>
        )}
      </div>
      {!tarifOpen && (
        <div className="flex items-center">
          <Address />
          <WebSite />
        </div>
      )}
    </StyledInfo>
  );
};

const StyledInfo = styled.div`
  background: #323232;
  box-shadow: 0px 3px 32px 0px rgba(0, 0, 0, 0.22);
  margin-bottom: 30px;
  .info-content {
    padding: 16px;
  }
`;
