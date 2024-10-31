import cogoToast from "cogo-toast";
import avatar1 from "../assets/images/avatars/1.svg";
import avatar2 from "../assets/images/avatars/2.svg";
import avatar3 from "../assets/images/avatars/3.svg";
import avatar4 from "../assets/images/avatars/4.svg";
import { ReactComponent as CloseIcon } from "../assets/images/close-modal.svg";

export const showAlert = (type, msg) => {
  let timeout;
  const { hide } = cogoToast[type](
    <div>
      {msg}
      <CloseIcon className="close-alert-icon" onClick={() => hide()} />
      <div
        className="alert-overlay"
        onMouseEnter={() => clearTimeout(timeout)}
        onMouseLeave={() => {
          timeout = setTimeout(hide, 5000);
        }}
      />
    </div>,
    {
      position: "top-right",
      hideAfter: 0,
    }
  );
  timeout = setTimeout(hide, 5000);
};

export const addZero = (num) => (num < 10 ? `0${num}` : num);

export const fortmatNumber = (num) =>
  num
    ? num
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        .split(".")[0]
        ?.replaceAll(",", " ")
    : 0;

export const emailValidation = (value) => {
  if (value) {
    // eslint-disable-next-line
    const isError = value?.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    return isError && isError?.length > 0 ? false : true;
  }
  return false;
};

