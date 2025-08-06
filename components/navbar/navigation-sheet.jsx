import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavMenu } from "./nav-menu";
import { Logo } from "./Logo";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>{" "}
        {/* Accessible title */}
        <div className="flex-1">
          <Logo className="mb-8" />

          {/* Main Navigation */}
          <NavMenu orientation="vertical" className="space-y-2" />

          {/* Additional Items */}
          <div className="mt-8 space-y-4">
            <Button variant="outline" className="w-full rounded-full">
              Sign In
            </Button>
            <Button className="w-full rounded-full">Dashboard</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
