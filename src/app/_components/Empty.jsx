function Empty({ resource, icon }) {
  return (
    <div className="flex flex-col gap-2 my-8 min-h-[450px] justify-center items-center ">
      <h3 className="text-3xl text-white my-8 flex justify-center items-center flex-col gap-4">
        {icon}
        No {resource} yet
      </h3>
    </div>
  );
}

export default Empty;
