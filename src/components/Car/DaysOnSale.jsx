import { CARS_STATUSES } from "../Base/Base";
import { Tag } from "../ObjectCard/MainInfo/Tags/Tag";

const DaysOnSale = ({ carData }) => {
  const date = new Date(carData.dt_add_in_source * 1000);

  const formattedDate = date.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const today = new Date();

  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  const diffTime = today - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const status = CARS_STATUSES.filter(
    ({ value }) => value === carData.id_status_add
  )[0].title;

  return (
    <p className="text-sm text-white/60 mb-6 flex gap-1 items-center">
      <Tag
        className={`${
          carData.id_status_add === "0" &&
          "!text-xs !bg-green-500/30 !bg-text-400"
        }`}
        title={status}
      />
      {`${diffDays} днів у продажі ${formattedDate}`}
    </p>
  );
};

export default DaysOnSale;
