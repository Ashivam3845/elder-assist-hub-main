
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Clock, HeartPulse, Home, MessageSquare, ShoppingCart, Users, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
}

interface SidebarItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Clock, label: "Tasks & Reminders", href: "/tasks" },
  { icon: HeartPulse, label: "Medicine Tracker", href: "/medicine" },
  { icon: ShoppingCart, label: "Grocery Orders", href: "/grocery" },
  { icon: Users, label: "Volunteers", href: "/volunteers" },
  { icon: MessageSquare, label: "Messages", href: "/messages" },
  { icon: Calendar, label: "Appointments", href: "/appointments" },
  { icon: User, label: "Profile", href: "/profile" },
];

const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("Dashboard");

  useEffect(() => {
    const currentPath = location.pathname;
    const matchingItem = sidebarItems.find(item => item.href === currentPath);
    if (matchingItem) {
      setActiveItem(matchingItem.label);
    } else if (currentPath === "/") {
      setActiveItem("Dashboard");
    }
  }, [location]);

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-slate-200 transition-all duration-300 ease-in-out z-40",
        isOpen ? "w-64" : "w-0"
      )}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-3 text-base rounded-lg transition-colors",
                    activeItem === item.label
                      ? "bg-elder-light-purple text-elder-dark-purple font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                  onClick={() => setActiveItem(item.label)}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="bg-elder-light-purple rounded-lg p-3">
            <p className="text-sm text-elder-dark-purple font-medium">Need help?</p>
            <p className="text-xs text-gray-600 mt-1">
              Contact our support team for assistance with the app.
            </p>
            <button className="mt-2 text-sm font-medium text-elder-purple hover:underline">
              Get Support
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
