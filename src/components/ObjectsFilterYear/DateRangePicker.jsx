import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import WheelPicker from "react-simple-wheel-picker";
import { Button } from "../Button";

const DateRangePickerWrapper = styled.div`
  max-width: 600px;
  font-family: Overpass, sans-serif;
  padding: 15px;
`;

const DateColumns = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  gap: 20px;
`;

const DateColumn = styled.div`
  flex: 1;
  text-align: center;

  h3 {
    font-size: 16px;
    margin-bottom: 10px;
    color: var(--main-color, #fff);
  }
`;

const PickerContainer = styled.div`
  position: relative;

  /* Target the scrollable container */
  .sc-eqLlWn {
    /* Hide scrollbar for Chrome, Safari and Opera */
    &::-webkit-scrollbar {
      display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  align-items: right;
  justify-content: right;
  margin: 30px 0 0 0;
`;

const DateRangePicker = ({ onChange, onClose, initial }) => {
  const currentYear = new Date().getFullYear();
  const minYear = 1885;
  const maxYear = currentYear;

  const years = useMemo(
    () =>
      Array.from({ length: maxYear - minYear + 1 }, (_, i) => {
        const year = minYear + i;
        return { id: year.toString(), value: year.toString() };
      }),
    [minYear, maxYear]
  );

  const [selectedRange, setSelectedRange] = useState({
    from: initial[0] || 2000,
    to: initial[1] || maxYear.toString(),
  });

  const handleChange = (type, target) => {
    const newValue = target.value;
    setSelectedRange((prev) => {
      const updated = { ...prev, [type]: newValue };
      const from = parseInt(updated.from, 10);
      const to = parseInt(updated.to, 10);

      // Ensure from is always less than to
      if (type === "from" && from >= to) {
        updated.to = Math.min(from + 1, maxYear).toString();
      } else if (type === "to" && to <= from) {
        updated.from = Math.max(to - 1, minYear).toString();
      }

      if (onChange) {
        onChange([parseInt(updated.from, 10), parseInt(updated.to, 10)]);
      }

      return updated;
    });
  };

  // Filter years for "to" picker based on selected "from" year
  const toYears = useMemo(() => {
    const fromYear = parseInt(selectedRange.from, 10);
    return years.filter((year) => parseInt(year.id, 10) > fromYear);
  }, [selectedRange.from, years]);

  // Filter years for "from" picker based on selected "to" year
  const fromYears = useMemo(() => {
    const toYear = parseInt(selectedRange.to, 10);
    return years.filter((year) => parseInt(year.id, 10) < toYear);
  }, [selectedRange.to, years]);

  // Ensure selected values are within filtered ranges
  useEffect(() => {
    const from = parseInt(selectedRange.from, 10);
    const to = parseInt(selectedRange.to, 10);

    if (from >= to) {
      setSelectedRange((prev) => ({
        from: Math.min(from, to - 1).toString(),
        to: Math.max(to, from + 1).toString(),
      }));
    }
  }, [selectedRange.from, selectedRange.to]);

  return (
    <DateRangePickerWrapper>
      <h1>Рік випуску</h1>
      <DateColumns>
        <DateColumn>
          <h3>Від</h3>
          <PickerContainer>
            <WheelPicker
              data={fromYears}
              onChange={(target) => handleChange("from", target)}
              height={200}
              itemHeight={40}
              selectedID={selectedRange.from}
              color="#ccc"
              activeColor="#fff"
              backgroundColor="var(--card-bg-2, #2c2c2e)"
            />
          </PickerContainer>
        </DateColumn>
        <DateColumn>
          <h3>До</h3>
          <PickerContainer>
            <WheelPicker
              data={toYears}
              onChange={(target) => handleChange("to", target)}
              height={200}
              itemHeight={40}
              selectedID={selectedRange.to}
              color="#ccc"
              activeColor="#fff"
              backgroundColor="var(--card-bg-2, #2c2c2e)"
            />
          </PickerContainer>
        </DateColumn>
      </DateColumns>

      <BtnWrapper>
        <Button onClick={onClose} title="Застосувати" />
      </BtnWrapper>
    </DateRangePickerWrapper>
  );
};

export default DateRangePicker;
