import { styled } from "styled-components";
import { ReactComponent as Icon } from "../../../assets/images/reply.svg";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import noPhoto from "../../../assets/images/no-photo.svg";
import closeIcon from "../../../assets/images/close-circle.svg";

export const SelectedMessage = ({
  selectedMessage,
  onCloseSelectedMessage,
  rieltorName,
  loading,
}) => {
  const controls = useAnimationControls();
  const isOwner = selectedMessage.user === 0;
  const isPhoto =
    selectedMessage?.messege?.img || selectedMessage?.messege?.title;

  useEffect(() => {
    controls.start({ opacity: 1, translateY: 0 });
  }, []);

  const handleClose = () => {
    controls.start({ opacity: 0, translateY: 20 });
    setTimeout(onCloseSelectedMessage, 400);
  };

  return (
    <StyledSelectedMessage
      animate={controls}
      transition={{
        type: "linear",
        stiffness: 260,
        damping: 30,
      }}
      initial={{ translateY: 20, opacity: 0 }}
      isOwner={isOwner}
      isPhoto={isPhoto}
      photo={
        selectedMessage?.messege?.img?.length > 0
          ? selectedMessage?.messege?.img
          : noPhoto
      }
      className="flex items-center"
    >
      <Icon className="reply-icon" />
      <div className="selected-msg-content flex items-center justify-between">
        <div className="flex items-center">
          {isPhoto && <div className="photo" />}
          <div>
            <div className="name">{isOwner ? "Ви" : rieltorName}</div>
            <span>{isPhoto ? "Фотографія" : selectedMessage?.messege}</span>
          </div>
        </div>
      </div>
      <img
        src={closeIcon}
        alt=""
        onClick={() => (loading ? null : handleClose())}
        className="close"
      />
    </StyledSelectedMessage>
  );
};

const StyledSelectedMessage = styled(motion.div)`
  position: absolute;
  bottom: 100%;
  background: var(--chat-bg);
  width: 100%;
  padding: 4px 7px;
  z-index: 101;
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  font-weight: 400;
  line-height: 118%;
  letter-spacing: 0.3px;
  left: 0;
  border-top: 1px solid #999;

  .reply-icon {
    height: 14px;
    margin-right: 4px;
    width: 17px;
  }
  .selected-msg-content {
    border-radius: 5px;
    background: var(--card-bg);
    padding: 4px 7px 2px;
    width: 100%;
  }
  .name {
    color: ${({ isOwner }) =>
      isOwner ? "var(--green)" : "var(--chat-response-name)"};
    text-overflow: ellipsis;
    whitespace: nowrap;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    height: 18px;
    max-width: 200px;
    overflow: hidden;
  }
  span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    max-width: 200px;
    color: var(--main-color);
  }
  .photo {
    width: 36px;
    height: 36px;
    border-radius: 4px;
    margin-right: 9px;
    background: url(${({ photo }) => photo}) center/cover no-repeat;
  }
  .close {
    cursor: pointer;
    flex-shrink: 0;
  }
`;
