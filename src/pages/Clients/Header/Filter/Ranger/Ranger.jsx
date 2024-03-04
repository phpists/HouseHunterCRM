import { styled } from "styled-components";
import { useRanger } from "react-ranger";
import { useState } from "react";
import { Footer } from "./Footer/Footer";

export const Ranger = ({
  label,
  types = [],
  min = 0,
  max = 100,
  defaultStart = 0,
  defaultEnd = 0,
  type = null,
}) => {
  const [values, setValues] = useState([defaultStart, defaultEnd]);
  const [activeType, setActiveType] = useState(0);
  const { getTrackProps, handles } = useRanger({
    values,
    onChange: setValues,
    min,
    max,
    stepSize: 1,
  });

  const handleChangeType = (type) => setActiveType(type);
  return (
    <StyledRanger>
      <div
        {...getTrackProps({
          style: {
            height: "4px",
            background: "#808080",
            borderRadius: "9px",
          },
        })}
      >
        {handles.map(({ getHandleProps }) => (
          <div
            {...getHandleProps({
              style: {
                width: "14px",
                height: "14px",
                borderRadius: "100%",
                background: "#585858",
                border: "solid 2px #fff",
                cursor: "grab",
              },
            })}
          />
        ))}
      </div>
      <Footer
        label={label}
        values={values}
        types={types}
        activeType={activeType}
        onChangeType={handleChangeType}
        type={type}
      />
    </StyledRanger>
  );
};

const StyledRanger = styled.div`
  padding: 10px 10px 5px;
  border-radius: 6px;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;
