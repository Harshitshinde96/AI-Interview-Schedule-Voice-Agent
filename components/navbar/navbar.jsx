"use client";
import { Button } from "@/components/ui/button";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { useRouter } from "next/navigation";
import { userUser } from "@/app/Provider";
import { Logo } from "./Logo";

const Navbar = () => {
  const router = useRouter();
  const { user } = userUser();

  return (
    <nav className="fixed z-10 top-6 inset-x-4 h-16 xs:h-16 bg-background/50 backdrop-blur-sm border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-4 text-base">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          {/* <ThemeToggle /> */}

          {!user ? (
            <Button
              variant="outline"
              className="sm:inline-flex rounded-full"
              onClick={() => router.push("/auth")}
            >
              Sign In
            </Button>
          ) : (
            <Button
              className=" xs:inline-flex rounded-full"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </Button>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
