import { createBrowserRouter } from "react-router-dom";
import Root from "../component/Root";
import HomePage from "../pages/Home/Home";

const router = createBrowserRouter([
    {
        path : "/",
        element : <Root/>,
        children: [
            {
               path: "/",
               element : <HomePage></HomePage>
            }
        ]
    }
])
export default router;