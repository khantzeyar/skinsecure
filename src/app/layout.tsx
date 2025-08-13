import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto} from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import "./globals.css";
import Navbar from "./components/Navbar";
import theme from "../../theme";
import BottomBar from "./components/BottomBar";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skin Secure",
  description: "Empowering Informed Choices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased min-h-screen flex flex-col`}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Navbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <BottomBar />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
