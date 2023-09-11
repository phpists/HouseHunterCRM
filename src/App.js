import { styled } from "styled-components";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Header } from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Company } from "./pages/Company/Company";
import { Auth } from "./pages/Auth/Auth";
import { Clients } from "./pages/Clients/Clients";
import { Client } from "./pages/Client/Client";
import { Object } from "./pages/Object/Object";
import { Request } from "./pages/Request/Request";
import { Objects } from "./pages/Objects/Objects";

export const App = () => {
  //   const navigate = useNavigate();
  const [loggined, setLoggined] = useState(true);

  //   useEffect(() => {
  //     loggined && navigate("/company");
  //   }, [loggined]);

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
              <Route path="/object/:id" element={<Object />} />
              <Route path="/object" element={<Object />} />
              <Route path="/objects" element={<Objects />} />
              <Route path="/request" element={<Request />} />
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
