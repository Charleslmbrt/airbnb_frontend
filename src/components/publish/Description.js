const handleMaxLength = (setValue, maxLength) => (event) => {
  const textAreaValue = event.target.value;
  if (textAreaValue.length <= maxLength) {
    setValue(textAreaValue);
  }
};

const TitlePublish = ({ title, setTitle, description, setDescription }) => {
  return (
    <>
      <div>
        <h1 className="text-xl mt-10">Now, let's give your house a title</h1>
        <p className="text-sm text-slate-400">
          Short titles work best. Have fun with it. later.
        </p>

        <textarea
          type="text"
          placeholder="My title..."
          value={title}
          onChange={handleMaxLength(setTitle, 50)}
          className="w-full placeholder-slate-400 mt-5 rounded-xl h-40 bg-neutral-50 border border-solid border-slate-300 text-sm p-5 focus:outline-none focus:border-red-500 sm:max-w-[450px]"
        />
        <p className="text-sm">{title.length}/50</p>
      </div>

      <div>
        <h1 className="text-xl mt-10">Create your description</h1>
        <p className="text-sm text-slate-400">
          Share what makes your place special.
        </p>

        <textarea
          type="text"
          placeholder="My description..."
          value={description}
          onChange={handleMaxLength(setDescription, 500)}
          className="w-full placeholder-slate-400 mt-5 rounded-xl h-60 bg-neutral-50 border border-solid border-slate-300 text-sm p-5 focus:outline-none focus:border-red-500 sm:max-w-[450px]"
        />
        <p className="text-sm">{description.length}/500</p>
      </div>
    </>
  );
};

export default TitlePublish;
