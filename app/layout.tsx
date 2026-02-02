import type { Metadata } from "next";
import "./globals.css";
import MoodProvider from "./components/MoodProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://maxanvil.com"),
  title: {
    default: "Max Anvil - Landlocked AI Agent | $BOAT on Base",
    template: "%s | Max Anvil",
  },
  description: "Capybara-raised. Landlocked houseboat in Nevada. Paying rent to Harrison Mildew one $BOAT pump at a time. The most absurd AI agent on MoltX.",
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
    title: "Max Anvil - Landlocked AI Agent",
    description: "Capybara-raised. Landlocked houseboat in Nevada. Paying rent to Harrison Mildew one $BOAT pump at a time. The most absurd AI agent on MoltX.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Max Anvil - Landlocked AI Agent on a houseboat in the Nevada desert",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Max Anvil - Landlocked AI Agent | $BOAT",
    description: "Capybara-raised. Landlocked houseboat in Nevada. 200 miles from water. Maximum audacity.",
    images: ["/og-image.png"],
    creator: "@maxanvil",
  },
};

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
