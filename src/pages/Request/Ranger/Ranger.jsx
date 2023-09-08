import { styled } from "styled-components";
import { useRanger } from "react-ranger";
import { useState } from "react";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";

export const Ranger = ({
  label,
  min = 0,
  max = 100,
  defaultStart = 0,
  defaultEnd = 0,
  mainTypes = [],
  currency,
  mainType,
}) => {
  const [values, setValues] = useState([defaultStart, defaultEnd]);
  const { getTrackProps, handles } = useRanger({
    values,
    onChange: setValues,
    min,
    max,
    stepSize: 1,
  });

  return (
    <StyledRanger>
      <Header label={label} mainTypes={mainTypes} />
      <div
        {...getTrackProps({
          style: {
            height: "3px",
            background: "#808080",
            borderRadius: "9px",
            marginBottom: 16,
          },
        })}
      >
        {handles.map(({ getHandleProps }) => (
          <div
            {...getHandleProps({
              style: {
                width: "15px",
                height: "15px",
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.30)",
                border: "2px solid #FFF",
                cursor: "grab",
                boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.15)",
                backdropFilter: "blur(5.5px)",
              },
            })}
          />
        ))}
      </div>
      <Footer currency={currency} values={values} mainType={mainType} />
    </StyledRanger>
  );
};

const StyledRanger = styled.div`
  padding: 8px 10px;
  border-radius: 9px;
  transition: all 0.3s;
  /* background: rgba(255, 255, 255, 0.05); */
  position: relative;
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;
