import { createBrowserRouter } from "react-router-dom";
import Root from "../component/Root";
import HomePage from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SIgnIn";

const router = createBrowserRouter([
    {
        path : "/",
        element : <Root/>,
        children: [
            {
               path: "/",
               element : <HomePage></HomePage>
            },
            {
                path: "/login",
                element: <SignIn></SignIn>
            }, 
            
        ]
    }
])
export default router;