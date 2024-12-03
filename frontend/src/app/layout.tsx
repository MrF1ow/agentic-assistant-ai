import { Providers } from "@/providers/default";
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
      <Providers>
        <body className="font-sans antialiased w-screen h-screen">
          <ConfigureAmplifyClientSide />
          {children}
        </body>
      </Providers>
    </html>
  );
}
