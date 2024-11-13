import styled from "styled-components";
import { Select } from "../../Select/Select";

const OBJECT_TYPES = [
  "торгово-розважальний комплекс",
  "торгово-офісний центр",
  "нежитлове приміщення в житловому будинку",
  "будівля / комплекс / павільйон",
  "торгове місце",
  "приміщення (частина приміщення)",
  "майданчик",
  "бізнес-центр",
  "адміністративна будівля",
  "житловий фонд",
  "виробниче приміщення",
  "складське приміщення",
];

const OBJECT_TYPES_HOUSE = [
  "цегла",
  "цегла силікатна",
  "цегла саманна",
  "дерево та цегла",
  "панель",
  "піноблок",
  "керамзітобетон",
  "моноліт",
  "зруб",
  "брус",
  "каркасно-щитовий",
  "глинобитний",
  "пінобетон",
  "газобетон",
  "сендвіч-панелі",
  "метал",
  "поротерм",
  "ракушняк",
  "інкерманський камінь",
  "шлакобетон",
  "шлакоблок",
  "наливний",
  "бутовий камінь",
  "мергель",
  "великоблочний вапняк",
  "термоблок",
  "СІП",
  "контейнер",
  "монолітно-цегляний",
  "монолітно-блочний",
  "монолітно-каркасний",
  "керамічний блок",
  "керамічна цегла",
  "блочно-цегляний",
  "каркасний",
];

const STREETS_TYPE = [
  "алея",
  "бульвар",
  "в'їзд",
  "гавань",
  "дорога",
  "дуга",
  "майдан",
  "масив",
  "міст",
  "набережна",
  "острів",
  "парк",
  "переїзд",
  "провулок",
  "плато",
  "площа",
  "пляж",
  "селище",
  "проїзд",
  "проспект",
  "сквер",
  "спуск",
  "тупик",
  "увіз",
  "вулиця",
  "хутір",
  "шосе",
  "1-й км.",
  "1-й в'їзд",
  "2-й в'їзд",
  "3-й в'їзд",
  "4-й в'їзд",
  "4-й проїзд",
  "5-й проїзд",
  "6-й проїзд",
  "5-й в'їзд",
  "1-й тупик",
  "2-й тупик",
  "3-й тупик",
  "4-й тупик",
  "5-й тупик",
  "6-й тупик",
  "7-й тупик",
  "1-й провулок",
  "2-й провулок",
  "3-й провулок",
  "4-й провулок",
  "5-й провулок",
  "6-й провулок",
  "7-й провулок",
  "8-й провулок",
  "9-й провулок",
  "10-й провулок",
  "11-й провулок",
  "12-й провулок",
  "13-й провулок",
  "1-й проїзд",
  "2-й проїзд",
  "3-й проїзд",
  "1-й проспект",
  "2-й проспект",
  "1-а лінія",
  "2-а лінія",
  "4-та лінія",
  "5-а лінія",
  "1-а вулиця",
  "2-а вулиця",
  "3-я вулиця",
  "4-а вулиця",
  "5-а вулиця",
  "6-а вулиця",
  "7-а вулиця",
  "8-а вулиця",
  "9-а вулиця",
  "10-а вулиця",
  "11-а вулиця",
  "12-та вулиця",
  "13-та вулиця",
  "14-та вулиця",
  "15-та вулиця",
  "16-та вулиця",
  "17-та вулиця",
  "18-та вулиця",
  "19-та вулиця",
  "20-та вулиця",
  "21-а вулиця",
  "22-га вулиця",
  "23-я вулиця",
  "24-та вулиця",
  "25-та вулиця",
  "26-а вулиця",
  "27-а вулиця",
  "28-а вулиця",
  "29-а вулиця",
  "30-а вулиця",
  "31-а вулиця",
  "32-я вулиця",
  "33-а вулиця",
  "34-та вулиця",
  "1-й узвіз",
  "2-й узвіз",
];

export const DomriaForm = ({ data, onChange }) => {
  const OBJECT_TYPE_ONE = ["67", "68"];
  const OBJECT_TYPE_HOUSE = ["63", "64"];
  const STREET_TYPE = ["57", "63", "67", "59", "64", "68"];

  return (
    <StyledRealestateForm>
      {OBJECT_TYPE_ONE.includes(data?.id_rubric) ? (
        <Select
          label="Тип об'єкта"
          options={OBJECT_TYPES?.map((v) => ({ title: v, value: v }))}
          value={data?.object_type}
          onChange={(v) => onChange("object_type", v)}
          isSearch
          required
        />
      ) : null}
      {OBJECT_TYPE_HOUSE.includes(data?.id_rubric) ? (
        <Select
          label="Тип об'єкта"
          options={OBJECT_TYPES_HOUSE?.map((v) => ({ title: v, value: v }))}
          value={data?.wall_type}
          onChange={(v) => onChange("wall_type", v)}
          isSearch
          required
        />
      ) : null}
      {STREET_TYPE.includes(data?.id_rubric) ? (
        <Select
          label="Тип вулиці"
          options={STREETS_TYPE?.map((v) => ({ title: v, value: v }))}
          value={data?.street_type}
          onChange={(v) => onChange("street_type", v)}
          isSearch
          required
        />
      ) : null}
    </StyledRealestateForm>
  );
};

const StyledRealestateForm = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  gap: 10px;
  .fields-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
`;
