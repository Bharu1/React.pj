import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/themeprovider";
import LightMoon from "../assets/moon-outline.svg";
import whiteMoon from "../assets/whiteMoon.png";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const isLightMode = theme === "light";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isLightMode ? "dark" : "light")}

    >
      {isLightMode ? (
        <img src={LightMoon} alt=""  className="w-4 h-4"/>
      ) : (
        <img src={whiteMoon} alt="" className="w-4 h-4"/>
      )}
      <span className="ml-2">{isLightMode ? "Dark Mode" : "Dark Mode"}</span>
    </Button>
  );
}
export default ModeToggle;