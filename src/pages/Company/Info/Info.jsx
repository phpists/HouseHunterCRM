import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { About } from "./About/About";
import { Cards } from "./Cards/Cards";
import { Address } from "./Address";
import { WebSite } from "./WebSite";
import { TarifHeader } from "./TarifHeader/TarifHeader";
import { useGetCompanyInfoQuery } from "../../../store/billing/billing.api";

export const Info = ({ tarifOpen, onCloseTarif }) => {
  const { data } = useGetCompanyInfoQuery();

  return (
    <StyledInfo>
      <TarifHeader onCloseTarif={onCloseTarif} tarifOpen={tarifOpen} />
      <div className="info-content">
        <Header tarifOpen={tarifOpen} data={data?.data} />
        {!tarifOpen && (
          <>
            <About />
            <Cards data={data?.data} />
          </>
        )}
      </div>
      {!tarifOpen && (
        <div className="flex items-center info-footer">
          <Address address={data?.data?.registration_adress} />
          <WebSite webSite={data?.data?.web_site_copmany ?? "-"} />
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
  @media (max-width: 600px) {
    .info-footer {
      flex-direction: column;
      text-align: left;
    }
  }
`;
