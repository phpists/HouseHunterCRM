import { ReactComponent as SearchIcon } from "../../../../assets/images/search.svg";
import { IconButton } from "../../../../components/IconButton";
import { Filter } from "../Filter/Filter";
import { useState } from "react";

export const Search = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <IconButton
        Icon={SearchIcon}
        onClick={() => setOpen(true)}
        className="icon-btn icon-btn--last"
      />
      {open && <Filter onClose={() => setOpen(false)} />}
    </div>
  );
};
