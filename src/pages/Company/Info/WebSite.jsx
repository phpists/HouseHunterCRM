import { styled } from "styled-components";
import { ReactComponent as WebsiteIcon } from "../../../assets/images/website.svg";
import editIcon from "../../../assets/images/edit-company.svg";

export const WebSite = () => (
  <StyledWebSite className="flex items-end">
    <WebsiteIcon />
    <span>apple.company.com</span>
    <img src={editIcon} alt="" />
  </StyledWebSite>
);

const StyledWebSite = styled.div`
  padding: 10px 11px 9px;
  color: rgba(255, 255, 255, 0.4);
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  width: 225px;
  transition: all 0.3s;
  flex-shrink: 0;
  cursor: pointer;
  position: relative;
  svg {
    margin-right: 7px;
  }
  g {
    transition: all 0.3s;
  }
  img {
    transition: all 0.3s;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 9px;
    right: 9px;
    transform: translateX(-10px);
  }
  &:hover {
    color: #fff;
    background: rgba(93, 99, 255, 0.1);
    g {
      opacity: 1;
    }
    img {
      opacity: 1;
      visibility: visible;
      transform: translateX(0px);
    }
  }
  @media (max-width: 600px) {
    justify-content: start;
    width: 100%;
    padding: 8px 11px;
  }
`;
