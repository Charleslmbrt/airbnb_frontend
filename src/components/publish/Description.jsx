const handleMaxLength = (setValue, maxLength) => (event) => {
  const textAreaValue = event.target.value;
  if (textAreaValue.length <= maxLength) {
    setValue(textAreaValue);
  }
};

const TitlePublish = ({ title, setTitle, description, setDescription }) => {
  return (
    <>
      <div className="mx-10  sm:flex sm:flex-col sm:items-center">
        <div className="sm:w-1/2">
          <div className="text sm:flex sm:items-center sm:flex-col">
            <h1 className="text-3xl font-medium">
              Let's give your house a title
            </h1>
            <p className="text-lg text-gray-400">
              Short titles work best. Have fun with it. later.
            </p>
          </div>

          <textarea
            type="text"
            placeholder="My title..."
            value={title}
            onChange={handleMaxLength(setTitle, 50)}
            className="w-full placeholder-slate-400 mt-5 rounded-xl h-35 bg-neutral-50 border border-solid border-gray-300 text-sm p-5 focus:outline-none focus:border-red-500 "
          />
          <p className="text-lg">{title.length}/50</p>
        </div>

        <div className="mt-5 sm:w-1/2">
          <div className="text sm:flex sm:items-center sm:flex-col">
            <h1 className="text-3xl font-medium">Create your description</h1>
            <p className="text-lg text-gray-400">
              Share what makes your place special.
            </p>
          </div>

          <textarea
            type="text"
            placeholder="My description..."
            value={description}
            onChange={handleMaxLength(setDescription, 500)}
            className="w-full placeholder-slate-400 mt-5 rounded-xl h-60 bg-neutral-50 border border-solid border-gray-300 text-sm p-5 focus:outline-none focus:border-red-500"
          />
          <p className="text-lg">{description.length}/500</p>
        </div>
      </div>
    </>
  );
};

export default TitlePublish;
