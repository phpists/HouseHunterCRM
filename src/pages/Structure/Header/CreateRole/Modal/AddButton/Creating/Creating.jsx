import styled from "styled-components";
import { Colors } from "./Colors";
import { Footer } from "./Footer";
import { useState } from "react";
import {
  useGetAllPerimissionsQuery,
  useGetCompanyStructureLevelQuery,
  useLazyCreatePerimissionQuery,
} from "../../../../../../../store/structure/structure.api";
import { PERMISSION_INIT } from "../../Roles/initValue";
import { handleResponse, showAlert } from "../../../../../../../utilits";

export const Creating = ({ onClose, onRefetchData }) => {
  const [createPermission] = useLazyCreatePerimissionQuery();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#1BBC9B");
  const { data } = useGetAllPerimissionsQuery();
  const { data: structureLevel } = useGetCompanyStructureLevelQuery();

  const handleGetInitPermissions = () => {
    return Object.entries(data.messege).map((p) => ({
      ...PERMISSION_INIT,
      id_module: p[1]?.id,
    }));
  };

  const handleSubmit = () => {
    createPermission({
      module_name: name,
      color,
      permission_list_json: JSON.stringify(handleGetInitPermissions()),
      structure_level: structureLevel,
    }).then((resp) =>
      handleResponse(resp, () => {
        showAlert("success", "Роль успішно створена");
        onRefetchData();
        onClose();
      })
    );
  };

  return (
    <StyledCreating>
      <div className="flex items-center justify-between content-wrapper-creating">
        <div>
          <input
            type="text"
            className="title"
            placeholder="Назва ролі"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="subtitle">Оберіть назву та колір</div>
        </div>
        <Colors active={color} onChange={(val) => setColor(val)} />
      </div>
      <Footer
        onClose={onClose}
        onSubmit={handleSubmit}
        disabled={name?.length === 0}
      />
    </StyledCreating>
  );
};

const StyledCreating = styled.div`
  border-radius: 10px;
  background: var(--bg-10);
  overflow: hidden;
  text-align: left;
  .content-wrapper-creating {
    padding: 10px 20px 9px;
  }
  .title {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%; /* 17.7px */
    letter-spacing: 0.3px;
  }
  .subtitle {
    color: var(--main-color);
    font-family: Open Sans;
    font-size: 11px;
    font-style: normal;
    font-weight: var(--font-weight-light);
    line-height: normal;
    letter-spacing: 0.22px;
    opacity: 0.4;
  }
`;
