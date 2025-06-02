import styled from "styled-components";
import noPhoto from "../../../../assets/images/no-photo.webp";
import { useNavigate } from "react-router-dom";

export const TYPES = [
  "",
  "Нові автомобілі",
  "Присвоєння індексу зацікавленості(перший раз)",
  "Ціна впала за останій крок",
  "Ціна впала на будь-які авто з моїх обраних",
  "Отримали новий коментар в Чат Авторіа",
  "Ціна посипалась",
];

export const Notification = ({ data }) => {
  const navigate = useNavigate();

  const handleOpen = () => {
    const objUrl = `/objects?findObject=true${Object.entries({
      id_hash: data?.id_hash,
    })
      ?.map((d) => `&${d[0]}=${d[1]}`)
      ?.join("")}`;

    navigate(objUrl);
  };

  return (
    <StyledNotification
      className="flex items-center gap-2"
      photo={data?.image ?? noPhoto}
      onClick={handleOpen}
    >
      <div
        className="photo"
        style={{ backgroundSize: data?.image ? "150%" : "300%" }}
      ></div>
      <div>
        <div className="title">{`${TYPES?.[data?.id_filter]}`}</div>
        <div className="subtitle">{`${data?.brand_name} ${data?.model_name} ${
          data?.year
        } ${data?.price_usd}$  ${data?.volume_engine} ${data?.id_type_fuel} ${
          data?.сar_mileage === "0" ? "" : `${data?.сar_mileage}км`
        } ${data?.location_name}`}</div>
      </div>
    </StyledNotification>
  );
};

const StyledNotification = styled.div`
  border-radius: 9px;
  border: 1px solid var(--bg-10);
  background: var(--card-bg);
  padding: 8px;
  cursor: pointer;
  .photo {
    height: 40px;
    width: 60px;
    background: url(${({ photo }) => photo}) center/cover no-repeat;
    background-size: 300%;
    border-radius: 2px;
  }
  .title {
    color: var(--main-color);
    font-feature-settings: "clig" off, "liga" off;
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 22px;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .subtitle {
    color: var(--second-color);
    font-family: Overpass;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: normal;
    max-width: 200px;
    white-space: unset;
    word-break: normal;
  }
`;
