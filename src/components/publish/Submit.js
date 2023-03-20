const Submit = ({ handleSubmit }) => {
  return (
    <>
      <div className="right mx-5 flex flex-col mb-[50px]">
        <button
          className="mt-16 w-full  rounded-xl p-5 bg-red-400 text-white sm:max-w-[450px]"
          onClick={handleSubmit}
        >
          Publish my Airbnb
        </button>
      </div>
    </>
  );
};

export default Submit;
