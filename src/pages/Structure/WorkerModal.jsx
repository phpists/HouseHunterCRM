import { useEffect, useState } from "react";
import { UserInfoCard } from "../../components/UserInfoCard/UserInfoCard";
import {
  useGetPerimissionDirectorQuery,
  useLazyChangeWorkerLevelQuery,
  useLazyDeleteWorkerQuery,
  useLazyEditWorkerQuery,
  useLazyGetWorkerByIdQuery,
} from "../../store/structure/structure.api";
import { useAppSelect } from "../../hooks/redux";
import { useActions } from "../../hooks/actions";
import {
  useLazyEditProfileQuery,
  useLazyGetUserQuery,
} from "../../store/auth/auth.api";
import { handleRemovePhoneMask, handleResponse } from "../../utilits";
import cogoToast from "cogo-toast";
import { Confirm } from "../../components/Confirm/Confirm";

const INITIAL_DATA = {
  email: "",
  id_permision: "",
  password: "",
  first_name: "",
  last_name: "",
  phones: [{ code: 1, phone: "", telegram: "0", viber: "0" }],
  photos: [],
};

export const WorkerModal = ({ onClose, workerId, level, onRefetchData }) => {
  const [getWorker] = useLazyGetWorkerByIdQuery();
  const { user } = useAppSelect((state) => state.auth);
  const [profileData, setProfileData] = useState(INITIAL_DATA);
  const { loginUser } = useActions();
  const [getProfile] = useLazyGetUserQuery();
  const [editProfile] = useLazyEditProfileQuery();
  const [editWorker] = useLazyEditWorkerQuery();
  const { data: rolesPermission } = useGetPerimissionDirectorQuery();
  const [deleteWorker] = useLazyDeleteWorkerQuery();
  const [changeWorkerLevel] = useLazyChangeWorkerLevelQuery();
  const [deleteModal, setDeleteModal] = useState(false);

  const handleChangeField = (fieldName, value) => {
    const newData = { ...profileData, [fieldName]: value };
    setProfileData(newData);
  };

  useEffect(() => {
    if (level === 1) {
      setProfileData({ ...user, structure_level: level });
    } else if (workerId) {
      getWorker(workerId).then((resp) => {
        setProfileData(
          resp?.data?.length
            ? {
                ...resp?.data[0],
                phones: resp?.data[0].phones.map((p) => ({
                  ...p,
                  code: p.id_phone_code,
                })),
                structure_level: level,
              }
            : {}
        );
      });
    }
  }, [workerId]);

  const handleGetUserData = () => {
    getProfile().then((resp) => {
      loginUser(resp?.data?.data);
    });
  };

  const handleSaveUser = () => {
    const { first_name, last_name, email, phones, password, photo } =
      profileData;

    editProfile({
      first_name,
      last_name,
      email,
      phones_json: JSON.stringify(
        phones.map((phone) => ({
          ...phone,
          viber: phone.viber === "1",
          telegram: phone.telegram === "1",
          id_phone_code: phone?.code,
          phone: handleRemovePhoneMask(phone.phone),
        }))
      ),
      password: password?.length > 0 ? password : undefined,
      photo,
    }).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success("Зміни успішно збережено", {
          hideAfter: 3,
          position: "top-right",
        });
        handleGetUserData();
      })
    );
  };

  const handleSaveWorker = () => {
    editWorker({
      ...profileData,
      id_permision: rolesPermission?.id_permision,
      id_worker: profileData?.id,
      phones_json: JSON.stringify(
        profileData?.phones.map((phone) => ({
          ...phone,
          viber: phone.viber === "1",
          telegram: phone.telegram === "1",
          id_phone_code: phone?.code,
          phone: handleRemovePhoneMask(phone.phone),
        }))
      ),
    }).then((resp) =>
      handleResponse(resp, () => {
        changeWorkerLevel({
          id_user: profileData?.id,
          structure_level: profileData?.structure_level,
        }).then((resp) =>
          handleResponse(resp, () => {
            cogoToast.success("Зміни успішно збережено", {
              hideAfter: 3,
              position: "top-right",
            });
            onRefetchData();
          })
        );
      })
    );
  };

  const handleDeleteWorker = () => {
    deleteWorker(profileData?.id).then((resp) =>
      handleResponse(resp, () => {
        cogoToast.success("Працівника успішно видалено", {
          hideAfter: 3,
          position: "top-right",
        });
        onRefetchData();
        onClose();
      })
    );
  };

  return (
    <>
      {deleteModal && (
        <Confirm
          title={"Видалити працівника?"}
          onClose={() => setDeleteModal(false)}
          onSubmit={handleDeleteWorker}
        />
      )}
      <UserInfoCard
        onClose={onClose}
        title="Детальніше"
        isDelete
        data={profileData}
        onChangeField={handleChangeField}
        onSave={() => (level === 1 ? handleSaveUser() : handleSaveWorker())}
        noDelete={level === 1}
        isProfile={level === 1}
        onReset={() => setDeleteModal(true)}
      />
    </>
  );
};
