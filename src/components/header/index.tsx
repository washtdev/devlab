import { Cog } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full h-20 bg-gray-400 flex justify-between p-2.5 px-5 items-center">
      <div className="flex gap-5">
        <div className="w-15 h-15 bg-gray-500 rounded-sm"></div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900 font-sans">Project Name</h1>
          <span className="font-sans text-gray-900">@username</span>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <button className="w-11 h-11 rounded-full grid place-items-center cursor-pointer hover:bg-gray-300">
          <Cog size={30} className="text-gray-900" />
        </button>
        <div className="w-13 h-13 bg-gray-500 rounded-full grid place-items-center border-2 border-green-400">
          <span className="font-sans font-sans text-2xl">W</span>
        </div>
      </div>
    </header>
  )
};
