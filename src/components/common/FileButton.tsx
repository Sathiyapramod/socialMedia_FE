import React from "react";

interface AppFileButton {
  content: string;
  onClick: () => void;
  src: string;
  accept: string;
  capture?: "user" | "environment";
}

function FileButton({ content, onClick, src, accept, capture }: AppFileButton) {
  return (
    <div className="inline-block relative">
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={onClick}
        id={`file-upload-${content}`}
        capture={capture}
        multiple
      />
      <label
        htmlFor={`file-upload-${content}`}
        className="flex items-center cursor-pointer gap-[5px] p-3 hover:border-b-2 transition ease-in duration-200"
      >
        <img src={src} alt="action_button" width={20} height={20} />
        {content}
      </label>
    </div>
  );
}

export default FileButton;
