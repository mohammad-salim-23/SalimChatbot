import { Outlet } from "react-router-dom"

const Root = () =>{
   return (
    <div className="mt-12">
    <Outlet></Outlet>
</div>
   )
}
export default Root;