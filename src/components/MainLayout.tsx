
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import EmergencyButton from "./EmergencyButton";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onMenuToggle={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      
      <main 
        className={cn(
          "pt-16 transition-all duration-300 min-h-screen", 
          sidebarOpen ? "pl-64" : "pl-0"
        )}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
      
      <EmergencyButton />
    </div>
  );
};

export default MainLayout;
