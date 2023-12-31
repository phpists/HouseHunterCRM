import { styled } from "styled-components";
import { Divider } from "../Divider";
import { Option } from "../../../../components/Option";
import {
  handleCheckIsField,
  handleFormatFields,
  handleGetFieldsOptions,
} from "../../../../utilits";
import React from "react";
import { useGetCommentsToFieldsQuery } from "../../../../store/objects/objects.api";
import { ProfileField } from "../../../../components/ProfileField";

export const Categories = ({ data, onChangeField, fields, errors }) => {
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();

  const Additional = fields
    ? [
        ...(handleCheckIsField(fields, "label_fake")
          ? [
              {
                title: "Фейк",
                name: "label_fake",
              },
            ]
          : []),
        ...(handleCheckIsField(fields, "label_without_animals")
          ? [
              {
                title: "Без тварин",
                name: "label_without_animals",
              },
            ]
          : []),
        ...(handleCheckIsField(fields, "label_without_children")
          ? [
              {
                title: "Без дітей",
                name: "label_without_children",
              },
            ]
          : []),
        ...(handleCheckIsField(fields, "label_without_foreigners")
          ? [
              {
                title: "Без іноземців",
                name: "label_without_foreigners",
              },
            ]
          : []),
        ...(handleCheckIsField(fields, "label_without_students")
          ? [
              {
                title: "Без студентів",
                name: "label_without_students",
              },
            ]
          : []),
      ]
    : [];

  const handleToggleOption = (opt, categoryName) => {
    let categoryData =
      data[categoryName]?.length > 0 && data[categoryName] !== "0"
        ? JSON.parse(
            typeof data[categoryName] === "string"
              ? data[categoryName]
              : JSON.stringify(data[categoryName])
          )
        : [];

    categoryData = Array.isArray(categoryData) ? categoryData : [];
    const isActive = !!categoryData?.find((o) => o === opt);
    const updatedValue = isActive
      ? categoryData.filter((o) => o !== opt)
      : [...categoryData, opt];

    onChangeField(categoryName, updatedValue);
  };

  const handleGetFieldType = (fieldName) =>
    handleFormatFields(fields?.other_field)?.find(
      ({ field }) => field === fieldName
    )?.type;

  return (
    <StyledCategories>
      {fields?.other_field && Object.entries(fields?.other_field)?.length > 0
        ? [...Object.entries(fields?.other_field)]
            ?.filter(
              (category) => commentsToFields?.object[category[0]]?.length > 0
            )
            ?.map((category, i) => (
              <React.Fragment key={i}>
                <>
                  {Object.entries(category[1]?.field_option)?.length > 0 ? (
                    <>
                      <Divider
                        title={commentsToFields?.object[category[0]]}
                        error={!!errors.find((e) => e === category[0])}
                      />
                      <div className="options">
                        {Object.entries(category[1]?.field_option)?.map(
                          (opt, j) => (
                            <Option
                              key={j}
                              title={opt[1]}
                              className="opt"
                              active={
                                handleGetFieldType(category[0]) === "int"
                                  ? data[category[0]] === opt[0]
                                  : data[category[0]]?.length > 0 &&
                                    data[category[0]] !== "0"
                                  ? JSON.parse(
                                      typeof data[category[0]] === "string"
                                        ? data[category[0]]
                                        : JSON.stringify(data[category[0]])
                                    )?.length
                                    ? !!JSON.parse(
                                        typeof data[category[0]] === "string"
                                          ? data[category[0]]
                                          : JSON.stringify(data[category[0]])
                                      )?.find((o) => o === opt[0])
                                    : false
                                  : false
                              }
                              onSelect={() =>
                                handleGetFieldType(category[0]) === "json"
                                  ? handleToggleOption(opt[0], category[0])
                                  : onChangeField(
                                      category[0],
                                      data[category[0]] === opt[0]
                                        ? null
                                        : opt[0]
                                    )
                              }
                            />
                          )
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <Divider />
                      <ProfileField
                        placeholder="Введіть значення"
                        value={data[category[0]]}
                        onChange={(val) => onChangeField(category[0], val)}
                        label={commentsToFields?.object[category[0]]}
                        className="field"
                        grey
                        type={
                          category[1]?.type === "int"
                            ? "number"
                            : category[1]?.type
                        }
                        error={!!errors.find((e) => e === category[0])}
                      />
                    </>
                  )}
                </>
              </React.Fragment>
            ))
        : null}
      <Divider title="Додатково" />
      <div className="options">
        {Additional.map((opt, i) => (
          <Option
            key={i}
            title={opt.title}
            className="opt"
            active={data[opt.name] === "1"}
            onSelect={() =>
              onChangeField(opt.name, data[opt.name] === "1" ? "0" : "1")
            }
            error={!!errors.find((e) => e === opt.name)}
          />
        ))}
      </div>
    </StyledCategories>
  );
};

const StyledCategories = styled.div`
  border-radius: 10px;
  background: #323232;
  padding: 4px;
  margin-top: 20px;
  .first-divider {
    margin: -12px 0 0px;
    .title {
      background: #323232 !important;
      opacity: 1;
      color: rgba(255, 255, 255, 0.4);
      border: none;
    }
    div {
      opacity: 0;
    }
  }
  .options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3px 4px;
    grid-auto-rows: max-content;
  }
  .opt {
    border: none;
    cursor: pointer;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: 100;
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
    border-radius: 6px;
    padding: 6px 6px 5px 8px;
  }
`;
