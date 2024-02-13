import { motion } from "framer-motion";
import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../../assets/images/close.svg";

export const Tag = ({ title, isFirst, type, isHide, onRemove, viewOnly }) => (
  <StyledTag
    className="flex items-center justify-between notClickable"
    isFirst={isFirst}
    type={type}
    animate={{
      opacity: isHide ? 0 : 1,
      width: isHide ? 0 : "auto",
      padding: isHide ? 0 : "1px 4px 2px 4px",
      marginRight: isFirst ? 0 : isHide ? 0 : "4px",
    }}
  >
    <span className="notClickable">
      {title?.length > 40 ? `${title.substring(0, 40)}...` : title}
    </span>
    <button
      className="flex items-center justify-center notClickable"
      onClick={onRemove}
    >
      {viewOnly ? null : <CloseIcon className="notClickable" />}
    </button>
  </StyledTag>
);

const StyledTag = styled(motion.div)`
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  leading-trim: both;
  text-edge: cap;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: 0.22px;
  flex-shrink: 0;
  overflow: hidden;
  height: 18px;
  span {
    width: max-content;
    white-space: nowrap;
  }
  button {
    margin-left: 2px;
    border-radius: 0px 7px 7px 0px;
    transition: all 0.3s;
    width: 14px;
    height: 14px;
    svg {
      height: 9px;
      width: 9px;
    }
    &:hover {
      background: rgba(255, 255, 255, 0.07);
      g {
        opacity: 1;
      }
    }
  }

  ${({ isFirst, type }) =>
    isFirst &&
    `
    width: 100% !important;
    color: rgba(255, 255, 255, 0.80);
    background: ${
      type
        ? "linear-gradient(91deg, #2D4DF3 -31.01%, #2FA112 120.74%)"
        : "linear-gradient(91deg, #FF4F37 -31.01%, #463EA1 120.74%)"
    };
  `}
`;
