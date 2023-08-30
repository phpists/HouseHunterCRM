import { ReactComponent as SearchIcon } from "../../../../assets/images/search.svg";
import { IconButton } from "../../../../components/IconButton";
import { Filter } from "../Filter/Filter";
import { useState } from "react";

export const Search = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mr-2.5">
      <IconButton Icon={SearchIcon} onClick={() => setOpen(true)} />
      {open && <Filter onClose={() => setOpen(false)} />}
    </div>
  );
};
