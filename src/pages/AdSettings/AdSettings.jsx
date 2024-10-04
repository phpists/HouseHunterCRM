import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLazyConnectAccountQuery } from "../../store/auth/auth.api";
import { handleResponse, showAlert } from "../../utilits";
import { Content } from "./Content/Content";
import { Header } from "./Header/Header";
import { useGetAdverstionResourceQuery } from "../../store/objects/objects.api";

const AdSettings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [connectAccount] = useLazyConnectAccountQuery();
  const { data: adverstionResources } = useGetAdverstionResourceQuery();
  const [selectedTemplate, setSelectedTemplate] = useState(
    adverstionResources?.resource?.[0]
  );

  useEffect(() => {
    !selectedTemplate &&
      setSelectedTemplate(adverstionResources?.resource?.[0]);
  }, [adverstionResources]);

  const handleChangeField = (field, value) => {
    setSelectedTemplate({ ...selectedTemplate, [field]: value });
  };

  const handleSelectTemplate = (template) => setSelectedTemplate(template);

  const handleGetSearchValues = () => {
    try {
      return Object.fromEntries(
        location?.search
          ?.replace("?", "")
          ?.split("&")
          ?.map((p) => p?.split("="))
      );
    } catch {
      return {};
    }
  };

  const handleLoginSuccess = () => {
    const { code, state } = handleGetSearchValues();
    if (code && state) {
      connectAccount({ code, state, resource: "olx" }).then((resp) => {
        // navigate("/ad-setting");
        handleResponse(resp, () => {
          showAlert("success", "Успішно авторизовано через olx");
        });
      });
    }
  };

  useEffect(() => {
    if (location.pathname.includes("advertising-login-success")) {
      handleLoginSuccess();
    }
  }, []);

  useEffect(() => {
    if (location?.search?.includes("?type=")) {
      const typeId = location?.search?.replace("?type=", "");
      const type = adverstionResources?.resource?.find((r) => r?.id === typeId);
      if (type) {
        setSelectedTemplate(type);
      }
    }
  }, [adverstionResources]);

  return (
    <StyledAdvertisingSetting>
      <Header selectedTemplate={selectedTemplate} />
      <Content
        resources={adverstionResources?.resource}
        selectedResources={selectedTemplate}
        onChange={handleChangeField}
        onSelect={handleSelectTemplate}
      />
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

export default AdSettings;
