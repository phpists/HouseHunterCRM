import styled from "styled-components";
import { Header } from "./Header";
import { Phones } from "./Phones/Phones";
import { useNavigate } from "react-router-dom";

export const Card = ({ name, phones, id, avatar, role, link }) => {
  const navigate = useNavigate();

  const handleOpenLink = (e) => {
    const isClick = e.target.classList.contains("openLink");
    if (link && isClick) {
      navigate(link);
    }
  };

  return (
    <StyledCard onClick={handleOpenLink} className="openLink">
      <Header name={name} role={role} id={id} avatar={avatar} />
      <Phones
        phones={phones}
        classNameContent={
          phones?.length > 1 ? "phonesContent" : "phonesContent-one"
        }
      />
    </StyledCard>
  );
};

const StyledCard = styled.div`
  padding: 8px;
  border-radius: 9px;
  transition: all 0.3s;
  &:hover {
    background: var(--element-inside-bg);
  }

  .phonesContent {
    width: 128px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .phonesContent-one {
    width: 151px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
