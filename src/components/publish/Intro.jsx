// imports assets
import homeAirbnbVideo from "./img/video_home_airbnb.mp4";

const IntroPublish = () => {
  return (
    <>
      <div className="mx-10 flex flex-col items-center justifiy-center lg:flex-row-reverse lg:items-center lg:justify-center">
        <video
          className="max-w-[500px] lg:max-w-[700px]"
          src={homeAirbnbVideo}
          type="video/mp4"
          autoPlay
          muted
          //   loop
        ></video>
        <div className="">
          <h1 className="text-4xl font-medium lg:text-6xl lg:font-bold lg:max-w-[450px]">
            Tell us about your place
          </h1>
          <p className="text-sm mt-5 lg:text-lg lg:max-w-[500px]">
            In this step, we'll ask you which type of property you have and if
            guests will book the entire place or just a room. Then let us know
            the location and how many guests can stay.
          </p>
        </div>
      </div>
    </>
  );
};

export default IntroPublish;
