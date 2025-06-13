import { BeatLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "30px",
      }}
    >
      <BeatLoader color="#1DB954" size={12} margin={2} />
    </div>
  );
};
export default LoadingSpinner;
