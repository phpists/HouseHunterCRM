import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Modal } from "./Modal/Modal";
import { handleFormatDate } from "../utilits";
import { useAppSelect } from "../hooks/redux";

export const ObjectPriceHistory = ({ onClose, data }) => {
  const { theme } = useAppSelect((state) => state.auth);

  const isJsonString = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const handleGetDates = () => {
    if (isJsonString(data)) {
      const dates = JSON.parse(data);
      if (Object.entries(dates)?.length > 1) {
        try {
          return Array.isArray(dates)
            ? dates?.map((date) =>
                handleFormatDate(
                  Number(Object.entries(date)[0][0]) * 1000,
                  true
                )
              )
            : Object.entries(dates)?.map((date) =>
                handleFormatDate(Number(date[0]) * 1000, true)
              );
        } catch {
          return [];
        }
      } else if (typeof dates === "object") {
        try {
          return [
            handleFormatDate(Number(Object.entries(dates)[0][0]) * 1000, true),
          ];
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

  const handleGetPrices = () => {
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

  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Desktops",
        data: handleGetPrices(),
      },
    ],
    options: {
      colors: ["#50f835"],
      chart: {
        height: 350,
        type: "line",
        group: "social",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
          tools: {
            download: false,
          },
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 1200,
          animateGradually: {
            enabled: true,
            delay: 500,
          },
        },
      },

      stroke: {
        curve: "straight",
      },
      tooltip: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        dropShadow: {
          enable: false,
          opacity: 0,
        },
      },

      grid: {
        show: true,
        borderColor: theme === "dark" ? "rgba(255, 255, 255, 0.10)" : "#171725",
        position: "back",
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        categories: handleGetDates(),
        labels: {
          style: {
            colors: theme === "dark" ? "rgba(255, 255, 255, 0.60)" : "#171725",
            fontFamily: "Overpass",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: theme === "dark" ? "rgba(255, 255, 255, 0.60)" : "#171725",
            fontFamily: "Overpass",
          },
        },
      },
    },
  });

  useEffect(() => {
    setChartData({
      series: [
        {
          name: "Desktops",
          data: handleGetPrices(),
        },
      ],
      options: {
        colors: ["#50f835"],
        chart: {
          height: 350,
          type: "line",
          group: "social",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
            tools: {
              download: false,
            },
          },
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 1200,
            animateGradually: {
              enabled: true,
              delay: 500,
            },
          },
        },

        stroke: {
          curve: "straight",
        },
        tooltip: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        dataLabels: {
          dropShadow: {
            enable: false,
            opacity: 0,
          },
        },

        grid: {
          show: true,
          borderColor:
            theme === "dark" ? "rgba(255, 255, 255, 0.10)" : "#171725",
          position: "back",
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        xaxis: {
          categories: handleGetDates(),
          labels: {
            style: {
              colors:
                theme === "dark" ? "rgba(255, 255, 255, 0.60)" : "#171725",
              fontFamily: "Overpass",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors:
                theme === "dark" ? "rgba(255, 255, 255, 0.60)" : "#171725",
              fontFamily: "Overpass",
            },
          },
        },
      },
    });
  }, [data]);

  const handleGetPriceTableData = () => {
    if (isJsonString(data)) {
      let prices = JSON.parse(data);
      if (Array.isArray(prices)) {
        prices = prices.reduce((acc, item) => {
          const key = Object.keys(item)[0]; // дістаємо ключ-таймстамп
          acc[key] = {
            price: parseFloat(item[key].price), // важливо привести price до числа
            price_currency: item[key].price_currency,
          };
          return acc;
        }, {});
      }
      const timestamps = Object.keys(prices).sort((a, b) => a - b);

      // Початкова ціна (перша з відсортованого масиву)
      const startPrice = prices[timestamps[0]].price;

      const formattedData = timestamps.map((timestamp, index) => {
        const date = new Date(parseInt(timestamp) * 1000);

        const formattedDate = date.toLocaleDateString("uk-UA", {
          day: "2-digit",
          month: "short",
        });

        const currentPrice = prices[timestamp].price;

        const previousPrice =
          index === 0 ? currentPrice : prices[timestamps[index - 1]].price;

        const step = currentPrice - previousPrice;
        const stepPercent = ((step / previousPrice) * 100).toFixed(1) + "%";

        const fromStart = currentPrice - startPrice;
        const fromStartPercent =
          ((fromStart / startPrice) * 100).toFixed(1) + "%";

        return {
          date: formattedDate,
          price: currentPrice,
          step: step,
          step_percent: stepPercent,
          from_start: fromStart,
          from_start_percent: fromStartPercent,
        };
      });
      return formattedData;
    } else {
      return [];
    }
  };

  return (
    <StyledObjectPriceHistory>
      <Modal onClose={onClose} title="Графік змін цін">
        <div className="object-history-wrapper">
          {!isJsonString(data) ? (
            <div className="empty">Пусто</div>
          ) : (
            <div className="object-history-cards">
              <table>
                <tr>
                  <th>Дата</th>
                  <th>Ціна</th>
                  <th>Покроково</th>
                  <th>Від початкової</th>
                </tr>
                {handleGetPriceTableData()?.map(
                  ({
                    date,
                    price,
                    step,
                    step_percent,
                    from_start,
                    from_start_percent,
                  }) => (
                    <tr>
                      <td>{date}</td>
                      <td>{price}</td>
                      <td>
                        {step} <span>{step_percent}</span>
                      </td>
                      <td>
                        {from_start} <span>{from_start_percent}</span>
                      </td>
                    </tr>
                  )
                )}
              </table>
              <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={260}
              />
            </div>
          )}
        </div>
      </Modal>
    </StyledObjectPriceHistory>
  );
};

const StyledObjectPriceHistory = styled.div`
  .object-history-wrapper {
    max-height: 50vh;
    overflow: auto;
  }
  .empty {
    color: var(--dark-90);
    font-family: Overpass;
    font-size: 18px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: normal;
    letter-spacing: 0.36px;
    margin-bottom: 4px;
    text-align: center;
  }
  .modal {
    max-width: 550px;
  }
  table {
    width: 100%;
    text-align: center;
    font-weight: 300;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 10px;
    td,
    th {
      border: 1px solid var(--second-color);
      padding: 5px;
      span {
        font-size: 12px;
      }
    }
    th {
      font-weight: 400;
      &:nth-child(1) {
        border-radius: 5px 0 0 0;
      }

      &:last-child {
        border-radius: 0 5px 0 0;
      }
    }

    tr:last-child {
      td:first-child {
        border-radius: 0 0 0 5px;
      }
      td:last-child {
        border-radius: 0 0 5px 0;
      }
    }
  }
  text {
    color: var(--bg-60) !important;
  }
`;
