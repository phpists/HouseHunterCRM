import cogoToast from "cogo-toast";

export const addZero = (num) => (num < 10 ? `0${num}` : num);

export const fortmatNumber = (num) =>
  num
    ? num
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        .split(".")[0]
    : 0;

export const emailValidation = (value) => {
  if (value) {
    const isError = value?.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    return isError && isError?.length > 0 ? false : true;
  }
  return false;
};

export const handleToFormData = (data, files) => {
  const formData = new FormData();

  Object.entries(data).forEach((field) => {
    if (Array.isArray(field[1])) {
      field[1].forEach((f, i) => {
        if (typeof f === "object") {
          Object.entries(f).forEach((fField) => {
            formData.append(`${field[0]}[${i}][${fField[0]}]`, fField[1]);
          });
        } else {
          f && formData.append(`${field[0]}[${i}]`, f);
        }
      });
    } else if (typeof field[1] === "object") {
      Object.entries(field[1]).forEach((fField) => {
        if (Array.isArray(fField[1])) {
          fField[1].forEach((f, i) => {
            formData.append(`${field[0]}[${fField[0]}][]`, f);
          });
        } else {
          formData.append(`${field[0]}[${fField[0]}]`, fField[1]);
        }
      });
    } else {
      field[1] && formData.append(field[0], field[1]);
    }
  });

  if (files) {
    Object.entries(files).forEach((field) => {
      if (Array.isArray(field[1])) {
        field[1].forEach((f, i) => {
          formData.append(`${field[0]}[${i}]`, f);
        });
      } else {
        formData.append(field[0], field[1]);
      }
    });
  }
  return formData;
};

export const handleRemovePhoneMask = (phone, removeFirstLetters = 3) =>
  phone.replaceAll("(", "").replaceAll(")", "").replaceAll("-", "");

export const handleFormatDate = (d, isShort) => {
  const date = new Date(d);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return isShort
    ? `${addZero(day)}.${addZero(month)}.${year}`
    : `${addZero(day)}.${addZero(month)}.${year} ${hours}:${minutes}`;
};

export const handleChangeRange = (
  values,
  prevValues,
  fields,
  onChangeField
) => {
  if (values[0] !== prevValues[0]) {
    onChangeField(fields[0], values[0] ?? 0);
  } else {
    onChangeField(fields[1], values[1] ?? 0);
  }
};

export const handleFormatFields = (fields) =>
  Object.entries(fields ?? {})?.map((field) => ({
    field: field[0],
    ...field[1],
  }));

export const handleCheckIsField = (fields, fieldName) =>
  !!handleFormatFields(fields?.main_field)?.find(
    ({ field }) => field === fieldName
  );

export const handleGetFieldsOptions = (fields, fieldName) => {
  const field = fields?.find(({ field }) => field === fieldName);
  const options = field
    ? Object.entries(field?.field_option)?.map((opt) => ({
        title: opt[1],
        value: opt[0],
      }))
    : null;

  return options ?? null;
};

export const handleResponse = (
  resp,
  onSuccess,
  onError,
  notShowErrorMessage
) => {
  if (resp?.data?.error === 0 || !resp?.data?.messege) {
    onSuccess && onSuccess();
  } else if (resp?.data?.error || resp?.data?.messege) {
    onError && onError();
    !notShowErrorMessage &&
      cogoToast.error(resp?.data?.messege ?? "Помилка", {
        hideAfter: 3,
        position: "top-right",
      });
  }
};

export const handleGetLocationAllPath = (locationsList, id, parentId, name) => {
  const isParent = locationsList.find((parent) => parent.id === parentId);
  if (!!isParent) {
    return handleGetLocationAllPath(
      locationsList,
      id,
      isParent?.id_parent,
      `${name} => ${isParent?.name}`
    );
  } else {
    return { value: id, title: name };
  }
};
