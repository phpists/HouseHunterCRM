import styled from "styled-components";
import { Card } from "./Card";
import flombuIcon from "../../../../assets/images/flombu.png";
import olxIcon from "../../../../assets/images/olx.png";

export const List = ({ data }) => {
  return (
    <StyledList>
      {data?.arr_adverst_object?.map(({ resource }, i) => (
        <Card icon={resource === "olx" ? olxIcon : flombuIcon} title={""} />
      ))}
    </StyledList>
  );
};

const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 7px;
  .empty {
    color: var(--dark-90);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: normal;
    letter-spacing: 0.36px;
    margin-bottom: 4px;
    a {
      color: var(--main-color);
      font-weight: 500;
      margin-left: 10px;
      display: inline-block;
      text-decoration: underline;
    }
  }
`;
