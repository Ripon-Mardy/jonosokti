
import {Public_Sans} from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  subsets : ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata = {
  title: "Jonosokti",
  description: "Jonosokti admin dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` antialiased  ${publicSans.className}`}
        suppressHydrationWarning={true}
      >
       {children}

      </body>
    </html>
  );
}
