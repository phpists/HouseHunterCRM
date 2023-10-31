import { styled } from "styled-components";

export const PositionCard = ({
  title,
  value,
  className,
  mainType,
  onChange,
}) => (
  <StyledPositionCard
    className={` flex items-baseline justify-between select-none ${className}`}
  >
    <div className="title">{title}</div>
    <div className="value">
      <input
        value={value}
        type="number"
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {mainType ? <span>{mainType}</span> : null}
    </div>
  </StyledPositionCard>
);

const StyledPositionCard = styled.div`
  padding: 3px 10px 1px 7px;
  border-radius: 7px;
  background: rgba(44, 44, 44, 0.5);
  min-width: 113px;
  transition: all 0.3s;
  border: 1px solid rgba(255, 255, 255, 0);
  .title {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
    margin-right: 15px;
  }
  .value {
    color: #fff;
    text-align: right;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%; /* 16.52px */
    letter-spacing: 0.28px;
    opacity: 0.4;
    transition: all 0.3s;
    input {
      width: 60px;
      margin-right: 10px;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
      }

      &[type="number"] {
        -moz-appearance: textfield; /* Firefox */
      }
    }
  }
  &:hover {
    border: 1px solid rgba(255, 255, 255, 0.2);
    .value {
      opacity: 1;
    }
  }
  span {
    margin-left: 3px;
  }
  @media (max-width: 800px) {
    padding: 4px;
  }
`;
