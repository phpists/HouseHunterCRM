import styled from "styled-components";
import { Tag } from "./Tag";

export const Card = ({ open, title, icon }) => (
  <StyledCard className="flex justify-center clickable" open={open}>
    {open && (
      <div className="mr-auto flex items-center clickable">
        <img src={icon} alt="" className="clickable" />
        <div className="title clickable">{title}</div>
      </div>
    )}
    <Tag />
  </StyledCard>
);

const StyledCard = styled.div`
  padding: ${({ open }) => (open ? "10px" : "10px 4px")};
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.04);
  img {
    width: 21px;
    height: 21px;
    margin-right: 8px;
  }
  .title {
    color: #fff;
    font-family: Open Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.28px;
    opacity: 0.6;
    margin-right: 8px;
  }
`;
