import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Modal } from "./Modal/Modal";
import { handleFormatDate } from "../utilits";

export const ObjectPriceHistory = ({ onClose, data }) => {
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
          return dates?.map((date) =>
            handleFormatDate(Number(Object.entries(date)[0][0]) * 1000, true)
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
          return dates?.map(
            (date) => Number(Object.entries(date)[0][1]?.price) ?? 0
          );
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
      colors: ["#50F835"],
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
        borderColor: "rgba(255, 255, 255, 0.10)",
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
            colors: "rgba(255, 255, 255, 0.60)",
            fontFamily: "Overpass",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "rgba(255, 255, 255, 0.60)",
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
        colors: ["#50F835"],
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
          borderColor: "rgba(255, 255, 255, 0.10)",
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
              colors: "rgba(255, 255, 255, 0.60)",
              fontFamily: "Overpass",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "rgba(255, 255, 255, 0.60)",
              fontFamily: "Overpass",
            },
          },
        },
      },
    });
  }, [data]);

  return (
    <StyledObjectPriceHistory>
      <Modal onClose={onClose} title="Графік змін цін">
        <div className="object-history-wrapper">
          {!isJsonString(data) ? (
            <div className="empty">Пусто</div>
          ) : (
            <div className="object-history-cards">
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
    max-height: 60vh;
    overflow: hidden;
  }
  .empty {
    color: rgba(255, 255, 255, 0.9);
    font-family: Overpass;
    font-size: 18px;
    font-style: normal;
    font-weight: 100;
    line-height: normal;
    letter-spacing: 0.36px;
    margin-bottom: 4px;
    text-align: center;
  }
  .modal {
    max-width: 540px;
  }
  text {
    color: rgba(255, 255, 255, 0.6) !important;
  }
`;
