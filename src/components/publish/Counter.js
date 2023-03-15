const Counter = ({ label, count, onDecrement, onIncrement }) => {
  return (
    <>
      <div className="flex justify-between items-center mt-5">
        <p>{label}</p>
        <div className="counter-basics flex items-center">
          <button
            type="button"
            className={`flex items-center justify-center w-9 h-9 rounded-full border-[1px] ${
              count <= 0
                ? "text-slate-300 border-slate-300"
                : "text-slate-700 border-slate-700"
            }`}
            onClick={() => {
              if (count > 0) {
                onDecrement(count - 1);
              }
            }}
          >
            -
          </button>
          <p
            className={`w-14 text-center ${
              count <= 0 ? "text-slate-300" : "text-slate-700"
            }`}
          >
            {count}
          </p>
          <button
            type="button"
            className="flex items-center justify-center w-9 h-9 text-sm rounded-full border-[1px] border-slate-700"
            onClick={() => {
              onIncrement(count + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default Counter;
