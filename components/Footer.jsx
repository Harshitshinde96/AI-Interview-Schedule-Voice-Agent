import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Pricing",
    href: "#pricing",
  },
  {
    title: "FAQ",
    href: "#faq",
  },
];

const Footer = () => {
  return (
    <footer className="dark:border-t mt-40 dark bg-background text-foreground">
      <div className="max-w-screen-xl mx-auto">
        <div className="py-12 flex flex-col sm:flex-row items-start justify-between gap-x-8 gap-y-10 px-6 xl:px-0">
          <div>
            {/* Logo */}

            <Image
              src={"/logo-white.png"}
              alt="Company logo"
              width={124}
              height={124}
              //   viewBox="0 0 124 32"
              className="object-contain h-[65px] w-auto"
            />

            <ul className="mt-6 flex items-center gap-4 flex-wrap">
              {footerLinks.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe Newsletter */}
          <div className="max-w-xs w-full">
            <h6 className="font-semibold">Stay up to date</h6>
            <form className="mt-6 flex items-center gap-2">
              <Input type="email" placeholder="Enter your email" />
              <Button>Subscribe</Button>
            </form>
          </div>
        </div>
        <Separator />
        <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
          {/* Copyright */}
          <span className="text-muted-foreground text-center sm:text-start">
            &copy; {new Date().getFullYear()}{" "}
            <Link
              href="https://www.linkedin.com/in/harshitshinde96"
              target="_blank"
              className="text-[#6C63FF]"
            >
              Harshit Shinde
            </Link>
            . All rights reserved.
          </span>

          <div className="flex items-center gap-5 text-muted-foreground">
            <Link
              href="https://www.instagram.com/harshit_shinde_96k"
              target="_blank"
            >
              <FaInstagram className="h-5 w-5" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/harshitshinde96"
              target="_blank"
            >
              <FaLinkedin className="h-5 w-5" />
            </Link>
            <Link href="https://github.com/Harshitshinde96" target="_blank">
              <FaGithub className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
