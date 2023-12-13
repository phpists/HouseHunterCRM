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
import { useGetAccessQuery } from "../../store/auth/auth.api";
import { handleCheckAccess } from "../../utilits";

export const NavBar = () => {
  const { data } = useGetAccessQuery();

  const LINKS = [
    { icon: GridIcon, link: "/" },
    ...(handleCheckAccess(data, "clients", "view")
      ? [{ icon: UsersIcon, link: "/clients" }]
      : []),
    ...(handleCheckAccess(data, "requests", "view")
      ? [{ icon: MegaphoneIcon, link: "/requests" }]
      : []),
    ...(handleCheckAccess(data, "objects", "view")
      ? [{ icon: HomeIcon, link: "/objects" }]
      : []),
    ...(handleCheckAccess(data, "structure", "view")
      ? [{ icon: CopyIcon, link: "/structure" }]
      : []),
    ...(handleCheckAccess(data, "calls", "view")
      ? [{ icon: PhoneIcon, link: "/calls" }]
      : []),
    //   { icon: XbaseIcon, link: "/note" },
    //   { icon: CalendarIcon, link: "/calendar" },
    ,
  ];

  return (
    <StyledNavBar>
      {LINKS.map(({ icon, link }, i) => (
        <NavBarItem key={i} Icon={icon} link={link} />
      ))}
    </StyledNavBar>
  );
};

const StyledNavBar = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;
