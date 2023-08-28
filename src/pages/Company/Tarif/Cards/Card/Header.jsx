import { Price } from "./Price";
import { ReactComponent as StarIcon } from "../../../../../assets/images/card-star.svg";
import { styled } from "styled-components";
import { ReactComponent as CheckIcon } from "../../../../../assets/images/circle-green-check.svg";

export const Header = ({ price, color, open, paying }) => (
  <StyledHeader className=" flex items-start justify-between" open={open}>
    {paying ? <CheckIcon /> : <StarIcon />}
    <Price price={price} color={paying ? "#2FA112" : color} />
  </StyledHeader>
);

const StyledHeader = styled.div`
  margin-bottom: ${({ open }) => (open ? 29 : 0)}px;
  padding-top: 1px;
  height: ${({ open }) => (open ? 40 : 0)}px;
  opacity: ${({ open }) => (open ? 1 : 0)};
  overflow: hidden;
  transition: all 0.3s;
  svg {
    height: 20px;
    width: 20px;
  }
  g {
    opacity: 1;
  }
`;
