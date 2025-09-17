import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact XenlixAI — Book Demo / Get in Touch',
  description: 'Ready to transform your advertising with AI? Book a personalized demo or get in touch with our team. Free consultation and custom demos available.',
  keywords: 'contact XenlixAI, book demo, AI advertising, consultation, support, get in touch',
  openGraph: {
    title: 'Contact XenlixAI — Book Demo / Get in Touch',
    description: 'Ready to transform your advertising with AI? Book a personalized demo or get in touch with our team.',
    type: 'website',
    url: 'https://yourdomain.com/contact',
    siteName: 'XenlixAI',
    images: [
      {
        url: 'https://yourdomain.com/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact XenlixAI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact XenlixAI — Book Demo / Get in Touch',
    description: 'Ready to transform your advertising with AI? Book a personalized demo or get in touch with our team.',
    images: ['https://yourdomain.com/og-contact.jpg'],
  },
  alternates: {
    canonical: 'https://yourdomain.com/contact',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}