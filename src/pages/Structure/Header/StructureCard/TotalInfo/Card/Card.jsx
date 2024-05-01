import styled from "styled-components";
import { Tag } from "./Tag";

export const Card = ({ open, title, icon, count }) => (
  <StyledCard className="flex justify-center clickable" open={open}>
    {open && (
      <div className="mr-auto flex items-center clickable">
        <img src={icon} alt="" className="clickable" />
        <div className="title clickable">{title}</div>
      </div>
    )}
    <Tag count={count} />
  </StyledCard>
);

const StyledCard = styled.div`
  padding: ${({ open }) => (open ? "10px" : "10px 4px")};
  border-radius: 9px;
  background: var(--bg-4);
  img {
    width: 21px;
    height: 21px;
    margin-right: 8px;
  }
  .title {
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.28px;
    opacity: 0.6;
    margin-right: 8px;
  }
`;
