// imports components
import Counter from "./Counter";

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
      <div className="sm:flex sm:justify-center">
        <div className="mx-10 sm:flex sm:flex-col">
          <h1 className="text-3xl font-medium">
            Share some basics about your place.
          </h1>
          <p className="text-xl text-gray-400 font-light my-5">
            You'll add more details later, like bed types.
          </p>
          <div className="counter mt-20 sm:mt-5">
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
        </div>
      </div>
    </>
  );
};

export default BasicsPublish;
