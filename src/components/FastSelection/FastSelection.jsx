import styled from "styled-components";
import { Modal } from "../Modal/Modal";
import { useState } from "react";
import { ProfileField } from "../ProfileField";
import { CopyLink } from "../CopyLink";

export const FastSelection = ({ onClose, id }) => {
  const LINK = `https://fast-selection.house-hunter.info/?id=${id}`;

  return (
    <StyledFastSelection>
      <Modal onClose={onClose} title="Додати в швидку підбірку">
        <div className="modal-content">
          <div className="flex items-center">
            {" "}
            <ProfileField value={LINK} readOnly className={"link-field"} />
            <CopyLink link={LINK} className="copyBtn" />
          </div>
        </div>
      </Modal>
    </StyledFastSelection>
  );
};

const StyledFastSelection = styled.div`
  .modal-content {
    position: relative;
  }
  .link-field {
    background: var(--card-bg-2);
    margin-right: 5px;
    .value {
      div {
        max-width: 200px !important;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .copyBtn {
    height: 37px;
    width: 37px;
    background: var(--card-bg-2);
    margin: 0;
  }
`;
