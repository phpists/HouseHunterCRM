import { styled } from "styled-components";
import { Title } from "./Title";
import { Selected } from "./Selected";
import { useEffect, useState } from "react";
import { Arrow } from "./Arrow";
import { Dropdown } from "./Dropdown";
import { ClosedButton } from "./ClosedButton";
import { Confirm } from "../../../../../components/Confirm/Confirm";

export const Select = ({
  open,
  onOpen,
  selectedCount,
  onDelete,
  onToggleFavorite,
}) => {
  const [type, setType] = useState(null);
  const [active, setActive] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (!open) {
      setActive(false);
      setType(null);
    }
  }, [open]);

  const handleSelectOption = (opt) => {
    setActive(false);
    if (opt === "delete") {
      setDeleteModal(true);
    } else if (opt === "favorite") {
      onToggleFavorite();
    }
  };

  return (
    <>
      {deleteModal && (
        <Confirm
          title="Видалити обрані заявку(ки)/ об'єкт(и)?"
          onClose={() => setDeleteModal(false)}
          onSubmit={onDelete}
        />
      )}
      <div className="relative z-10">
        {!open ? (
          <ClosedButton onClick={onOpen} />
        ) : (
          <>
            <StyledSelect className="flex items-center" active={active}>
              <Title />
              <Selected value={type} selectedCount={selectedCount} />
              {selectedCount > 0 && (
                <Arrow open={active} onToggleOpen={() => setActive(!active)} />
              )}
            </StyledSelect>
            {active && <Dropdown onSelect={handleSelectOption} />}
          </>
        )}
      </div>
    </>
  );
};

const StyledSelect = styled.div`
  border-radius: ${({ active }) => (active ? "8px 8px 0 0" : "8px")};
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(18.5px);
  padding: 4px 4px 4px 12px;
  position: relative;
  transition: all 0.3s;
  z-index: 12;
`;
