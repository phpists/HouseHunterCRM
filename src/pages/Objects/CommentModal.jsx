import styled from "styled-components";
import { Modal } from "../../components/Modal/Modal";

export const CommentModal = ({ onClose, comment }) => {
  console.log(comment);
  return (
    <StyledCommentModal>
      <Modal onClose={onClose} title="Коментар">
        <div
          className="text"
          dangerouslySetInnerHTML={{
            __html: comment?.length > 0 ? comment : "Коментар відсутній",
          }}
        ></div>
      </Modal>
    </StyledCommentModal>
  );
};

const StyledCommentModal = styled.div`
  .modal {
    max-width: 500px;
  }
  .text {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%;
    letter-spacing: 0.3px;
    opacity: var(--opacity-ligh);
  }
`;
