import styled from "styled-components";
import { Header } from "./Header";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { SectionTitle } from "./SectionTitle";
import { MainInfo } from "./MainInfo/MainInfo";
import { PersonalData } from "./PersonalData";
import { Footer } from "./Footer";
import { useState } from "react";
import {
  useGetAllPerimissionsLevelsQuery,
  useGetPerimissionDirectorQuery,
  useLazyChangeWorkerLevelQuery,
  useLazyCreateStructureQuery,
  useLazyCreateWorkerQuery,
} from "../../../../../store/structure/structure.api";
import { handleRemovePhoneMask, handleResponse } from "../../../../../utilits";
import cogoToast from "cogo-toast";

const INITIAL_DATA = {
  email: "",
  id_permision: "",
  password: "",
  first_name: "",
  last_name: "",
  phones: [{ code: "1", phone: "", telegram: "0", viber: "0" }],
  photo: null,
};

export const Modal = ({ onClose, onRefetchData }) => {
  const [createWorker] = useLazyCreateWorkerQuery();
  const [createStructure] = useLazyCreateStructureQuery();
  const [changeWorkerLevel] = useLazyChangeWorkerLevelQuery();
  const [data, setData] = useState(INITIAL_DATA);
  const { data: rolesPermission } = useGetPerimissionDirectorQuery();
  const [loading, setLoading] = useState(false);

  const controls = useAnimationControls();

  const handleClose = () => {
    controls.start({ opacity: 0, translateX: "100%" });
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    controls.start({ opacity: 1, translateX: 0 });
  }, []);

  const handleChangeField = (fieldName, value) => {
    const newData = { ...data, [fieldName]: value };
    setData(newData);
  };

  const handleReset = () => {
    setData(INITIAL_DATA);
    handleClose();
  };

  const handleCreate = () => {
    setLoading(true);
    createWorker({
      ...data,
      id_permision: rolesPermission?.id_permision,
      phones_json: JSON.stringify(
        data?.phones.map((phone) => ({
          ...phone,
          id_phone_code: phone?.code,
          phone: handleRemovePhoneMask(phone.phone),
        }))
      ),
    }).then((resp) => {
      setLoading(false);
      handleResponse(resp, () => {
        const idUser = resp?.data?.id_worker;
        if (idUser) {
          changeWorkerLevel({
            id_user: idUser,
            structure_level: data?.id_permision,
          }).then((resp) =>
            handleResponse(resp, () => {
              cogoToast.success("Працівника успішно створено", {
                hideAfter: 3,
                position: "top-right",
              });
              handleReset();
              onRefetchData();
            })
          );
        }
      });
    });
  };

  return (
    <StyledModal
      initial={{ opacity: 0, translateX: "100%" }}
      transition={{ duration: 0.4 }}
      animate={controls}
      className="hide-scroll"
    >
      <Header onClose={handleReset} />
      <div className="modal-content">
        <SectionTitle title="Загальна інформація" />
        <MainInfo data={data} onChangeField={handleChangeField} />
        <SectionTitle title="Персональні дані" />
        <PersonalData data={data} onChangeField={handleChangeField} />
        <Footer
          onSave={() => (loading ? null : handleCreate())}
          onCancel={handleReset}
        />
      </div>
    </StyledModal>
  );
};

const StyledModal = styled(motion.div)`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  overflow: auto;
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(44, 44, 44, 0.8);
  backdrop-filter: blur(12.5px);
  width: 361px;
  z-index: 10;
  .modal-content {
    padding: 0 10px 15px 11px;
  }
`;
