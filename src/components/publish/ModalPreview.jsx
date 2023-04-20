import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ModalPreview({
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
}) {
  const imageURL = URL.createObjectURL(pictures[0]);

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="fixed  m-5 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Show preview
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium text-gray-900 text-center"
                    >
                      Full preview
                    </Dialog.Title>
                    <button type="button" onClick={closeModal}>
                      <XMarkIcon className="text-gray-900 h-6 w-6" />
                    </button>
                  </div>

                  <div className="mt-2">
                    <img
                      src={imageURL}
                      alt=""
                      className="rounded-lg object-cover"
                    />
                    <p className="text-xl mt-5 font-bold">{title}</p>
                    <div className="h-[1px] w-full bg-gray-200 my-5"></div>
                    <p className="font-light">
                      {guests} guests • {bedrooms} bedrooms • {beds} beds •{" "}
                      {bathrooms} bathrooms
                    </p>
                    <div className="h-[1px] w-full bg-gray-200 my-5"></div>
                    <p className="text-sm">{description}</p>
                    <div className="h-[1px] w-full bg-gray-200 my-5"></div>
                    <p>Location</p>
                    <p className="text-sm mt-2">{address}</p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
