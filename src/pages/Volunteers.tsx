
import React, { useState } from "react";
import MainLayout from "@/components/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { MapPin, MessageSquare, User, Phone, Heart, Send } from "lucide-react";
import { toast } from "sonner";

interface Volunteer {
  id: string;
  name: string;
  distance: string;
  rating: number;
  availability: string;
  tasks: string[];
  image?: string;
  bio: string;
  phone: string;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderImage?: string;
  content: string;
  timestamp: Date;
}

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      distance: "0.8 miles away",
      rating: 4.9,
      availability: "Today",
      tasks: ["Grocery Shopping", "Transportation"],
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format",
      bio: "Retired nurse with 20 years of experience. I enjoy helping seniors with daily tasks and providing companionship.",
      phone: "(555) 123-4567",
    },
    {
      id: "2",
      name: "Michael Chen",
      distance: "1.2 miles away",
      rating: 4.7,
      availability: "Tomorrow",
      tasks: ["Meal Preparation", "Companionship"],
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format",
      bio: "Graduate student studying geriatric care. I have experience caring for my grandparents and want to help others.",
      phone: "(555) 234-5678",
    },
    {
      id: "3",
      name: "Robert Davis",
      distance: "2.1 miles away",
      rating: 4.8,
      availability: "Today",
      tasks: ["Transportation", "Home Assistance"],
      bio: "Retired teacher who loves to help others. I have reliable transportation and am available most weekdays.",
      phone: "(555) 345-6789",
    },
    {
      id: "4",
      name: "Lisa Williams",
      distance: "0.5 miles away",
      rating: 4.6,
      availability: "Today & Tomorrow",
      tasks: ["Grocery Shopping", "Medication Pickup"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format",
      bio: "Community volunteer with 5 years of experience helping seniors. I'm available most afternoons and weekends.",
      phone: "(555) 456-7890",
    },
  ]);

  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    "1": [
      {
        id: "1",
        senderId: "1",
        senderName: "Sarah Johnson",
        senderImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format",
        content: "Hello! I'm available to help with grocery shopping today if you need assistance.",
        timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
      },
      {
        id: "2",
        senderId: "current-user",
        senderName: "You",
        content: "Hi Sarah, that would be wonderful. I need to pick up some items from the pharmacy as well.",
        timestamp: new Date(new Date().setHours(new Date().getHours() - 1.5)),
      },
      {
        id: "3",
        senderId: "1",
        senderName: "Sarah Johnson",
        senderImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format",
        content: "No problem! I can help with that too. What time works best for you?",
        timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 45)),
      },
    ],
  });

  const [newMessage, setNewMessage] = useState("");

  const handleViewDetails = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsDetailsOpen(true);
  };

  const handleOpenChat = (volunteer: Volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsChatOpen(true);
    
    // Initialize chat if it doesn't exist
    if (!messages[volunteer.id]) {
      setMessages({
        ...messages,
        [volunteer.id]: [],
      });
    }
  };

  const handleSendMessage = () => {
    if (!selectedVolunteer || !newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: "current-user",
      senderName: "You",
      content: newMessage,
      timestamp: new Date(),
    };

    const updatedMessages = {
      ...messages,
      [selectedVolunteer.id]: [
        ...(messages[selectedVolunteer.id] || []),
        message,
      ],
    };

    setMessages(updatedMessages);
    setNewMessage("");

    // Simulate reply after 1 second
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedVolunteer.id,
        senderName: selectedVolunteer.name,
        senderImage: selectedVolunteer.image,
        content: `Thanks for your message. I'll get back to you shortly about "${newMessage.substring(0, 20)}${newMessage.length > 20 ? '...' : ''}"`,
        timestamp: new Date(),
      };

      setMessages({
        ...updatedMessages,
        [selectedVolunteer.id]: [
          ...updatedMessages[selectedVolunteer.id],
          reply,
        ],
      });
    }, 1000);
  };

  const handleRequestVolunteer = (volunteer: Volunteer) => {
    toast.success(`Request sent to ${volunteer.name}`, {
      description: "They will respond to your request soon.",
    });
  };

  return (
    <MainLayout>
      <div className="pb-4">
        <h1 className="text-2xl font-semibold text-slate-800">Volunteers</h1>
        <p className="text-slate-500">Find verified helpers in your area</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Volunteers</CardTitle>
          <CardDescription>
            {volunteers.length} volunteers are available to assist you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {volunteers.map((volunteer) => (
              <div
                key={volunteer.id}
                className="p-4 bg-white rounded-lg border border-slate-200 flex flex-col md:flex-row justify-between gap-4"
              >
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16">
                    {volunteer.image ? (
                      <AvatarImage src={volunteer.image} />
                    ) : null}
                    <AvatarFallback className="bg-elder-light-purple">
                      <User className="h-6 w-6 text-elder-purple" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-lg">{volunteer.name}</h3>
                    <div className="flex items-center text-sm text-slate-500 mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{volunteer.distance}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500 mt-1">
                      <Heart className="h-3 w-3 mr-1 text-elder-red" />
                      <span>{volunteer.rating} Rating</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {volunteer.tasks.map((task) => (
                        <span
                          key={task}
                          className="text-xs px-2 py-0.5 bg-elder-light-purple text-elder-dark-purple rounded-full"
                        >
                          {task}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-elder-purple font-medium mt-2">
                      Available: {volunteer.availability}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row md:flex-col gap-2 justify-end md:justify-start">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    onClick={() => handleViewDetails(volunteer)}
                  >
                    <User className="h-4 w-4 mr-1" />
                    <span>Details</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    onClick={() => handleOpenChat(volunteer)}
                  >
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>Message</span>
                  </Button>
                  <Button
                    size="sm"
                    className="flex items-center"
                    onClick={() => handleRequestVolunteer(volunteer)}
                  >
                    <span>Request Help</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            Find More Volunteers
          </Button>
        </CardFooter>
      </Card>

      {/* Volunteer Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Volunteer Details</DialogTitle>
          </DialogHeader>
          {selectedVolunteer && (
            <div className="py-4">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-20 w-20">
                  {selectedVolunteer.image ? (
                    <AvatarImage src={selectedVolunteer.image} />
                  ) : null}
                  <AvatarFallback className="bg-elder-light-purple text-xl">
                    {selectedVolunteer.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-medium">{selectedVolunteer.name}</h2>
                  <div className="flex items-center text-sm text-slate-500 mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{selectedVolunteer.distance}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-500">About</h3>
                  <p className="mt-1">{selectedVolunteer.bio}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-500">
                    Assistance Areas
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedVolunteer.tasks.map((task) => (
                      <span
                        key={task}
                        className="text-xs px-2 py-0.5 bg-elder-light-purple text-elder-dark-purple rounded-full"
                      >
                        {task}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-500">Contact</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4 text-elder-purple" />
                    <span>{selectedVolunteer.phone}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-slate-500">
                    Availability
                  </h3>
                  <p className="mt-1">{selectedVolunteer.availability}</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setIsDetailsOpen(false);
                    handleOpenChat(selectedVolunteer);
                  }}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => {
                    handleRequestVolunteer(selectedVolunteer);
                    setIsDetailsOpen(false);
                  }}
                >
                  Request Help
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Chat Dialog */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-[500px] h-[80vh] max-h-[700px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedVolunteer?.image ? (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedVolunteer.image} />
                </Avatar>
              ) : (
                <div className="h-8 w-8 rounded-full bg-elder-light-purple flex items-center justify-center">
                  <User className="h-4 w-4 text-elder-purple" />
                </div>
              )}
              <span>Chat with {selectedVolunteer?.name}</span>
            </DialogTitle>
            <DialogDescription>
              Messages are saved for your convenience
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto my-4 space-y-4">
            {selectedVolunteer &&
              messages[selectedVolunteer.id]?.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderId === "current-user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.senderId === "current-user"
                        ? "bg-elder-purple text-white"
                        : "bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.senderId !== "current-user" && (
                        <Avatar className="h-6 w-6">
                          {message.senderImage ? (
                            <AvatarImage src={message.senderImage} />
                          ) : (
                            <AvatarFallback className="bg-elder-light-purple text-xs">
                              {message.senderName.charAt(0)}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      )}
                      <span className="text-xs font-medium">
                        {message.senderName}
                      </span>
                      <span className="text-xs opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <p
                      className={`text-sm ${
                        message.senderId === "current-user" ? "text-white" : ""
                      }`}
                    >
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}

            {selectedVolunteer && (!messages[selectedVolunteer.id] || messages[selectedVolunteer.id].length === 0) && (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-slate-300 mx-auto" />
                <p className="text-slate-500 mt-2">
                  No messages yet. Start the conversation!
                </p>
              </div>
            )}
          </div>
          <div className="flex gap-2 mt-auto pt-4 border-t border-slate-200">
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Volunteers;
