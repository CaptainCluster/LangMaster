const Error404 = () => {
  const ERROR_MESSAGE = "Error 404 - Page Not Found";
  return (
    <div className="flex justify-center items-center h-screen">
      <h1>{ERROR_MESSAGE}</h1>
    </div>
  );
};

export default Error404;
