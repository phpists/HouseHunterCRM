import styled from "styled-components";
import { Header } from "./Header";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { SectionTitle } from "./SectionTitle";
import { MainInfo } from "./MainInfo/MainInfo";
import { PersonalData } from "./PersonalData";
import { Footer } from "./Footer";
import { Workers } from "./Workers/Workers";
import { FooterDelete } from "./FooterDelete";
import { Logout } from "./Logout";
import { useRef } from "react";
import { PersonalBills } from "./PesonalBills/PersonalBills";

export const UserInfoCard = ({
  onClose,
  title,
  avatarBanner,
  isDelete,
  data,
  onChangeField,
  onRefreshData,
  onSave = () => null,
  onReset = () => null,
  logout,
  noDelete,
  isProfile,
  profile,
  billingTo,
  errors,
  onRemoveAvatar,
  bosses,
  noResetValueOnCodeChange,
  noStructure,
  showPayHistory,
  workerId,
  onLogout,
  loading,
  isEdit,
}) => {
  const controls = useAnimationControls();
  const contentRef = useRef(null);

  const handleClose = () => {
    controls.start({ opacity: 0, translateX: "100%" });
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    controls.start({ opacity: 1, translateX: 0 });
  }, []);

  useEffect(() => {
    if (!!errors?.find((e) => e === "updated")) {
      const firstErrorField = document.querySelectorAll(
        ".user-info-profile-card .error-field"
      );
      if (firstErrorField[0]) {
        contentRef.current.scrollTo({
          top: 0,
        });
      }
    }
  }, [errors]);

  return (
    <>
      {" "}
      <StyledUserInfoCard
        initial={{ opacity: 0, translateX: "100%" }}
        transition={{ duration: 0.4 }}
        animate={controls}
        className="hide-scroll user-info-profile-card"
        ref={contentRef}
      >
        <Header onClose={handleClose} title={title} />
        <div className="modal-content">
          <SectionTitle title="Загальна інформація" />
          <MainInfo
            avatarBanner={avatarBanner}
            data={data}
            onChangeField={onChangeField}
            onRefreshData={onRefreshData}
            isProfile={isProfile}
            profile={profile}
            billingTo={data?.billing_to}
            onRemoveAvatar={onRemoveAvatar}
            bosses={bosses}
            errors={errors}
            noStructure={noStructure}
          />
          {/* <SectionTitle title="Працівники в підпорядкуванні" />
     <Workers /> */}
          <SectionTitle title="Персональні дані" />
          <PersonalData
            data={data}
            onChangeField={onChangeField}
            errors={errors}
            noResetValueOnCodeChange={noResetValueOnCodeChange}
          />
          {showPayHistory && <PersonalBills workerId={workerId} />}
          {!isEdit ? null : isDelete ? (
            <FooterDelete
              noDelete={noDelete}
              onSave={onSave}
              onReset={onReset}
              loading={loading}
            />
          ) : (
            <Footer onSave={onSave} onReset={onReset} loading={loading} />
          )}
          {logout && <Logout onLogout={onLogout} />}
        </div>
      </StyledUserInfoCard>
      <div className="modal-overlay" onClick={handleClose}></div>
    </>
  );
};

const StyledUserInfoCard = styled(motion.div)`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  overflow: auto;
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(44, 44, 44, 0.8);
  backdrop-filter: blur(12.5px);
  width: 361px;
  z-index: 1088;
  .modal-content {
    padding: 0 10px 15px 11px;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;
