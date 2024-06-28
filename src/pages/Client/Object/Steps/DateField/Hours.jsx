import { useState } from "react";
import { styled } from "styled-components";

export const Hours = () => {
  const [hours, setHours] = useState("13");
  const [minutes, setMinutes] = useState("30");

  const handleValidateHhMm = (hoursValue, minutesValue) => {
    var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(
      `${hoursValue}:${minutesValue}`
    );

    if (isValid) {
      setHours(hoursValue);
      setMinutes(minutesValue);
    } else {
      console.log("not valid");
    }

    return isValid;
  };

  const handleChangeHours = (value) => handleValidateHhMm(value, minutes);
  const handleChangeMinutes = (value) => handleValidateHhMm(hours, value);

  return (
    <StyledHours className="flex items-center justify-center">
      <input
        type="text"
        value={hours}
        onChange={(e) => handleChangeHours(e.target.value)}
      />
      <div>:</div>
      <input
        type="text"
        value={minutes}
        onChange={(e) => handleChangeMinutes(e.target.value)}
      />
    </StyledHours>
  );
};

const StyledHours = styled.div`
  padding: 8px 14px;
  border-radius: 9px;
  border: 1px solid rgba(255, 255, 255, 0.29);
  background: rgba(0, 0, 0, 0.1);
  width: 157px;
  margin-left: auto;
  input {
    width: 20px;
    color: var(--main-color);
    text-align: center;
    font-feature-settings: "clig" off, "liga" off;
    font-family: Public Sans;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 22px; /* 146.667% */
  }
  div {
    margin: 0 10px;
    color: var(--bg-20);
    text-align: center;
    font-feature-settings: "clig" off, "liga" off;
    font-family: Public Sans;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: 22px; /* 146.667% */
  }
`;
