const ProgressBar = ({ steps, currentSlide }) => {
  return (
    <div className="flex">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`w-full ${
            index <= currentSlide ? "bg-gray-900" : "bg-gray-200"
          }  h-2 `}
        ></div>
      ))}
    </div>
  );
};

export default ProgressBar;
