import { styled } from "styled-components";
import { Option } from "./Option";
import { motion } from "framer-motion";

export const Dropdown = ({ open, value, options, onChange }) => (
  <StyledDropdown
    className="hide-scroll select-none"
    animate={{ opacity: open ? 1 : 0, visibility: open ? "visible" : "hidden" }}
  >
    {options?.length
      ? options?.map(({ code, id }, i) => (
          <Option
            key={i}
            title={code}
            onSelect={() => onChange(id)}
            active={value === id}
          />
        ))
      : null}
  </StyledDropdown>
);

const StyledDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  width: 100%;
  right: 0;
  background: #fff;
  border-radius: 0 0 6px 6px;
  max-height: 182px;
  overflow: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  z-index: 20;
`;
