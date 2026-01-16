import {
  BarChart3,
  Book,
  GlobeLock,
  Headset,
  HelpCircle,
  Info,
  Menu,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { useIsMobile } from "../../hooks/useIsMobile";
import Divider from "../ui/divider";
import { Link } from '../ui/link';

const activeProps = 'font-bold';

export default function PublicHeader() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavLinks = () => (
    <>
      <Link
        to={"/"}
        activeProps={activeProps}
        className="flex items-center gap-2 hover:text-gray-300 transition-colors"
        onClick={() => setIsMenuOpen(false)}
      >
        <Info size={18} />
        <span className="text-sm">Sobre o BIPc</span>
      </Link>
      {/* <Divider
        className={cn("h-[28px] w-0.5 my-0", {
          hidden: isMobile,
          "mx-4": !isMobile,
        })}
      /> */}
      <Link
        to="https://bipc.org.br/benchmark"
        activeProps={activeProps}
        className="flex items-center gap-2 hover:text-gray-300 transition-colors"
        onClick={() => setIsMenuOpen(false)}
      >
        <BarChart3 size={18} />
        <span className="text-sm">Benchmark</span>
      </Link>
      <Link
        to="/faq"
        activeProps={activeProps}
        className="flex items-center gap-2 hover:text-gray-300 transition-colors"
        onClick={() => setIsMenuOpen(false)}
      >
        <HelpCircle size={18} />
        <span className="text-sm">FAQ</span>
      </Link>
      <Link
        to="/glossario"
        activeProps={activeProps}
        className="flex items-center gap-2 hover:text-gray-300 transition-colors"
        onClick={() => setIsMenuOpen(false)}
      >
        <Book size={18} />
        <span className="text-sm">Glossário</span>
      </Link>
      <Link
        to={"/contact"}
        activeProps={activeProps}
        className="flex items-center gap-2 hover:text-gray-300 transition-colors"
        onClick={() => setIsMenuOpen(false)}
      >
        <Headset size={18} />
        <span className="text-sm">Comunicação</span>
      </Link>
      <Link
        to="/privacidade"
        className="flex items-center gap-2 hover:text-gray-300 transition-colors"
        onClick={() => setIsMenuOpen(false)}
      >
        <GlobeLock size={18} />
        <span className="text-sm">Políticas de Privacidade</span>
      </Link>
      <Divider
        className={cn("h-[28px] w-0.5 my-0", {
          hidden: isMobile,
          "mx-4": !isMobile,
        })}
      />

      <Link
        to="https://bipc.org.br/login"
        activeProps={activeProps}
        className="flex items-center gap-2 hover:text-gray-300 transition-colors"
        onClick={() => setIsMenuOpen(false)}
      >
        <User size={18} />
        <span className="text-sm font-bold">Entrar na Plataforma</span>
      </Link>
    </>
  );

  return (
    <nav className="bg-sidebar text-white relative w-full">
      <div className="flex items-center justify-between px-4 md:px-8 py-0">
        <Link to={"https://bipc.org.br/benchmark"} className="p-0">
          <img
            src={'images/assets/logo.svg'}
            alt="Logo"
            className={cn("h-[30px]", {
              "h-[30px]": isMobile,
            })}
          />
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex gap-6 items-center py-2 ml-auto">
            <NavLinks />
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-700 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && (
        <div
          className={cn(
            "absolute top-full left-0 right-0 bg-sidebar border-t border-gray-600 transition-all duration-300 ease-in-out z-50",
            {
              "opacity-100 visible": isMenuOpen,
              "opacity-0 invisible": !isMenuOpen,
            }
          )}
        >
          <div className="flex flex-col gap-2 p-4">
            <NavLinks />
          </div>
        </div>
      )}
    </nav>
  );
}
