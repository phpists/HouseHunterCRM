import { styled } from "styled-components";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Header } from "./components/Header/Header";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { useGetAccessQuery, useLazyGetUserQuery } from "./store/auth/auth.api";
import { useActions } from "./hooks/actions";
import { useAppSelect } from "./hooks/redux";
import { Loading } from "./components/Loading/Loading";
import { handleCheckAccess, handleSetTheme } from "./utilits";
import { useGetCompanyInfoQuery } from "./store/billing/billing.api";
import { ErrorBoundary } from "react-error-boundary";
import { Loader } from "./components/Loader";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { License } from "./pages/License";
import { CookiePolicy } from "./pages/CookiePolicy";

const Company = lazy(() => import("./pages/Company/Company"));
const Auth = lazy(() => import("./pages/Auth/Auth"));
const Client = lazy(() => import("./pages/Client/Client"));
const Clients = lazy(() => import("./pages/Clients/Clients"));
const ObjectPage = lazy(() => import("./pages/Object/Object"));
const Request = lazy(() => import("./pages/Request/Request"));
const Objects = lazy(() => import("./pages/Objects/Objects"));
const Requests = lazy(() => import("./pages/Requests/Requests"));
const Structure = lazy(() => import("./pages/Structure/Structure"));
const Calls = lazy(() => import("./pages/Calls/Calls"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Selections = lazy(() => import("./pages/Selections/Selections"));
const Advertising = lazy(() => import("./pages/Advertising/Advertising"));
const AdvertisingSetting = lazy(() =>
  import("./pages/AdvertisingSetting/AdvertisingSetting")
);

export const App = () => {
  const [getProfile] = useLazyGetUserQuery();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const { loginUser, saveCompanyPhoto, saveAccess, changeTheme } = useActions();
  const { user } = useAppSelect((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const { data, refetch } = useGetAccessQuery(null, { skip: !user });
  const { data: companyInfo, refetch: refetchCompanyInfo } =
    useGetCompanyInfoQuery();

  useEffect(() => {
    saveAccess(data);
  }, [data]);

  const handleGetUserData = (noLoading) => {
    getProfile().then((resp) => {
      loginUser(resp?.data?.data);
      if (!noLoading) {
        setLoad(true);
        setTimeout(() => setLoading(false), 1500);
        data && refetch();
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (
      !token &&
      location.pathname !== "/auth" &&
      !location.pathname.includes("/info")
    ) {
      navigate("/auth");
      setLoad(true);
      setTimeout(() => setLoading(false), 1500);
    } else if (token && !user) {
      handleGetUserData();
    } else {
      setLoad(true);
      setTimeout(() => setLoading(false), 1500);
    }
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    setSideBarOpen(false);
  }, [location]);

  useEffect(() => {
    if (companyInfo) {
      saveCompanyPhoto(
        companyInfo?.data?.copmany_img?.length > 0
          ? companyInfo?.data?.copmany_img
          : null
      );
    } // eslint-disable-next-line
  }, [companyInfo]);

  const handleRefreshData = () => {
    try {
      navigator?.serviceWorker?.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });
    } catch {}
    localStorage.removeItem("modalClosed");
    localStorage.removeItem("clientsFilters");
    localStorage.removeItem("objectsLastFilters");
    localStorage.removeItem("requestFilter");
    localStorage.removeItem("callsFilter");

    try {
      caches.keys().then((names) => {
        for (let name of names) caches.delete(name);
      });
      setTimeout(() => {
        window.location.reload(true);
      }, 1000);
    } catch {
      window.location.reload(true);
    }
  };

  const handleClearCacheData = () => {
    fetch("/meta.json")
      ?.then((res) => res.json())
      ?.then((resp) => {
        const buildDate = resp?.buildDate;
        const lastUpdate = localStorage.getItem("buildDate");
        const isNewBuild = Number(buildDate) > Number(lastUpdate);

        if (lastUpdate && isNewBuild) {
          handleRefreshData();
        } else if (!lastUpdate) {
          handleRefreshData();
        }

        localStorage.setItem("buildDate", buildDate);
      });
  };

  const handleSetInitTheme = () => {
    const prevTheme = localStorage.getItem("theme") ?? "dark";
    handleSetTheme(prevTheme);
    changeTheme(prevTheme);
  };
  useEffect(() => {
    handleClearCacheData();
    document.addEventListener("gesturestart", function (e) {
      e.preventDefault();
    });
    handleSetInitTheme();
  }, []);

  return (
    <>
      <ErrorBoundary
        fallback={
          <div className="error-wrapper">
            <svg
              fill="var(--dark-90)"
              viewBox="0 0 30 30"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M11.514 13c-.45 0-.688.54-.363.857l3.143 3.14-3.146 3.146c-.455.436.255 1.177.707.707L15 17.705l3.146 3.145c.452.47 1.162-.27.707-.707l-3.146-3.145 3.142-3.14c.324-.318.087-.858-.364-.858-.13.004-.253.058-.344.15L15 16.29l-3.142-3.14c-.09-.092-.214-.146-.344-.15zM2.5 8h25c.277 0 .5.223.5.5s-.223.5-.5.5h-25c-.277 0-.5-.223-.5-.5s.223-.5.5-.5zM7 6.5a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5zm-2 0a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5zm-2 0a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5.5.5 0 0 1 .5.5zM1.5 4C.678 4 0 4.678 0 5.5v19c0 .822.678 1.5 1.5 1.5h27c.822 0 1.5-.678 1.5-1.5v-19c0-.822-.678-1.5-1.5-1.5h-27zm0 1h27c.286 0 .5.214.5.5v19c0 .286-.214.5-.5.5h-27c-.286 0-.5-.214-.5-.5v-19c0-.286.214-.5.5-.5z"></path>
              </g>
            </svg>
            Системний збій
          </div>
        }
      >
        <Routes>
          <Route path="/info/privacy" element={<Privacy />} />
          <Route path="/info/terms" element={<Terms />} />
          <Route path="/info/license" element={<License />} />
          <Route path="/info/cookie-policy" element={<CookiePolicy />} />
          <Route
            path="*"
            element={
              <>
                {loading ? (
                  <Loading load={load} />
                ) : user ? (
                  <StyledApp>
                    <Sidebar
                      sidebarOpen={sidebarOpen}
                      onClose={() => setSideBarOpen(false)}
                      accessData={data}
                    />
                    <Header onOpenSidebar={() => setSideBarOpen(true)} />
                    <div className="app-content">
                      <Suspense
                        fallback={
                          <div className="page-load">
                            <Loader white />
                          </div>
                        }
                      >
                        <Routes>
                          <Route
                            path="/"
                            element={
                              <Dashboard
                                isClientsAccess={handleCheckAccess(
                                  data,
                                  "clients",
                                  "view"
                                )}
                              />
                            }
                          />
                          <Route path="/empty" element={<Dashboard />} />
                          {handleCheckAccess(data, "clients", "view") && (
                            <Route path="/clients" element={<Clients />} />
                          )}
                          {handleCheckAccess(data, "clients", "view") && (
                            <Route path="/client/:id" element={<Client />} />
                          )}

                          {handleCheckAccess(data, "objects", "view") && (
                            <Route
                              path="/create-object/:clientId"
                              element={<ObjectPage />}
                            />
                          )}
                          {handleCheckAccess(data, "objects", "view") &&
                            handleCheckAccess(data, "objects", "edit") && (
                              <Route
                                path="/edit-object/:clientId/:id"
                                element={<ObjectPage />}
                              />
                            )}
                          {handleCheckAccess(data, "objects", "view") && (
                            <Route path="/objects" element={<Objects />} />
                          )}
                          {handleCheckAccess(data, "objects", "view") && (
                            <Route path="/objects/:id" element={<Objects />} />
                          )}
                          {handleCheckAccess(data, "requests", "view") && (
                            <Route
                              path="/create-request/:clientId"
                              element={<Request />}
                            />
                          )}
                          {handleCheckAccess(data, "requests", "view") && (
                            <Route
                              path="/edit-request/:clientId/:id"
                              element={<Request />}
                            />
                          )}
                          {handleCheckAccess(data, "requests", "view") && (
                            <Route path="/requests" element={<Requests />} />
                          )}
                          {handleCheckAccess(data, "structure", "view") && (
                            <Route path="/structure" element={<Structure />} />
                          )}
                          {handleCheckAccess(data, "calls", "view") && (
                            <Route path="/calls" element={<Calls />} />
                          )}
                          {user?.struct_level === 1 && (
                            <Route path="/company" element={<Company />} />
                          )}
                          <Route
                            path="/selections/:id"
                            element={<Selections />}
                          />
                          {companyInfo?.data?.id_hash ===
                          "ae191c45f814262d747cf24d7f3799fd" ? (
                            <>
                              <Route
                                path="/advertising"
                                element={<Advertising />}
                              />
                              <Route
                                path="/advertising-setting"
                                element={<AdvertisingSetting />}
                              />
                              <Route
                                path="/advertising-login-success"
                                element={<AdvertisingSetting />}
                              />
                            </>
                          ) : null}
                          <Route path="*" element={<Dashboard />} />
                        </Routes>
                      </Suspense>
                    </div>
                  </StyledApp>
                ) : (
                  <Auth />
                )}
              </>
            }
          />
        </Routes>
      </ErrorBoundary>
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
    overflow-x: hidden;
  }

  .page-load {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
    svg {
      height: 50px;
    }
  }
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    .app-content {
      padding: 0px 24px 40px;
    }
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    .app-content {
      padding: 0px 10px 10px;
    }
  }
`;
