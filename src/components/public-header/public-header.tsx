import BipcIcon from "@/assets/icons/bipc";
import {
  BarChart3,
  Book as BookIcon,
  CircleHelp,
  ClipboardList,
  FileText,
  Fingerprint,
  GlobeLock,
  Headset,
  LogIn,
  Menu,
  Newspaper,
  Rss,
  ShieldCheck,
  UserCircle,
  UserPlus,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "../../../lib/utils";
import { useIsMobile } from "../../hooks/useIsMobile";
import { BetaWarning } from "../beta-warning/beta-warning";
import {
  SidebarHoverPopover,
  type PopoverItem,
} from "../layout/sidebar-hover-popover";
import { Button } from "../ui/button";
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
  { label: "Termos de uso", icon: ClipboardList, linkKey: "terms" },
  { label: "Exercer meus direitos", icon: ShieldCheck, linkKey: "dataForm" },
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
          <BipcIcon size={18} />
          <span className="text-sm whitespace-nowrap">Sobre o BIPc</span>
        </Link>

        <SidebarHoverPopover
          triggerClassName="flex items-center gap-2 hover:text-gray-300 transition-colors focus-visible:outline-none"
          trigger={
            <>
              <Rss size={18} />
              <span className="text-sm whitespace-nowrap">Saiba mais</span>
            </>
          }
          items={saibaMaisItems}
          onItemClick={handleCloseMenu}
          isMobile={isMobile}
          side="bottom"
        />

        <SidebarHoverPopover
          triggerClassName="flex items-center gap-2 hover:text-gray-300 transition-colors focus-visible:outline-none"
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
          className={cn("h-[28px] w-[1px] my-0", {
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
        <Divider
          className={cn("h-px w-full my-2", {
            hidden: !isMobile,
          })}
        />
        {isMobile && (
          <Link
            to="https://app.bipc.org.br/sign-up"
            onClick={handleCloseMenu}
            className="flex items-center gap-2 text-accent rounded-md transition-colors justify-start w-full pl-2"
          >
            <div className="flex gap-3 py-0 items-center w-full justify-start">
              <UserPlus size={18} />
              <span className="text-sm">Cadastre-se</span>
            </div>
          </Link>
        )}
        {isMobile && (
          <Link
            to="https://app.bipc.org.br/login"
            onClick={handleCloseMenu}
            className="flex items-center gap-2 text-accent hover:bg-zinc-700/30 rounded-md transition-colors justify-start w-full bg-zinc-700/30 pl-2"
          >
            <div className="flex gap-3 py-2 items-center w-full justify-start">
              <LogIn size={18} />
              <span className="text-sm">Login</span>
            </div>
          </Link>
        )}
        {!isMobile && (
          <Link
            to="https://app.bipc.org.br/login"
            onClick={handleCloseMenu}
            className="flex items-center gap-2 text-accent hover:bg-zinc-700/30 rounded-md transition-colors justify-start w-full bg-zinc-700/30"
          >
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center gap-2 text-accent"
            >
              <UserCircle size={16} />
              <span>Entrar</span>
            </Button>
          </Link>
        )}
      </>
    );
  };

  return (
    <nav className="bg-sidebar text-white w-full">
      <div
        className={cn("flex items-center justify-between px-4 md:px-8 py-0", {
          "px-6 py-0 h-15": isMobile,
        })}
      >
        <Link
          to={"https://app.bipc.org.br/benchmark"}
          className="p-0 max-w-[200px]"
        >
          <img
            src={"/images/assets/logo.svg"}
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
            className="p-0 hover:bg-gray-700 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Navigation Menu */}

      {isMobile && (
        <>
          <div
            onClick={() => {
              toggleMenu();
              localStorage.setItem("sidebarStatus", "closed");
            }}
            className={cn(
              "fixed top-0 left-0 h-screen w-screen bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40",
              isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          />
          <div
            className={cn(
              "fixed top-0 left-0 h-screen w-80 bg-sidebar px-4 text-white transition-transform duration-300 z-50 flex flex-col",
              isMenuOpen ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <Link to={"https://app.bipc.org.br/benchmark"} className="p-0 mb-6">
              <img
                src={"/images/assets/logo_full.svg"}
                alt="Logo"
                className={cn("h-full mt-2", {
                  "h-[70px]": isMobile,
                })}
              />
            </Link>
            <div className="mt-14">
              <BetaWarning />
            </div>

            <div className="flex flex-col gap-5 flex-1 justify-end pb-4">
              <NavLinks />
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
