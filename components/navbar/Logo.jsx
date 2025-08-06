import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      src={"/logo.png"}
      alt="Company logo"
      width={120}
      height={60}
      className="object-contain h-[50px] w-auto"
    />
  );
};
