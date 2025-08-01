import styled from "styled-components";
import priceUp from "../../../assets/images/price-up.svg";
import priceDown from "../../../assets/images/price-down.svg";
import { handleFormatDate } from "../../../utilits";

const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const handleGetPrices = (data) => {
  if (isJsonString(data)) {
    const dates = JSON.parse(data);
    if (Object.entries(dates)?.length > 1) {
      try {
        return Object.entries(dates)?.map((date) => {
          return Object.entries(date?.[1])?.[0]?.[1]?.price
            ? Number(Object.entries(date[1])?.[0]?.[1]?.price)
            : Number(date?.[1]?.price) ?? 0;
        });
      } catch {
        return [];
      }
    } else if (typeof dates === "object") {
      try {
        return [Number(Object.entries(dates)[0][1]?.price) ?? 0];
      } catch {
        return [];
      }
    } else {
      return [];
    }
  } else {
    return [];
  }
};

export const Price = ({ data }) => {
  return (
    <StyledPrice>
      <div className="flex items-start gap-[3px] price closedPrice">
        <div className="flex items-center gap-1">
          {" "}
          {`$${data?.price_usd ?? data?.price}`}
        </div>

        {/* {["1", "2"].includes(data?.price_change_up) ? (
          <img
            src={data?.price_change_up === "1" ? priceUp : priceDown}
            alt=""
          />
        ) : null} */}
        <span
          className={`${
            data?.price_change_up === "1" && "red"
          }flex red danger-price animate-pulse`}
        >
          {data?.price_change_for_last === "0"
            ? ""
            : `${
                data?.price_change_up === "1"
                  ? `+${data?.price_change_for_last}`
                  : `-${data?.price_change_for_last}`
              }!!!`}
        </span>
      </div>
      <div className="last-prices">
        {handleGetPrices(data?.price_history_json)?.length < 3
          ? null
          : handleGetPrices(data?.price_history_json)
              .slice(0, 2)
              ?.map((p, i) => <>{`${p}$ `}</>)}
      </div>
    </StyledPrice>
  );
};

const StyledPrice = styled.div`
  margin-bottom: 10px;
  .price {
    color: var(--green);
    leading-trim: both;
    text-edge: cap;
    font-family: Overpass;
    font-size: 16px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 1.7; /* 16.52px */
    letter-spacing: 0.28px;
    width: max-content;
    .priceFore {
      font-size: 12px;
      font-weight: var(--font-weight-200);
      line-height: 1.8;
      span {
        margin: 0 4px;
      }
    }
    img {
      height: 10px;
      width: 10px;
      margin-bottom: 2px;
    }
    span {
      font-size: 10px;
    }
    .red {
      color: #f94343;
      margin-bottom: 10px;
    }

    .danger-price {
      color: #f94343;
      animation-duration: 1s !important;
    }
  }
  .last-prices {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 12px;
    color: var(--white-color);
    font-weight: 300;
    margin-top: -2px;
    span {
      font-size: 10px;
      margin-top: -5px;
    }
  }
  .alert {
    width: 8px;
    height: 8px;
    border-radius: 100%;
    background: #f94343;
    margin-top: -3px;
    transition: all 0.2s;
    animation: alertRed 0.5s infinite;

    @keyframes alertRed {
      0% {
        background: #f94343;
      }
      50% {
        background: #f9434352;
      }
      100% {
        background: #f94343;
      }
    }
  }
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0px;
    padding-right: 12px;
    width: 100%;
    .price {
      font-size: 18px;
    }
    .last-prices {
      font-size: 14px;
      text-decoration: underline;
    }
  }
`;
