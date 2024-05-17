import styled from "styled-components";
import { Button } from "./Button";
import { useState } from "react";
import { ReferalModal } from "./ReferalModal";
import { useAppSelect } from "../../../hooks/redux";

export const ReferalLink = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelect((state) => state.auth);

  if (!user?.id_hash_director) {
    return null;
  }

  return (
    <StyledReferalLink>
      {open && <ReferalModal onClose={() => setOpen(false)} />}
      <Button onClick={() => setOpen(true)} />
    </StyledReferalLink>
  );
};

const StyledReferalLink = styled.div``;
