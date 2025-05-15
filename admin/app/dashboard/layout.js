
import Sidebar from "@/components/Sidebar";
export const metadata = {
  title: "Jonosokti",
  description: "Jonosokti admin dashboard",
};

export default function RootLayout({ children }) {
  return (
   <div>
    
    <div className="flex">
       <Sidebar/>
       <div className="md:ml-64 flex-1 mt-12 px-3">
       {children}
       </div>
       </div>
   </div>
  );
}
