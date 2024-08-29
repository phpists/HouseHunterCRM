import styled from "styled-components";
import callsIcon from "../../../../../assets/images/notification-calls.svg";
import clientsIcon from "../../../../../assets/images/notification-clients.svg";
import requestsIcon from "../../../../../assets/images/notification-requests.svg";
import objectsIcon from "../../../../../assets/images/notification-objects.svg";
import { ReactComponent as CloseIcon } from "../../../../../assets/images/close.svg";

const TYPES = {
  calls: {
    title: "Ліди",
    icon: callsIcon,
  },
  clients: {
    title: "Клієнти",
    icon: clientsIcon,
  },
  requests: {
    title: "Запити",
    icon: requestsIcon,
  },
  objects: {
    title: "Об'єкти",
    icon: objectsIcon,
  },
};

export const Header = ({ type, info, onClose }) => (
  <StyledHeader className="flex items-center justify-between">
    <div className="flex items-center">
      <img src={TYPES[type].icon} alt="" />
      <div className="title">{info ? "" : TYPES[type].title}</div>
    </div>
    <div className="flex items-center">
      {/* <div className="subtitle">18.09.2023</div> */}
      {/* <div className="subtitle">11 хв тому</div> */}
      {/* <CloseIcon onClick={onClose} /> */}
    </div>
  </StyledHeader>
);

const StyledHeader = styled.div`
  padding: 0 10px 10px;
  img {
    height: 18px;
    width: 18px;
    margin-right: 8px;
  }
  .title {
    color: var(--main-color);
    font-feature-settings: "clig" off, "liga" off;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 22px;
  }
  .subtitle {
    color: var(--second-color);
    text-align: right;
    font-feature-settings: "clig" off, "liga" off;
    font-family: Overpass;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: normal;
    margin-right: 8px;
  }
  svg {
    cursor: pointer;
    &:hover {
      g {
        opacity: 1;
      }
    }
  }
`;
