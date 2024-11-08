import "./globals.css";
import {Poppins} from "next/font/google"
export const metadata = {
  title: "Water tracker",
  description: "Water tracker",
};

const popins = Poppins({ subsets: ["latin"], weight: ["500"] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={popins.className}>
        {children}
      </body>
    </html>
  );
}
