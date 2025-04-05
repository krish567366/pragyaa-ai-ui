import type { FC } from "react";
import Image from "next/image";

interface Props {
  href: string;
}

const LogoLink: FC<Props> = ({ href }) => {
  return (
    <a className="flex items-center" href={href}>
      <Image
        className="w-auto h-10 max-w-[16rem] sm:max-w-none"
        src="/pragyaa_transparent_hor.png"
        alt="Pragyaa Logo"
        width={250}
        height={40}
        style={{
          objectFit: "contain",
          objectPosition: "left"
        }}
        priority
      />
    </a>
  );
};

export default LogoLink;
