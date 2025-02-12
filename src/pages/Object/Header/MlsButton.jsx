import { styled } from "styled-components";

export const MlsButton = ({ onClick, active }) => (
  <StyledMlsButton
    onClick={onClick}
    className={`flex items-center ${active && "active"}`}
  >
    MLS
  </StyledMlsButton>
);

const StyledMlsButton = styled.button`
  color: var(--main-color);
  text-align: center;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  padding: 8px 15px 6px;
  border-radius: 8px;
  background: var(--bg-20);
  opacity: 0.5;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s;
  margin-right: 10px;
  span {
    margin-left: 5px;
  }
  .loader-wrapper {
    height: 18px;
    width: 100px;
  }
  &.active {
    opacity: 1;
  }
  @media (max-width: 800px) {
    font-size: 13px;
    padding: 8px 14px;
    margin-right: 15px;

    span {
      display: none;
    }
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`;
