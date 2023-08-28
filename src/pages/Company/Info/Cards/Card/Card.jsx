import { styled } from "styled-components";

export const Card = ({
  title,
  subtitle,
  Icon,
  hoverBackground,
  hoverSubtitle,
}) => (
  <StyledCard
    className="flex items-start justify-between card"
    hoverBackground={hoverBackground}
    hoverSubtitle={hoverSubtitle}
  >
    <div>
      <div className="title">{title}</div>
      <div className="subtitle-wrapper">
        <div className="subtitle">{subtitle}</div>
        <div className="subtitle subtitle-hover">{hoverSubtitle}</div>
      </div>
    </div>
    <Icon />
  </StyledCard>
);

const StyledCard = styled.div`
  padding: 8px 8px 9px 9px;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  .title {
    color: #fff;
    font-family: Overpass;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: 118%; /* 23.6px */
    letter-spacing: 0.4px;
  }
  .subtitle {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: 120.182%; /* 13.22px */
    letter-spacing: 0.22px;
    opacity: 0.4;
    transition: all 0.3s;
  }
  .subtitle-wrapper {
    position: relative;
  }
  svg,
  g,
  path {
    transition: all 0.3s;
  }

  .subtitle-hover {
    opacity: 0;
    visibility: hidden;
    transform: translateX(15px);
    position: absolute;
    top: 0;
  }
  &:before {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(${({ hoverBackground }) => hoverBackground}) left/cover
      no-repeat;
    top: 0;
    opacity: 0;
    transition: all 0.3s;
  }

  &:hover {
    .subtitle {
      ${({ hoverSubtitle }) =>
        hoverSubtitle &&
        `
         opacity: 0;
        visibility: hidden;
        transform: translateX(-15px);
      `}
    }
    .subtitle-hover {
      opacity: 1;
      visibility: visible;
      transform: translateX(0px);
      display: block;
    }
    svg,
    g,
    path {
      opacity: 1;
    }
    &:before {
      opacity: 1;
    }
  }
`;
