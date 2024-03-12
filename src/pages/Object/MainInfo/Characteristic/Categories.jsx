import { styled } from "styled-components";
import { Divider } from "../Divider";
import { Option } from "../../../../components/Option";
import {
  checkIsArray,
  handleCheckIsField,
  handleFormatFields,
  handleGetFieldsOptions,
} from "../../../../utilits";
import React from "react";
import { useGetCommentsToFieldsQuery } from "../../../../store/objects/objects.api";
import { ProfileField } from "../../../../components/ProfileField";
import { CheckOption } from "../../../../components/CheckOption";
import { Select } from "../../../../components/Select/Select";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";

export const Categories = ({
  data,
  onChangeField,
  fields,
  errors,
  collapsed,
}) => {
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();

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

  const handleSelect = (val, field, prevValue) => {
    const isExist = !!prevValue?.find((t) => t === val);
    onChangeField(
      field,
      isExist ? prevValue?.filter((t) => t !== val) : [...prevValue, val]
    );
  };

  return (
    <StyledCategories>
      {fields?.other_field && Object.entries(fields?.other_field)?.length > 0
        ? [...Object.entries(fields?.other_field)]
            ?.filter(
              (category) => commentsToFields?.object[category[0]]?.length > 0
            )
            ?.sort((a, b) => a[1]?.sort - b[1]?.sort)
            ?.filter((c) => (collapsed ? c?.collapsed === 1 : true))
            ?.filter(
              (category) =>
                ![
                  "street",
                  "address_entrance_number",
                  "address_apartment_number",
                  "address_house_number",
                ]?.find((c) => c === category[0])
            )
            ?.map((category, i) => (
              <React.Fragment key={i}>
                <>
                  {Object.entries(category[1]?.field_option)?.length > 0 &&
                  category[1]?.type === "json" ? (
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
                  ) : Object.entries(category[1]?.field_option)?.length > 0 &&
                    category[1]?.type === "select" ? (
                    <Select
                      value={data[category[0]]}
                      options={Object.entries(category[1]?.field_option)?.map(
                        (opt) => ({ value: opt[0], title: opt[1] })
                      )}
                      onChange={(val) => onChangeField(category[0], val)}
                      label={commentsToFields?.object[category[0]] ?? "-"}
                      labelActive={commentsToFields?.object[category[0]] ?? "-"}
                      hideArrowDefault
                      error={!!errors.find((e) => e === category[0])}
                    />
                  ) : Object.entries(category[1]?.field_option)?.length > 0 &&
                    category[1]?.type === "multi_select" ? (
                    <>
                      <Divider />
                      <SelectTags
                        label={commentsToFields?.object[category[0]]}
                        showTags
                        tags={Object.entries(category[1]?.field_option)
                          ?.map((opt) => ({ value: opt[0], title: opt[1] }))
                          ?.filter((v) =>
                            checkIsArray(data[category[0]])?.includes(v.value)
                          )}
                        options={Object.entries(category[1]?.field_option)?.map(
                          (opt) => ({ value: opt[0], title: opt[1] })
                        )}
                        onChange={(val) =>
                          handleSelect(
                            val,
                            category[0],
                            checkIsArray(data[category[0]])
                          )
                        }
                      />
                    </>
                  ) : category[1]?.type === "checkbox" ? (
                    <>
                      <Divider />
                      <CheckOption
                        label={commentsToFields?.object[category[0]]}
                        value={data[category[0]]}
                        onChange={(val) => onChangeField(category[0], val)}
                        error={!!errors.find((e) => e === category[0])}
                      />
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
    </StyledCategories>
  );
};

const StyledCategories = styled.div`
  border-radius: 10px;
  background: #323232;
  padding: 4px;
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
