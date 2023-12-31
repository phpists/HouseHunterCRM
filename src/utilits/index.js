import cogoToast from "cogo-toast";
import avatar1 from "../assets/images/avatars/1.svg";
import avatar2 from "../assets/images/avatars/2.svg";
import avatar3 from "../assets/images/avatars/3.svg";
import avatar4 from "../assets/images/avatars/4.svg";

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
    // eslint-disable-next-line
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
            fField[1] &&
              formData.append(`${field[0]}[${i}][${fField[0]}]`, fField[1]);
          });
        } else {
          (f || f?.length > 0) && formData.append(`${field[0]}[${i}]`, f);
        }
      });
    } else if (typeof field[1] === "object") {
      Object.entries(field[1]).forEach((fField) => {
        if (Array.isArray(fField[1])) {
          fField[1].forEach((f, i) => {
            formData.append(`${field[0]}[${fField[0]}][]`, f);
          });
        } else {
          (fField[1] || fField[1]?.length > 0) &&
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
  const month = 1 + date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return isShort
    ? `${addZero(day)}.${addZero(month)}.${year}`
    : `${addZero(day)}.${addZero(month)}.${year} ${hours}:${minutes}`;
};

export const handleReformatDate = (d = "") => {
  if (d?.split(".")?.length === 3) {
    const day = d?.split(".")[0];
    const month = d?.split(".")[1];
    const year = d?.split(".")[2];

    return `${month}/${day}/${year}`;
  } else {
    return null;
  }
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
  notShowErrorMessage,
  isReturnData
) => {
  if (resp?.error?.data) {
    onError && onError();
    !notShowErrorMessage &&
      cogoToast.error("Помилка", {
        hideAfter: 3,
        position: "top-right",
      });
  } else if (
    (resp?.data?.error === 0 && resp?.data?.error !== undefined) ||
    (resp?.error !== undefined && resp?.error === 0)
  ) {
    if (onSuccess && isReturnData) {
      return onSuccess();
    } else if (onSuccess) {
      onSuccess();
    }
  } else if (
    resp?.data?.error === 0 &&
    resp?.data?.error !== undefined &&
    resp?.data
  ) {
    if (onSuccess && isReturnData) {
      return onSuccess();
    } else if (onSuccess) {
      onSuccess();
    }
  } else if (
    resp?.data?.error ||
    resp?.data?.messege ||
    resp?.error ||
    resp?.messege
  ) {
    onError && onError();
    if (
      resp?.data?.error !== 77 &&
      resp?.data?.error !== 32 &&
      resp?.error !== 32 &&
      resp?.error !== 77
    ) {
      !notShowErrorMessage &&
        cogoToast.error(
          resp?.data?.messege
            ? resp?.data?.messege
            : resp?.messege ?? "Помилка",
          {
            hideAfter: 3,
            position: "top-right",
          }
        );
    }
  } else {
    onError && onError();
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

export const handleCheckFields = ({
  data = {},
  requiredFields = [],
  additionalFields = [],
  requiredFieldsNumber = [],
  titles = [],
  additionalTitles = {},
  title,
}) => {
  let emptyFields = [];

  [...requiredFields, ...additionalFields].forEach((f) => {
    if (emptyFields?.find((eF) => eF === f)) {
    } else if (
      !data[f] ||
      data[f]?.length === 0 ||
      (!!requiredFields.find((fN) => fN === f) && Number(data[f]) === 0)
    ) {
      emptyFields.push(f);
    }
  });

  if (emptyFields?.length === 0) {
    return emptyFields;
  } else {
    const fieldsTitles = {
      ...titles,
      ...additionalTitles,
    };

    const handleTitles = emptyFields?.map(
      (f, i) => `${1 + i}. ${fieldsTitles[f] ?? ""}`
    );

    cogoToast.error(
      <>
        Заповніть обов'язкові поля {title ? `(${title})` : ""}:
        {handleTitles.map((t) => (
          <div>{t}</div>
        ))}
      </>,
      {
        hideAfter: 5,
        position: "top-right",
      }
    );

    return emptyFields;
  }
};

export const handleGetRoleAvatar = (level) => {
  const avatars = [avatar1, avatar2, avatar3, avatar4];

  return avatars[level - 1] ?? avatar1;
};

export const handleCheckAccess = (modules, moduleName, accessType) => {
  if (Array.isArray(modules)) {
    const module = modules.find((m) => m?.module_name === moduleName);

    return module && module[accessType];
  }

  return false;
};

export const getHours = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const handleDownload = (fileLink) => {
  var link = document.createElement("a");
  link.setAttribute("download", "file");
  link.href = fileLink;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const formatNumber = (num) =>
  typeof num === "number"
    ? num
        ?.toFixed(2)
        ?.replace(/\d(?=(\d{3})+\.)/g, "$&,")
        ?.split(".")[0]
    : "0";

export const handleGetRange = (num, isProcent) => {
  let start = 0;
  let end = isNaN(num) ? 0 : isProcent ? num + (num / 100) * 10 : num + 1;
  const startCalc = isProcent ? num - (num / 100) * 10 : num - 1;

  if (startCalc >= 0) {
    start = startCalc;
  }

  return { start, end };
};
