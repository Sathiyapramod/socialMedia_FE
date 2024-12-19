import React from "react";
import Landing from "../../components/Landing/LandingForm";

function Landingpage() {
    return (
        <div className="flex flex-row justify-center items-center mx-auto border h-screen">
            <div className="flex-1  h-full"></div>
            <Landing />
        </div>
    );
}

export default Landingpage;
