import { Moon, Sun } from "lucide-react";

import { useTheme } from "../context/ThemeProvider";
import { Button } from "./ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme == "light" ? "dark" : "light")}
      variant="ghost"
      size="icon"
      className="bg-white dark:bg-black"
    >
      <Sun className="h-[1.6rem] w-[1.6rem]  text-black rotate-0 scale-100  transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.6rem] w-[1.6rem]  text-white rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
