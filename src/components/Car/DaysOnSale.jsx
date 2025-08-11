import styled from "styled-components";
import { CARS_STATUSES } from "../Base/Base";
import { Tag } from "../ObjectCard/MainInfo/Tags/Tag";
import { formatDate } from "../../utilits";

const DaysOnSale = ({ carData, isCarPage }) => {
  const inputDate = new Date(carData.dt_add_in_source * 1000);

  const fullFormattedDate = inputDate
    .toLocaleString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/\//g, ".");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(inputDate);
  date.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));

  const status =
    CARS_STATUSES.find(({ value }) => value === carData.id_status_add)?.title ||
    "Невідомий статус";

  return (
    <p className="text-sm text-white/60 flex flex-row-reverse md:flex-row gap-1 items-center">
      {!isCarPage && formatDate(carData?.dt_add_in_source)}
      <Wrapper>
        <Tag
          className={`
            ${
              carData.id_status_add === "0" &&
              "!bg-green-500/30 !text-green-400"
            }
            ${
              carData.id_status_add === "1" &&
              "!bg-orange-500/30 !text-orange-400"
            }
            ${
              carData.id_status_add === "5" &&
              "!bg-yellow-500/30 !text-yellow-400"
            }
            ${carData.id_status_add === "-1" && "!bg-red-600/30 !text-red-400"}
            !text-xs
          `}
          title={status}
        />
      </Wrapper>
      {isCarPage && `${diffDays} днів у продажі ${fullFormattedDate}`}
    </p>
  );
};

export default DaysOnSale;

const Wrapper = styled.div`
  @media (max-width: 768px) {
    .title {
      max-width: 300px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  @media (max-width: 630px) {
    .title {
      max-width: 200px;
    }
  }
  @media (max-width: 480px) {
    .title {
      max-width: 100px;
    }
  }
`;
