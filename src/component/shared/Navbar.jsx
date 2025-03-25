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

const Navbar = () => {
  return (
    <header className="border-b w-full">
      <div className="container flex justify-between items-center mx-auto h-16 px-3">
        {/* Logo */}
        <h1 className="text-2xl font-black flex items-center gap-2">
          <img src={Logo} alt="AI Chatbot Logo" className="w-10 h-10" />
          SalimChatbot
        </h1>

        {/* Search Bar */}
        <div className="max-w-md flex-grow relative">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full border border-gray-300 rounded-full py-2 px-5 pr-10"
          />
          <Search className="absolute right-3 top-2.5 text-gray-500" size={20} />
        </div>

        {/* Navigation */}
        <nav className="flex gap-4 items-center">
          <Button variant="outline" className="rounded-full p-0 size-10">
            🔔
          </Button>

          {/* Avatar with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500 cursor-pointer flex gap-2">
                <LogOut />
                <span>Log Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
