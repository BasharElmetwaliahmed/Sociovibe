import Spinner from "../_components/Spinner";

function loading() {
  return (
    <div className="h-layout flex justify-center items-center">
      <Spinner />
    </div>
  );
}

export default loading;
