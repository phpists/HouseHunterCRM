import { styled } from "styled-components";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Header } from "./components/Header/Header";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
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
import Ad from "./pages/Ad/Ad";
import Settings from "./pages/Settings/Settings";

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
const AdSettings = lazy(() => import("./pages/AdSettings/AdSettings"));

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
  const { data: companyInfo } = useGetCompanyInfoQuery();
  const lastToken = useRef(localStorage.getItem("token"));
  const loadingUser = useRef(false);

  useEffect(() => {
    saveAccess(data);
  }, [data]);

  const handleGetUserData = (noLoading) => {
    loadingUser.current = true;
    getProfile().then((resp) => {
      loginUser(resp?.data?.data);
      lastToken.current = localStorage.getItem("token");
      loadingUser.current = false;
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

  useEffect(() => {
    window.addEventListener("storage", function (event) {
      const currentToken = localStorage.getItem("token");
      if (lastToken.current !== currentToken && !loadingUser.current) {
        handleGetUserData(true);
      }
    });
  }, []);

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
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                d="M8.24332 6L7.87032 8.24673C7.84743 8.38461 7.94065 8.51492 8.07852 8.53781L10.3253 8.91081"
                stroke="#fff"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="white-stroke-svg"
              />
              <path
                d="M8.07146 8.32287C8.8437 7.04095 10.4477 6.36596 11.9879 6.62165C14.0147 6.95814 15.4541 8.91979 15.1108 10.9879C14.7675 13.0559 12.7714 14.4473 10.7446 14.1108C9.38618 13.8853 8.17563 12.9105 7.7269 11.6859"
                stroke="#fff"
                stroke-linecap="round"
                className="white-stroke-svg"
              />
              <g clip-path="url(#clip0_1_23)">
                <path
                  d="M1.68895 0H19.2907C19.7587 0 20.186 0.181731 20.4913 0.484615C20.7965 0.7875 21 1.21154 21 1.67596V15.124C21 15.5885 20.7965 15.9923 20.4913 16.2952C20.186 16.6183 19.7587 16.8 19.2907 16.8H1.68895C1.22093 16.8 0.793605 16.6183 0.488372 16.2952C0.18314 15.9923 0 15.5885 0 15.124V1.67596C0 1.21154 0.18314 0.7875 0.488372 0.484615C0.793605 0.181731 1.22093 0 1.68895 0ZM3.37791 1.35288C3.5814 1.35288 3.72384 1.49423 3.72384 1.67596C3.72384 1.85769 3.5814 2.01923 3.37791 2.01923C3.19477 2.01923 3.05233 1.85769 3.05233 1.67596C3.05233 1.49423 3.19477 1.35288 3.37791 1.35288ZM2.03488 1.35288C2.21802 1.35288 2.36047 1.49423 2.36047 1.67596C2.36047 1.85769 2.21802 2.01923 2.03488 2.01923C1.85174 2.01923 1.68895 1.85769 1.68895 1.67596C1.68895 1.49423 1.85174 1.35288 2.03488 1.35288ZM4.74128 2.01923C4.55814 2.01923 4.39535 1.85769 4.39535 1.67596C4.39535 1.49423 4.55814 1.35288 4.74128 1.35288H8.7907C8.99419 1.35288 9.13663 1.49423 9.13663 1.67596C9.13663 1.85769 8.99419 2.01923 8.7907 2.01923H4.74128ZM0.671512 2.68558H20.3081V1.67596C20.3081 1.39327 20.2064 1.15096 20.0233 0.969231C19.8401 0.7875 19.5756 0.666346 19.2907 0.666346H1.68895C1.40407 0.666346 1.15988 0.7875 0.976744 0.969231C0.793605 1.15096 0.671512 1.39327 0.671512 1.67596V2.68558ZM20.3081 3.35192H0.671512V15.124C0.671512 15.3865 0.793605 15.649 0.976744 15.8308C1.15988 16.0125 1.40407 16.1337 1.68895 16.1337H19.2907C19.5756 16.1337 19.8401 16.0125 20.0233 15.8308C20.2064 15.649 20.3081 15.3865 20.3081 15.124V3.35192Z"
                  fill="#fff"
                  className="white-fill-svg"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_23">
                  <rect width="21" height="21" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Ми оновились, натисніть ctrl+F5
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
                          {handleCheckAccess(data, "calls", "view") &&
                            companyInfo?.data?.id_hash && (
                              <Route
                                path="/calls"
                                element={
                                  <Calls
                                    companyId={companyInfo?.data?.id_hash}
                                  />
                                }
                              />
                            )}
                          {user?.struct_level === 1 && (
                            <Route path="/company" element={<Company />} />
                          )}
                          <Route
                            path="/selections/:id"
                            element={<Selections />}
                          />
                          <Route
                            path="/advertising"
                            element={<Advertising />}
                          />
                          <Route path="/ad" element={<Ad />} />
                          {handleCheckAccess(data, "objects", "view") && (
                            <Route
                              path="/edit-ad/:clientId/:id"
                              element={<ObjectPage />}
                            />
                          )}

                          <Route path="/ad-setting" element={<AdSettings />} />
                          <Route
                            path="/advertising-login-success"
                            element={<AdSettings />}
                          />
                          <Route path="*" element={<Dashboard />} />
                          <Route path="/settings" element={<Settings />} />
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
