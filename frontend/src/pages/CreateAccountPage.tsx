const CreateAccountPage = () => {
  return (
    <div className="grow w-full flex items-center justify-center ">
      <div className="grid w-full grid-cols-2 bg-gray-400 p-5 rounded-md gap-10">
        <div className="left">
          <div className="h-[400px] bg-gradient-to-r from-purple-300 to-purple-400 rounded-lg overflow-hidden p-4">
            <h1 className="text-2xl font-bold">Login or create an account</h1>
          </div>
        </div>
        <div className="right">Go home</div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
