import { styled } from "styled-components";
import { Header } from "./Header/Header";
import { Avatar } from "./Avatar";
import { Title } from "./Title";
import { Divider } from "./Divider";
import { SectionTitle } from "./SectionTitle";
import { BasicInfo } from "./BasicInfo";
import { Other } from "./Other/Other";
import { Contact } from "./Contact/Contact";
import { Password } from "./Password";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { Footer } from "./Footer";

export const EditProfile = ({ onClose }) => {
  const controls = useAnimationControls();

  const handleClose = () => {
    controls.start({ opacity: 0 });
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    controls.start({ opacity: 1 });
  }, []);

  return (
    <StyledEditProfile
      className="flex items-center justify-center"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      animate={controls}
    >
      <div className="modal">
        <Header onClose={handleClose} />
        <div className="flex flex-col items-center justify-center">
          <Avatar />
          <Title />
          <Divider />
          <div className="edit-profile-content flex flex-col items-start justify-start hide-scroll ">
            <SectionTitle title="Basic info" />
            <BasicInfo />
            <SectionTitle title="Other" />
            <Other />
            <SectionTitle title="Contact" />
            <Contact />
            <SectionTitle title="Password" />
            <Password />
          </div>
        </div>
      </div>
    </StyledEditProfile>
  );
};

const StyledEditProfile = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(44, 44, 44, 0.5);
  z-index: 1000;
  .modal {
    border-radius: 16px;
    background: rgba(107, 107, 107, 0.3);
    backdrop-filter: blur(11.5px);
    width: 360px;
    max-height: 90vh;
    padding: 15px 10px 10px;
    overflow: auto;
    overflow-x: hidden;
    .edit-profile-content {
      max-height: 45vh;
      overflow: auto;
      overflow-x: hidden;
    }
  }
`;
