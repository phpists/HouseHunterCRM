import styled from "styled-components";
import { ReactComponent as GridIcon } from "../../assets/images/grid.svg";
import { ReactComponent as UsersIcon } from "../../assets/images/users.svg";
import { ReactComponent as MegaphoneIcon } from "../../assets/images/megaphone.svg";
import { ReactComponent as HomeIcon } from "../../assets/images/home-sidebar.svg";
import { ReactComponent as XbaseIcon } from "../../assets/images/xbase.svg";
import { ReactComponent as CalendarIcon } from "../../assets/images/calendar.svg";
import { ReactComponent as CopyIcon } from "../../assets/images/copy.svg";
import { ReactComponent as PhoneIcon } from "../../assets/images/phone-menu.svg";
import { NavBarItem } from "./NavBarItem";
import { handleCheckAccess } from "../../utilits";

export const NavBar = ({ accessData }) => {
  const LINKS = [
    { icon: GridIcon, link: "/" },
    ...(handleCheckAccess(accessData, "clients", "view")
      ? [{ icon: UsersIcon, link: "/clients", childrenLinks: ["client"] }]
      : []),
    ...(handleCheckAccess(accessData, "objects", "view")
      ? [{ icon: HomeIcon, link: "/objects", childrenLinks: ["create-object"] }]
      : []),
    ...(handleCheckAccess(accessData, "requests", "view")
      ? [
          {
            icon: MegaphoneIcon,
            link: "/requests",
            childrenLinks: ["edit-request"],
          },
        ]
      : []),
    ...(handleCheckAccess(accessData, "structure", "view")
      ? [{ icon: CopyIcon, link: "/structure", childrenLinks: [] }]
      : []),
    ...(handleCheckAccess(accessData, "calls", "view")
      ? [{ icon: PhoneIcon, link: "/calls", childrenLinks: [] }]
      : []),
    //   { icon: XbaseIcon, link: "/note" },
    //   { icon: CalendarIcon, link: "/calendar" },
    ,
  ];

  return (
    <StyledNavBar>
      {LINKS.map(({ icon, link, childrenLinks = [] }, i) => (
        <NavBarItem
          key={i}
          Icon={icon}
          link={link}
          childrenLinks={childrenLinks}
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
