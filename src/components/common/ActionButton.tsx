import React from "react";

interface AppActionButton {
  src: string;
  onClick: () => void;
}

function ActionButton({ src, onClick }: AppActionButton) {
  return <img src={src} alt="" width="30" height="30" onClick={onClick} />;
}

export default ActionButton;
