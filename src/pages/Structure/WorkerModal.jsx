import { useEffect, useState } from "react";
import { UserInfoCard } from "../../components/UserInfoCard/UserInfoCard";
import {
  useGetPerimissionDirectorQuery,
  useLazyDeleteWorkerImgQuery,
  useLazyDeleteWorkerQuery,
  useLazyEditWorkerPermissionQuery,
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
  checkIsArray,
  checkIsJSON,
  emailValidation,
  handleFormatDate,
  handleFromInputDate,
  handleReformatDate,
  handleRemovePhoneMask,
  handleResponse,
  showAlert,
} from "../../utilits";
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
  dt_birthday: null,
  public_access: "0",
  is_orenda: "0",
  is_sell: "0",
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
  rolesOnlyView,
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
  const [deleteModal, setDeleteModal] = useState(false);
  const [getStructureUsers, { data: structureUsersCompany }] =
    useLazyGetStructureUsersCompanyQuery();
  const [errors, setErrors] = useState([]);
  const [deleteUserAvatar] = useLazyDeleteAvatarQuery();
  const [deleteWorkerImg] = useLazyDeleteWorkerImgQuery();
  const [editWorkerPermission] = useLazyEditWorkerPermissionQuery();
  const [loading, setLoading] = useState(false);

  const handleChangeField = (fieldName, value) => {
    let newData = { ...profileData, [fieldName]: value };

    if (fieldName === "structure_level") {
      newData = { ...newData, structure_parent: undefined };
    }

    if (fieldName === "id_permision") {
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
    profileData?.phones?.filter((p) => p?.phone?.length === 0)?.length > 0 &&
      errorsData.push("phones");
    new Date(handleReformatDate(profileData?.dt_birthday)).toString() ===
      "Invalid Date" && errorsData.push("dt_birthday");

    if (
      profileData?.structure_level &&
      !profileData?.structure_parent &&
      level !== 1
    ) {
      errorsData.push("structure_parent");
    }

    console.log(errorsData);
    if (errorsData?.length > 0) {
      setErrors(errorsData);
      showAlert("error", "Заповніть обов'язкові поля");
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
              permission_list_json: checkIsArray(
                checkIsJSON(resp?.data?.[0]?.permision_not_structure)
              ),
              dt_birthday:
                resp?.data[0]?.dt_birthday === "0"
                  ? null
                  : handleFormatDate(
                      new Date(Number(resp?.data[0]?.dt_birthday) * 1000),
                      true
                    ),
            }
          : INITIAL_DATA
      );
    });
  };

  useEffect(() => {
    if (level === 1 && !showNotStructureWorkers && !worker) {
      setProfileData({
        ...user,
        structure_level: level,
        dt_birthday:
          user?.dt_birthday === "0"
            ? null
            : handleFormatDate(
                new Date(Number(user?.dt_birthday) * 1000),
                true
              ),
        phones: user?.phones.map((p) => ({
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
      setLoading(true);
      const {
        first_name,
        last_name,
        email,
        phones,
        password,
        photo,
        public_access,
        is_orenda,
        is_sell,
      } = profileData;

      editProfile({
        first_name,
        last_name,
        email,
        public_access,
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
        photo: photo.file ?? undefined,
        dt_birthday: Math.floor(
          profileData?.dt_birthday === "0"
            ? null
            : new Date(handleFormatDate(profileData?.dt_birthday))?.getTime() /
                1000
        ),
        is_orenda,
        is_sell,
      }).then((resp) => {
        setLoading(false);
        handleResponse(resp, () => {
          onClose();
          showAlert("success", "Зміни успішно збережено");
          handleGetUserData();
        });
      });
    }
  };

  const handleSuccessSaveWorker = () => {
    showAlert("success", "Зміни успішно збережено");
    onRefetchData();
    handleGetWorker();
    onClose();
  };

  const handleSaveWorker = () => {
    if (handleCheckFields()) {
      setLoading(true);
      editWorker({
        ...profileData,
        id_permision: rolesPermission?.id_permision,
        id_worker: profileData?.id,
        photo: profileData?.photo.file ?? undefined,
        dt_birthday: Math.floor(
          profileData?.dt_birthday === "0"
            ? null
            : new Date(
                handleReformatDate(profileData?.dt_birthday)
              )?.getTime() / 1000
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
      }).then((resp) => {
        setLoading(false);
        handleResponse(resp, () => {
          const { name_permision, permission_list_json, structure_level } =
            profileData;
          if (
            showNotStructureWorkers &&
            permission_list_json &&
            !structure_level
          ) {
            editWorkerPermission({
              name_permision,
              permission_list_json: JSON.stringify(permission_list_json),
              id_worker: profileData?.id,
            }).then((r) => handleResponse(r, handleSuccessSaveWorker));
          } else {
            handleSuccessSaveWorker();
          }
        });
      });
    }
  };

  const handleDeleteWorker = () => {
    deleteWorker(profileData?.id).then((resp) =>
      handleResponse(resp, () => {
        showAlert("success", "Працівника успішно видалено");
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
          title={
            "При видаленні агента видаляться всі його клієнти, об'єкти та запити впевнені?"
          }
          onClose={() => setDeleteModal(false)}
          onSubmit={handleDeleteWorker}
          passwordCheck
        />
      )}
      <UserInfoCard
        onClose={onClose}
        title="Детальніше"
        isDelete
        data={profileData}
        onChangeField={handleChangeField}
        onSave={() =>
          (level === 1 && !showNotStructureWorkers && !noStructure) || !worker
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
        loading={loading}
        isEdit={user?.struct_level === 1}
        rolesOnlyView={rolesOnlyView}
        permissionEdit={showNotStructureWorkers}
      />
      <div className="modal-overlay" onClick={onClose}></div>
    </>
  );
};
