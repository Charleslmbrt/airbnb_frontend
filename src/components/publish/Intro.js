// imports assets
import homeAirbnbVideo from "/Users/charles/Documents/_Code/_Projects/airbnb/frontend/src/img/video_home_airbnb.mp4";

const IntroPublish = () => {
  return (
    <>
      <div className="left mx-5 flex flex-col items-center sm:max-w-[450px] ">
        <video
          className=""
          src={homeAirbnbVideo}
          type="video/mp4"
          autoPlay
          muted
          //   loop
        ></video>
        <div className="">
          <h1 className="text-4xl font-medium">Tell us about your place</h1>
          <p className="text-sm mt-5">
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
