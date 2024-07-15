import styled from "styled-components";
import { Loader } from "../../../Loader";

export const SubmitButton = ({ onClick, loading }) => (
  <StyledSubmitButton
    className="flex items-center justify-center"
    onClick={onClick}
    disabled={loading}
  >
    {loading ? <Loader white className="loader" /> : " Рекламувати"}
  </StyledSubmitButton>
);

const StyledSubmitButton = styled.button`
  padding: 0 12px;
  background: #5d63ffb2;
  font-family: Overpass;
  font-size: 15px;
  font-weight: var(--font-weight-200);
  color: var(--color-2);
  line-height: 17.7px;
  letter-spacing: 0.02em;
  border-radius: 8px;
  height: 38px;
  .loader {
    height: 25px;
    width: 94px;
  }
`;
