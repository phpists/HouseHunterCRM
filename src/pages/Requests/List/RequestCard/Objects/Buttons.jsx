import styled from "styled-components";
import { Comments } from "./Comments";
import { CopyLink } from "../../../../../components/CopyLink";

export const Buttons = ({ onOpenChat, idGroup }) => (
  <StyledButtons className="flex item-center bts">
    <CopyLink
      className="copy-btn"
      link={`${window.location.origin}/#/selections/${idGroup}`}
    />
    <Comments onClick={onOpenChat} />
  </StyledButtons>
);

const StyledButtons = styled.div`
  margin-top: -48px;
  .copy-btn {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.18);
    transition: all 0.3s;
    margin-right: 4px;
    padding: 4px;
  }
`;