export const handleToFormData = (
  data,
  files,
  notCleanFields,
  allowEmptyValue,
  isClearUndefined
) => {
  const formData = new FormData();

  Object.entries(data).forEach((field) => {
    if (Array.isArray(field[1])) {
      field[1].forEach((f, i) => {
        if (typeof f === "object") {
          Object.entries(f).forEach((fField) => {
            if (Array.isArray(fField[1])) {
              fField[1].forEach((fValue, valueIndex) => {
                formData.append(
                  `${field[0]}[${i}][${fField[0]}][${valueIndex}]`,
                  fValue
                );
              });
            } else {
              const isValue =
                fField[1] ||
                notCleanFields?.find((l) => l === fField[0]) ||
                allowEmptyValue;
              isValue &&
                formData.append(`${field[0]}[${i}][${fField[0]}]`, fField[1]);
            }
          });
        } else {
          (f || f?.length > 0) && formData.append(`${field[0]}[]`, f);
        }
      });
    } else if (typeof field[1] === "object") {
      if (Object.entries(field[1])?.length > 0) {
        Object.entries(field[1]).forEach((fField) => {
          if (Array.isArray(fField[1])) {
            if (fField[1]?.length > 0) {
              fField[1].forEach((f, i) => {
                formData.append(`${field[0]}[${fField[0]}][]`, f);
              });
            } else {
              formData.append(`${field[0]}[${fField[0]}][]`, []);
            }
          } else if (typeof fField[1] === "object" && fField[1]) {
            if (Object.entries(fField[1])?.length > 0) {
              Object.entries(fField[1]).forEach((innerFField) => {
                if (Array.isArray(innerFField[1])) {
                  innerFField[1].forEach((f, i) => {
                    formData.append(
                      `${field[0]}[${fField[0]}][${innerFField[0]}][]`,
                      f
                    );
                  });
                } else {
                  (innerFField[1] ||
                    innerFField[1]?.length > 0 ||
                    notCleanFields?.find((l) => l === fField[0])) &&
                    formData.append(
                      `${field[0]}[${fField[0]}][${innerFField[0]}]`,
                      innerFField[1]
                    );
                }
              });
            } else {
              formData.append(`${field[0]}[${fField[0]}][]`, []);
            }
          } else {
            if (isClearUndefined && fField[1] === undefined) {
            } else if (fField[1] || fField[1]?.length > 0 || allowEmptyValue) {
              formData.append(`${field[0]}[${fField[0]}]`, fField[1]);
            }
          }
        });
      } else {
        formData.append(`${field[0]}[]`, []);
      }
    } else {
      const isValue = field[1] || allowEmptyValue;
      isValue && formData.append(field[0], field[1]);
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
  phone
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("-", "")
    .replaceAll("_", "");

export const handleFormatDate = (d, isShort) => {
  const date = new Date(d);
  const day = date.getDate();
  const month = 1 + date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return isNaN(day)
    ? "--.--.----"
    : isShort
    ? `${addZero(day)}.${addZero(month)}.${year}`
    : `${addZero(day)}.${addZero(month)}.${year} ${addZero(hours)}:${addZero(
        minutes
      )}`;
};

export const handleFormatInputDate = (d) => {
  const date = new Date(d);
  const day = date.getDate();
  const month = 1 + date.getMonth();
  const year = date.getFullYear();

  return isNaN(day) ? undefined : `${addZero(year)}-${addZero(month)}-${day}`;
};

export const handleFromInputDate = (d) => {
  try {
    const date = d?.split(".");
    if (date?.length === 3) {
      const day = date[2];
      const month = date[1];
      const year = date[0];

      return `${day}.${month}.${year}`;
    } else {
      return false;
    }
  } catch {
    return d;
  }
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
  onChangeField,
  isChangeAllFields
) => {
  if (isChangeAllFields) {
    const fieldMinName = fields[0];
    const fieldMaxName = fields[1];
    const valMin = values[0] ?? 0;
    const valMax = values[1] ?? 0;

    if (
      valMin > valMax &&
      valMin !== 0 &&
      valMax !== 0 &&
      values[0] !== prevValues[0]
    ) {
      onChangeField({
        [fieldMinName]: valMin,
        [fieldMaxName]: valMin,
      });
    } else if (
      valMax < valMin &&
      valMin !== 0 &&
      valMax !== 0 &&
      values[1] !== prevValues[1]
    ) {
      onChangeField({
        [fieldMinName]: valMax,
        [fieldMaxName]: valMax,
      });
    } else if (values[0] !== prevValues[0]) {
      onChangeField({
        [fieldMinName]: valMin,
        [fieldMaxName]: valMax,
      });
    } else {
      onChangeField({
        [fieldMinName]: valMin,
        [fieldMaxName]: valMax,
      });
    }
  } else if (values[0] !== prevValues[0]) {
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

export const handleCheckIsFieldExist = (fields, fieldName) =>
  !!handleFormatFields(fields)?.find(({ field }) => field === fieldName);

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
  if (
    resp?.data?.error === 11 ||
    resp?.error === 11 ||
    resp?.data?.error === 128 ||
    resp?.error === 128
  ) {
    localStorage.removeItem("token");
    showAlert(
      "error",
      resp?.data?.messege ? resp?.data?.messege : resp?.messege ?? "Помилка"
    );
    window.location.replace("/");
  } else if (resp?.error?.data) {
    onError && onError();
    !notShowErrorMessage && showAlert("error", "Помилка");
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
        showAlert(
          "error",
          resp?.data?.messege ? resp?.data?.messege : resp?.messege ?? "Помилка"
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

    showAlert(
      "error",
      <>
        Заповніть обов'язкові поля {title ? `(${title})` : ""}:
        {handleTitles.map((t) => (
          <div>{t}</div>
        ))}
      </>
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

export const formatBytes = (bytes, decimals) => {
  if (bytes === 0) return "0 Bytes";
  var k = 1024,
    dm = decimals || 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const handleFormatBilling = (date) => {
  const formated = date?.split(" ");
  if (formated?.length > 0) {
    const hours = formated[1];
    const dateSplited = formated[0]?.split(".");
    const dateFormated = new Date(
      `${dateSplited[1]}/${dateSplited[0]}/${dateSplited[2]}`
    )?.getTime();

    return isNaN(date) ? dateFormated : Number(date) * 1000;
  } else {
    return Number(date) * 1000;
  }
};

export const handleCheckBilling = (billingTo) => {
  const now = new Date().getTime();
  const billing = handleFormatBilling(billingTo);
  return billing > now;
};

export const handleCopy = (text) => {
  const linkElem = document.createElement("input");
  linkElem.value = text;
  document.body.appendChild(linkElem);
  linkElem.select();
  document.execCommand("copy");
  document.body.removeChild(linkElem);
  showAlert("success", "Успішно спопійовано");
};

export const isJson = (data) => {
  try {
    const formatedData = JSON.parse(data);
    return !!formatedData;
  } catch {
    return false;
  }
};

export const checkIsJSON = (data) => {
  try {
    const formatedData = JSON.parse(data);
    return formatedData;
  } catch {
    return [];
  }
};

export const checkIsArray = (arr) => (Array.isArray(arr) ? arr : []);

export const removePhoneMask = (val) =>
  val?.length > 0
    ? val
        ?.replaceAll("-", "")
        ?.replace("(", "")
        ?.replace(")", "")
        ?.replaceAll("_", "")
    : undefined;

export const getFirstDay = (isPrevMonth, notSetDay, monthBackCount = 1) => {
  const date = new Date();
  if (!notSetDay) {
    date.setDate(1);
  }
  if (isPrevMonth) {
    date.setMonth(date.getMonth() - monthBackCount);
  }
  return date;
};

export const handleDownloadFile = (url) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const handleSetTheme = (theme) => {
  const htmlElem = document.querySelector("html");
  htmlElem.setAttribute("data-theme", theme);
};

export const handleAddPhoneMask = (phone) =>
  `${phone?.substring(0, 3)}-${phone?.substring(3, 6)}-${phone?.substring(6)}`;
