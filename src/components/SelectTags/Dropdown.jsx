import { styled } from "styled-components";
import { Option } from "../Option";
import { motion } from "framer-motion";

export const Dropdown = ({ open, notMultiSelect }) => (
  <StyledDropdown
    animate={{ opacity: open ? 1 : 0, visibility: open ? "visible" : "hidden" }}
  >
    <Option title="Оренда квартир" className="opt" noSelect={notMultiSelect} />
    <Option title="Оренда квартир" className="opt" noSelect={notMultiSelect} />
    <Option title="Оренда квартир" className="opt" noSelect={notMultiSelect} />
    <Option title="Оренда квартир" className="opt" noSelect={notMultiSelect} />
  </StyledDropdown>
);

const StyledDropdown = styled(motion.div)`
  position: absolute;
  top: calc(100% + 1px);
  width: 100%;
  left: 0;
  background: #4b4b4b;
  border-radius: 0 0 9px 9px;
  overflow: hidden;
  z-index: 101;
  .opt {
    padding: 8px 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    &:last-child {
      border-bottom: none;
    }
  }
`;
