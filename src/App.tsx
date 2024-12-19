import React from "react";

import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { AuthProvider } from "./context/authContext/index";

function App() {
    return (
        <AuthProvider>
            <div className="font-sans">
                <RouterProvider router={router} />
            </div>
        </AuthProvider>
    );
}

export default App;
