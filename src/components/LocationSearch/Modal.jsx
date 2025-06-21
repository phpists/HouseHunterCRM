import styled from "styled-components";
import { CheckOption } from "../CheckOption";
import { ReactComponent as Close } from "../../assets/images/close.svg";
import { Select } from "../Select/Select";
import { Tag } from "../SelectTags/Tag";
import { useState } from "react";
import { Button } from "../Button";

const regionsIds = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "22",
  "23",
  "24",
  "25",
];

export const Modal = ({ value = [], onClose, onChange, locations }) => {
  const [selected, setSelected] = useState(value);

  const handleToggleRegion = (regionId) => {
    setSelected(
      selected?.find((l) => l === regionId)
        ? selected?.filter((l) => l !== regionId)
        : [...(selected ? selected : []), regionId]
    );
  };

  const handleSelectGroup = (groupIds) => {
    let updatedValue = [...selected];

    if (
      updatedValue.filter((id) => groupIds.includes(id))?.length ===
      groupIds.length
    ) {
      updatedValue = updatedValue.filter((id) => !groupIds.includes(id));
    } else {
      groupIds.forEach((id) => {
        if (!updatedValue.includes(id)) {
          updatedValue.push(id);
        }
      });
    }

    setSelected(updatedValue);
  };

  const handleSave = () => {
    onChange(selected);
    onClose();
  };

  return (
    <StyledModal>
      <div className="card">
        <Close className="close-btn" onClick={onClose} />
        <div className="card-search my-3 max-w-[300px]">
          <Select
            options={locations?.filter((l) => !selected.includes(l.value))}
            onChange={handleToggleRegion}
            placeholder="Я шукаю місто..."
            isSearch
            hideArrowDefault
            closeOnBlur
            closeOnSelect
            noOverlay
          />
        </div>
        <div
          className={`flex flex-wrap gap-2 ${
            !selected?.filter((v) => !regionsIds.includes(v))?.length === 0
              ? "hidden"
              : "mb-4"
          }`}
        >
          {selected
            ?.filter((v) => !regionsIds.includes(v))
            ?.map((l) => (
              <Tag
                key={l}
                onRemove={() => handleToggleRegion(l)}
                title={locations.find((loc) => loc.value === l)?.title}
              />
            ))}
        </div>
        <div className="card-regions">
          <div>
            <div
              className="card-regions-title"
              onClick={() => handleSelectGroup(["10", "2", "8", "6"])}
            >
              Північ
            </div>{" "}
            <div className="flex flex-col gap-3 mb-3">
              <CheckOption
                label="Київська"
                value={selected?.includes("10") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("10");
                }}
                className="gap-2"
              />
              <CheckOption
                label="Житомирська"
                value={selected?.includes("2") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("2");
                }}
                className="gap-2"
              />
              <CheckOption
                label="Сумська"
                value={selected?.includes("8") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("8");
                }}
                className="gap-2"
              />
              <CheckOption
                label="Чернігівська"
                value={selected?.includes("6") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("6");
                }}
                className="gap-2"
              />
            </div>
            <div
              className="card-regions-title"
              onClick={() => handleSelectGroup(["1", "16", "20", "24"])}
            >
              Центр
            </div>
            <div className="flex flex-col gap-3">
              <CheckOption
                label="Вінницька"
                value={selected?.includes("1") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("1");
                }}
                className="gap-2"
              />
              <CheckOption
                label="Кіровоградська"
                value={selected?.includes("16") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("16");
                }}
                className="gap-2"
              />
              <CheckOption
                label="Полтавська"
                value={selected?.includes("20") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("20");
                }}
                className="gap-2"
              />
              <CheckOption
                label="Черкаська"
                value={selected?.includes("24") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("24");
                }}
                className="gap-2"
              />
            </div>
          </div>
          <div>
            <div
              className="card-regions-title"
              onClick={() =>
                handleSelectGroup(["5", "18", "22", "15", "4", "9", "3", "25"])
              }
            >
              Захід
            </div>
            <div className="flex flex-col gap-3">
              <CheckOption
                label="Львівська"
                value={selected?.includes("5") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("5");
                }}
                className="gap-2"
              />
              <CheckOption
                label="Волинська"
                value={selected?.includes("18") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("18");
                }}
                className="gap-2"
              />
              <CheckOption
                label="Закарпатська"
                value={selected?.includes("22") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("22");
                }}
                className="gap-2"
              />
              <CheckOption
                label="Івано-Франківська"
                value={selected?.includes("15") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("15");
                }}
                className="gap-2"
              />{" "}
              <CheckOption
                label="Хмельницька"
                value={selected?.includes("4") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("4");
                }}
                className="gap-2"
              />
              <CheckOption
                label="Рівненська"
                value={selected?.includes("9") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("9");
                }}
                className="gap-2"
              />
              <CheckOption
                label="Тернопільська"
                value={selected?.includes("3") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("3");
                }}
                className="gap-2"
              />
              <CheckOption
                label="Чернівецька"
                value={selected?.includes("25") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("25");
                }}
                className="gap-2"
              />
            </div>
          </div>
          <div>
            {" "}
            <div
              className="card-regions-title"
              onClick={() => handleSelectGroup(["11", "7", "13", "14", "17"])}
            >
              Схід
            </div>{" "}
            <div className="flex flex-col gap-3 mb-3">
              <CheckOption
                label="Дніпропетровська"
                value={selected?.includes("11") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("11");
                }}
                className="gap-2"
              />
              <CheckOption
                label="Харківська"
                value={selected?.includes("7") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("7");
                }}
                className="gap-2"
              />
              <CheckOption
                label="Донецька"
                value={selected?.includes("13") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("13");
                }}
                className="gap-2"
              />
              <CheckOption
                label="Запорізька"
                value={selected?.includes("14") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("14");
                }}
                className="gap-2"
              />{" "}
              <CheckOption
                label="Луганська"
                value={selected?.includes("17") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("17");
                }}
                className="gap-2"
              />
            </div>
            <div
              className="card-regions-title"
              onClick={() => handleSelectGroup(["23", "19", "12"])}
            >
              Південь
            </div>{" "}
            <div className="flex flex-col gap-3">
              <CheckOption
                label="Херсонська"
                value={selected?.includes("23") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("23");
                }}
                className="gap-2"
              />
              <CheckOption
                label="Миколаївська"
                value={selected?.includes("19") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("19");
                }}
                className="gap-2"
              />
              <CheckOption
                label="Одеська"
                value={selected?.includes("12") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("12");
                }}
                className="gap-2"
              />
            </div>
          </div>
        </div>
        <div className="ok-btn-wrapper">
          <Button onClick={handleSave} title="Ок" />
        </div>
      </div>
    </StyledModal>
  );
};
const StyledModal = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  width: 100svw;
  height: 100svh;
  padding: 15px;
  background: rgba(44, 44, 44, 0.6);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  .card {
    padding: 15px;
    border-radius: 10px;
    background: var(--modal-bg);
    width: 100%;
    max-width: 700px;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
  }
  .card-regions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
  }
  .card-regions-title {
    margin-bottom: 5px;
    padding-left: 11px;
    cursor: pointer;
  }
  .close-btn {
    position: absolute;
    top: 10px;
    right: 9px;
    cursor: pointer;
    &:hover {
      g {
        opacity: 1;
      }
    }
  }
  .ok-btn-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
`;
