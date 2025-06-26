import styled from "styled-components";
import { Divider } from "../../pages/Objects/Header/Filter/Divider";
import { CheckOption } from "../CheckOption";
import Authors from "./Authors";
import Index from "./Index";
import Likes from "./Likes";
import Views from "./Views";

const AutoRia = ({ data, onChangeFilter, filtersFields }) => {
  return (
    <div className="section filterFieldsWrapper">
      <Index data={data} onChange={onChangeFilter} />
      <Divider />

      <Likes data={data} onChangeFilter={onChangeFilter} />
      <Divider />

      <Views data={data} onChangeFilter={onChangeFilter} />
      <Divider />

      <Authors data={data} onChangeFilter={onChangeFilter} />
      <Divider />

      <CheckOption
        label='Відповідь на "торг"'
        className="check-opt"
        value={data?.street_base_object?.show_comment_autoria}
        onChange={() =>
          onChangeFilter("street_base_object", {
            ...data?.street_base_object,
            show_comment_autoria:
              data?.street_base_object?.show_comment_autoria === "1"
                ? undefined
                : "1",
          })
        }
      />

      <Text>
        * Якщо ви обрали ці поля, то пошук <br />
        здійснюватиметься тільки по джерелу AutoRia
      </Text>
    </div>
  );
};

const Text = styled.p`
  margin: 10px 0 0 0;
  font-family: Open Sans;
  font-weight: 400;
  font-size: 12px;
  line-height: 120%;
  letter-spacing: 2%;
  text-align: center;
  opacity: 0.6;
`;

export default AutoRia;
