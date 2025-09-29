import React from "react";

function HomeBanner() {
    return (
        <div className="relative w-full bg-[linear-gradient(90deg,#004c8c,#008080)]">
            {/* Background container */}
            <div className="absolute inset-0">
                <img
                    src="/assets/thane-municipal-corporations.jpg"
                    alt="Banner"
                    className="w-full h-full object-cover px-3"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-[180px] sm:h-[250px] md:h-[300px] lg:h-[300px]">
                <h1 className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center drop-shadow-md">
                    Thane Municipal Corporation
                </h1>
            </div>

        </div>
    );
}



export default HomeBanner;
