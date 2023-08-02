import React from "react";
import { useState } from "react";
import axios from "axios";
import "./main.css";
import loading from '../img/Pulse-1s-200px.gif'
function Main() {
  const [image, setimage] = useState(undefined);
  const [imageUrl, setImageUrl] = useState();
  
  const handlefile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setimage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async () => {
    setImageUrl('')
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dg91c36ba/image/upload`,
        {
          file: image,
          upload_preset: "e6skoomb", // You can create an upload preset in Cloudinary dashboard
        }
      );

      console.log("Image URL:", response.data.url);
      setImageUrl(response.data.url);
      // Now you have the shareable URL in the response.data.url variable.
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <div className=" main m-10  flex justify-center items-center flex-col">
        <input
          className="ml-24 mb-2"
          type="file"
          accept="image/*"
          onChange={(event) => {
            handlefile(event);
            uploadToCloudinary();
          }}
        />
        <button
          className="bg-rose-500 w-48 h-10 rounded-lg mt-3 hover:bg-sky-500 text-stone-950"
          onClick={uploadToCloudinary}
        >
          Upload and Get URL
        </button>
      </div>
      {console.log(image)}

      {image && (
        <div className=" m-10 flex flex-row items-center">
          <img
            className=" border-spacing-2 mr-4 border-rose-500 border-8  "
            src={image}
            alt="Converted"
            style={{ maxWidth: "30rem" }}
          />
          {imageUrl ? (
            <div className="mt-4 p-4 bg-gray-200 rounded-md">
              <p className="text-blue-500 font-semibold">Shareable URL:</p>
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all"
              >
                {imageUrl}
              </a>
            </div>
          ) : 
            <img src={loading}></img>
          }
        </div>
      )}
    </>
  );
}

export default Main;
