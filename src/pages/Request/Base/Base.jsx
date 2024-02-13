import { styled } from "styled-components";
import { TitleDivider } from "./TitleDivider";
import { CheckOption } from "../../../components/CheckOption";
import { useGetCommentsToFieldsQuery } from "../../../store/objects/objects.api";

export const Base = ({ data, onChangeField }) => {
  const { data: commentsToFields } = useGetCommentsToFieldsQuery();

  return (
    <StyledBase className="request-card ">
      <TitleDivider title="X company" />
      <CheckOption
        label={commentsToFields?.request_groups["deleted"] ?? ""}
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
        label={commentsToFields?.request_groups["only_company_obj"] ?? ""}
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
        label={commentsToFields?.request_groups["only_my_obj"] ?? ""}
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
        label={commentsToFields?.request_groups["only_street_base_obj"] ?? ""}
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
        label={
          commentsToFields?.request_groups["only_my_structure"] ??
          "Моя структура"
        }
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
        label={commentsToFields?.request_groups["mls"] ?? ""}
        className="check-opt"
        value={data?.general_group?.mls}
        onChange={(val) =>
          onChangeField("general_group", {
            ...data.general_group,
            mls: val,
          })
        }
      />

      {/* <CheckOption
        label={commentsToFields?.request_groups["submited"] ?? ""}
        className="check-opt"
        value={data?.general_group?.submited}
        onChange={(val) =>
          onChangeField("general_group", {
            ...data.general_group,
            submited: val,
          })
        }
      /> */}
      <CheckOption
        label={commentsToFields?.request_groups["tags_children"] ?? ""}
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
        label={commentsToFields?.request_groups["tags_animal"] ?? ""}
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
        label={commentsToFields?.request_groups["tags_student"] ?? ""}
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
        label={commentsToFields?.request_groups["tags_foreigners"] ?? ""}
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
