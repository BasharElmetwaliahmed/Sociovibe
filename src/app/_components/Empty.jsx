function Empty({ resource, icon, container }) {
  return (
    <div
      className={`flex flex-col gap-2 ${
        !container ? "h-layout" : "min-h-[50vh]"
      }  justify-center items-center `}>
      <h3 className="text-3xl text-white  flex justify-center items-center flex-col gap-4">
        {icon}
        No {resource} yet
      </h3>
    </div>
  );
}

export default Empty;
