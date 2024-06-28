import { styled } from "styled-components";
import { ReactComponent as CloseIcon } from "../../../../../../assets/images/close.svg";
import { IconButton } from "../../../../../../components/IconButton";
import { motion } from "framer-motion";

export const Message = ({ open, onClose }) => (
  <StyledMessage
    className="flex items-center justify-between"
    animate={{ opacity: open ? 1 : 0, width: open ? "328px" : 0 }}
  >
    <div>
      <div className="title">Тому що так захотів, чому б ні</div>
      <div className="subtitle">Клієнт дав</div>
    </div>
    <IconButton Icon={CloseIcon} onClick={onClose} className="close-icon" />
  </StyledMessage>
);

const StyledMessage = styled(motion.div)`
  border-radius: 9px;
  border: 1px solid var(--bg-20);
  background: var(--card-bg-2);
  backdrop-filter: blur(8.5px);
  position: absolute;
  right: 0;
  padding: 7px 7px 7px 10px;
  z-index: 2;
  .title {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .subtitle {
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .close-icon {
    border: none !important;
    backdrop-filter: none;
  }
`;
