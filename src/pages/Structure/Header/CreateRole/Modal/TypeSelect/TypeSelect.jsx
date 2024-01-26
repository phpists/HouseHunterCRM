import styled from "styled-components";
import { ReactComponent as ArrowDownIcon } from "../../../../../../assets/images/arrow-down.svg";
import { useState } from "react";
import { Dropdown } from "./Dropdown";
import {
  useGetAllPerimissionsLevelsQuery,
  useGetCompanyStructureLevelQuery,
  useLazyChangeCompanyStructureLevelQuery,
} from "../../../../../../store/structure/structure.api";
import { TypeCard } from "./TypeCard/TypeCard";
import { handleResponse } from "../../../../../../utilits";
import cogoToast from "cogo-toast";
import { Confirm } from "../../../../../../components/Confirm/Confirm";

export const TypeSelect = ({ onConfirm, onRefetchStructureData }) => {
  const [open, setOpen] = useState(false);
  const { data, refetch } = useGetCompanyStructureLevelQuery();
  const { data: levels } = useGetAllPerimissionsLevelsQuery();
  const [changeCompanyLevel] = useLazyChangeCompanyStructureLevelQuery();

  const handleGetCurrentLevel = (level) =>
    levels
      ? Object.entries(levels)
          ?.map((l) => l[1])
          ?.find((l) => Number(l.level) === Number(level))
      : [];

  const handleChangeLevel = (level) => {
    setOpen(false);
    changeCompanyLevel(level).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success("Рівень успішно змінено", {
          hideAfter: 3,
          position: "top-right",
        });
        refetch();
        onRefetchStructureData();
      })
    );
  };

  return (
    <>
      <StyledTypeSelect
        className="flex items-center justify-between"
        open={open}
      >
        <div>
          <div className="title">
            {data && handleGetCurrentLevel(data)
              ? handleGetCurrentLevel(data)["0"]
              : "Оберіть"}
          </div>
          <div className="subtitle">Оберіть кількість рівнів компанії</div>
        </div>
        <button
          className="arrow-btn flex items-center justify-center"
          onClick={() => setOpen(!open)}
        >
          <ArrowDownIcon />
        </button>
        {open && (
          <Dropdown
            active={data}
            levels={levels}
            onChange={(lvl) => {
              onConfirm(() => handleChangeLevel(lvl));
            }}
          />
        )}
      </StyledTypeSelect>
    </>
  );
};

const StyledTypeSelect = styled.div`
  padding: 8px 10px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.03);
  position: relative;
  margin-bottom: 26px;
  .title {
    color: #fff;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    margin-bottom: 2px;
    text-align: left;
  }
  .subtitle {
    color: #fff;
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
    text-align: left;
  }
  .arrow-btn {
    cursor: pointer;
    width: 26px;
    height: 26px;
    transition: all 0.3s;
    border-radius: 5px;
    backdrop-filter: blur(18.5px);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      g {
        opacity: 1;
      }
    }
  }
  svg {
    transition: all 0.3s;
  }
  path {
    fill: #fff;
  }

  ${({ open }) =>
    open &&
    `
    border-radius: 6px 6px 0 0;
    svg {
        transform: rotate(180deg);
    }
  `}
`;
