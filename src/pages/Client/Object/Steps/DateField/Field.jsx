import { styled } from "styled-components";

export const Field = ({ value, label, Icon, className, onActive, active }) => (
  <StyledField className={`flex items-center ${className}`}>
    <div className="field-content">
      <div className="value">{value}</div>
      <div className="label">{label}</div>
    </div>
    <button
      className={`flex items-center justify-center ${active && "active"}`}
      onClick={onActive}
    >
      <Icon />
    </button>
  </StyledField>
);

const StyledField = styled.div`
  .field-content {
    margin-right: 15px;
  }
  .value {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 300;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
  .label {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
  button {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border-radius: 8px;
    transition: all 0.3s;
    padding: 6px;
    g {
      transition: all 0.3s;
    }
    &:hover,
    &.active {
      background: rgba(255, 255, 255, 0.2);
    }
    &:hover {
      g {
        opacity: 1;
      }
    }
  }
`;
