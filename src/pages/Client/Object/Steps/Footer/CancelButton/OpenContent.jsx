import { styled } from "styled-components";
import { Comment } from "../../Comment";
import { Footer } from "./Footer";

export const OpenContent = ({ onChangeActive, onClose }) => (
  <StyledOpenContent>
    <div className="content-wrapper">
      <Comment label="Чому" />
    </div>
    <Footer onChangeActive={onChangeActive} onClose={onClose} />
  </StyledOpenContent>
);

const StyledOpenContent = styled.div`
  .content-wrapper {
    text-align: left;
    padding: 0 3px 2px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
`;
