import {
  BarChart3,
  Book,
  GlobeLock,
  Headset,
  HelpCircle,
  Info,
  LogIn,
  Menu,
  User,
  UserPlus,
  X
} from "lucide-react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { useIsMobile } from "../../hooks/useIsMobile";
import { BetaWarning } from '../beta-warning/beta-warning';
import Divider from "../ui/divider";
import { Link } from '../ui/link';

const activeProps = 'font-bold';

export default function PublicHeader() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('/');
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavLinks = () => (
      <ul
        className={cn("flex gap-6 items-center py-0 ml-auto overflow-auto custom-scrollbar h-min", { "w-full flex flex-col items-start gap-1 mt-auto mb-2 transition-opacity duration-200 p-4": isMobile })}
      >
        <li>
          <Link
            to={"/"}
            activeProps={currentRoute === '/' ? activeProps : ''}
            onClick={() => {
              setIsMenuOpen(false);
              setCurrentRoute('/');
            }}
          >
            <Info size={18} />
            <span className="text-sm max-md:text-base">Sobre o BIPc</span>
          </Link>
        </li>
        {/* <Divider
        className={cn("h-[28px] w-0.5 my-0", {
          hidden: isMobile,
          "mx-4": !isMobile,
        })}
      /> */}
        <li>
          <Link
            to="https://app.bipc.org.br/benchmark"
            activeProps={currentRoute === '/benchmark' ? activeProps : ''}
            onClick={() => {
              setIsMenuOpen(false);
              setCurrentRoute('/benchmark');
            }}
          >
            <BarChart3 size={18} />
            <span className="text-sm max-md:text-base">Benchmark</span>
          </Link>
        </li>
        <li>
          <Link
            to="/faq"
            activeProps={currentRoute === '/faq' ? activeProps : ''}
            onClick={() => {
              setIsMenuOpen(false);
              setCurrentRoute('/faq');
            }}
          >
            <HelpCircle size={18} />
            <span className="text-sm max-md:text-base">FAQ</span>
          </Link>
        </li>
        <li>
          <Link
            to="/glossario"
            activeProps={currentRoute === '/glossario' ? activeProps : ''}
            onClick={() => {
              setIsMenuOpen(false);
              setCurrentRoute('/glossario');
            }}
          >
            <Book size={18} />
            <span className="text-sm max-md:text-base">Glossário</span>
          </Link>
        </li>
        <li>
          <Link
            to={"/contact"}
            activeProps={currentRoute === '/contact' ? activeProps : ''}
            onClick={() => {
              setIsMenuOpen(false);
              setCurrentRoute('/contact');
            }}
          >
            <Headset size={18} />
            <span className="text-sm max-md:text-base">Comunicação</span>
          </Link>
        </li>
        <li>
          <Link
            to="/privacidade"
            onClick={() => {
              setIsMenuOpen(false);
              setCurrentRoute('/privacidade');
            }}
          >
            <GlobeLock size={18} />
            <span className="text-sm max-md:text-base">Políticas de Privacidade</span>
          </Link>
        </li>
        <Divider
          className={cn("h-[28px] w-px my-0", {
            hidden: isMobile,
            "mx-4": !isMobile,
          })}
        />
        {isMobile && (
          <Divider
            className={cn("h-[2px] w-full mx-auto my-4 rounded-md")}
          />
        )}
        
        {/* Login */}
        {isMobile && (
            <li>
            <Link
              to="https://app.bipc.org.br/sign-up"
            >
              <UserPlus size={18} />
              <span>Cadastre-se</span>
            </Link>
          </li>
        )}
        <li>
          <Link
            to="https://app.bipc.org.br/login"
            className={!isMobile ? 'gap-2' : ''}
          >
            {isMobile ? <LogIn size={18} /> : <User size={18} />}
            <span>{isMobile ? 'Login' : 'Entrar na Plataforma'}</span>
          </Link>
        </li>
      </ul>
  );


  return (
    <nav className="bg-sidebar text-white relative w-full">
      <div className={cn("flex items-center justify-between px-8 py-1.5", {
        'px-6 py-0 h-15': isMobile  
      })}>
        <Link to={"https://app.bipc.org.br/benchmark"} className="p-0">
          <img
            src={'/images/assets/logo.svg'}
            alt="Logo"
            className={cn("h-[30px]", {
              "h-[26px]": isMobile,
            })}
          />
        </Link>
        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex gap-6 items-center py-0 ml-auto w-full">
            <NavLinks />
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={toggleMenu}
            className="p-0 hover:bg-gray-700 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      {/* {
        isMobile && (
          <div
            onClick={() => {
              toggleMenu();
              localStorage.setItem("sidebarStatus", "closed");
            }}
            className={cn(
              "fixed inset-0 bg-black/50 backdrop-blur-xl transition-opacity duration-300 z-40 opacity-100 w-full h-[100vh]!",
              isMenuOpen
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            )}
          />

        )
      } */}
      {isMobile && (
        <div>
          <div
            onClick={() => {
              toggleMenu();
              localStorage.setItem("sidebarStatus", "closed");
            }}
            className={cn(
              "fixed  top-0 left-0 h-screen bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 opacity-100 w-full",
              isMenuOpen
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            )}
          />
          <div
            className={cn(
              "fixed top-0 left-0 h-screen w-80 bg-sidebar text-white p-6 transition-transform duration-300 z-50 justify-between flex flex-col",
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}
          >
            <Link to={"https://app.bipc.org.br/benchmark"} className="p-4">
              <img
                src={'/images/assets/logo_full.svg'}
                alt="Logo"
                className={cn("h-full mx-auto mt-2", {
                  "h-[70px]": isMobile,
                })}
              />
            </Link>
            <BetaWarning  />

            {/* <div className="flex flex-col gap-2 p-4"> */}
            <NavLinks />
            {/* </div> */}
          </div>
        </div>
      )}
    </nav>
  );
}
