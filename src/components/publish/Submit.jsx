import {
  DocumentCheckIcon,
  CalendarIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

//import components
import ModalPreview from "./ModalPreview";

const Submit = ({
  handleSubmit,
  address,
  guests,
  beds,
  bedrooms,
  bathrooms,
  options,
  pictures,
  title,
  description,
  price,
}) => {
  const imageURL = URL.createObjectURL(pictures[0]);
  return (
    <>
      <div className="mx-10 sm:flex sm:justify-around sm:items-center">
        <div className="left">
          <p className="text-3xl font-medium">Review your listing</p>
          <p className="text-xl text-gray-400 font-light my-2 sm:max-w-[400px]">
            Here's what we'll show to guests. Make sure everything looks good.
          </p>
          <div className="bg-white drop-shadow-lg rounded-xl p-4 mt-5 sm:max-w-[450px] ">
            <ModalPreview
              address={address}
              guests={guests}
              beds={beds}
              bedrooms={bedrooms}
              bathrooms={bathrooms}
              options={options}
              pictures={pictures}
              title={title}
              description={description}
              price={price}
            />
            <img src={imageURL} alt="" className="object-cover rounded-xl" />
            <p className="text-sm font-medium mt-3">{title}</p>
            <p className="text-sm font-light ">
              <span className="text-lg font-bold">€ {price}</span> per night
            </p>
          </div>
        </div>

        <div className="right mt-20 sm:max-w-[500px] ">
          <div className="text mt-5">
            <p className="my-5">What's next ?</p>
            <div className="flex mb-5">
              <DocumentCheckIcon className="h-12 w-12 mr-5" />
              <div>
                <p className="text-lg">Verify a few details and publish</p>
                <p className="font-light text-sm">
                  We’ll let you know if you need to confirm your identity or
                  register with the local government.
                </p>
              </div>
            </div>
            <div className="flex mb-5">
              <CalendarIcon className="h-12 w-12 mr-5" />
              <div>
                <p className="text-lg">Set up your calendar</p>
                <p className="font-light text-sm">
                  Choose which dates your listing is available. It will be
                  visible 24 hours after you publish.
                </p>
              </div>
            </div>
            <div className="flex">
              <PencilIcon className="h-12 w-12 mr-5" />
              <div>
                <p className="text-lg">Adjust your settings</p>
                <p className="font-light text-sm">
                  Set house rules, select a cancellation policy, choose how
                  guests book, and more.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-[50px]">
            <button
              className="mt-10 mb-20 sm:mb-0 w-full rounded-xl p-5 bg-red-400 text-white transition hover:bg-black duration-300"
              onClick={handleSubmit}
            >
              Publish my Airbnb
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Submit;
