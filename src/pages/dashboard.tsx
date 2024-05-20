import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const router = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("model", data.model[0]);
      const response = await axios.post(
        "http://localhost:3000/model",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        router("/");
        setLoading(false);
      }
      setLoading(false);
      // Handle success (e.g., show a success message or refresh the model list)
    } catch (error) {
      console.error(error);
      setLoading(false);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Uploading...</h1>
            <p>Please wait while we upload your 3D model</p>
          </div>
        </div>
      )}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl uppercase  font-bold mb-6">Add new 3D Model</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              3D Model (GLB)
            </label>
            <input
              type="file"
              accept=".glb"
              {...register("model", { required: "This field is required" })}
              className="mt-1 block w-full"
            />
            {errors.model && (
              <span className="text-red-600 text-sm">
                {errors.model.message}
              </span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Model Name
            </label>
            <input
              placeholder="Model Name"
              type="text"
              {...register("name", { required: "This field is required" })}
              className="mt-1 px-6 py-3 border rounded-2xl block w-full"
            />
            {errors.name && (
              <span className="text-red-600 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
          >
            Upload
          </button>
        </form>
        <div className="mt-8">
          {/* List of uploaded models with a preview will go here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
