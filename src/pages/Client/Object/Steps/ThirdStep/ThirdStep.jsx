import { styled } from "styled-components";
import { Comment } from "../Comment";
import { Divider } from "../../Divider";
import { Field } from "../../../../../components/Field";
import { SelectTask } from "./SelectTask/SelectTask";
import { Pledge } from "./Pledge/Pledge";

export const ThirdStep = () => (
  <StyledThirdStep>
    <Comment />
    <Divider />
    <SelectTask />
    <Divider />
    <div className="prices">
      <Field value="4 000₴" label="Сума завдатку" />
      <Field value="23 000₴" label="Сума угоди" />
    </div>
    <Divider />
    <Pledge />
  </StyledThirdStep>
);

const StyledThirdStep = styled.div`
  .prices {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
  }
`;
