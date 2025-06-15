import styled from "styled-components";
import { CheckOption } from "../CheckOption";
import { ReactComponent as Close } from "../../assets/images/close.svg";
import { Select } from "../Select/Select";
import { Tag } from "../SelectTags/Tag";

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
  const handleToggleRegion = (regionId) => {
    onChange(
      value?.find((l) => l === regionId)
        ? value?.filter((l) => l !== regionId)
        : [...(value ? value : []), regionId]
    );
  };

  const handleSelectGroup = (groupIds) => {
    let updatedValue = [...value];

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

    onChange(updatedValue);
  };

  const handleSelectLocation = (selectedLocation) => {};

  return (
    <StyledModal>
      <div className="card">
        <Close className="close-btn" onClick={onClose} />
        <div className="card-search my-3 max-w-[300px]">
          <Select
            options={locations?.filter((l) => !value.includes(l.value))}
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
            !value?.filter((v) => !regionsIds.includes(v))?.length === 0
              ? "hidden"
              : "mb-4"
          }`}
        >
          {value
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
                value={value?.includes("10") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("10");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />
              <CheckOption
                label="Житомирська"
                value={value?.includes("2") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("2");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />
              <CheckOption
                label="Сумська"
                value={value?.includes("8") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("8");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />
              <CheckOption
                label="Чернігівська"
                value={value?.includes("6") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("6");
                }}
                className="flex-row-reverse !justify-end gap-2"
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
                value={value?.includes("1") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("1");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />
              <CheckOption
                label="Кіровоградська"
                value={value?.includes("16") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("16");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />
              <CheckOption
                label="Полтавська"
                value={value?.includes("20") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("20");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />
              <CheckOption
                label="Черкаська"
                value={value?.includes("24") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("24");
                }}
                className="flex-row-reverse !justify-end gap-2"
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
                value={value?.includes("5") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("5");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />
              <CheckOption
                label="Волинська"
                value={value?.includes("18") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("18");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />
              <CheckOption
                label="Закарпатська"
                value={value?.includes("22") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("22");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />
              <CheckOption
                label="Івано-Франківська"
                value={value?.includes("15") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("15");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />{" "}
              <CheckOption
                label="Хмельницька"
                value={value?.includes("4") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("4");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />
              <CheckOption
                label="Рівненська"
                value={value?.includes("9") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("9");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />
              <CheckOption
                label="Тернопільська"
                value={value?.includes("3") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("3");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />
              <CheckOption
                label="Чернівецька"
                value={value?.includes("25") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("25");
                }}
                className="flex-row-reverse !justify-end gap-2"
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
                value={value?.includes("11") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("11");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />
              <CheckOption
                label="Харківська"
                value={value?.includes("7") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("7");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />
              <CheckOption
                label="Донецька"
                value={value?.includes("13") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("13");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />
              <CheckOption
                label="Запорізька"
                value={value?.includes("14") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("14");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />{" "}
              <CheckOption
                label="Луганська"
                value={value?.includes("17") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("17");
                }}
                className="flex-row-reverse !justify-end gap-2"
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
                value={value?.includes("23") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("23");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />
              <CheckOption
                label="Миколаївська"
                value={value?.includes("19") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("19");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />
              <CheckOption
                label="Одеська"
                value={value?.includes("12") ? "1" : "0"}
                onChange={() => {
                  handleToggleRegion("12");
                }}
                className="flex-row-reverse !justify-end gap-2"
              />
            </div>
          </div>
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
`;
