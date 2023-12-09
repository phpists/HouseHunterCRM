import { styled } from "styled-components";
import { StructureCard } from "./StructureCard";
import { Divider } from "../Divider";

export const Structure = ({ data }) => {
  const levels = ["", "", "регіональні", "cтруктурні", "агенти"];

  return (
    <StyledStructure>
      {data && Object.entries(data)?.length > 0
        ? Object.entries(data)?.map((workers, i) => (
            <>
              <StructureCard
                key={i}
                count={workers[1]?.length}
                levelTitle={levels[workers[0]?.split("_")[2]]}
                photos={workers[1]?.map((e) => e.photo)}
                level={workers[0]?.split("_")[2]}
              />
              {Object.entries(data)?.length - 1 > i && <Divider />}
            </>
          ))
        : null}
    </StyledStructure>
  );
};

const StyledStructure = styled.div``;
