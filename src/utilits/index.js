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

export const handleToFormData = (data) => {
  const formData = new FormData();

  Object.entries(data).forEach((field) => {
    if (Array.isArray(field[1])) {
      field[1].forEach((f, i) => {
        Object.entries(f).forEach((fField) => {
          formData.append(`${field[0]}[${i}][${fField[0]}]`, fField[1]);
        });
      });
    } else {
      formData.append(field[0], field[1]);
    }
  });

  return formData;
};

export const handleRemovePhoneMask = (phone, removeFirstLetters = 3) =>
  phone
    .replaceAll("(", "")
    .replaceAll(")", "")
    .replaceAll("-", "")
    .substring(removeFirstLetters);

export const handleFormatDate = (d) => {
  const date = new Date(d);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${addZero(day)}.${addZero(month)}.${year} ${hours}:${minutes}`;
};
