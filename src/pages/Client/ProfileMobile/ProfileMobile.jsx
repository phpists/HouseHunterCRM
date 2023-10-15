import styled from "styled-components";
import { Phones } from "../../../components/Phones/Phones";
import { ReactComponent as Arrow } from "../../../assets/images/welcome-step-arrow.svg";
import { useState } from "react";
import { ProfileModal } from "./ProfileModal";
import { UserCard } from "../Profile/Header/UserCard";
import maskBackground from "../../../assets/images/auth-shape-mask.svg";

export const ProfileMobile = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledProfileMobile
        maskBackground={maskBackground}
        className="wrapper"
        onClick={(e) => e.target.classList.contains("wrapper") && setOpen(true)}
      >
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <div className="main-ptofile-info flex items-center">
            <UserCard />
            <Phones classNameContent="phones-wrapper" />
          </div>
          <Arrow className="profile-mobile-arrow" />
        </div>
      </StyledProfileMobile>
      {open && <ProfileModal onClose={() => setOpen(false)} />}
    </>
  );
};

const StyledProfileMobile = styled.div`
  margin: 5px 0 0px;
  padding: 10px;
  border-radius: 15px;
  background: #3d3d3d;
  position: relative;
  .main-ptofile-info {
    gap: 10px;
    cursor: pointer;
  }
  .phones-wrapper {
    width: 229px;
  }
  .profile-mobile-arrow {
    width: 24px;
    height: 24px;
    path {
      fill-opacity: 0.4;
      transition: all 0.3s;
    }
  }
  &:hover {
    .profile-mobile-arrow {
      path {
        fill-opacity: 1;
      }
    }
  }
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: url(${({ maskBackground }) => maskBackground}) center/cover
      no-repeat;
    background-size: 120%;
    background-position: -198px -557px;
  }

  @media (min-width: 1400px) {
    display: none;
  }
  @media (max-width: 700px) {
    .main-ptofile-info {
      flex-direction: column;
      gap: 10px;
    }

    .profile-mobile-arrow {
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
`;
