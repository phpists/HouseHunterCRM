import { styled } from "styled-components";
import { Slider } from "./Slider/Slider";
import { Divider } from "../Divider";
import { Field } from "../../../../components/Field";
import { CreatedDate } from "./CreatedDate";
import { Tag } from "./Tag";
import { ReactComponent as LocationIcon } from "../../.../../../../assets/images/location.svg";
import { ReactComponent as ExpandedIcon } from "../../.../../../../assets/images/epanded.svg";
import { ReactComponent as DoorsIcon } from "../../.../../../../assets/images/doors.svg";
import { useState } from "react";

export const Maininfo = () => {
  const [locationHover, setLocationHover] = useState(false);

  return (
    <StyledMaininfo locationHover={locationHover}>
      <Slider />
      <Divider />
      <Field
        value="Оренда 1 кім квартири п. орлика Дрогобич"
        label="Заголовок"
        textarea
        className="title-field"
      />
      <Divider />
      <div className="field-group">
        <Field value="23 500₴" label="Вартість" className="price-field" />
        <CreatedDate />
      </div>
      <Divider />
      <div className="flex items-center">
        <Tag
          Icon={LocationIcon}
          text="Львів, ул. Харьківськa, 12"
          className="location mr-1.5"
          onHover={(value) => setLocationHover(value)}
        />
        <Tag
          Icon={ExpandedIcon}
          text={
            <>
              100 м<sup>2</sup>
            </>
          }
          className="area-tag mr-1.5"
        />
        <Tag Icon={DoorsIcon} text="2к" className="doors-tag" />
      </div>
    </StyledMaininfo>
  );
};

const StyledMaininfo = styled.div`
  padding: 6px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  margin-bottom: 15px;
  .title-field {
    align-items: start !important;
  }
  .field-group {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    gap: 6px;
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

  ${({ locationHover }) =>
    locationHover &&
    `
    .location {
        span {
            width: auto;
        }
    }
    .area-tag, .doors-tag {
        padding: 7px 7px 5px 8px;
        svg {
            width: 0;
            margin: 0;
        }
    }

  `}
`;
