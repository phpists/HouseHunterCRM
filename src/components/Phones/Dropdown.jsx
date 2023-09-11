import { styled } from "styled-components";
import { Phone } from "./Phone";
import { motion } from "framer-motion";

export const Dropdown = ({ open, onSelect, top }) => (
  <StyledDropdown
    open={open}
    initial={{ opacity: 0, visibility: "hidden" }}
    animate={{ opacity: open ? 1 : 0, visibility: open ? "visible" : "hidden" }}
    top={top}
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
  ${({ top }) => (top ? "bottom: 100%;" : "top: 100%;")}
  left: 0;
  width: 100%;
  border-radius: ${({ top }) => (top ? "6px 6px 0 0" : "0 0 6px 6px")};
  overflow: hidden;
  z-index: 1;
  .phone-opt {
    border-radius: 0;
    ${({ top }) =>
      top
        ? "border-bottom: 1px solid rgba(255, 255, 255, 0.2);"
        : "border-top: 1px solid rgba(255, 255, 255, 0.2);"};
  }
`;
