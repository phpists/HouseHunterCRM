import { styled } from "styled-components";
import { Slider } from "./Slider/Slider";
import { Divider } from "../Divider";
import { Field } from "../../../../components/Field";
import { CreatedDate } from "./CreatedDate";
import { Tag } from "./Tag/Tag";
import { ReactComponent as DoorsIcon } from "../../.../../../../assets/images/doors.svg";
import { ReactComponent as ExpandedIcon } from "../../.../../../../assets/images/epanded.svg";
import { ReactComponent as BoxSelectIcon } from "../../.../../../../assets/images/box-select.svg";
import { ReactComponent as StairsIcon } from "../../.../../../../assets/images/stairs.svg";
import { TagDivider } from "./Tag/TagDivider";

export const Maininfo = () => {
  return (
    <StyledMaininfo>
      <Slider />
      <Divider />
      <Field
        value="Оренда комерційної нерухомості"
        label="Категорія"
        textarea
        className="title-field"
      />
      <Divider />
      <Field
        value="Шевченківський, Галицький, Личаківський"
        label="Локація"
        textarea
        className="title-field"
      />
      <Divider />
      <div className="field-group">
        <Field value="23 500₴" label="Вартість" className="price-field" />
        <CreatedDate />
      </div>
      <Divider />
      <div className="flex flex-wrap items-center tags">
        <Tag Icon={DoorsIcon} text="2к" />
        <TagDivider />
        <Tag
          Icon={ExpandedIcon}
          text={
            <>
              100 м<sup>2</sup>
            </>
          }
        />
        <TagDivider />
        <Tag
          Icon={BoxSelectIcon}
          text={
            <>
              100 м<sup>2</sup>
            </>
          }
        />
        <TagDivider />
        <Tag Icon={StairsIcon} text="8 із 18" />
      </div>
      <Divider />
      <Field value="+" label="Коментар" textarea className="title-field" />
    </StyledMaininfo>
  );
};

const StyledMaininfo = styled.div`
  padding: 6px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 10px;
  .title-field {
    align-items: start !important;
  }
  .field-group {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    gap: 6px;
  }
  .tags {
    padding: 0 6px;
    gap: 10px 0;
  }
  .price-field {
    .value {
      color: #81fb21;
    }
  }
  .location {
    span {
      width: 130px;
      transition: all 0.3s;
    }
  }
  .area-tag,
  .doors-tag {
    svg {
      transition: all 0.3s;
    }
  }
`;
