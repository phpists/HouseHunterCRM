import { styled } from "styled-components";

export const LangCard = ({ title, icon, className }) => (
  <StyledLangCard
    className={`flex items-center justify-between ${className}`}
    icon={icon}
  >
    <span>{title}</span>
    <div />
  </StyledLangCard>
);

const StyledLangCard = styled.div`
  padding: 7px 7px 7px 10px;
  border-radius: 5px;
  background: var(--bg-20);
  backdrop-filter: blur(4.5px);
  cursor: pointer;
  span {
    display: block;
    color: var(--main-color);
    font-family: Lato;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.3px;
    opacity: 0.6;
    margin-right: 7px;
  }
  div {
    width: 22px;
    height: 16px;
    background: url(${({ icon }) => icon}) center/cover no-repeat;
    border-radius: 3px;
    border: 1px solid #fff;
    flex-shrink: 0;
  }
`;
