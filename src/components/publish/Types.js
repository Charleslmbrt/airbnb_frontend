const OptionsPublish = ({ type, setType }) => {
  return (
    <>
      <div className="mx-10 sm:flex sm:flex-col sm:items-center">
        <p className="text-3xl font-medium">
          Which of these best describes your place?
        </p>
        <select
          value={type}
          onChange={(event) => {
            setType(event.target.value);
          }}
          className="classic appearance-none w-full text-xl cursor-pointer mt-5 rounded-xl bg-neutral-50 border border-solid border-slate-300 text-sm p-5 focus:outline-none focus:border-red-500 sm:max-w-[450px]"
        >
          <option value="">Select an option</option>
          <option value="Amazing Pool">Amazing Pool</option>
          <option value="Design">Design</option>
          <option value="Luxe">Luxe</option>
          <option value="Historical homes">Historical homes</option>
          <option value="Camping">Camping</option>
          <option value="OMG!">OMG!</option>
        </select>
      </div>
    </>
  );
};

export default OptionsPublish;
