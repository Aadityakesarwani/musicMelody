import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { X } from "lucide-react"; 

export default function AccountPanel({ onClose }) {
  return (
    <div className="absolute top-20 right-8 bg-gray-100 shadow-lg rounded-lg w-72 z-50">
      {/* Close Button */}
      <div className="flex justify-end p-2">
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* User Info */}
      <div className="flex items-center p-4 gap-3 -mt-2">
        <Avatar className="w-12 h-12">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <div>
          <p className="text-sm text-gray-500">sign in as</p>
          <p className="font-semibold text-lg text-black">warneraaron@gmail.com</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="border-t border-gray-300">
        <Button variant="ghost" className="w-full justify-start px-5 py-4 text-lg font-semibold">
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start px-5 py-4 text-lg font-semibold text-red-500">
          Sign out
        </Button>
      </div>
    </div>
  );
}
