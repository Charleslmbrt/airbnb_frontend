import { Fragment } from "react";

// import assets
import TellIcon from "/Users/charles/Documents/_Code/_Projects/airbnb/frontend/src/img/01_Tell.webp";
import MakeIcon from "/Users/charles/Documents/_Code/_Projects/airbnb/frontend/src/img/02_Make.webp";
import FinishIcon from "/Users/charles/Documents/_Code/_Projects/airbnb/frontend/src/img/03_Finish.webp";

const icons = {
  TellIcon: TellIcon,
  MakeIcon: MakeIcon,
  FinishIcon: FinishIcon,
};

const started = [
  {
    id: 0,
    title: "Tell us about your place",
    description:
      " Share some basic info, like where it is and how many guests can stay.",
    picture: "TellIcon",
  },
  {
    id: 1,
    title: "Make it stand out",
    description:
      "Add 5 or more photos plus a title and description—we’ll help you out.",
    picture: "MakeIcon",
  },
  {
    id: 2,
    title: "Finish up and publish",
    description:
      "Choose if you'd like to start with an experienced guest, set a starting price, and publish your listing.",
    picture: "FinishIcon",
  },
];

const Started = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-around ">
        <h1 className="text-4xl mb-10 lg:text-6xl lg:font-bold lg:max-w-[480px] lg:mx-10 ">
          It’s easy to get started on Airbnb
        </h1>
        <ul className="lg:mx-10">
          {started.map((element) => {
            return (
              <Fragment key={element.id}>
                <li className="flex">
                  <div className="text grow">
                    <h2 className="font-bold lg:text-2xl">{element.title}</h2>
                    <p className="text-sm text-gray-500 font-light lg:text-lg lg:max-w-[400px]">
                      {element.description}
                    </p>
                  </div>

                  <img
                    src={icons[element.picture]}
                    alt={element.title}
                    className="h-[76px] w-[76px] ml-5 lg:h-[110px] lg:w-[110px]"
                  />
                </li>
                <div className="w-ull h-[1px] bg-gray-200 my-10"></div>
              </Fragment>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Started;
