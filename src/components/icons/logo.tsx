import type { SVGProps } from "react";
import Image from "next/image";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <Image 
      src="https://res.cloudinary.com/dvic0tda9/image/upload/e_improve,e_sharpen/v1761341547/generated-image_1_k77rij_e_improve_e_sharpen-removebg-preview_lowavj.png"
      alt="Terraflow AI Logo"
      width={32}
      height={32}
      {...props}
    />
  );
}
