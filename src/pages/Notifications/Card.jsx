import styled from "styled-components";
import noPhoto from "../../assets/images/no-photo.webp";
import { TYPES } from "../../components/Header/Profile/NotificationsDropdown/Notification";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import NotificationType from "../../components/Header/Profile/NotificationsDropdown/NotificationType";
import { Tag } from "../../components/ObjectCard/MainInfo/Tags/Tag";
import { formatDate, getFromCarMainInfoFiledsOptions } from "../../utilits";
import { ReactComponent as Close } from "../../assets/images/close.svg";

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
    <StyledNotification onClick={handleOpen}>
      <div className="flex justify-between items-center p-2 text-sm">
        <NotificationType id={data?.id_filter} />
        <div className="flex items-center">
          <span className="text-sm">{formatDate(1752237800632 / 1000)}</span>
          <Close />
        </div>
      </div>
      <hr />

      <div className="flex gap-2 p-2">
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
          <h1 className="text-sm">{`${data?.brand_name} ${data?.model_name} ${data?.year}`}</h1>
          <span className="text-sm text-[var(--green)]">{`${data?.price_usd}$`}</span>
        </div>
      </div>

      <div className="p-2 pt-0 grid grid-cols-2 gap-1">
        <Tag
          title={`${
            Number(data?.сar_mileage) / 1000 === 0
              ? "-"
              : Number(data?.сar_mileage) / 1000
          } тис. км.`}
          iIcom="bi bi-circle-fill"
          className="!text-xs tag"
        />
        <Tag
          title={data.location_name}
          iIcom="bi bi-circle-fill"
          className="!text-xs tag"
        />
        <Tag
          title={`${data.id_type_fuel} ${
            data.volume_engine && data.volume_engine !== "0"
              ? `${Number(data.volume_engine) / 1000} л`
              : ""
          }`}
          iIcom="bi bi-circle-fill"
          className="!text-xs tag"
        />
        <Tag
          title={getFromCarMainInfoFiledsOptions("kpp", data.kpp)}
          iIcom="bi bi-circle-fill"
          className="!text-xs tag"
        />
      </div>
    </StyledNotification>
  );
};

const StyledNotification = styled.div`
  .new {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      #81fb21;
  }
  .tag {
    padding: 4px 6px;
  }
  border-radius: 9px;
  border: 1px solid var(--bg-10);
  hr {
    border: 1px solid var(--bg-10);
  }
  background: var(--card-bg);
  position: relative;
  cursor: pointer;

  .photo {
    height: 48px;
    width: 74px;
    border-radius: 10px;
    object-fit: cover;
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
