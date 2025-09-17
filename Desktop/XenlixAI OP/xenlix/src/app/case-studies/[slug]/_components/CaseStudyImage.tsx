"use client";

import Image from "next/image";

interface CaseStudyImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  fallbackCity: string;
}

export default function CaseStudyImage({ src, alt, fallbackTitle, fallbackCity }: CaseStudyImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        const parent = target.parentElement;
        if (parent) {
          parent.innerHTML = `
            <div class="w-full h-full flex items-center justify-center bg-white/10">
              <div class="text-center text-white">
                <h3 class="text-xl font-bold mb-2">${fallbackTitle}</h3>
                <p class="text-sm opacity-75">${fallbackCity}</p>
              </div>
            </div>
          `;
        }
      }}
    />
  );
}