import React from "react";

import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { AuthProvider } from "./context/authContext/index";
import { Toaster } from "sonner";

function App() {
    return (
        <AuthProvider>
            <div className="font-sans">
                <Toaster richColors position="top-right" />
                <RouterProvider router={router} />
            </div>
        </AuthProvider>
    );
}

export default App;
