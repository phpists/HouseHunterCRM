import { useState } from "react";
import { Button } from "./Button";
import { Creating } from "./Creating/Creating";

export const AddButton = () => {
  const [creating, setCreating] = useState(false);

  return (
    <>
      {creating ? (
        <Creating onClose={() => setCreating(false)} />
      ) : (
        <Button onClick={() => setCreating(true)} />
      )}
    </>
  );
};
