import { useState, Suspense, lazy, useEffect } from "react";
import { Link } from "react-router-dom";

const ModelLoad = lazy(() => import("./components/model-load"));

interface Model {
  id: number;
  name: string;
  threeDModelPath: string;
  createdAt?: string;
  updatedAt?: string;
}

// const models: Model[] = [
//   { id: 1, name: "Model 2", url: "/nissan_gt-r_r35_gt.glb" },
//   { id: 2, name: "Model 3", url: "/slippers.glb" },
//   { id: 3, name: "Model 2", url: "/nissan_gt-r_r35_gt.glb" },
//   { id: 4, name: "Model 3", url: "/slippers.glb" },
// ];

function App() {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [models, setModels] = useState<Model[]>([]);
  const fetchModels = async () => {
    try {
      const response = await fetch("http://localhost:3000/models");
      const data = await response.json();
      setModels(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  const handleModelClick = (model: Model) => {
    setSelectedModel(model);
  };

  const handleCloseFullScreen = () => {
    setSelectedModel(null);
  };

  return (
    <div className="p-6">
      <div className="flex py-6 items-center justify-between">
        <h1 className="text-3xl uppercase  font-bold mb-6">3D Model Viewer</h1>
        <Link
          to={"/dashboard"}
          className="px-6 py-4 rounded-3xl bg-blue-500 text-white font-semibold"
        >
          Upload new Model
        </Link>
      </div>
      <div className="model-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {models.map((model) => (
          <div
            key={model.id}
            className="model-item  p-4 border rounded-3xl shadow-lg cursor-pointer hover:bg-gray-200"
            onClick={() => handleModelClick(model)}
          >
            <div className="pb-2">
              <h4 className="text-xl font-semibold">{model.name}</h4>
              <h3>
                <span className="text-gray-500">Model URL:</span>{" "}
                {model.threeDModelPath}
              </h3>
            </div>

            <div className="w-full h-56 relative">
              <div className="" onClick={handleCloseFullScreen}>
                <Suspense
                  fallback={<div className="text-black">Loading...</div>}
                >
                  <ModelLoad modelUrl={model.threeDModelPath} />
                </Suspense>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedModel && (
        <div className=" fixed bg-white rounded-3xl px-6 py-4 border inset-0 z-50 transition-opacity duration-300">
          <button
            className=" top-2 right-2 bg-black text-white mb-3 px-2 py-1 rounded-lg"
            onClick={handleCloseFullScreen}
          >
            Close
          </button>
          <div className="w-full h-full relative">
            <Suspense fallback={<div className="text-black">Loading...</div>}>
              <ModelLoad modelUrl={selectedModel.threeDModelPath} />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
