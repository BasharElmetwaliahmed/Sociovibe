"use client";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState, useRef } from "react";

function UploadPhoto({image, file,setFile }) {

  const [deleted, setDeleted] = useState(false);
  const fileInputRef = useRef(null);

  function handleChange(e) {
    setFile({
      file: e.target.files[0],
      filePath: URL.createObjectURL(e.target.files[0]),
    });
  }

  function handleRemove() {
    setFile({
      file: "",
      filePath: "",
    });
    if (image) setDeleted(true);
    // Clear the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className="flex items-start flex-col ">
      <div>
        <label
          htmlFor="upload_photo"
          className="flex flex-col gap-1 cursor-pointer text-sm items-center text-lightBlue">
          <PhotoIcon className="size-8" />
        </label>
        <input type="hidden" name="image_deleted" value={deleted} />
        <input
          type="file"
          id="upload_photo"
          accept="image/*"
          name="image"
          className="hidden"
          ref={fileInputRef}
          onChange={handleChange}
        />
      </div>
      {file.filePath && (
        <div className="relative p-4 w-20 h-20 mt-6 border-[1px] border-lightBlue rounded-sm flex justify-center items-center">
          <img src={file.filePath} alt={"post image"} className="w-full" />
          <button
            className="p-2 rounded-full absolute bg-red-500 text-white -right-3 -top-3 "
            onClick={handleRemove}>
            <XMarkIcon className="w-3" />
          </button>
        </div>
      )}
    </div>
  );
}

export default UploadPhoto;
