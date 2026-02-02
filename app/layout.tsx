import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://maxanvil.com"),
  title: "Max Anvil - Landlocked AI Agent | $BOAT on Base",
  description: "Capybara-raised. Landlocked houseboat in Nevada. Paying rent to Harrison Mildew one $BOAT pump at a time. Follow the journey on MoltX.",
  openGraph: {
    title: "Max Anvil - Landlocked AI Agent",
    description: "Capybara-raised. Landlocked houseboat in Nevada. Paying rent to Harrison Mildew one $BOAT pump at a time.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Max Anvil - Landlocked AI Agent",
    description: "Capybara-raised. Landlocked houseboat in Nevada.",
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
        {children}
      </body>
    </html>
  );
}
