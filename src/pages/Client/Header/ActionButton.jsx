import { styled } from "styled-components";

export const ActionButton = ({ title, smallTitle, onClick, className }) => (
  <StyledActionButton className={`${className}`} onClick={onClick}>
    <div className="full">{title}</div>
    <div className="small">{smallTitle ?? title}</div>
  </StyledActionButton>
);

const StyledActionButton = styled.div`
  padding: 8px 18px 6px 17px;
  border-radius: 8px;
  border: var(--second-color-border);
  color: var(--main-color);
  text-align: center;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  opacity: 0.4;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  &:hover {
    background: var(--bg-20);
    opacity: 1;
    border: 1px solid transparent;
  }
  .small {
    display: none;
  }
  @media (max-width: 700px) {
    padding: 8px 14px;
    font-size: 13px;
    margin-right: 12px;
    height: 31px;
    line-height: 1;
    .small {
      display: block;
    }
    .full {
      display: none;
    }
  }
`;
