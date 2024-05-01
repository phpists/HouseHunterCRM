import { styled } from "styled-components";
import { ReactComponent as CloseIcon } from "../../assets/images/close.svg";
import { motion } from "framer-motion";

export const Tag = ({ title, onRemove, isHide, noEdit }) => (
  <StyledTag
    className="flex items-center"
    animate={{
      opacity: isHide ? 0 : 1,
      width: isHide ? 0 : "auto",
      marginRight: isHide ? 0 : "8px",
      padding: isHide ? 0 : "1px 4px 2px 4px",
    }}
  >
    <span>{title?.length > 40 ? `${title.substring(0, 40)}...` : title}</span>
    {!noEdit && (
      <button className="flex items-center justify-center" onClick={onRemove}>
        <CloseIcon />
      </button>
    )}
  </StyledTag>
);

const StyledTag = styled(motion.div)`
  border-radius: 5px;
  background: var(--tag-bg-2);
  color: var(--tag-color-2);
  leading-trim: both;
  text-edge: cap;
  font-family: Open Sans;
  font-size: 11px;
  font-style: normal;
  font-weight: var(--font-weight-light);
  line-height: normal;
  letter-spacing: 0.22px;
  width: max-content;
  margin-right: 8px;

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
`;
