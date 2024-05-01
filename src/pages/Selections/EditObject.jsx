import styled from "styled-components";
import { useEffect, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { ProfileField } from "../../components/ProfileField";
import { Button } from "../../components/Button";
import arrow from "../../assets/images/arrow.svg";
import { useLazyAddNewDescriptionRequstQuery } from "../../store/selections/selections.api";
import { useParams } from "react-router-dom";
import { handleResponse } from "../../utilits";
import cogoToast from "cogo-toast";

export const EditObject = ({ onClose, data, onSuccess }) => {
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [addNewText] = useLazyAddNewDescriptionRequstQuery();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(data?.title_agent?.length > 0 ? data?.title_agent : data?.title);
    setValue(
      data?.description_agent?.length > 0
        ? data?.description_agent
        : data?.description
    );
  }, [data]);

  const handleCopyText = () => {
    setTitle(data?.title);
    setValue(data?.description);
  };

  const handleSave = () => {
    setLoading(true);
    addNewText({
      id_request_group: id,
      description: value,
      title,
      id_obj: data?.id,
    }).then((resp) => {
      setLoading(false);
      handleResponse(resp, () => {
        cogoToast.success("Зміни успішно збережено", {
          hideAfter: 3,
          position: "top-right",
        });
        onSuccess(data?.id, { title_agent: title, description_agent: value });
        onClose();
      });
    });
  };

  return (
    <StyledEditObject>
      <Modal onClose={onClose} title="Редагування об'єкту">
        <div className="editObject-content">
          <div>
            <div className="oldTitle">
              {data?.title?.length > 0 ? data?.title : "-"}
            </div>
            <div className="oldDesc">
              {data?.description?.length > 0 ? data?.description : "-"}
            </div>
            <Button
              title="Перенести текст"
              icon={arrow}
              onClick={handleCopyText}
              className="mt-5"
            />
          </div>
          <div>
            <ProfileField
              value={title}
              placeholder="Введіть заголовок"
              onChange={(val) => (loading ? null : setTitle(val))}
              big
              className="title"
              initOpen
              alwaysOpen
            />
            <ProfileField
              value={value}
              placeholder="Введіть опис"
              onChange={(val) => (loading ? null : setValue(val))}
              textarea
              className="title desciption"
              label="Опис"
              initOpen
              alwaysOpen
            />
          </div>
        </div>
        <div className="footer">
          <Button title="Відмінити" cancel onClick={() => onClose()} />
          <Button title="Зберегти" onClick={handleSave} disabled={loading} />
        </div>
      </Modal>
    </StyledEditObject>
  );
};

const StyledEditObject = styled.div`
  .modal {
    max-width: 1000px;
    .desciption {
      .value {
        max-height: 200px !important;
        height: 50vh !important;
      }
    }
  }
  .footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 20px;
    width: max-content;
    margin-left: auto;
  }
  .title {
    margin-bottom: 20px;
  }
  .editObject-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .oldTitle {
    color: var(--main-color);
    font-family: Overpass;
    font-size: 20px;
    font-style: normal;
    font-weight: 200;
    line-height: 118%;
    letter-spacing: 0.4px;
    margin-bottom: 10px;
    position: relative;
    margin-bottom: 10px;
  }
  .oldDesc {
    overflow: hidden;
    color: var(--main-color);
    text-overflow: ellipsis;
    font-family: Overpass;
    font-size: 15px;
    font-style: normal;
    font-weight: var(--font-weight-100);
    line-height: 118%;
    letter-spacing: 0.3px;
    opacity: 0.4;
  }
  textarea {
    white-space: unset !important;
  }
  @media (max-width: 800px) {
    .editObject-content {
      grid-template-columns: 1fr;
      gap: 50px;
    }
    .footer {
      grid-template-columns: 1fr;
      width: 100%;
    }
  }
`;
