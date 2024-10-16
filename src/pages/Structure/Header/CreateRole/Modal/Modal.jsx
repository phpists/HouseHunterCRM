import styled from "styled-components";
import { Header } from "./Header";
import { SectionTitle } from "./SectionTitle";
import { TypeSelect } from "./TypeSelect/TypeSelect";
import { Roles } from "./Roles/Roles";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import {
  useGetAllPerimissionsLevelsQuery,
  useGetCompanyStructureLevelQuery,
} from "../../../../../store/structure/structure.api";
import { Confirm } from "../../../../../components/Confirm/Confirm";
import { CheckOption } from "../../../../../components/CheckOption";
import { useAppSelect } from "../../../../../hooks/redux";
import {
  useLazyEditProfileQuery,
  useLazyGetUserQuery,
} from "../../../../../store/auth/auth.api";
import { useActions } from "../../../../../hooks/actions";
import {
  handleRemovePhoneMask,
  handleResponse,
  showAlert,
} from "../../../../../utilits";

export const Modal = ({ onClose, onRefetchStructureData }) => {
  const controls = useAnimationControls();
  const { data: level, refetch } = useGetCompanyStructureLevelQuery();
  const { data: levels } = useGetAllPerimissionsLevelsQuery();
  const [confirm, setConfirm] = useState();
  const [confirmFunc, setConfirmFunc] = useState(null);
  const { user } = useAppSelect((state) => state.auth);
  const [editProfile] = useLazyEditProfileQuery();
  const [getProfile] = useLazyGetUserQuery();
  const { loginUser } = useActions();

  const handleGetCurrentLevel = (level) =>
    levels
      ? Object.entries(levels)
          ?.map((l) => l[1])
          ?.find((l) => Number(l.level) === Number(level))
      : [];

  const handleClose = () => {
    controls.start({ opacity: 0, translateX: "100%" });
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    controls.start({ opacity: 1, translateX: 0 });
  }, []);

  const handleConfrim = (func) => {
    setConfirm(true);
    setConfirmFunc(() => func);
  };

  const handleGetUserData = (noLoading) => {
    getProfile().then((resp) => {
      loginUser(resp?.data?.data);
    });
  };

  const handleToggleFastSelections = () => {
    editProfile({
      ...user,
      phones_json: JSON.stringify(
        user?.phones.map((phone) => ({
          ...phone,
          viber: phone.viber === "1",
          telegram: phone.telegram === "1",
          id_phone_code: phone.id_phone_code,
          phone: handleRemovePhoneMask(phone.phone),
        }))
      ),
      show_fast_folder: user?.show_fast_folder ? "0" : "1",
    }).then((resp) => {
      handleResponse(resp, () => {
        handleGetUserData();
        showAlert("success", "Зміни успішно збережено");
      });
    });
  };
  return (
    <>
      {confirm && (
        <Confirm
          title={
            "Ви точно хочете змінити формат компанії? (при зміні формату вся структура видалиться)"
          }
          onClose={() => setConfirm(false)}
          onSubmit={() => confirmFunc && confirmFunc()}
        />
      )}
      <StyledModal
        initial={{ opacity: 0, translateX: "100%" }}
        transition={{ duration: 0.3 }}
        animate={controls}
        className="hide-scroll"
      >
        <Header onClose={handleClose} />
        <div className="modal-content">
          <SectionTitle title="ФОрмат компанії" />
          <TypeSelect
            onConfirm={handleConfrim}
            onRefetchStructureData={onRefetchStructureData}
          />
          <SectionTitle title="налаштування доступів" />
          {level && levels && (
            <Roles
              level={level}
              levelData={handleGetCurrentLevel(level)}
              onRefetchData={refetch}
              onClose={handleClose}
            />
          )}
          <CheckOption
            label="Дозволити швидкі підбірки"
            value={user?.show_fast_folder ? "1" : "0"}
            onChange={handleToggleFastSelections}
          />
          {/* <AddButton onRefetchData={refetch} /> */}
        </div>
      </StyledModal>
      <div className="modal-overlay" onClick={handleClose}></div>
    </>
  );
};

const StyledModal = styled(motion.div)`
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  overflow: auto;
  border-left: var(--second-color-border);
  background: var(--modals-bg);
  backdrop-filter: blur(12.5px);
  width: 438px;
  z-index: 10;
  @supports (-webkit-touch-callout: none) {
    background: var(--main-bg);
  }
  .modal-content {
    padding: 0 45px 20px 20px;
    height: calc(100svh - 82px);
    overflow: auto;
    border-radius: 9px;
  }
  @media (max-width: 600px) {
    width: 100%;
    border-left: none;
  }
`;
