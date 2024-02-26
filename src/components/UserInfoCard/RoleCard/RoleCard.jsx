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
      data?.permission_list_json?.length === 0
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
  }, [permissionsList]);

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
        iconColor={"#B1FF91"}
        className="flex items-center"
        open={open}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Icon
              IconImg={UserIcon}
              iconBg={"#B1FF9140"}
              iconColor={"#B1FF91"}
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
          iconColor={"#B1FF91"}
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
  background: rgba(255, 255, 255, 0.1);
`;
