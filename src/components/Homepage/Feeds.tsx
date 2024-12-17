import React, { useEffect, useState } from "react";
import Heading from "../common/Heading";
import supabase from "../../utils/supabaseClient";

function Feeds() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (!session) {
                // todo : test case for session availability to check for google users
            }
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);
    return (
        <div className="border border-red-500 w-8/12 px-0 rounded-[8px] z-0">
            <Heading content="News Feed" classname="mb-[58px] sticky top-[150px]" />
        </div>
    );
}

export default Feeds;
