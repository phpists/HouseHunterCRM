import { styled } from "styled-components";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Header } from "./components/Header/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Company } from "./pages/Company/Company";
import { Auth } from "./pages/Auth/Auth";
import { Clients } from "./pages/Clients/Clients";
import { Client } from "./pages/Client/Client";
import { Object } from "./pages/Object/Object";
import { Request } from "./pages/Request/Request";
import { Objects } from "./pages/Objects/Objects";
import { Requests } from "./pages/Requests/Requests";
import { Structure } from "./pages/Structure/Structure";
import { Calls } from "./pages/Calls/Calls";
import { Dashboard } from "./pages/Dashboard/Dashboard";

export const App = () => {
  const location = useLocation();
  const [sidebarOpen, setSideBarOpen] = useState(false);

  //   const navigate = useNavigate();
  const [loggined, setLoggined] = useState(true);

  //   useEffect(() => {
  //     loggined && navigate("/company");
  //   }, [loggined]);

  useEffect(() => {
    setSideBarOpen(false);
  }, [location]);

  return (
    <>
      {loggined ? (
        <StyledApp>
          <Sidebar
            sidebarOpen={sidebarOpen}
            onClose={() => setSideBarOpen(false)}
          />
          <Header onOpenSidebar={() => setSideBarOpen(true)} />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/empty" element={<Dashboard />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/client/:id" element={<Client />} />
              <Route path="/object/:id" element={<Object />} />
              <Route path="/object" element={<Object />} />
              <Route path="/objects" element={<Objects />} />
              <Route path="/request" element={<Request />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/structure" element={<Structure />} />
              <Route path="/company" element={<Company />} />
              <Route path="/calls" element={<Calls />} />
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
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    .app-content {
      padding: 0px 24px 40px;
    }
  }
`;
