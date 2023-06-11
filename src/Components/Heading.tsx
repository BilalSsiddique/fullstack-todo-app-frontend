import React from "react";

const Heading = ({
  our = "OUR",
  afterOurText,
  mb = "mb-20",
  textColor = "text-[#73D043]",
}) => {
  return (
    <div
      className={`drop-shadow-xl w-full text-center mb-2 sm:${mb} text-2xl sm:text-4xl`}
    >
      <h2 className="text-black tracking-widest drop-shadow-2xl font-extrabold">
        {our} <span className={`${textColor}`}>{afterOurText}</span>
      </h2>
    </div>
  );
};

export default Heading;
