import { styled } from "styled-components";
import { Loader } from "../../../../components/Loader";

export const SaveButton = ({ onClick, loading }) => (
  <StyledSaveButton
    onClick={onClick}
    className="flex items-center"
    disabled={loading}
  >
    {loading ? (
      <Loader white className="loader-wrapper" />
    ) : (
      <>
        Зберегти <span>зміни</span>
      </>
    )}
  </StyledSaveButton>
);

const StyledSaveButton = styled.button`
  color: var(--main-color);
  text-align: center;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: var(--font-weight-200);
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  padding: 10px 28px;
  height: 32px;
  border-radius: 8px;
  background: var(--bg-20);
  opacity: 1;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s;
  span {
    margin-left: 5px;
  }
  .loader-wrapper {
    height: 18px;
    width: 100px;
  }

  @media (max-width: 800px) {
    font-size: 13px;
    padding: 8px 14px;

    span {
      display: none;
    }
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
`;
