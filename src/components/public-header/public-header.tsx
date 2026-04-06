import {
  BarChart3,
  Book as BookIcon,
  CircleHelp,
  FileText,
  Fingerprint,
  GlobeLock,
  Headset,
  Info,
  List,
  LogIn,
  Menu,
  Newspaper,
  X
} from "lucide-react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { useIsMobile } from "../../hooks/useIsMobile";
import { BetaWarning } from '../beta-warning/beta-warning';
import { SidebarHoverPopover, type PopoverItem } from "../layout/sidebar-hover-popover";
import Divider from "../ui/divider";
import { Link } from "../ui/link";

const activeProps = "font-bold";

const saibaMaisItems: PopoverItem[] = [
  { label: "Perguntas frequentes", icon: CircleHelp, linkKey: "faq" },
  { label: "Glossário", icon: FileText, linkKey: "glossary" },
  { label: "Lançamento", icon: Newspaper, linkKey: "lancamento" },
  { label: "Repositório", icon: BookIcon, linkKey: "repository" },
  { label: "Contato", icon: Headset, linkKey: "contact" },
];

const transparenciaItems: PopoverItem[] = [
  { label: "Privacidade dos dados", icon: Fingerprint, linkKey: "privacy" },
  { label: "Termos de uso", icon: FileText, linkKey: "terms" },
  { label: "Formulário de dados", icon: List, linkKey: "dataForm" },
];

export default function PublicHeader() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavLinks = () => {
    const handleCloseMenu = () => setIsMenuOpen(false);

    return (
      <>
        <Link
          to={"/"}
          onClick={handleCloseMenu}
          className="flex items-center gap-2 hover:text-gray-300 transition-colors"
        >
          <Info size={18} />
          <span className="text-sm">Sobre o BIPc</span>
        </Link>

        <SidebarHoverPopover
          triggerClassName="flex items-center gap-2 hover:text-gray-300 transition-colors "
          trigger={
            <>
              <CircleHelp size={18} />
              <span className="text-sm">Saiba mais</span>
            </>
          }
          items={saibaMaisItems}
          onItemClick={handleCloseMenu}
          isMobile={isMobile}
          side="bottom"
        />

        <SidebarHoverPopover
          triggerClassName="flex items-center gap-2 hover:text-gray-300 transition-colors"
          trigger={
            <>
              <GlobeLock size={18} />
              <span className="text-sm">Transparência</span>
            </>
          }
          items={transparenciaItems}
          onItemClick={handleCloseMenu}
          isMobile={isMobile}
          side="bottom"
        />

        <Divider
          className={cn("h-[28px] w-0.5 my-0", {
            hidden: isMobile,
            "mx-4": !isMobile,
          })}
        />

        <Divider
          className={cn("h-px w-full my-2", {
            hidden: !isMobile,
          })}
        />
        <Link
          to="https://app.bipc.org.br/benchmark"
          onClick={handleCloseMenu}
          className="flex items-center gap-2 hover:text-gray-300 transition-colors"
        >
          <BarChart3 size={18} />
          <span className="text-sm">Benchmark</span>
        </Link>

        <Link to="https://app.bipc.org.br/login" onClick={handleCloseMenu} className="flex items-center gap-2 text-accent hover:bg-zinc-700/30 rounded-md transition-colors justify-start w-full bg-zinc-700/30 pl-2">
          <div className='flex gap-3 py-2 items-center w-full justify-start'>
            <LogIn size={18} />
            <span>Login</span>
          </div>
        </Link>
      </>
    );
  };


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
          <div className="flex gap-6 items-center py-0 ml-auto w-full xl:max-w-4xl">
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
              "fixed top-0 left-0 h-screen w-80 bg-sidebar text-white p-6 transition-transform duration-300 z-50 flex flex-col",
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

            <div className="flex flex-col gap-5 flex-1 justify-end">
              <NavLinks />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
