import { styled } from "styled-components";
import { useRanger } from "react-ranger";
import { useState } from "react";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";
import { Statistic } from "./Statistic/Statistic";

export const Segment = styled("div")`
  background: ${(props) =>
    props.index === 0
      ? "#808080"
      : props.index === 1
      ? "#FFF"
      : props.index === 2
      ? "#808080"
      : "#808080"};
  height: 100%;
`;

export const Ranger = ({
  label,
  min = 0,
  max = 100,
  defaultStart = 0,
  defaultEnd = 0,
  mainTypes = [],
  currency,
  mainType,
  big,
  values = [0, 0],
  onChange,
  currencyValue,
  onChangeCurrency,
  error,
  className,
  typeValue,
  onChangeType,
  typeError,
  onBlur,
  onFocus,
}) => {
  const { getTrackProps, handles, segments } = useRanger({
    values,
    min,
    max,
    stepSize: 1,
    onDrag: (val) => {
      onChange(val);
      onFocus && onFocus();
    },
    onChange: () => {
      onBlur && onBlur();
    },
  });

  return (
    <StyledRanger
      big={big}
      error={error?.toString()}
      className={`${error && "error-field"} select-none	${className}`}
    >
      <Header
        label={label}
        mainTypes={mainTypes}
        typeValue={typeValue}
        onChangeType={onChangeType}
        typeError={typeError}
      />
      {big && (
        <Statistic
          activeSegment={
            segments?.map(({ getSegmentProps }, i) => getSegmentProps())[1]
          }
        />
      )}
      <div
        {...getTrackProps({
          style: {
            height: "3px",
            background: "#808080",
            borderRadius: "9px",
            marginBottom: big ? 21 : 16,
            zIndex: 100,
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
                zIndex: 3,
              },
            })}
          />
        ))}
        {segments.map(({ getSegmentProps }, i) => (
          <Segment {...getSegmentProps()} index={i} />
        ))}
      </div>
      <Footer
        currency={currency}
        values={values}
        onChange={onChange}
        mainType={mainType}
        currencyValue={currencyValue}
        onChangeCurrency={onChangeCurrency}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </StyledRanger>
  );
};

const StyledRanger = styled.div`
  padding: ${({ big }) => (big ? "6px 10px 10px" : "8px 10px")};
  border-radius: 9px;
  padding: ${({ big }) => !big && "transition: all 0.3s;"};

  /* transition: all 0.3s; */
  /* background: rgba(255, 255, 255, 0.05); */
  position: relative;
  overflow: hidden;
  ${({ error }) => error === "true" && "border: 1px solid red;"}
  .first-angle,
  .second-angle {
    opacity: 0;
    transition: all 0s;
  }
  ${({ big }) =>
    big &&
    `
     background: rgba(255, 255, 255, 0.05);
    .first-angle,
    .second-angle {
      opacity: 1;
    }
  `}

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    .first-angle,
    .second-angle {
      opacity: 1;
    }
  }
`;
