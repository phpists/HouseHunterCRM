import styled from "styled-components";
import { ReactComponent as ArrowIcon } from "../../assets/images/arrow-down.svg";

export const Empty = ({ open, onClick }) => (
  <StyledEmpty
    className="flex items-center justify-between"
    open={open}
    onClick={onClick}
  >
    <div>
      <div className="title">Оберіть</div>
      <div className="subtitle">Підпорядкована структура</div>
    </div>
    <ArrowIcon />
  </StyledEmpty>
);

const StyledEmpty = styled.div`
  text-align: left;
  padding: 8px 10px;
  border-radius: 9px;
  transition: all 0.3s;
  .title {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 1px;
  }
  .subtitle {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }

  svg {
    transition: all 0.3s;
    transform: rotate(${({ open }) => (open ? 180 : 0)}deg);
    path {
      fill: #fff;
    }
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    g {
      opacity: 1;
    }
  }

  ${({ open }) =>
    open &&
    `
        border-radius: 9px 9px 0 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.40);
      background: rgba(255, 255, 255, 0.1);
`}
`;
