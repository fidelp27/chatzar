import { useState } from 'react';

export const useToggleDiv = () => {
  const [toggle, setToggle] = useState(false);
  const show = () => setToggle(!toggle);
  const hide = () => setToggle(false);

  return { toggle, show, hide };
};
