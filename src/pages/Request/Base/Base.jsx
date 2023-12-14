import { styled } from "styled-components";
import { TitleDivider } from "./TitleDivider";
import { CheckOption } from "../../../components/CheckOption";

export const Base = ({ data, onChangeField }) => {
  return (
    <StyledBase className="request-card hide-scroll">
      <TitleDivider title="X company" />
      <CheckOption
        label="Об’єкти до видалення"
        className="check-opt"
        value={data?.general_group?.deleted}
        onChange={(val) =>
          onChangeField("general_group", {
            ...data.general_group,
            deleted: val,
          })
        }
      />
      <CheckOption
        label="Об’єкти компанії"
        className="check-opt"
        value={data?.general_group?.only_company_obj}
        onChange={(val) =>
          onChangeField("general_group", {
            ...data.general_group,
            only_company_obj: "1",
            only_street_base_obj: "0",
            only_my_obj: "0",
            only_my_structure: "0",
          })
        }
      />
      <CheckOption
        label="Мої об'єкти"
        className="check-opt"
        value={data?.general_group?.only_my_obj}
        onChange={(val) =>
          onChangeField("general_group", {
            ...data.general_group,
            only_company_obj: "0",
            only_street_base_obj: "0",
            only_my_obj: "1",
            only_my_structure: "0",
          })
        }
      />
      <CheckOption
        label="Об’єкти STREET BASE"
        className="check-opt"
        value={data?.general_group?.only_street_base_obj}
        onChange={(val) =>
          onChangeField("general_group", {
            ...data.general_group,
            only_company_obj: "0",
            only_street_base_obj: "1",
            only_my_obj: "0",
            only_my_structure: "0",
          })
        }
      />
      <CheckOption
        label="Об'єкти моєї структури"
        className="check-opt"
        value={data?.general_group?.only_my_structure}
        onChange={(val) =>
          onChangeField("general_group", {
            ...data.general_group,
            only_company_obj: "0",
            only_street_base_obj: "0",
            only_my_obj: "0",
            only_my_structure: "1",
          })
        }
      />
      <CheckOption
        label="МЛС"
        className="check-opt"
        value={data?.general_group?.mls}
        onChange={(val) =>
          onChangeField("general_group", {
            ...data.general_group,
            mls: val,
          })
        }
      />

      <CheckOption
        label="Об’єкти відправлені"
        className="check-opt"
        value={data?.general_group?.submited}
        onChange={(val) =>
          onChangeField("general_group", {
            ...data.general_group,
            submited: val,
          })
        }
      />
      <CheckOption
        label="Діти"
        className="check-opt"
        value={data?.general_group?.tags_children}
        onChange={(val) =>
          onChangeField("general_group", {
            ...data.general_group,
            tags_children: val,
          })
        }
      />
      <CheckOption
        label="Тварини"
        className="check-opt"
        value={data?.general_group?.tags_animal}
        onChange={(val) =>
          onChangeField("general_group", {
            ...data.general_group,
            tags_animal: val,
          })
        }
      />
      <CheckOption
        label="Cтуденти"
        className="check-opt"
        value={data?.general_group?.tags_student}
        onChange={(val) =>
          onChangeField("general_group", {
            ...data.general_group,
            tags_student: val,
          })
        }
      />
      <CheckOption
        label="Іноземці"
        className="check-opt"
        value={data?.general_group?.tags_foreigners}
        onChange={(val) =>
          onChangeField("general_group", {
            ...data.general_group,
            tags_foreigners: val,
          })
        }
      />
    </StyledBase>
  );
};

const StyledBase = styled.div`
  padding: 6px 8px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  .check-opt {
    margin-bottom: 6.5px;
  }
  .check-opt-mls {
    margin: 6.5px 0;
  }
  .xbase-title {
    margin-left: 2px;
    color: #81fb21;
  }
`;
