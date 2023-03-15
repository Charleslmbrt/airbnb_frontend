const OptionsPublish = ({ options, setOptions }) => {
  return (
    <>
      <div>
        <h1 className="text-xl mt-10">
          Tell guests what your place has to offer
        </h1>
        <p className="text-sm text-slate-400">
          You can add more amenities after you publish your listing.
        </p>
        <input
          type="text"
          placeholder="Wifi, TV, Kitchen, Washer, Pool, BBQ grill, Fire pit..."
          value={options}
          onChange={(event) => {
            setOptions(event.target.value);
          }}
          className="w-full placeholder-slate-400 mt-5 rounded-xl h-14 bg-neutral-50 border border-solid border-slate-300 text-sm p-5 focus:outline-none focus:border-red-500 sm:max-w-[450px]"
        />
      </div>
    </>
  );
};

export default OptionsPublish;
