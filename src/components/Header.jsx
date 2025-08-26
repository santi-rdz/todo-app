import moonIcon from "../assets/images/icon-moon.svg";
import sunIcon from "../assets/images/icon-sun.svg";
import { useDarkMode } from "../hooks/useDarkMode";

export default function Header() {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <header className="main-header pt-10 min-h-56 sm:min-h-80 lg:min- ">
      <nav className="my-container flex justify-between">
        <h1 className="tracking-[10px] text-0 font-bold text-white">TODO</h1>
        <button
          onClick={() => setIsDark(!isDark)}
          className="cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          {isDark ? <img src={sunIcon} alt="" /> : <img src={moonIcon} alt="" />}
        </button>
      </nav>
    </header>
  );
}
