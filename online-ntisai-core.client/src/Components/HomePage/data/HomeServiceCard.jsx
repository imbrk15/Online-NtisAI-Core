import React from "react";
import { Link } from "react-router-dom";
function HomeServiceCard({ link, icon, title, subtext, stats }) {
  return (
    <Link to={link} className="block group">
      <div className="relative pt-[20px] pr-5 pb-[15px] pl-[15px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 min-h-[130px] flex flex-col justify-end border-l-[8px] border-solid border-[#004c8c]">
        {/* Card Stats (Top-right) */}
        <div className="absolute top-[1px] right-[5px] flex flex-col items-end z-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="py-1 px-[5px] rounded-xl text-[12px] text-[#004c8c] whitespace-nowrap font-bold"
            >
              {stat.label}:{" "}
              <strong className="text-[#004c8c]">{stat.value}</strong>
            </div>
          ))}
        </div>

        {/* Card Content (Bottom) */}
        <div className="flex flex-col">
          <div className="text-4xl">{icon}</div>
          <div className="text-lg font-semibold text-gray-800">{title}</div>
          <p className="text-xs text-gray-500  ">{subtext}</p>
        </div>
      </div>
    </Link>
  );
}

export default HomeServiceCard;
