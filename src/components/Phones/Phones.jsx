import { styled } from "styled-components";
import { Phone } from "./Phone";
import { Arrow } from "./Arrow";
import { useState } from "react";
import { Dropdown } from "./Dropdown";
import { Socmedia } from "../Socmedia";

export const Phones = ({
  top,
  className,
  classNameContent,
  phones,
  notHideArrow,
  hideIcon,
  small,
}) => {
  const [open, setOpen] = useState(false);
  const [activePhone, setActivePhone] = useState(0);

  const handleSelectPhone = (index) => {
    setOpen(false);
    setActivePhone(index);
  };

  return (
    <div className="flex items-center shrink-0">
      <StyledPhones open={open} className={`${className}`}>
        <Phone
          showOnHoverIcon
          className={classNameContent}
          phone={phones?.length > 0 ? phones?.[activePhone]?.phone : ""}
          isLessThenOne={phones?.length <= 1}
          hideIcon={hideIcon}
          small={small}
        />
        {phones?.length <= 1 && !notHideArrow ? null : (
          <Arrow
            visible={phones?.length > 1}
            open={open}
            onToggleOpen={() => (phones?.length > 1 ? setOpen(!open) : null)}
          />
        )}
        <Dropdown
          open={open}
          onSelect={handleSelectPhone}
          top={top}
          options={phones ?? []}
          activePhone={activePhone}
        />
      </StyledPhones>
      <div className="flex items-center ml-1">
        <Socmedia
          type="viber"
          active={phones?.[activePhone]?.viber === "1"}
          onClick={() => null}
          className={`viber-card mr-1 ${small && "socmediaCardSmallPhone"}`}
          open
          phone={`${phones?.[activePhone]?.phone}`}
          readOnly
          activeColor={small ? "#646464" : undefined}
        />
        <Socmedia
          type="telegram"
          active={phones?.[activePhone]?.telegram === "1"}
          onClick={() => null}
          open
          phone={`${phones?.[activePhone]?.phone}`}
          readOnly
          className={` ${small && "socmediaCardSmallPhone"}`}
          activeColor={small ? "#646464" : undefined}
        />
      </div>
    </div>
  );
};

const StyledPhones = styled.div`
  position: relative;
  border-radius: ${({ open }) => (open ? "6px 6px 0 0" : "6px")};
  flex-shrink: 0;
  height: max-content;
  display: grid;
  grid-template-columns: max-content max-content;
  width: max-content;
`;
