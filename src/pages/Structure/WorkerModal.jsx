import { useState } from "react";
import { UserInfoCard } from "../../components/UserInfoCard/UserInfoCard";

const INITIAL_DATA = {
  email: "",
  id_permision: "",
  password: "",
  first_name: "",
  last_name: "",
  phones: [{ code: 1, phone: "", telegram: "0", viber: "0" }],
  photos: [],
};

export const WorkerModal = ({ onClose }) => {
  return (
    <UserInfoCard
      onClose={onClose}
      title="Детальніше"
      isDelete
      //   data={data}
      //   onChangeField={handleChangeField}
    />
  );
};
