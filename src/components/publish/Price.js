const PricePublish = ({ price, setPrice }) => {
  return (
    <>
      <div className="mx-10 sm:flex sm:flex-col sm:items-center">
        <h1 className="text-3xl font-medium">Now, set your price</h1>
        <p className="text-xl text-gray-400">You can change it anytime.</p>
        <div className="counter-basics flex items-center w-full border-[1px] border-gray-300 p-8 rounded-xl mt-5 justify-center bg-neutral-50  sm:max-w-[450px]">
          <button
            type="button"
            className={`flex items-center justify-center w-9 h-9 rounded-full border-[1px] ${
              price <= 10
                ? "text-gray-300 border-gray-300"
                : "text-gray-700 border-gray-700"
            }`}
            onClick={() => {
              if (price > 10) {
                setPrice(price - 5);
              }
            }}
          >
            -
          </button>

          <div className="flex flex-col items-center w-2/4 border-[1px] rounded-xl p-5 justify-center mx-10 bg-white">
            <p
              className={`text-3xl font-bold  ${
                price <= 10 ? "text-gray-300" : "text-gray-700"
              }`}
            >
              €{price}
            </p>
            <p className="text-sm">Per night</p>
          </div>

          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 text-sm rounded-full border-[1px] border-gray-700"
            onClick={() => {
              setPrice(price + 5);
            }}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default PricePublish;
