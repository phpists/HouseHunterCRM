import { styled } from "styled-components";
import { Divider } from "./Divider";
import { Field } from "../../Field";
import { Contacts } from "./Contacts/Contacts";
import { Close } from "./Close";
import { Comment } from "../../Comment";

export const MoreInfo = ({ onClose }) => {
  return (
    <StyledMoreInfo>
      <Divider />
      <div className="dates">
        <Field value="20.09.2023" label="Дата" />
        <Field value="12:43" label="Час" />
      </div>
      <Divider />
      <Contacts />
      <Divider />
      <Comment />
      <Divider className="last-divider" />
      <Close onClose={onClose} />
    </StyledMoreInfo>
  );
};

const StyledMoreInfo = styled.div`
  .dates {
    display: grid;
    grid-template-columns: 50% 50%;
    gap: 6px;
  }
  .last-divider {
    margin-bottom: 0 !important;
  }
  .divider {
    width: calc(100% + 20px);
    margin-left: -10px;
  }
`;
