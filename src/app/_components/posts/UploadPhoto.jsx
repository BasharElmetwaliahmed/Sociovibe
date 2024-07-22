"use client";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

function UploadPhoto({ image }) {
  const [file, setFile] = useState(image ?? null);
  const [deleted,setDeleted] = useState(false);
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
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
          name="image"
          className="hidden"
          onChange={handleChange}
        />
      </div>
      {file && (
        <div className="relative p-4 w-20 h-20 mt-6 border-[1px] border-lightBlue rounded-sm flex justify-center items-center">
          <img src={file} alt={"post image"} className="w-full" />
          <button
            className="p-2 rounded-full absolute bg-red-500 text-white -right-3 -top-3 "
            onClick={() => {
              setFile(null)
              if(image)
              setDeleted(true)
            
            }}>
            <XMarkIcon className="w-3" />
          </button>
        </div>
      )}
    </div>
  );
}

export default UploadPhoto;
