import styled from "styled-components";
import { Modal } from "../../components/Modal/Modal";
import Comment from "../../assets/images/chat.svg";

export const CommentModal = ({ onClose, comment }) => {
  return (
    <StyledCommentModal>
      <Modal onClose={onClose}>
        <div className="flex justify-center text-xl gap-2 mb-4">
          <div className="relative">
            <div className="absolute top-[-8px] right-[-8px] before:inline-block before:w-2 before:h-2 before:mr-2 before:bg-red-500 before:rounded-full" />
            <img src={Comment} width="28px" height="28px" />
          </div>
          <h1>Коментар</h1>
        </div>

        <div
          className="text bg-[var(--tag-bg-2)] p-2 rounded"
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
