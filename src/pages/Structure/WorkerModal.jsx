import { useEffect, useState } from "react";
import { UserInfoCard } from "../../components/UserInfoCard/UserInfoCard";
import {
  useGetPerimissionDirectorQuery,
  useLazyAddWorkerToStructureQuery,
  useLazyChangeWorkerLevelQuery,
  useLazyDeleteWorkerImgQuery,
  useLazyDeleteWorkerQuery,
  useLazyEditWorkerQuery,
  useLazyGetStructureUsersCompanyQuery,
  useLazyGetWorkerByIdQuery,
} from "../../store/structure/structure.api";
import { useAppSelect } from "../../hooks/redux";
import { useActions } from "../../hooks/actions";
import {
  useLazyDeleteAvatarQuery,
  useLazyEditProfileQuery,
  useLazyGetUserQuery,
} from "../../store/auth/auth.api";
import {
  emailValidation,
  handleRemovePhoneMask,
  handleResponse,
} from "../../utilits";
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
  active: "1",
  dt_birthday: new Date(),
};

export const WorkerModal = ({
  onClose,
  workerId,
  level,
  onRefetchData,
  showNotStructureWorkers,
  noStructure,
  showPayHistory,
  worker,
}) => {
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
  const [getStructureUsers, { data: structureUsersCompany }] =
    useLazyGetStructureUsersCompanyQuery();
  const [errors, setErrors] = useState([]);
  const [deleteUserAvatar] = useLazyDeleteAvatarQuery();
  const [deleteWorkerImg] = useLazyDeleteWorkerImgQuery();

  const handleChangeField = (fieldName, value) => {
    let newData = { ...profileData, [fieldName]: value };

    if (fieldName === "structure_level") {
      newData = { ...newData, structure_parent: undefined };
    }

    setProfileData(newData);

    let updatedErrors = errors?.filter((e) => e !== fieldName);

    if (fieldName === "email" && emailValidation(value)) {
      updatedErrors.push("email");
    }
    setErrors(updatedErrors);

    if (fieldName === "structure_level") {
      getStructureUsers({
        structure_level: value,
        id_user: workerId ?? 0,
      });
    }
  };

  const handleCheckFields = () => {
    let errorsData = [];

    // !profileData?.id_permision && errorsData.push("id_permision");
    // !profileData?.structure_parent && errorsData.push("structure_parent");
    profileData?.email?.length === 0 && errorsData.push("email");
    profileData?.first_name?.length === 0 && errorsData.push("first_name");
    profileData?.last_name?.length === 0 && errorsData.push("last_name");
    profileData?.password?.length === 0 && errorsData.push("password");
    profileData?.phones[0]?.phone?.length === 0 && errorsData.push("phones");

    if (errorsData?.length > 0) {
      setErrors(errorsData);
      cogoToast.error("Заповніть обов'язкові поля", {
        hideAfter: 3,
        position: "top-right",
      });
    } else {
      return true;
    }
  };

  const handleGetWorker = () => {
    getWorker(workerId).then((resp) => {
      setProfileData(
        resp?.data[0]
          ? {
              ...resp?.data[0],
              phones: resp?.data[0].phones.map((p) => ({
                ...p,
                code: p.id_phone_code,
              })),
              structure_level: !showNotStructureWorkers ? level : undefined,
              structure_parent: resp?.data[0]?.structure_parent_id ?? null,
              photo: { url: resp?.data[0]?.photo },
              dt_birthday:
                resp?.data[0]?.dt_birthday === "0"
                  ? new Date()
                  : new Date(Number(resp?.data[0]?.dt_birthday) * 1000),
            }
          : INITIAL_DATA
      );
      !showNotStructureWorkers &&
        !noStructure &&
        getStructureUsers({
          structure_level: level,
          id_user: resp?.data[0]?.id ?? 0,
        });
    });
  };

  useEffect(() => {
    if (level === 1 && !showNotStructureWorkers && !worker) {
      setProfileData({
        ...user,
        structure_level: level,
        dt_birthday:
          user?.dt_birthday === "0"
            ? new Date()
            : new Date(Number(user?.dt_birthday) * 1000),
        phones: user.phones.map((p) => ({
          ...p,
          code: p.id_phone_code,
        })),
      });
    } else if (workerId) {
      handleGetWorker();
    }
  }, [workerId]);

  const handleGetUserData = () => {
    getProfile().then((resp) => {
      loginUser(resp?.data?.data);
    });
  };

  const handleSaveUser = () => {
    if (handleCheckFields()) {
      const { first_name, last_name, email, phones, password, photo } =
        profileData;

      editProfile({
        profileData,
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
        photo: profileData?.photo.file ?? undefined,
        dt_birthday: Math.floor(
          profileData?.dt_birthday === "0"
            ? new Date()?.getTime() / 1000
            : new Date(Number(profileData?.dt_birthday))?.getTime() / 1000
        ),
      }).then((resp) =>
        handleResponse(resp, () => {
          cogoToast.success("Зміни успішно збережено", {
            hideAfter: 3,
            position: "top-right",
          });
          handleGetUserData();
        })
      );
    }
  };

  const handleSaveWorker = () => {
    if (handleCheckFields()) {
      editWorker({
        ...profileData,
        id_permision: rolesPermission?.id_permision,
        id_worker: profileData?.id,
        photo: profileData?.photo.file ?? undefined,
        dt_birthday: Math.floor(
          profileData?.dt_birthday === "0"
            ? new Date()?.getTime() / 1000
            : new Date(Number(profileData?.dt_birthday))?.getTime() / 1000
        ),
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
          cogoToast.success("Зміни успішно збережено", {
            hideAfter: 3,
            position: "top-right",
          });
          onRefetchData();
          handleGetWorker();
          onClose();
        })
      );
    }
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

  const handleDeletePhoto = () => {
    if (profileData?.photo?.file) {
      handleChangeField("photo", null);
    } else if (level === 1 && !showNotStructureWorkers) {
      deleteUserAvatar().then((resp) =>
        handleResponse(resp, () => {
          handleChangeField("photo", null);
          handleGetUserData();
        })
      );
    } else {
      deleteWorkerImg(workerId).then((resp) =>
        handleResponse(resp, () => {
          handleChangeField("photo", null);
          handleGetUserData();
          onRefetchData();
          handleGetWorker();
        })
      );
    }
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
        onSave={() =>
          level === 1 && !showNotStructureWorkers && !noStructure
            ? handleSaveUser()
            : handleSaveWorker()
        }
        noDelete={level === 1 && !showNotStructureWorkers}
        isProfile={level === 1 && !showNotStructureWorkers}
        onReset={() => setDeleteModal(true)}
        bosses={structureUsersCompany?.data ?? []}
        errors={errors}
        onRemoveAvatar={handleDeletePhoto}
        noResetValueOnCodeChange
        noStructure={noStructure}
        showPayHistory={showPayHistory}
        workerId={workerId}
      />
    </>
  );
};
