import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  UserPlusIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

//import components
import SearchBar from "../components/SearchBar";

// Import img
import logoAirbnb from "../img/logo-airbnb.svg";

const Header = ({ handleConnect, userToken }) => {
  // console.log("infosUser", infosUser.result.picture.secure_url);

  const solutions = [
    {
      name: "Sign up",
      description: "Create a new account.",
      href: "/user/signup",
      icon: UserPlusIcon,
      display: false,
    },
    {
      name: "Log in",
      description: "Already have an account? Log in at.",
      href: "/user/login",
      icon: ArrowRightOnRectangleIcon,
      display: false,
    },

    {
      name: "Airbnb your home",
      description: "Putting my home on Airbnb.",
      href: "/room/publish",
      icon: HomeIcon,
      display: true,
    },
    {
      name: "Airbnb your home",
      description: "Putting my home on Airbnb.",
      href: "/user/login",
      icon: HomeIcon,
      display: false,
    },
    {
      name: "Log out",
      description: "Log out of your account.",
      href: "#",
      onClick: () => {
        handleConnect();
      },
      icon: ArrowLeftOnRectangleIcon,
      display: true,
    },
  ];

  const filteredSolutions = [];

  for (let i = 0; i < solutions.length; i++) {
    if (solutions[i].display === "always") {
      filteredSolutions.push(solutions[i]);
    } else if (userToken && solutions[i].display) {
      filteredSolutions.push(solutions[i]);
    } else if (!userToken && !solutions[i].display) {
      filteredSolutions.push(solutions[i]);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between border-b-[1px] border-slate-200 h-20 w-full py-3 px-10">
        <div className="">
          <img className="h-12" src={logoAirbnb} alt="logo Airbnb" />
        </div>
        <div className="hidden sm:block sm:w-9/12 md:w-[500px]">
          <SearchBar />
        </div>

        <Popover className="relative">
          <Popover.Button
            className="flex outline-none items-center justify-between menu border-[1px] border-slate-2
           00 rounded-full w-20 h-10 pr-2 pl-3 bg-neutral-50 transition duration-300 hover:drop-shadow-lg cursor-pointer"
          >
            <div className="burger">
              <div className="w-4 border-t-2 border-slate-400 mb-[2px]"></div>
              <div className="w-4 border-t-2 border-slate-400 mb-[2px]"></div>
              <div className="w-4 border-t-2 border-slate-400"></div>
            </div>
            <div className="avatar">
              <img
                // src={infosUser.result.picture.secure_url}
                alt=""
                className="w-7 h-7 rounded-full bg-slate-400 object-cover"
              />
            </div>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 mt-5 flex -translate-x-72 w-[368px]">
              <div className="w-screen overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {filteredSolutions.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-slate-700 group-hover:text-red-500"
                          aria-hidden="true"
                        />
                      </div>
                      {userToken && item.display === true ? (
                        <div onClick={item.onClick}>
                          <Link
                            to={item.href}
                            className="font-semibold text-gray-900"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      ) : (
                        <div onClick={item.onClick}>
                          <Link
                            to={item.href}
                            className="font-semibold text-gray-900"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
      <div className="sm:hidden">
        <SearchBar />
      </div>
    </>
  );
};

export default Header;
