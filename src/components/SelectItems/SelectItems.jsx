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
  onToggleFavorite,
  onDelete,
  allCount = 0,
  onSelectAll,
  noFavorite,
  onHide,
  onSend,
  isHideObjects,
  onAddToSelection,
  onRestore,
  passwordCheck,
  onDeleteFinally,
  finalDeleteConfirmTitle,
  onSendClients,
  allowSelectAll,
  confirmText,
  onChangeConfirmText,
}) => {
  const [type, setType] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    setType(selectedCount === 0 ? null : selectedCount === allCount ? 2 : 1);
  }, [allCount]);

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
      onToggleFavorite && onToggleFavorite();
    } else if (opt === "send") {
      onSend();
    } else if (opt === "hide") {
      onHide();
    } else if (opt === "selection") {
      onAddToSelection();
    } else if (opt === "restore") {
      onRestore();
    } else if (opt === "deleteFinally") {
      setDeleteModal("finally");
    } else if (opt === "sendClients") {
      onSendClients();
    }
  };

  const handleChangeType = (val) => {
    if (allCount > 0) {
      const isTheSame = type === val;
      val !== 2 && setType(isTheSame ? null : val);
      if (val === 2) {
        if (
          onDelete ||
          onHide ||
          onToggleFavorite ||
          onSend ||
          onAddToSelection ||
          onRestore ||
          onSendClients ||
          allowSelectAll
        ) {
          onSelectAll && onSelectAll(isTheSame);
        }
      } else if (val === 1 && onSelectAll) {
        onSelectAll(isTheSame, selectedCount === 0 ? 10 : undefined);
      }
    }
  };

  return (
    <>
      {deleteModal && (
        <Confirm
          title={
            deleteModal === "finally"
              ? finalDeleteConfirmTitle
              : deleteConfirmTitle
          }
          onClose={() => setDeleteModal(false)}
          onSubmit={() => {
            if (deleteModal === "finally") {
              onDeleteFinally && onDeleteFinally();
            } else {
              onDelete && onDelete();
            }
          }}
          passwordCheck={
            passwordCheck || selectedCount > 1 || deleteModal === "finally"
          }
          confirmText={deleteModal === "finally" ? null : confirmText}
          onChangeConfirmText={onChangeConfirmText}
        />
      )}
      <div className="relative z-300">
        <StyledSelectItems
          className={`flex items-center ${className}`}
          open={open}
          onClick={() => selectedCount > 0 && setOpen(!open)}
          onBlur={() => setOpen(false)}
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
            {type && <Arrow open={open} />}
          </div>
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
                  onSend={onSend}
                  isHideObjects={isHideObjects}
                  onAddToSelection={onAddToSelection}
                  onRestore={onRestore}
                  onDeleteFinally={onDeleteFinally}
                  onSendClients={onSendClients}
                />
              )}
            </>
          )}
        </StyledSelectItems>
      </div>
    </>
  );
};

const StyledSelectItems = styled.button`
  border-radius: ${({ open }) => (open ? "8px 8px 0 0" : "8px")};
  background: var(--bg-20);
  /* backdrop-filter: blur(18.5px); */
  padding: 4px 4px 4px 12px;
  position: relative;
  transition: all 0.3s;
  z-index: 12;
  width: max-content;
`;
