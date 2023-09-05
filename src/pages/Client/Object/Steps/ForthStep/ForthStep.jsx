import { styled } from "styled-components";
import { Comment } from "../Comment";
import { Divider } from "../../Divider";
import { Field } from "../Field";
import { ClientPaid } from "./ClientPaid/ClientPaid";
import { Total } from "./Total";
import { DateField } from "../DateField/DateField";
import { Selected } from "../ThirdStep/SelectTask/Selected";

export const ForthStep = () => (
  <StyledForthStep>
    <div className="selected-task">
      <Selected />
    </div>
    <Divider />
    <DateField />
    <Divider />
    <Comment />
    <Divider />
    <div className="fields-group">
      <Field value="23 000₴" label="Сума угоди" />
      <ClientPaid />
    </div>
    <Divider />
    <div className="fields-group">
      <Field value="4 000₴" label="Надав по співпраці" />
      <Field value="500₴" label="Інформаторські" />
    </div>
    <Divider />
    <Total />
  </StyledForthStep>
);

const StyledForthStep = styled.div`
  .fields-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }
  .selected-task {
    padding: 0 7px;
  }
`;
