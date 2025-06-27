import { Poppins, Open_Sans, Roboto, Ubuntu } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Script from "next/script";
import AuthContext from "@/components/NavbarContext/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const ubutntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "Jonosokti - জনশক্তি  ",
  description: "Hire Experts & Get Your Job Done",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />

        {/* Google Analytics Script */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-7G1X0Z2Y54`} // Replace with your Measurement ID
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7G1X0Z2Y54);
          `}
        </Script>


      </head>
      <body suppressHydrationWarning={true} className={ubutntu.className}>
        <div>
          <AuthContext/>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
