import styled from "styled-components";
import { CopyLink } from "./CopyLink";
import { Comments } from "./Comments";

export const Buttons = () => (
  <StyledButtons className="flex item-center bts">
    <CopyLink />
    <Comments />
  </StyledButtons>
);

const StyledButtons = styled.div`
  margin-top: -48px;
`;
