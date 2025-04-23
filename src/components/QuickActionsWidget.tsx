
import {
  Calendar,
  MessageSquare,
  Phone,
  ShoppingCart,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  link: string;
}

const quickActions: QuickAction[] = [
  {
    id: "1",
    title: "Schedule Appointment",
    description: "Book a doctor or specialist visit",
    icon: Calendar,
    color: "bg-blue-100 text-blue-700",
    link: "/appointments",
  },
  {
    id: "2",
    title: "Request Grocery Delivery",
    description: "Order essential items and food",
    icon: ShoppingCart,
    color: "bg-green-100 text-green-700",
    link: "/grocery",
  },
  {
    id: "3",
    title: "Contact Family Member",
    description: "Call or message your loved ones",
    icon: Phone,
    color: "bg-elder-light-purple text-elder-purple",
    link: "/messages",
  },
  {
    id: "4",
    title: "Community Forum",
    description: "Join discussions with other members",
    icon: MessageSquare,
    color: "bg-orange-100 text-orange-700",
    link: "/messages",
  },
];

const QuickActionsWidget = () => {
  return (
    <Card>
      <CardHeader className="pb-2 space-y-0">
        <CardTitle className="text-xl">Quick Actions</CardTitle>
        <CardDescription>Frequently used services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.id}
              to={action.link}
              className="flex flex-col items-center p-4 bg-white rounded-xl border border-slate-200 hover:border-elder-purple hover:shadow-md transition-all"
            >
              <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mb-3`}>
                <action.icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-medium text-center">{action.title}</h3>
              <p className="text-xs text-slate-500 text-center mt-1">{action.description}</p>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsWidget;
