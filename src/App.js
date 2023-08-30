import { styled } from "styled-components";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Header } from "./components/Header/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Company } from "./pages/Company/Company";
import { Auth } from "./pages/Auth/Auth";
import { Clients } from "./pages/Clients/Clients";
import { Client } from "./pages/Client/Client";

export const App = () => {
  const navigate = useNavigate();
  const [loggined, setLoggined] = useState(false);

  useEffect(() => {
    loggined && navigate("/company");
  }, [loggined]);

  return (
    <>
      {loggined ? (
        <StyledApp>
          <Sidebar />
          <Header />
          <div className="app-content">
            <Routes>
              <Route path="/clients" element={<Clients />} />
              <Route path="/client/:id" element={<Client />} />
              <Route path="/company" element={<Company />} />
              <Route path="*" element={<></>} />
            </Routes>
          </div>
        </StyledApp>
      ) : (
        <Auth onAuth={() => setLoggined(true)} />
      )}
    </>
  );
};

const StyledApp = styled.div`
  display: grid;
  grid-template-columns: 84px 1fr;
  grid-template-rows: max-content 1fr;
  min-height: 100vh;
  max-width: 2000px;
  width: 100%;
  margin: 0 auto;
  .app-content {
    padding: 0px 42px 40px 40px;
    overflow: auto;
  }
`;
