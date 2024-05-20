import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

function Model(props: any) {
  const { scene }: any = useGLTF(props.modelUrl);
  return <primitive object={scene} {...props} />;
}

function ModelLoad({ modelUrl }: { modelUrl: string }) {
  return (
    <Canvas
      dpr={[1, 2]}
      shadows
      camera={{ fov: 45 }}
      style={{ position: "absolute", borderRadius: "15px" }}
    >
      <color attach="background" args={["#101010"]} />
      <PresentationControls
        speed={1.5}
        global
        zoom={0.5}
        polar={[-0.1, Math.PI / 4]}
      >
        <Stage environment={"sunset"}>
          <Model modelUrl={modelUrl} scale={0.01} />
        </Stage>
      </PresentationControls>
    </Canvas>
  );
}

export default ModelLoad;
