import styled from "styled-components";
import { ReactComponent as Arrow } from "../../../../assets/images/arrow-right.svg";

export const Closed = ({ onOpen }) => (
  <StyledClosed className="flex items-start justify-between">
    <div className="price">22 000₴</div>
    <Arrow onClick={onOpen} />
  </StyledClosed>
);

const StyledClosed = styled.div`
  padding: 6px;
  .price {
    color: #81fb21;
    leading-trim: both;
    text-edge: cap;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.7; /* 16.52px */
    letter-spacing: 0.28px;
  }
  svg {
    transform: rotate(180deg);
    cursor: pointer;
    &:hover {
      g {
        opacity: 1;
      }
    }
  }
`;
