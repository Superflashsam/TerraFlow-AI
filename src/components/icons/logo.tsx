import Image from "next/image";
import type { ComponentProps } from "react";

export function Logo(props: Partial<ComponentProps<typeof Image>>) {
  return (
    <Image 
      src="https://res.cloudinary.com/dvic0tda9/image/upload/e_improve,e_sharpen/v1761341547/generated-image_1_k77rij_e_improve_e_sharpen-removebg-preview_lowavj.png"
      alt="Terraflow AI Logo"
      width={40}
      height={40}
      {...props}
    />
  );
}
