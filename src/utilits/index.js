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
    formData.append(field[0], field[1]);
  });

  return formData;
};
