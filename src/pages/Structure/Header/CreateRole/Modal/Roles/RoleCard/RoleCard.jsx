import styled from "styled-components";
import { Icon } from "./Icon";
import { Text } from "./Text";
import { OpenIcon } from "./OpenIcon";
import { useState } from "react";
import { Dropdown } from "./Dropdown/Dropdown";

export const RoleCard = ({
  IconImg,
  iconBg,
  iconColor,
  title,
  subtitle,
  noOpen,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <StyledRoleCard
        iconColor={iconColor}
        className="flex items-center"
        open={open}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Icon IconImg={IconImg} iconBg={iconBg} iconColor={iconColor} />
            <Text title={title} subtitle={subtitle} />
          </div>
          {!noOpen && <OpenIcon onClick={() => setOpen(!open)} open={open} />}
        </div>
      </StyledRoleCard>
      {open && <Dropdown iconColor={iconColor} />}
    </div>
  );
};

export const StyledRoleCard = styled.div`
  padding: 8px 10px;
  border-radius: ${({ open }) => (open ? "6px 6px 0 0" : "6px")};
  border: 1px solid ${({ iconColor }) => iconColor};
  background: rgba(255, 255, 255, 0.1);
`;
