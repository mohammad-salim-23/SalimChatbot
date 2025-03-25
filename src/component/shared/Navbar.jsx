import Logo from "../../assets/images/AIChatbot.jpg";
import { LogOut, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useContext } from "react";
import { AuthContext } from "../AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const {user , LogOut} = useContext(AuthContext);
    const navigate = useNavigate();

    //handle logout
    const handleLogOut = async () =>{
        try{
            await LogOut();
            localStorage.removeItem("access-token");
            navigate("/login"); // redirect to login page after logging out
        }catch(error){
            console.error("Error logging out: ", error);
        }
    }
  return (
    <header className="border-b w-full">
    <div className="container flex justify-between items-center mx-auto h-16 px-3">
      {/* Logo */}
      <h1 className="text-2xl font-black flex items-center gap-2">
        <img src={Logo} alt="AI Chatbot Logo" className="w-10 h-10" />
        SalimChatbot
      </h1>

      {/* Navigation */}
      <nav className="flex gap-4 items-center">
        {/* Conditional Rendering based on user authentication */}
        {user ? (
          // Show avatar and log out option if the user is logged in
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user?.photoURL || "https://github.com/shadcn.png"} />
                <AvatarFallback>{user?.displayName || "User"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 cursor-pointer flex gap-2"
                onClick={handleLogOut}
              >
                <LogOut />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          // Show login button if the user is not logged in
          <Button className="border border-teal-500 font-bold" variant="outline" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </nav>
    </div>
  </header>
  );
};

export default Navbar;
