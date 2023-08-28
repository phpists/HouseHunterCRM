import { styled } from "styled-components";
import { Title } from "./Title";
import { Description } from "./Description";
import homeIcon from "../../assets/images/home.svg";
import { motion } from "framer-motion";
import { Button } from "../../components/Button";

export const SuccessMessage = ({ onClick }) => (
  <StyledSuccessMessage
    className="flex flex-col items-center"
    initial={{ opacity: 0, transform: "translate(-50%, -50%) scale(0)" }}
    animate={{ opacity: 1, transform: "translate(-50%, -50%) scale(1)" }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <Title title="Дякуємо за реєстрацію!" className="mb-1" />
    <Description
      description={
        <>
          Ми зв'яжемося з Вами найближчим <br />
          часом, для перевірки данних
        </>
      }
      className="description"
    />
    <Button title="На головну" icon={homeIcon} onClick={onClick} />
  </StyledSuccessMessage>
);

const StyledSuccessMessage = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  .description {
    margin-bottom: 21px;
  }
`;
