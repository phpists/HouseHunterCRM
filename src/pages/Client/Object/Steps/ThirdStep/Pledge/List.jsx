import { styled } from "styled-components";
import { ReactComponent as UserIcon } from "../../../../../../assets/images/user.svg";
import { Dropdown } from "./Dropdown";

export const List = ({ selected, onSelect }) => (
  <StyledList className="flex items-start">
    <div className="list">
      {selected.map(({ title }) => (
        <div>
          <span>{title}</span> <span className="price">4 000₴</span>
        </div>
      ))}
    </div>
    <UserIcon />
    <Dropdown selected={selected} onSelect={onSelect} />
  </StyledList>
);

const StyledList = styled.button`
  position: relative;
  width: 100%;
  .dropdown {
    top: 0;
  }
  .list {
    border-radius: 9px;
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    margin-right: 14px;
    div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 7px 10px 5px;
      color: #fff;
      font-family: Overpass;
      font-size: 15px;
      font-style: normal;
      font-weight: 300;
      line-height: 118%; /* 17.7px */
      letter-spacing: 0.3px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      text-align: left;
      .price {
        font-weight: 400;
      }
    }
    div:last-child {
      border: none;
    }
  }
  svg {
    flex-shrink: 0;
  }
  &:focus > .dropdown {
    opacity: 1;
    visibility: visible;
  }
`;
