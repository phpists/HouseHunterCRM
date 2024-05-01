import styled from "styled-components";
import { ReactComponent as EyeIcon } from "../../../../../assets/images/eye-access.svg";
import { ReactComponent as PlusIcon } from "../../../../../assets/images/plus-access.svg";
import { ReactComponent as EditIcon } from "../../../../../assets/images/edit.svg";
import { ReactComponent as RemoveIcon } from "../../../../../assets/images/delete-access.svg";
import { AccessButton } from "./AccessButton";

export const AccessBlock = ({ title, value, onChange }) => {
  return (
    <StyledAccessBlock className="flex items-center justify-between">
      <div className="title">{title}</div>
      <div className="btns">
        <AccessButton
          Icon={EyeIcon}
          active={value?.view}
          onToggle={(val) => onChange("view", val)}
        />
        <AccessButton
          Icon={PlusIcon}
          active={value?.add}
          onToggle={(val) => onChange("add", val)}
        />
        <AccessButton
          Icon={EditIcon}
          active={value?.edit}
          onToggle={(val) => onChange("edit", val)}
        />
        <AccessButton
          Icon={RemoveIcon}
          active={value?.delete}
          onToggle={(val) => onChange("delete", val)}
        />
      </div>
    </StyledAccessBlock>
  );
};

const StyledAccessBlock = styled.div`
  color: var(--main-color);
  font-family: Overpass;
  font-size: 14px;
  font-style: normal;
  font-weight: var(--font-weight-100);
  line-height: 118%; /* 16.52px */
  letter-spacing: 0.28px;
  padding: 6px 10px;
  .btns {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-left: 14px;
  }
`;
