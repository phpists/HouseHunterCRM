import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useLazyConnectAccountQuery } from "../../store/auth/auth.api";
import { handleResponse } from "../../utilits";
import { Content } from "./Content/Content";
import { Header } from "./Header/Header";

const AdvertisingSetting = () => {
  const location = useLocation();
  const [connectAccount] = useLazyConnectAccountQuery();
  const [templates, setTemplates] = useState([{}]);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  const handleCreateTemplate = () => {
    setTemplates([...templates, { id: templates?.length }]);
  };

  const handleChangeField = (field, value) => {
    setSelectedTemplate({ ...selectedTemplate, [field]: value });
    setTemplates(
      templates?.map((t) =>
        t.id === selectedTemplate?.id ? { ...t, [field]: value } : t
      )
    );
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
      connectAccount({ code, state, resource: "olx" }).then((resp) =>
        handleResponse(resp, () => {
          cogoToast.success("Успішно авторизовано через olx", {
            hideAfter: 3,
            position: "top-right",
          });
        })
      );
    }
  };

  useEffect(() => {
    if (location.pathname.includes("advertising-login-success")) {
      handleLoginSuccess();
    }
  }, []);

  return (
    <StyledAdvertisingSetting>
      <Header selectedTemplate={selectedTemplate} />
      <Content
        templates={templates}
        selectedTemplate={selectedTemplate}
        onChange={handleChangeField}
        onCreate={handleCreateTemplate}
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

export default AdvertisingSetting;
