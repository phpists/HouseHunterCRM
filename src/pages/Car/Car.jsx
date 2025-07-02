import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useLazyGetCarBodyQuery,
  useLazyGetOpenObjectQuery,
} from "../../store/objects/objects.api";
import { Slider } from "../../components/ObjectCard/Slider/Slider";
import { car_body_type, CarMainInfoFileds, type_fuel } from "../../constants";
import { Tag } from "../../components/ObjectCard/MainInfo/Tags/Tag";

const Car = () => {
  const { id } = useParams();
  const [getOpenObject, { data, isLoading }] = useLazyGetOpenObjectQuery();
  const [carData, setCarData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getOpenObject(id).then((response) => {
        if (response.data && response.data.data) {
          setCarData(response.data.data);
        }
      });
    }
  }, [id, getOpenObject]);

  if (isLoading) return <div>Завантаження...</div>;
  if (!carData) return <div>Не вдалося завантажити дані про автомобіль.</div>;

  let photos = [];
  try {
    const parsedPhotos = JSON.parse(carData.photo_links_json || "[]");
    photos = parsedPhotos.map((p) => ({ name: p }));
  } catch {}

  const getFromCarMainInfoFiledsOptions = (fieldName, index) => {
    return CarMainInfoFileds.filter(({ field }) => field === fieldName)[0]
      .field_option[+index];
  };

  const price_history = Object.keys(JSON.parse(carData.price_history_json)).map(
    (i) => JSON.parse(carData.price_history_json)[i].price
  );

  return (
    <StyledCar>
      <div className="slider-block">
        <Slider photos={photos} data={carData} />
      </div>
      <div className="info">
        <div className="top-row">
          <button className="back-btn" onClick={() => navigate(-1)}>
            &larr; Назад
          </button>
        </div>
        <h1>{carData.title}</h1>
        <div className="price">
          {carData.price_usd}$
          {carData?.tag_market_bottom &&
          carData?.tag_price_dump !== "0" &&
          new Date(Number(carData?.tag_price_dump) * 1000) >=
            new Date().getTime() ? (
            <div className="danger-price animate-pulse">!!!</div>
          ) : (
            ""
          )}
          <span className="text-red-500 text-lg ml-2">
            {carData.price_change_for_last !== "0" &&
              `- ${carData.price_change_for_last}`}
          </span>
        </div>
        <div className="flex flex-col">
          {price_history.map((price) => (
            <span>{price}</span>
          ))}
        </div>
        <div className="params">
          <span>{carData.year} рік</span>
          <span>
            {carData.volume_engine && carData.volume_engine !== "0"
              ? `${Number(carData.volume_engine) / 1000} л`
              : ""}
          </span>
          <span>
            {carData["сar_mileage"]
              ? `${Math.round(Number(carData["сar_mileage"]) / 1000)} тис. км`
              : "-"}
          </span>
          <span>{carData.kpp && carData.kpp !== "0" ? carData.kpp : "-"}</span>
        </div>

        <span>зацікавленість {carData.index_overbuying}/10</span>

        <p>{carData.description}</p>
        {carData?.tag_faster && carData?.tag_faster === "1" && (
          <Tag title={"Терміново"} />
        )}
        {carData?.tag_nativePaint && carData?.tag_nativePaint === "1" && (
          <Tag title={"Рідна фарба"} />
        )}
        {carData?.tag_freshlyDriven &&
          (carData?.tag_freshlyDriven === "1") === "1" && (
            <Tag title={"Свіжопригнана"} />
          )}
        {carData?.tag_afterDTP && carData?.tag_afterDTP === "1" && (
          <Tag title={"Після дтп"} />
        )}
        {carData?.tag_market_bottom &&
          (carData?.tag_market_bottom === "1") === "1" && (
            <Tag title={"По низу ринку"} />
          )}
        <a href={carData.link} target="_blank" rel="noopener noreferrer">
          Відкрити на платформі
        </a>

        <span></span>

        <div className="flex flex-col">
          <span>
            {getFromCarMainInfoFiledsOptions(
              "id_type_fuel",
              carData.id_type_fuel
            )}
          </span>
          <span>{getFromCarMainInfoFiledsOptions("kpp", carData.kpp)}</span>
          <span>{carData.location_name}</span>
          <span>
            {getFromCarMainInfoFiledsOptions("drive_type", carData.drive_type)}
          </span>
          {carData.VIN && <Tag title={`VIN ${carData.VIN}`} copy />}
          <span className={carData.exchangePossible === "0" && "line-through"}>
            можливий обмін
          </span>
        </div>

        <div className="flex flex-col">
          <h1>обране</h1>

          <span>
            к-ть переглядів | к-ть лайків - {carData.count_views} |{" "}
            {carData.count_likes}
          </span>
        </div>
      </div>
    </StyledCar>
  );
};

const StyledCar = styled.div`
  display: flex;
  gap: 32px;
  padding: 32px;
  color: #fff;
  .slider-block {
    min-width: 320px;
    max-width: 400px;
  }
  .info {
    flex: 1;
    .top-row {
      margin-bottom: 12px;
      .back-btn {
        background: #222;
        color: #fff;
        border: none;
        border-radius: 6px;
        padding: 6px 16px;
        cursor: pointer;
        font-size: 1rem;
      }
    }
    .price {
      display: flex;

      font-size: 2rem;
      color: #6f0;
      margin-bottom: 12px;
    }
    .params {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 12px;
      span {
        background: #222;
        border-radius: 6px;
        padding: 4px 10px;
        font-size: 1rem;
      }
    }
    a {
      display: inline-block;
      margin-top: 16px;
      color: #4af;
      text-decoration: underline;
    }
  }
`;

export default Car;
