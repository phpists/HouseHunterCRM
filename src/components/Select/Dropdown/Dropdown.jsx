import { styled } from "styled-components";
import { Option } from "./Option";
import { motion } from "framer-motion";
import { useRef } from "react";

export const Dropdown = ({ open, onChange, options }) => (
  <StyledDropdown
    className="hide-scroll select-none"
    animate={{
      opacity: open ? 1 : 0,
      visibility: open ? "visible" : "hidden",
    }}
  >
    {options?.map(({ title, value }, i) => (
      <Option key={i} title={title} onSelect={() => onChange(value)} />
    ))}
  </StyledDropdown>
);

const StyledDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  width: 100%;
  right: 0;
  background: #fff;
  border-radius: 0 0 6px 6px;
  max-height: 252px;
  overflow: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  z-index: 5;
  scroll-behavior: smooth;
`;
