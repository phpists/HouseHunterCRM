import styled from "styled-components";
import { ReactComponent as GridIcon } from "../../assets/images/grid.svg";
import { ReactComponent as UsersIcon } from "../../assets/images/users.svg";
import { ReactComponent as MegaphoneIcon } from "../../assets/images/megaphone.svg";
import { ReactComponent as HomeIcon } from "../../assets/images/home-sidebar.svg";
import { ReactComponent as MarketIcon } from "../../assets/images/market.svg";
import { ReactComponent as CalendarIcon } from "../../assets/images/calendar.svg";
import { ReactComponent as CopyIcon } from "../../assets/images/copy.svg";
import { ReactComponent as PhoneIcon } from "../../assets/images/phone-menu.svg";
import { ReactComponent as RocketIcon } from "../../assets/images/BiRocket.svg";
import { NavBarItem } from "./NavBarItem";
import { handleCheckAccess } from "../../utilits";
import { useAppSelect } from "../../hooks/redux";
import { useGetCompanyInfoQuery } from "../../store/billing/billing.api";
import { XHOUSE_COMPANY_ID } from "../../constants";

export const NavBar = ({ accessData }) => {
  const { user } = useAppSelect((state) => state.auth);
  const { data: companyInfo } = useGetCompanyInfoQuery();

  const LINKS = [
    { icon: GridIcon, link: "/", title: "Дашборд" },
    ...(handleCheckAccess(accessData, "clients", "view")
      ? [
          {
            icon: UsersIcon,
            link: "/clients",
            title: "Клієнти",
            childrenLinks: ["client"],
          },
        ]
      : []),
    ...(handleCheckAccess(accessData, "objects", "view")
      ? [
          {
            icon: HomeIcon,
            link: "/objects",
            title: "Об'єкти",
            childrenLinks: ["create-object", "edit-object"],
          },
        ]
      : []),
    ...(handleCheckAccess(accessData, "requests", "view")
      ? [
          {
            icon: MegaphoneIcon,
            link: "/requests",
            title: "Запити",
            childrenLinks: ["create-request", "edit-request", "selections"],
          },
        ]
      : []),
    ...(handleCheckAccess(accessData, "structure", "view")
      ? [
          {
            icon: CopyIcon,
            link: "/structure",
            title: "Структура",
            childrenLinks: [],
          },
        ]
      : []),
    ...(handleCheckAccess(accessData, "calls", "view")
      ? [
          {
            icon: PhoneIcon,
            link: "/calls",
            title: "Ліди",
            childrenLinks: [],
          },
        ]
      : []),
    ...(XHOUSE_COMPANY_ID.includes(companyInfo?.data?.id_hash)
      ? [
          {
            icon: RocketIcon,
            link: "/advertising",
            title: "Реклама",
            childrenLinks: ["advertising-setting"],
          },
        ]
      : []),
    ...(XHOUSE_COMPANY_ID.includes(companyInfo?.data?.id_hash)
      ? [
          {
            icon: RocketIcon,
            link: "/ad",
            title: "Реклама 2",
            childrenLinks: ["edit-ad"],
            className: "red",
          },
        ]
      : []),
  ];

  return (
    <StyledNavBar>
      {LINKS.map(({ icon, link, title, childrenLinks = [], className }, i) => (
        <NavBarItem
          key={i}
          Icon={icon}
          link={link}
          title={title}
          childrenLinks={childrenLinks}
          className={className}
        />
      ))}
    </StyledNavBar>
  );
};

const StyledNavBar = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;
