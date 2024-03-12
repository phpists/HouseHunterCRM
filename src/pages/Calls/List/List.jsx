import styled from "styled-components";
import { CallCard } from "./CallCard/CallCard";
import { useState } from "react";
import { handleFormatDate } from "../../../utilits";
import {
  useGetAllPerimissionsLevelsQuery,
  useGetCompanyStructureLevelQuery,
} from "../../../store/structure/structure.api";
import { Empty } from "../../../components/Empty";
import { Loader } from "../../../components/Loader";

export const List = ({
  selected,
  onSelect,
  data,
  onSetStatus,
  onAddComment,
  listRef,
  loading,
}) => {
  const [openMore, setOpenMore] = useState(null);
  const COLORS = ["#7ecefd", "#b1ff91", "#d0a0ff", "#7ecefd"];
  const { data: level } = useGetCompanyStructureLevelQuery();
  const { data: levels } = useGetAllPerimissionsLevelsQuery();

  const handleGetCurrentLevel = (lvl) => {
    if (levels) {
      const currentLevel = Object.entries(levels)
        ?.map((l) => l[1])
        ?.find((l) => Number(l.level) === Number(level));

      if (currentLevel[0]) {
        const levelsList = currentLevel[0]?.split(" - ");
        return { title: levelsList[lvl], color: COLORS[lvl], level: lvl };
      } else {
        return { title: "-", color: COLORS[0], level: lvl };
      }
    }
  };

  return (
    <StyledList ref={listRef}>
      {data?.length === 0 ? (
        <Empty />
      ) : (
        data.map(
          (
            {
              id,
              call_type,
              phone_call,
              dt_incoming,
              full_name,
              photo,
              coment,
              status,
              struct_level_user,
            },
            i
          ) => (
            <CallCard
              key={i}
              selected={!!selected.find((j) => j === id)}
              onSelect={() => onSelect(id)}
              openMore={openMore === id}
              onOpenMore={() => setOpenMore(openMore === id ? null : id)}
              callType={call_type}
              phone={phone_call}
              date={handleFormatDate(Number(dt_incoming) * 1000)}
              name={full_name}
              photo={photo}
              comment={coment}
              status={status}
              onSetStatus={() => onSetStatus(id, status === "1" ? "0" : "1")}
              onAddComment={(comment) => onAddComment(id, comment)}
              level={handleGetCurrentLevel(struct_level_user)}
            />
          )
        )
      )}
      <div className="loader relative">
        {loading && data?.length > 0 && (
          <div className="loading-more">
            <Loader white />
          </div>
        )}
      </div>
    </StyledList>
  );
};

const StyledList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  height: calc(100svh - 225px);
  overflow: auto;
  gap: 10px;
  @media (max-width: 600px) {
    height: calc(100svh - 232px);
  }
`;
