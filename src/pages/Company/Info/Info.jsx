import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { About } from "./About/About";
import { Cards } from "./Cards/Cards";
import { Address } from "./Address";
import { WebSite } from "./WebSite";
import { TarifHeader } from "./TarifHeader/TarifHeader";
import {
  useGetCompanyInfoQuery,
  useLazyEditCompanyInfoQuery,
} from "../../../store/billing/billing.api";
import { handleResponse, showAlert } from "../../../utilits";
import { useEffect } from "react";
import { useActions } from "../../../hooks/actions";

export const Info = ({ tarifOpen, onCloseTarif }) => {
  const [editCompany] = useLazyEditCompanyInfoQuery();
  const { data, refetch } = useGetCompanyInfoQuery();
  const { saveCompanyPhoto } = useActions();

  const handleEditCompanyField = (fieldName, value) => {
    const formData = new FormData();
    const updatedData = {
      action: "update_company_info",
      mod: "profile",
      company_name: data?.data?.company_name ?? "-",
      web_site_copmany: data?.data?.web_site_copmany ?? "-",
      registration_adress: data?.data?.registration_adress ?? "-",
      years_the_market: data?.data?.years_the_market ?? "-",
      description_copmany: data?.data?.description_copmany ?? "-",
      [fieldName]: value,
    };

    Object.entries(updatedData).forEach((field) =>
      formData.append(field[0], field[1])
    );

    editCompany(formData).then((resp) =>
      handleResponse(resp, () => {
        showAlert("success", "Зміни успішно збережено");
        refetch();
      })
    );
  };

  useEffect(() => {
    if (data) {
      saveCompanyPhoto(
        data?.data?.copmany_img?.length > 0 ? data?.data?.copmany_img : null
      );
    }
  }, [data]);

  return (
    <StyledInfo>
      <TarifHeader onCloseTarif={onCloseTarif} tarifOpen={tarifOpen} />
      <div className="info-content">
        <Header
          tarifOpen={tarifOpen}
          data={data?.data}
          onEdit={handleEditCompanyField}
          onRefreshData={refetch}
        />
        {!tarifOpen && (
          <>
            <About
              value={data?.data?.description_copmany}
              onChange={(val) =>
                handleEditCompanyField("description_copmany", val)
              }
            />
            <Cards data={data?.data} onEdit={handleEditCompanyField} />
          </>
        )}
      </div>
      {!tarifOpen && (
        <div className="flex items-center info-footer">
          <Address
            address={data?.data?.registration_adress}
            onEdit={(val) => handleEditCompanyField("registration_adress", val)}
          />
          <WebSite
            webSite={data?.data?.web_site_copmany ?? "-"}
            onEdit={(val) => handleEditCompanyField("web_site_copmany", val)}
          />
        </div>
      )}
    </StyledInfo>
  );
};

const StyledInfo = styled.div`
  background: var(--dark-card-bg);
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
