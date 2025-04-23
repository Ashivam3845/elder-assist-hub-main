
import { MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface Volunteer {
  id: string;
  name: string;
  distance: string;
  rating: number;
  availability: string;
  tasks: string[];
  image?: string;
}

const volunteers: Volunteer[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    distance: "0.8 miles away",
    rating: 4.9,
    availability: "Today",
    tasks: ["Grocery Shopping", "Transportation"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format",
  },
  {
    id: "2",
    name: "Michael Chen",
    distance: "1.2 miles away",
    rating: 4.7,
    availability: "Tomorrow",
    tasks: ["Meal Preparation", "Companionship"],
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format",
  },
  {
    id: "3",
    name: "Robert Davis",
    distance: "2.1 miles away",
    rating: 4.8,
    availability: "Today",
    tasks: ["Transportation", "Home Assistance"],
  },
];

const VolunteerWidget = () => {
  return (
    <Card>
      <CardHeader className="pb-2 space-y-0">
        <CardTitle className="text-xl">Available Volunteers</CardTitle>
        <CardDescription>Verified helpers in your area</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {volunteers.map((volunteer) => (
            <div
              key={volunteer.id}
              className="flex items-start justify-between p-3 bg-white rounded-lg border border-slate-200"
            >
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  {volunteer.image ? <AvatarImage src={volunteer.image} /> : null}
                  <AvatarFallback className="bg-elder-light-purple">
                    <User className="h-4 w-4 text-elder-purple" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{volunteer.name}</p>
                  <div className="flex items-center text-sm text-slate-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{volunteer.distance}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {volunteer.tasks.map((task) => (
                      <span
                        key={task}
                        className="text-xs px-2 py-0.5 bg-elder-light-purple text-elder-dark-purple rounded-full"
                      >
                        {task}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <Button size="sm" asChild>
                <Link to="/volunteers">Request</Link>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full" asChild>
          <Link to="/volunteers">Find More Volunteers</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VolunteerWidget;
