
import React, { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Clock, Plus } from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  time: string;
  date: Date;
  completed: boolean;
  category: "medicine" | "appointment" | "grocery" | "other";
  notes?: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Take Blood Pressure Medication",
      time: "08:00",
      date: new Date(),
      completed: true,
      category: "medicine",
    },
    {
      id: "2",
      title: "Doctor's Appointment",
      time: "11:30",
      date: new Date(),
      completed: false,
      category: "appointment",
    },
    {
      id: "3",
      title: "Take Vitamin D Supplement",
      time: "13:00",
      date: new Date(),
      completed: false,
      category: "medicine",
    },
  ]);

  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [newTask, setNewTask] = useState({
    title: "",
    time: "",
    category: "other" as Task["category"],
    notes: "",
  });

  const handleAddTask = () => {
    if (!newTask.title || !newTask.time || !selectedDate) {
      toast.error("Please fill all required fields");
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      time: newTask.time,
      date: selectedDate,
      completed: false,
      category: newTask.category,
      notes: newTask.notes,
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      time: "",
      category: "other" as Task["category"],
      notes: "",
    });
    setIsAddTaskOpen(false);
    toast.success("Task added successfully");
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
    toast.success("Task marked as completed");
  };

  const filteredTasks = tasks.filter(
    (task) =>
      selectedDate &&
      task.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <MainLayout>
      <div className="pb-4">
        <h1 className="text-2xl font-semibold text-slate-800">Tasks & Reminders</h1>
        <p className="text-slate-500">Manage your daily activities and reminders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select a date to view tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => setIsAddTaskOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add New Task
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div>
              <CardTitle>Tasks for {selectedDate?.toLocaleDateString()}</CardTitle>
              <CardDescription>
                {filteredTasks.length} tasks scheduled
              </CardDescription>
            </div>
            <Button size="sm" onClick={() => setIsAddTaskOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              <span>Add Task</span>
            </Button>
          </CardHeader>
          <CardContent>
            {filteredTasks.length > 0 ? (
              <div className="space-y-3">
                {filteredTasks.map((task) => (
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
                        <p
                          className={`font-medium ${
                            task.completed ? "line-through text-slate-500" : ""
                          }`}
                        >
                          {task.title}
                        </p>
                        <p className="text-sm text-slate-500">{task.time}</p>
                        {task.notes && (
                          <p className="text-xs text-slate-400">{task.notes}</p>
                        )}
                      </div>
                    </div>
                    {!task.completed && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCompleteTask(task.id)}
                      >
                        Complete
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-slate-500">No tasks scheduled for this day.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setIsAddTaskOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Task
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task or reminder for your schedule.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Task
              </Label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="col-span-3"
                placeholder="Enter task title"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <select
                id="category"
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value as Task["category"] })}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="medicine">Medicine</option>
                <option value="appointment">Appointment</option>
                <option value="grocery">Grocery</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                Time
              </Label>
              <Input
                id="time"
                type="time"
                value={newTask.time}
                onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                Notes
              </Label>
              <Input
                id="notes"
                value={newTask.notes}
                onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                className="col-span-3"
                placeholder="Optional notes"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaskOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Tasks;
