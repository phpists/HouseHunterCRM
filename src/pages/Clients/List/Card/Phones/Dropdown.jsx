import { styled } from "styled-components";
import { Phone } from "./Phone";
import { motion } from "framer-motion";

export const Dropdown = ({ open, onSelect }) => (
  <StyledDropdown
    open={open}
    animate={{ opacity: open ? 1 : 0, visibility: open ? "visible" : "hidden" }}
  >
    <div onClick={onSelect}>
      <Phone className="phone-opt" />
    </div>
    <div onClick={onSelect}>
      <Phone className="phone-opt" />
    </div>
  </StyledDropdown>
);

const StyledDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  border-radius: 0 0 6px 6px;
  overflow: hidden;
  z-index: 1;
  .phone-opt {
    border-radius: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
`;
