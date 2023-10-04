import styled from "styled-components";
import { MainInfo } from "../MainInfo/MainInfo";
import { Phones } from "../../../../../components/Phones/Phones";
import { PhoneInfo } from "../PhoneInfo";
import { Objects } from "../Objects/Objects";
import { Comment } from "../../../../../components/Comment";
import { ActionsButtons } from "./ActionsButtons";

export const MobileContent = () => (
  <StyledMobileContent className="flex items-center hide-scroll card">
    <div className="w-full">
      <div className="w-full header-content">
        <div className="w-full row-wrapper">
          <div className="flex items-center main-info-wrapper">
            <div className="flex items-center justify-between w-full">
              <MainInfo />
              <ActionsButtons className="mobile-actions" />
            </div>
            <Phones
              className="mobile-phones-wrapper"
              classNameContent="mobile-phones-content-wrapper"
            />
          </div>
          <PhoneInfo />
        </div>
      </div>
      <div className=" w-full row-wrapper">
        <Objects />
        <Comment />
      </div>
    </div>
    <ActionsButtons className="laptop-actions" />
    {/* <MainInfo />
    <Phones />
    <Divider />
    <PhoneInfo />
    <Divider />
    <Comment />
    <Divider />
    <Objects />
    <div className="flex items-center">
      <MoreButton />
      <Arrow />
    </div> */}
  </StyledMobileContent>
);

const StyledMobileContent = styled.div`
  width: 100%;
  &:hover {
    .arrow svg {
      transform: rotate(0deg);
      opacity: 1;
    }
    .more {
      opacity: 1;
      transform: translateX(0px);
    }
  }

  .row-wrapper {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 8px;
    align-items: center;
  }

  .mobile-phones-content-wrapper {
    width: 30svw;
  }

  .header-content {
    margin-bottom: 8px;
  }

  .mobile-actions {
    display: none;
  }
  @media (min-width: 1600px) {
    display: none;
  }

  @media (max-width: 1000px) {
    .mobile-phones-content-wrapper {
      width: 20svw;
      min-width: 200px;
    }
  }
  @media (max-width: 850px) {
    .row-wrapper {
      grid-template-columns: 1fr;
      gap: 6px;
    }
    .main-info-wrapper {
      flex-direction: column;
      align-items: start;
    }
    .laptop-actions {
      display: none;
    }
    .mobile-actions {
      display: flex;
    }
    .mobile-phones-content-wrapper {
      width: calc(100svw - 99px);
    }
  }
`;
