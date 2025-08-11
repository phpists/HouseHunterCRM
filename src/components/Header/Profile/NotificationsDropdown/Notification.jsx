import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import noPhoto from "../../../../assets/images/no-photo.webp";
import { useNavigate } from "react-router-dom";
import { NewTag } from "../../../../pages/Client/Object/Maininfo/Slider/NewTag";
import { ReactComponent as ChatIcon } from "../../../../assets/images/chat-grey.svg";
import { ReactComponent as Heart } from "../../../../assets/images/red-heart.svg";
import Star from "../../../../assets/images/star.svg";

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
      onClick={handleOpen}
    >
      <LazyLoadImage
        className="photo"
        src={data?.image ?? noPhoto}
        alt={`${data?.brand_name} ${data?.model_name}`}
        effect="blur"
        placeholderSrc={noPhoto}
        style={{ backgroundSize: data?.image ? "150%" : "300%" }}
        loading="lazy"
      />

      <div className="title">
        <NotificationType id={data?.id_filter} />
        <h1>
          {`${data?.brand_name} ${data?.model_name} ${data?.year} `}
          <span className="text-[var(--green)]">{`${data?.price_usd}$`}</span>
        </h1>
        <p className="truncate">
          {`${data?.volume_engine} ${data?.id_type_fuel} - ${
            data?.сar_mileage === "0" ? "" : `${data?.сar_mileage}км`
          } - ${data?.location_name}`}
        </p>
      </div>
    </StyledNotification>
  );
};

const NotificationType = ({ id }) => {
  if (id === 1) {
    return (
      <div className="flex items-center gap-1">
        <span className="new rounded-sm px-1 text-[10px]">NEW</span>
        Нові автомобілі
      </div>
    );
  } else if (id === 2) {
    return (
      <div className="flex items-center gap-1">
        <div className="text-[10px] stats z-10">
          <div
            className={`rounded-sm bg-red-500 items-center flex gap-1 p-0.5`}
          >
            <img width={12} src={Star} alt="" />
            <span className="leading-none">10/10</span>
          </div>
        </div>
        Новий індекс
      </div>
    );
  } else if (id === 3) {
    return (
      <div className="flex items-center gap-1">
        Змінилась ціна на <span className="text-[#f94343]">-500$</span>
      </div>
    );
  } else if (id === 4) {
    return (
      <div className="flex items-center gap-1">
        У <Heart width={10} height={10} /> ціна змінилась на{" "}
        <span className="text-[#f94343]">-500$</span>
      </div>
    );
  } else if (id === 5) {
    return (
      <div className="flex items-center gap-1">
        <div className="relative">
          <div className="absolute top-[-5px] right-[-7px] before:inline-block before:w-1 before:h-1 before:mr-2 before:bg-red-500 before:rounded-full" />
          <ChatIcon width={15} height={15} />
        </div>
        Новий коментар
      </div>
    );
  } else if (id === 6) {
    return (
      <div className="flex items-center gap-1">
        <span className="animate-pulse text-[#f94343]">!!!</span>ціна часто
        змінюється <span className="text-[#f94343]">-500$</span>
      </div>
    );
  }
};

const StyledNotification = styled.div`
  .new {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      #81fb21;
  }
  border-radius: 9px;
  border: 1px solid var(--bg-10);
  background: var(--card-bg);
  padding: 8px;
  cursor: pointer;
  .photo {
    height: 40px;
    width: 60px;
    background-size: 300%;
    border-radius: 2px;
    object-fit: cover;
  }
  .title {
    color: var(--main-color);
    font-feature-settings: "clig" off, "liga" off;
    font-family: Overpass;
    font-size: 13px;
    font-style: normal;
    font-weight: var(--font-weight-600);
    line-height: 16px;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
