import styled from "styled-components";
import { Card } from "./Card/Card";
import { useGetPhonesCodesQuery } from "../../../store/auth/auth.api";

export const Dropdown = ({ data, value, onChange }) => {
  const { data: phonesCodes } = useGetPhonesCodesQuery();

  return (
    <StyledDropdown className="hide-scroll">
      {data?.length === 0 ? (
        <div className="empty">Пусто</div>
      ) : (
        data?.map(({ name, id, client, phones }) => (
          <Card
            key={id}
            title={name}
            userName={client?.name}
            phone={
              client?.phones?.[0]
                ? `${
                    phonesCodes?.find(
                      ({ id }) => id === client?.phones[0]?.id_phone_code
                    )?.code ?? ""
                  }${client?.phones[0]?.phone}`
                : "-"
            }
            active={value === id}
            onClick={() => onChange(id)}
          />
        ))
      )}
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  z-index: 10;
  max-height: 170px;
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  gap: 4px;
  right: 0;
  border-radius: 6px;
  z-index: 1000;
  position: relative;
  .empty {
    padding: 10px;
    border-radius: 6px;
    background: #474747;
    width: 100%;
    text-align: center;
    font-family: Overpass;
    font-size: 14px;
    font-weight: 200;
    line-height: 17px;
    letter-spacing: 0em;
    color: #ffff;
    margin-bottom: 15px;
  }
`;
