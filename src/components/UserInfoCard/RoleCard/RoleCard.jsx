import styled from "styled-components";
import { Icon } from "./Icon";
import { Text } from "./Text";
import { OpenIcon } from "./OpenIcon";
import { useState } from "react";
import { Dropdown } from "./Dropdown/Dropdown";
import { useEffect } from "react";
import { useGetAllPerimissionsQuery } from "../../../store/structure/structure.api";
import { checkIsArray } from "../../../utilits";
import { ReactComponent as UserIcon } from "../../../assets/images/user-icon.svg";

export const RoleCard = ({
  subtitle = "Налаштування доступу",
  data,
  onChangeField,
  error,
}) => {
  const { data: permissionsList } = useGetAllPerimissionsQuery();
  const [open, setOpen] = useState(false);

  const handleSetInitialValues = () => {
    if (
      !data?.permission_list_json ||
      checkIsArray(data?.permission_list_json)?.length === 0
    ) {
      onChangeField(
        "permission_list_json",
        Object.entries(permissionsList).map((p) => ({
          id_module: p[0],
          view: false,
          add: false,
          edit: false,
          delete: false,
        }))
      );
    }
  };

  useEffect(() => {
    permissionsList && handleSetInitialValues();
  }, []);

  useEffect(() => {
    permissionsList && handleSetInitialValues();
  }, [permissionsList, data]);

  const handleChangeValue = (index, field, value) => {
    const initValue =
      checkIsArray(data.permission_list_json)?.length > 0
        ? data.permission_list_json
        : checkIsArray(
            Object.entries(permissionsList ?? {}).map((p) => ({
              id_module: p[0],
              view: false,
              add: false,
              edit: false,
              delete: false,
            }))
          );

    onChangeField(
      "permission_list_json",
      initValue?.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );
  };

  if (!permissionsList) {
    return null;
  }

  return (
    <div className="m-2.5">
      <StyledRoleCard
        iconColor={"var(--green-light)"}
        className="flex items-center"
        open={open}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Icon
              IconImg={UserIcon}
              iconBg={"var(--green-light)40"}
              iconColor={"var(--green-light)"}
            />
            <Text
              title={data.name_permision}
              subtitle={subtitle}
              onChange={(val) => onChangeField("name_permision", val)}
              error={error}
            />
          </div>
          <OpenIcon onClick={() => setOpen(!open)} open={open} />{" "}
        </div>
      </StyledRoleCard>
      {open && (
        <Dropdown
          iconColor={"var(--green-light)"}
          permissionsList={permissionsList}
          values={checkIsArray(data.permission_list_json)}
          onChangeValue={handleChangeValue}
          onResetValues={handleSetInitialValues}
        />
      )}
    </div>
  );
};

export const StyledRoleCard = styled.div`
  padding: 8px 10px;
  border-radius: ${({ open }) => (open ? "6px 6px 0 0" : "6px")};
  border: 1px solid ${({ iconColor }) => iconColor};
  background: var(--bg-10);
`;
