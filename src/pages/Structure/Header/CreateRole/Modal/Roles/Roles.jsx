import styled from "styled-components";
import { RoleCard } from "./RoleCard/RoleCard";
import { ReactComponent as UserCheckIcon } from "../../../../../../assets/images/user-check.svg";
import { ReactComponent as UserIcon } from "../../../../../../assets/images/user-icon.svg";

export const Roles = () => {
  return (
    <StyledRoles>
      <RoleCard
        IconImg={UserCheckIcon}
        iconBg="rgba(88, 175, 255, 0.09)"
        iconColor="#58AFFF"
        title="Керівник"
        subtitle="Повний доступ"
        noOpen
      />
      <RoleCard
        IconImg={UserCheckIcon}
        iconBg="rgba(89, 216, 230, 0.09)"
        iconColor="#7ECEFD"
        title="Регіональний керівник"
        subtitle="Доступ з налаштуваннями"
      />
      <RoleCard
        IconImg={UserCheckIcon}
        iconBg="rgba(208, 160, 255, 0.25)"
        iconColor="#D0A0FF"
        title="Структурний керівник"
        subtitle="Доступ з налаштуваннями"
      />
      <RoleCard
        IconImg={UserIcon}
        iconBg="rgba(177, 255, 145, 0.25)"
        iconColor="#B1FF91"
        title="Агент"
        subtitle="Доступ з налаштуваннями"
      />
    </StyledRoles>
  );
};

const StyledRoles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 9px;
  margin-bottom: 20px;
`;
