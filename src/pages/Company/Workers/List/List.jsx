import { styled } from "styled-components";
import { Card } from "./Card/Card";
import { useGetPhonesCodesQuery } from "../../../../store/auth/auth.api";
import { Empty } from "./Empty";

export const List = ({
  onOpenEdit,
  tarifSelected,
  selectedWorkers,
  onSelect,
  workers,
}) => {
  const { data: phonesCodes } = useGetPhonesCodesQuery();

  return (
    <StyledList className="hide-scroll">
      {workers?.length > 0 ? (
        workers.map(
          (
            {
              first_name,
              id,
              last_name,
              phones,
              billing_to,
              active,
              photo,
              struct_level,
              isCurrentUser,
            },
            i
          ) => (
            <Card
              key={i}
              onOpenEdit={() =>
                onOpenEdit({ id, struct_level, isAdmin: isCurrentUser })
              }
              onSelect={() => onSelect(id)}
              tarifSelected={tarifSelected}
              isSelected={!!selectedWorkers.find((w) => w === id)}
              name={`${first_name ?? ""} ${last_name ?? ""}`}
              photo={photo}
              phone={
                phones?.length > 0
                  ? `${
                      phonesCodes?.find(
                        (c) => c.id === phones[0]?.id_phone_code
                      )?.code ?? ""
                    }${phones[0]?.phone}`
                  : ""
              }
              active={active === "1" || isCurrentUser}
              billingTo={billing_to}
              level={struct_level}
            />
          )
        )
      ) : (
        <Empty />
      )}
    </StyledList>
  );
};

const StyledList = styled.div`
  height: calc(100svh - 155px - 64px);
  overflow: auto;
`;
