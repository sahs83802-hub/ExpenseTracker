// src/components/Inputs/ProfilePhotoSelector.jsx
import React, { useEffect, useState, useRef } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // save file to SignUp state
    setImage(file);

    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // if parent passes existing image, keep preview in sync
  useEffect(() => {
    if (!image) return;

    const preview = URL.createObjectURL(image);
    setPreviewUrl(preview);

    return () => URL.revokeObjectURL(preview);
  }, [image]);

  return (
    <div className="flex justify-center mb-6">
      {/* hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* IF image selected → show preview + red trash button */}
      {previewUrl ? (
        <div className="w-28 h-28 flex items-center justify-center bg-purple-100 rounded-full relative">
          <img
            src={previewUrl}
            alt="profile photo"
            className="object-cover w-28 h-28 rounded-full"
          />
          <button
            type="button"
            className="flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 w-8 h-8"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      ) : (
        // NO image yet → purple circle with user icon + upload button
        <div
          className="w-28 h-28 flex items-center justify-center bg-purple-100 rounded-full relative cursor-pointer"
          // 🔥 make the entire circle clickable
          onClick={onChooseFile}
        >
          <LuUser className="text-4xl text-primary" />

          <button
            type="button"
            className="flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1 w-8 h-8"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
