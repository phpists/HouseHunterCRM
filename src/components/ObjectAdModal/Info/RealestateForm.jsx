import styled from "styled-components";
import { Select } from "../../Select/Select";
import { useState } from "react";
import { handleGetRegion } from "../../../api/realeState";

// obl: "",
// region: "",
// city: "",
// letter: "",
// house: "",
// street: "",
// street2: "",
// home: "",

export const RealestateForm = ({ data, onChange }) => {
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [streets, setStreets] = useState([]);
  const [homes, setHomes] = useState([]);

  const handleChangeOblast = (val) => {
    onChange("obl", val);
    handleGetRegion("1").then((resp) => console.log(resp));
  };

  return (
    <StyledRealestateForm>
      <Select
        label="Адреса"
        options={[
          { title: "Львів", value: "1" },
          { title: "Брюховичi", value: "1085" },
          { title: "Винники", value: "187" },
          { title: "Городок", value: "267" },
          { title: "Дрогобич", value: "267" },
          { title: "Зубра", value: "1118" },
          { title: "Моршин", value: "1698" },
          { title: "Новояворівськ", value: "1874" },
          { title: "Пустомити", value: "1079" },
          { title: "Рудне", value: "1161" },
          { title: "Скнилiв", value: "1165" },
          { title: "Сокільники", value: "1166" },
          { title: "Стебник", value: "337" },
          { title: "Стрий", value: "1651" },
          { title: "Трускавець", value: "342" },
          { title: "Червоноград", value: "1531" },
          { title: "Інший населений пункт", value: "2" },
        ]}
        value={data?.oblast}
        onChange={handleChangeOblast}
      />
    </StyledRealestateForm>
  );
};

const StyledRealestateForm = styled.div``;
