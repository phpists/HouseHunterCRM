import styled from "styled-components";
import { Arrow } from "./Arrow";
import { ReactComponent as Icon } from "../../../../assets/images/edit.svg";
import { Field } from "../../../../components/Field";
import { SelectTags } from "../../../../components/SelectTags/SelectTags";
import { checkIsArray } from "../../../../utilits";

export const Card = ({ name, keys, onSelect, onEdit }) => {
  const handleGetKeys = () => {
    try {
      return checkIsArray(JSON.parse(keys))?.map((v) => ({
        title: v,
        value: v,
      }));
    } catch {
      return [];
    }
  };

  return (
    <StyledCard>
      <div>
        <Field
          placeholder="Назва"
          label="Назва локації"
          full
          value={name}
          viewOnly
        />
      </div>
      <div>
        {" "}
        <SelectTags
          placeholder="Почніть писати"
          label={`Відмінки`}
          tags={handleGetKeys()}
          options={handleGetKeys()}
          viewOnly
          showTags
          showAll
        />
      </div>
      <div className="btn edit" onClick={onEdit}>
        <Icon />
      </div>
      {onSelect ? <Arrow onClick={onSelect} /> : null}
    </StyledCard>
  );
};

const StyledCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 30px 30px;
  gap: 10px;
  grid-auto-rows: max-content;
  padding: 14px;
  border-radius: 15px;
  background: var(--card-bg-5);
  transition: all 0.3s;
  cursor: pointer;
  align-items: start;
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    svg {
      opacity: 0.4;
      transition: all 0.3s;
    }
    &:hover {
      svg {
        opacity: 1;
      }
    }
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    position: relative;
    .btn {
      position: absolute;
      top: 0;
      right: 10px;
      &.edit {
        right: 50px;
      }
    }
  }
`;
