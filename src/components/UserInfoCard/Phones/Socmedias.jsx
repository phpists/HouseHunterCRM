import styled from "styled-components";
import { Socmedia } from "../../Socmedia";

export const Socmedias = ({ viber, telegram, onChange }) => (
  <StyledSocmedias>
    <Socmedia
      type="viber"
      active={viber === "1"}
      onClick={() => onChange("viber", viber === "1" ? "0" : "1")}
      className="viber-card"
    />
    <Socmedia
      type="telegram"
      active={telegram === "1"}
      onClick={() => onChange("telegram", telegram === "1" ? "0" : "1")}
    />
  </StyledSocmedias>
);

const StyledSocmedias = styled.div`
  margin-right: 6px;
  .viber-card {
    margin-bottom: 4px;
  }
`;
