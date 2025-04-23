
import { Check, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  category: "medicine" | "appointment" | "grocery" | "other";
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Take Blood Pressure Medication",
    time: "8:00 AM",
    completed: true,
    category: "medicine",
  },
  {
    id: "2",
    title: "Doctor's Appointment",
    time: "11:30 AM",
    completed: false,
    category: "appointment",
  },
  {
    id: "3",
    title: "Take Vitamin D Supplement",
    time: "1:00 PM",
    completed: false,
    category: "medicine",
  },
  {
    id: "4",
    title: "Order Weekly Groceries",
    time: "3:00 PM",
    completed: false,
    category: "grocery",
  },
];

const TaskWidget = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div>
          <CardTitle className="text-xl">Today's Tasks</CardTitle>
          <CardDescription>Your scheduled activities for today</CardDescription>
        </div>
        <Button size="sm" className="gap-1" asChild>
          <Link to="/tasks">
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    task.completed ? "bg-green-100" : "bg-elder-light-purple"
                  }`}
                >
                  {task.completed ? (
                    <Check className="h-5 w-5 text-green-600" />
                  ) : (
                    <Clock className="h-5 w-5 text-elder-purple" />
                  )}
                </div>
                <div>
                  <p className={`font-medium ${task.completed ? "line-through text-slate-500" : ""}`}>
                    {task.title}
                  </p>
                  <p className="text-sm text-slate-500">{task.time}</p>
                </div>
              </div>
              {!task.completed && (
                <Button variant="outline" size="sm">
                  Complete
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full" asChild>
          <Link to="/tasks">View All Tasks</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaskWidget;
