import styled from "styled-components";
import noPhoto from "../../assets/images/no-photo.webp";
import { TYPES } from "../../components/Header/Profile/NotificationsDropdown/Notification";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const Card = ({ data }) => {
  const handleOpen = () => {
    const objUrl = `/objects?findObject=true${Object.entries({
      id_hash: data?.id_hash,
    })
      .map((d) => `&${d[0]}=${d[1]}`)
      .join("")}`;

    window.open(objUrl, "_blank");
  };

  return (
    <StyledNotification
      className="flex items-center gap-2"
      onClick={handleOpen}
    >
      <LazyLoadImage
        className="photo"
        src={data?.image ?? noPhoto}
        alt={`${data?.brand_name} ${data?.model_name}`}
        effect="blur"
        placeholderSrc={noPhoto}
        style={{ backgroundSize: data?.image ? "100%" : "200%" }}
        loading="lazy"
      />
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
  padding: 10px;
  border-radius: 10px;
  background: var(--card-bg);
  position: relative;
  border: 1px solid transparent;
  cursor: pointer;

  .photo {
    height: 80px;
    width: 120px;
    border-radius: 10px;
    object-fit: cover;
  }

  .title {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 20px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: 118%;
    letter-spacing: 0.4px;
  }

  .subtitle {
    color: var(--second-color);
    font-family: Overpass;
    font-size: 14px;
    font-style: normal;
    font-weight: var(--font-weight-200);
    line-height: normal;
    white-space: unset;
    word-break: normal;
  }
`;
