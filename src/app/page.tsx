import { Lab } from "@/components/lab";

export default function Home() {

  return (
    <div className="h-screen flex flex-col">
      <header className="w-full h-20 bg-gray-400 flex justify-between p-2.5 px-5 items-center">
        <div className="flex gap-5">
          <div className="w-15 h-15 bg-gray-500 rounded-sm"></div>
          <div>
            <h1 className="text-xl font-semibold color-black-800 font-sans">Project Name</h1>
            <span className="font-sans">@username</span>
          </div>
        </div>

        <div>
          <div className="w-13 h-13 bg-gray-500 rounded-full grid place-items-center border-2 border-green-400">
            <span className="font-sans font-sans text-2xl">W</span>
          </div>
        </div>
      </header>
      
      <main className="h-full max-h-full overflow-hidden">
        <Lab />
      </main>
    </div>
  );
}
