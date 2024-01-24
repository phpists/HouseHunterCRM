import { styled } from "styled-components";
import { Loader } from "../../../components/Loader";

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
  color: #fff;
  text-align: center;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  padding: 8px 30px 6px 28px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  opacity: 1;
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
