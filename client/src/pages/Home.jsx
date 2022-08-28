import { Link, useNavigate, useSearchParams } from "react-router-dom";

import gridImg1 from "../assets/images/home/grid-banner-1.png";
import gridImg2 from "../assets/images/home/grid-banner-2.png";
import hero from "../assets/images/home/hero-home.jpg";
import insta1 from "../assets/images/home/insta1.png";
import insta2 from "../assets/images/home/insta2.png";
import insta3 from "../assets/images/home/insta3.png";
import insta4 from "../assets/images/home/insta4.png";
import insta5 from "../assets/images/home/insta5.png";
import longBanner from "../assets/images/home/long-banner.png";
import { Button, ResetPassword, Sponsors } from "../components";
import { homeCards } from "../constants/data";
import MountTransition from "../utils/MountTransition";

const instaImages = [insta1, insta2, insta3, insta4, insta5];

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  return (
    <MountTransition>
      <ResetPassword token={token} />
      <div className="space-y-11">
        <div className="relative grid place-items-center">
          <img
            src={hero}
            alt="hero"
            className="h-screen w-screen select-none object-cover"
          />
          <h1 className="absolute rounded-xl bg-white/90 p-2 text-center text-4xl font-bold text-neutral-darkest sm:p-4 md:text-8xl">
            AWESOME HOME SELL
          </h1>
          <Button
            title={"Take This Look"}
            app
            ClassName={"absolute bottom-1/4"}
            onClick={() => navigate("/shope")}
          />
        </div>
        {/* gird items */}
        <div className="mx-auto grid max-w-7xl lg:grid-cols-4  lg:gap-8">
          <div className="lg:col-span-3">
            <img
              src={gridImg1}
              alt="grid 1"
              className="h-full w-full cursor-pointer object-cover"
              onClick={() => navigate("/shope")}
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-none lg:grid-rows-4 lg:space-y-3">
            <div
              className="cursor-pointer lg:row-span-3"
              onClick={() => navigate("/shope")}
            >
              <img
                src={gridImg2}
                alt="grid 2"
                className="h-full object-cover lg:w-full"
              />
            </div>
            <div
              className="flex cursor-pointer justify-between bg-neutral-darkest px-2 py-3 text-white"
              onClick={() => navigate("/shope")}
            >
              <h1>Find inspiration. Find profesionals</h1>
              <span>arrow</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src={longBanner}
            alt="banner"
            className="hidden w-full md:block"
          />
          <Button
            title={"Explore Now"}
            ClassName={"absolute right-[15%] top-1/2 hidden md:block"}
            app
          />
          <Link to="">
            <img
              src={longBanner}
              alt="banner"
              className="hidden w-full object-cover sm:block sm:min-h-[200px] md:hidden"
            />
          </Link>
        </div>
        {/* three cards */}
        <div className="mx-auto grid max-w-7xl gap-4 p-4 md:grid-cols-3 lg:p-0 ">
          {/* card */}
          {homeCards.map(({ bgColor, img, imgAlt, position, desc }) => (
            <div
              className={
                "h-52 w-full overflow-hidden rounded-md p-4 text-white " +
                bgColor
              }
              key={imgAlt}
            >
              <div className="grid h-full grid-cols-3">
                <div className="col-span-2 flex min-h-full  flex-col justify-between sm:col-span-2">
                  <h2 className="text-xl">{desc}</h2>
                  <div>
                    <Button title={"Shope Now"} cardBtn />
                  </div>
                </div>
                <div className="relative h-full w-full">
                  <img
                    src={img}
                    alt={imgAlt}
                    className={
                      "absolute h-full w-full lg:h-60 lg:w-60 " + position
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* instagram promotion */}
        <div className="text-center">
          <a
            className="cursor-pointer text-center text-3xl font-medium text-neutral-darkest underline sm:text-5xl"
            href={"https://instagram.com/danishsjjd"}
            target="_blank"
            rel="noreferrer"
          >
            Follow us on instagram
          </a>
          <div className="mx-auto mt-9 grid max-w-7xl grid-cols-2 gap-4 p-4 sm:grid-cols-5 sm:gap-1 lg:gap-4 lg:p-0">
            {instaImages.map((img, index) => (
              <a
                href={"https://instagram.com/danishsjjd"}
                key={index}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={img}
                  alt="insta1"
                  className="h-full w-full object-cover"
                />
              </a>
            ))}
          </div>
        </div>
        {/* sponsors */}
        <Sponsors />
      </div>
    </MountTransition>
  );
};

export default Home;
