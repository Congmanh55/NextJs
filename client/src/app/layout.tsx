import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import AppProvider from "@/app/app-provider";
import { cookies } from "next/headers";
import SlideSession from "@/components/slide-session";
import accountApiRequest from "@/apiRequests/account";
import { AccountResType } from "@/schemaValidations/account.schema";
import { baseOpenGraph } from "@/app/shared-metadata";

const inter = Inter({ subsets: ['vietnamese'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Productic',
    default: 'Productic'
  },
  description: 'Duoc tao boi Cong Manh',
  openGraph: baseOpenGraph
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken')

  let user: AccountResType['data'] | null = null
  if (sessionToken) {
    const data = await accountApiRequest.me(sessionToken.value)
    user = data.payload.data
  }
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider
            inititalSessionToken={sessionToken?.value}
            user={user}
          >
            <Header user={user} />

            {children}
            <SlideSession />
          </AppProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
