import { Poppins, Open_Sans, Roboto, Ubuntu, DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
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

const dm_sans = DM_Sans({
  subsets : ['latin'],
  weight : ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const metadata = {
  title: "Jonosokti - জনশক্তি  ",
  description: "Hire Experts & Get Your Job Done",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />


      </head>
      <body suppressHydrationWarning={true} className={dm_sans.className}>
        <div>
          <AuthContext/>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
