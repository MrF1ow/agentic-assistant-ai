import type { Metadata } from "next";
import ConfigureAmplifyClientSide from "@/config/amplify-cognito-config";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agentic AI Assistatnt",
  description: "Agentic AI Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <ConfigureAmplifyClientSide />
        {children}
      </body>
    </html>
  );
}
