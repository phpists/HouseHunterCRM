import { styled } from "styled-components";
import { Title } from "./Title";
import { Selected } from "./Selected";
import { useEffect, useState } from "react";
import { Arrow } from "./Arrow";
import { Dropdown } from "./Dropdown";
import { Confirm } from "../Confirm/Confirm";

export const SelectItems = ({
  title,
  selectedCount,
  dropdown,
  className,
  deleteConfirmTitle,
  onToggleFavorite = () => null,
  onDelete,
  allCount = 0,
  onSelectAll,
  noFavorite,
  onHide,
}) => {
  const [type, setType] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (selectedCount > 0) {
      setType(selectedCount === allCount ? 2 : 1);
    } else {
      setType(null);
      setOpen(false);
    }
  }, [selectedCount]);

  const handleSelectOption = (opt) => {
    setOpen(false);
    if (opt === "delete") {
      setDeleteModal(true);
    } else if (opt === "favorite") {
      onToggleFavorite();
    } else if ("hide") {
      onHide();
    }
  };

  const handleChangeType = (val) => {
    if (allCount > 0) {
      const isTheSame = type === val;
      setType(isTheSame ? null : val);
      if (val === 2) {
        onSelectAll && onSelectAll(isTheSame);
      } else if (val === 1 && onSelectAll) {
        onSelectAll(isTheSame, selectedCount === 0 ? 10 : undefined);
      }
    }
  };

  return (
    <>
      {deleteModal && (
        <Confirm
          title={deleteConfirmTitle}
          onClose={() => setDeleteModal(false)}
          onSubmit={() => (onDelete ? onDelete() : null)}
        />
      )}
      <div className="relative z-300">
        <StyledSelectItems
          className={`flex items-center ${className}`}
          open={open}
        >
          <Title />
          <div className="flex items-center">
            <Selected
              value={type}
              onChnage={handleChangeType}
              title={title}
              selectedCount={selectedCount}
              allCount={allCount}
            />
            {type && <Arrow open={open} onToggleOpen={() => setOpen(!open)} />}
          </div>
        </StyledSelectItems>
        {open && (
          <>
            {dropdown ? (
              <div onClick={() => setOpen(false)}>{dropdown}</div>
            ) : (
              <Dropdown
                onSelect={handleSelectOption}
                noFavorite={noFavorite}
                onDelete={onDelete}
                onHide={onHide}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

const StyledSelectItems = styled.div`
  border-radius: ${({ open }) => (open ? "8px 8px 0 0" : "8px")};
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(18.5px);
  padding: 4px 4px 4px 12px;
  position: relative;
  transition: all 0.3s;
  z-index: 12;
  width: max-content;
`;
