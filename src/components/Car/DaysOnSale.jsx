import styled from "styled-components";
import { CARS_STATUSES } from "../Base/Base";
import { Tag } from "../ObjectCard/MainInfo/Tags/Tag";

const DaysOnSale = ({ carData, isCarPage }) => {
  const date = new Date(carData.dt_add_in_source * 1000);
  const fullFormattedDate = `${date
    .toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, ".")} ${date.toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })}`;

  const formattedDate = `${date.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })}`;

  const today = new Date();

  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  const diffTime = today - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const status = CARS_STATUSES.filter(
    ({ value }) => value === carData.id_status_add
  )[0].title;

  return (
    <p className="text-sm text-white/60 flex flex-row-reverse md:flex-row gap-1 items-center">
      {!isCarPage && (
        <>
          <p className="hidden md:inline-block">{fullFormattedDate}</p>
          <p className="md:hidden">{formattedDate}</p>
        </>
      )}
      <Wrapper>
        <Tag
          className={`${
            carData.id_status_add === "0" && "!bg-green-500/30 !text-green-400"
          } ${
            carData.id_status_add === "1" &&
            "!bg-orange-500/30 !text-orange-400"
          } ${
            carData.id_status_add === "5" &&
            "!bg-yellow-500/30 !text-yellow-400"
          }${
            carData.id_status_add === "-1" && " !bg-red-600/30 !text-red-400"
          } !text-xs`}
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
      width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
