import React from "react";
import { services } from "./data/services";
import HomeServiceCard from "./data/HomeServiceCard";
function HomeServices() {
    return (
        <section className="bg-gray-100 p-4 sm:p-6 max-w-7xl mx-auto min-h-[250px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-4">
                {services.map((service) => (
                    <HomeServiceCard key={service.id} {...service} />
                ))}
            </div>
        </section>


    );
}

export default HomeServices;
