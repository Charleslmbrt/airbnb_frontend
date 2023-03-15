// imports components
import Counter from "../publish/Counter";

const BasicsPublish = ({
  guests,
  setGuests,
  bedrooms,
  setBedrooms,
  beds,
  setBeds,
  bathrooms,
  setBathrooms,
}) => {
  return (
    <>
      <div className="sm:max-w-[450px]">
        <h1 className="text-xl mt-10">Share some basics about your place.</h1>
        <p className="text-sm text-slate-400">
          You'll add more details later, like bed types.
        </p>

        <Counter
          label="Guests"
          count={guests}
          onDecrement={setGuests}
          onIncrement={setGuests}
        />
        <div className="sep h-[1px] w-full bg-slate-200 my-5"></div>
        <Counter
          label="Bedrooms"
          count={bedrooms}
          onDecrement={setBedrooms}
          onIncrement={setBedrooms}
        />
        <div className="sep h-[1px] w-full bg-slate-200 my-5"></div>
        <Counter
          label="Beds"
          count={beds}
          onDecrement={setBeds}
          onIncrement={setBeds}
        />
        <div className="sep h-[1px] w-full bg-slate-200 my-5"></div>
        <Counter
          label="Bathrooms"
          count={bathrooms}
          onDecrement={setBathrooms}
          onIncrement={setBathrooms}
        />
      </div>
    </>
  );
};

export default BasicsPublish;
