"use client";
import React, { useState } from "react";

const Page = () => {
  const [img, setImg] = useState<File>();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Data in the img state: ", img);

    if (!img) {
      console.log("No file in the state");
      return;
    }
    try {
      const imgData = new FormData();
      imgData.set("file", img); // Ensure the key matches the server-side key

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
      <input type="file" onChange={(e) => setImg(e.target.files?.[0])} />

      <button type="submit" className="border-2 rounded-lg px-6 py-3 mx-10">
        submit
      </button>
    </form>
  );
};

export default Page;
