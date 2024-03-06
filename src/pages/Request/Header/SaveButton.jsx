import { styled } from "styled-components";
import { Loader } from "../../../components/Loader";

export const SaveButton = ({ className, onClick, loading }) => (
  <StyledSaveButton className={className} onClick={onClick} disabled={loading}>
    {loading ? <Loader white className="save-btn-loader" /> : "Зберегти зміни"}
  </StyledSaveButton>
);

const StyledSaveButton = styled.button`
  color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  font-family: Overpass;
  font-size: 15px;
  font-style: normal;
  font-weight: 200;
  padding: 6px 28px 6px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  opacity: 1;
  border: 1px solid transparent;
  line-height: 118%; /* 17.7px */
  letter-spacing: 0.3px;
  leading-trim: both;
  text-edge: cap;
  height: 32px;
  cursor: pointer;
  transition: all 0.3s;
  margin-right: 20px;
  white-space: nowrap;
  .save-btn-loader {
    width: 18px;
  }
  @media (max-width: 800px) {
    margin-right: 15px;
    width: 100%;
  }
`;
