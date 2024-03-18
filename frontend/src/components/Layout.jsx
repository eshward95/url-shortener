// import { URL } from "url";
import { useListContext } from "../context/ListContext";
import InputSection from "./InputSection";
import { List } from "./List";
import { ModeToggle } from "./ModeToggle";
import PageLoader from "./PageLoader";
import { Toaster } from "./ui/toaster";

export default function Layout() {
  const { loading } = useListContext();

  if (loading) return <PageLoader />;
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="text-secondary p-4 shadow dark:shadow-[rgba(255,255,255,_0.24)_0px_1px_4px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
          <h1 className="font-semibold text-3xl bg-gradient-to-r from-purple-400 to-pink-600 inline-block text-transparent bg-clip-text">
            Linkly
          </h1>
          <ModeToggle />
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4">
        <section className="w-full flex flex-col gap-4 items-center">
          <h1
            className="font-semibold text-3xl bg-gradient-to-r
         from-[#144EE3] via-[#EB568E] to-[#A353AA]
        inline-block text-transparent bg-clip-text"
          >
            Shorten your looong Links.
          </h1>
          <p className="text-sm dark:text-neutral-300 text-neutral-500">
            Linkly is an efficient and easy-to-use URL shortening service that
            streamlines your online experience.
          </p>
          <InputSection />
        </section>
        <List />
      </main>
      <Toaster />

      <footer className="text-center shadow">
        <h1
          className="font-semibold text-sm bg-gradient-to-r
          from-[#A353AA] to-[#EB568E]
        inline-block text-transparent bg-clip-text"
        >
          Made with :) by ED
        </h1>
      </footer>
    </div>
  );
}
