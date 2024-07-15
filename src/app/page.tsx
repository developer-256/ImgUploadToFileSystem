"use client";
import React, { useState } from "react";

const Page = () => {
  const [img, setImg] = useState<File[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Data in the img state: ", img);

    if (img.length === 0) {
      console.log("No file in the state");
      return;
    }

    try {
      const imgData = new FormData();
      img.forEach((file, index) => {
        imgData.append("files", file); // Append each file with the same key
      });

      const res = await fetch("/api/upload", {
        method: "POST",
        body: imgData,
      });

      if (!res.ok) throw new Error(await res.text());
    } catch (error) {
      console.log("Error occurred while saving img files", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        multiple
        onChange={(e) => setImg(Array.from(e.target.files || []))}
      />
      <button type="submit" className="border-2 rounded-lg px-6 py-3 mx-10">
        submit
      </button>
    </form>
  );
};

export default Page;
