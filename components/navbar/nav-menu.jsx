"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export const NavMenu = (props) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start ">
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            href="#features"
            className="text-[16px] !text-foreground hover:!text-primary"
          >
            Features
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            href="#ct-banner"
            className="text-[16px] !text-foreground hover:!text-primary"
          >
            Join Now
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link
            href="#pricing"
            className="text-[16px] !text-foreground hover:!text-primary"
          >
            Pricing
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);
