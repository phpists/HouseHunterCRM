import { styled } from "styled-components";
import { Card } from "./Card/Card";
import { ReactComponent as CalendarIcon } from "../../../../assets/images/calendar-card.svg";
import { ReactComponent as UsersIcon } from "../../../../assets/images/card-user.svg";
import { ReactComponent as MegafonIcon } from "../../../../assets/images/card-megafon.svg";
import { ReactComponent as StarIcon } from "../../../../assets/images/card-star.svg";
import backgrondBlue from "../../../../assets/images/blue-card-mask.svg";
import backgrondPink from "../../../../assets/images/pink-card-mask.svg";

export const Cards = ({ data, onEdit }) => (
  <StyledCards>
    <Card
      title={data?.years_the_market ?? "0"}
      subtitle={
        <>
          Років <br /> на ринку
        </>
      }
      Icon={CalendarIcon}
      hoverBackground={backgrondBlue}
      editable
      onEdit={(val) => onEdit("years_the_market", val)}
    />
    <Card
      title={data?.year_on_site ?? "-"}
      subtitle={
        <>
          Років <br />
          на сайті
        </>
      }
      Icon={CalendarIcon}
      hoverBackground={backgrondBlue}
    />
    <Card
      title={data?.all_users_in_copmany ?? "-"}
      subtitle={
        <>
          Агентів <br />в компанії
        </>
      }
      Icon={UsersIcon}
      hoverBackground={backgrondBlue}
    />
    <Card
      title={data?.all_obj_copmany ?? "-"}
      subtitle={
        <>
          Кількість <br /> оголошень
        </>
      }
      Icon={MegafonIcon}
      hoverBackground={backgrondBlue}
    />
    {/* <Card
      title={data?.XXXX ?? "-"}
      subtitle={
        <>
          Рейтинг <br />
          між колегами
        </>
      }
      Icon={StarIcon}
      hoverBackground={backgrondPink}
      hoverSubtitle={
        <>
          Перейти <br />
          до відгуків
        </>
      }
    />
    <Card
      title={data?.XXXX ?? "-"}
      subtitle={
        <>
          Рейтинг <br />
          між колегами
        </>
      }
      Icon={StarIcon}
      hoverBackground={backgrondPink}
      hoverSubtitle={
        <>
          Перейти <br />
          до відгуків
        </>
      }
    /> */}
  </StyledCards>
);

const StyledCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 67px;
  border-radius: 13px;
  overflow: hidden;
  & > .card {
    border: 1px solid rgba(255, 255, 255, 0.1);
    &:nth-child(1),
    &:nth-child(3) {
      border-left: none;
      border-right: none;
    }
    &:nth-child(2),
    &:nth-child(5) {
      border-right: none;
    }
    &:nth-child(1),
    &:nth-child(2) {
      border-top: none;
      border-bottom: none;
    }
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(6) {
      border-bottom: none;
    }

    &:nth-child(3),
    &:nth-child(4) {
      border-right: none;
    }
  }
`;
