import styled from "styled-components";
import { Arrow } from "../Arrow";
import { MoreButton } from "../../../../../components/MoreButton/MoreButton";

export const ActionsButtons = ({ className }) => (
  <StyledActionsButtons className={`flex flex-col items-center ${className}`}>
    <Arrow />
    <MoreButton className="more-btn" />
  </StyledActionsButtons>
);

const StyledActionsButtons = styled.div`
  width: 24px;
  margin: -48px 0 0 10px;
  flex-shrink: 0;
  @media (max-width: 850px) {
    flex-direction: row;
    margin: 0 0 0 10px;
    width: auto;
  }
  @media (max-width: 1600px) {
    .more-btn {
      opacity: 1;
      transform: translateX(0);
      .dropdown {
        top: 0 !important;
      }
    }
  }
`;
