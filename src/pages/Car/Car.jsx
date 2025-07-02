import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLazyGetOpenObjectQuery } from "../../store/objects/objects.api";
import { Slider } from "../../components/ObjectCard/Slider/Slider";

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
        <div className="price">{carData.price_usd}$</div>
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
        <p>{carData.description}</p>
        <a href={carData.link} target="_blank" rel="noopener noreferrer">
          Відкрити на платформі
        </a>
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
