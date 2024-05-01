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
    background: var(--card-bg-2);
    margin-right: 14px;
    div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      padding: 7px 10px 5px;
      color: var(--main-color);
      font-family: Overpass;
      font-size: 15px;
      font-style: normal;
      font-weight: var(--font-weight-100);
      line-height: 118%; /* 17.7px */
      letter-spacing: 0.3px;
      border-bottom: 1px solid var(--bg-10);
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
