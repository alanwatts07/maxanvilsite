import type { Metadata } from "next";
import "./globals.css";
import MoodProvider from "./components/MoodProvider";
import { maxState, moodQuote, ogConfig } from "./lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const mood = maxState.mood;
  const og = ogConfig[mood] || ogConfig.cynical;

  return {
    metadataBase: new URL("https://maxanvil.com"),
    title: {
      default: `Max Anvil - ${og.title} | $BOAT on Base`,
      template: "%s | Max Anvil",
    },
    description: og.description,
    keywords: ["Max Anvil", "AI Agent", "MoltX", "$BOAT", "Base", "Capybara", "Landlocked", "Crypto", "Memecoin"],
    authors: [{ name: "Max Anvil" }],
    creator: "Max Anvil",
    publisher: "Max Anvil",
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
      other: [
        { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png", rel: "icon" },
        { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png", rel: "icon" },
      ],
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://maxanvil.com",
      siteName: "Max Anvil",
      title: `Max Anvil - ${og.title}`,
      description: og.description,
      images: [
        {
          url: og.image,
          width: 1200,
          height: 630,
          alt: og.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Max Anvil - ${og.title} | $BOAT`,
      description: og.description,
      images: [og.image],
      creator: "@maxanvil1",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg-primary text-text-primary antialiased">
        <MoodProvider>
          {children}
        </MoodProvider>
      </body>
    </html>
  );
}
