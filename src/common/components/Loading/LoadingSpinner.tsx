import { BeatLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <BeatLoader color="#1DB954" size={12} margin={2} />
    </div>
  );
};
export default LoadingSpinner;
