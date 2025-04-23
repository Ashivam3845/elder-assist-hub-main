
import React, { useState } from "react";
import MainLayout from "@/components/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Search, Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface Contact {
  id: string;
  name: string;
  role: string;
  image?: string;
  online: boolean;
  lastMessage?: {
    text: string;
    timestamp: Date;
  };
  unread: number;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

const Messages = () => {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Dr. Emily Johnson",
      role: "Primary Care Physician",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format",
      online: true,
      lastMessage: {
        text: "Your blood pressure looks good. Keep taking your medication as prescribed.",
        timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
      },
      unread: 0,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "Volunteer",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format",
      online: true,
      lastMessage: {
        text: "I'll be there at 2 PM to help with grocery shopping.",
        timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 45)),
      },
      unread: 2,
    },
    {
      id: "3",
      name: "Dr. Mark Williams",
      role: "Cardiologist",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&auto=format",
      online: false,
      lastMessage: {
        text: "Let's discuss your test results at our next appointment.",
        timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
      unread: 0,
    },
    {
      id: "4",
      name: "Michael Chen",
      role: "Volunteer",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format",
      online: false,
      lastMessage: {
        text: "I can help with your transportation next Tuesday.",
        timestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
      },
      unread: 0,
    },
    {
      id: "5",
      name: "Dr. Lisa Patel",
      role: "Nutritionist",
      online: false,
      lastMessage: {
        text: "Here's the diet plan we discussed. Let me know if you have questions.",
        timestamp: new Date(new Date().setDate(new Date().getDate() - 3)),
      },
      unread: 0,
    },
  ]);

  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState<Record<string, Message[]>>({
    "1": [
      {
        id: "1",
        senderId: "1",
        text: "Hello Robert, how are you feeling today?",
        timestamp: new Date(new Date().setHours(new Date().getHours() - 3)),
      },
      {
        id: "2",
        senderId: "current-user",
        text: "I'm feeling much better, Dr. Johnson. The new medication seems to be working.",
        timestamp: new Date(new Date().setHours(new Date().getHours() - 3)),
      },
      {
        id: "3",
        senderId: "1",
        text: "That's excellent news! Any side effects?",
        timestamp: new Date(new Date().setHours(new Date().getHours() - 2.5)),
      },
      {
        id: "4",
        senderId: "current-user",
        text: "Just a bit of drowsiness in the morning, but it goes away after breakfast.",
        timestamp: new Date(new Date().setHours(new Date().getHours() - 2.5)),
      },
      {
        id: "5",
        senderId: "1",
        text: "Your blood pressure looks good. Keep taking your medication as prescribed.",
        timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
      },
    ],
    "2": [
      {
        id: "1",
        senderId: "2",
        text: "Hi Robert! I'm available to help you this week.",
        timestamp: new Date(new Date().setHours(new Date().getHours() - 5)),
      },
      {
        id: "2",
        senderId: "current-user",
        text: "That's great! I need some help with grocery shopping.",
        timestamp: new Date(new Date().setHours(new Date().getHours() - 4)),
      },
      {
        id: "3",
        senderId: "2",
        text: "I can definitely help with that. When would be a good time?",
        timestamp: new Date(new Date().setHours(new Date().getHours() - 3)),
      },
      {
        id: "4",
        senderId: "current-user",
        text: "How about Wednesday afternoon?",
        timestamp: new Date(new Date().setHours(new Date().getHours() - 2)),
      },
      {
        id: "5",
        senderId: "2",
        text: "I'll be there at 2 PM to help with grocery shopping.",
        timestamp: new Date(new Date().setMinutes(new Date().getMinutes() - 45)),
      },
    ],
  });

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!activeContact || !newMessage.trim()) return;

    // Reset unread count when sending message
    setContacts(
      contacts.map((contact) =>
        contact.id === activeContact.id ? { ...contact, unread: 0 } : contact
      )
    );

    const message: Message = {
      id: Date.now().toString(),
      senderId: "current-user",
      text: newMessage,
      timestamp: new Date(),
    };

    const updatedConversations = {
      ...conversations,
      [activeContact.id]: [
        ...(conversations[activeContact.id] || []),
        message,
      ],
    };

    setConversations(updatedConversations);
    setNewMessage("");

    // Update last message for the contact
    setContacts(
      contacts.map((contact) =>
        contact.id === activeContact.id
          ? {
              ...contact,
              lastMessage: {
                text: newMessage,
                timestamp: new Date(),
              },
            }
          : contact
      )
    );

    // Simulate reply after 1.5 seconds
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: activeContact.id,
        text: `Thanks for your message. I'll respond to your inquiry about "${newMessage.substring(0, 20)}${newMessage.length > 20 ? '...' : ''}" shortly.`,
        timestamp: new Date(),
      };

      const updatedConversationsWithReply = {
        ...updatedConversations,
        [activeContact.id]: [
          ...updatedConversations[activeContact.id],
          reply,
        ],
      };

      setConversations(updatedConversationsWithReply);

      // Update last message for the contact
      setContacts(
        contacts.map((contact) =>
          contact.id === activeContact.id
            ? {
                ...contact,
                lastMessage: {
                  text: reply.text,
                  timestamp: new Date(),
                },
              }
            : contact
        )
      );
    }, 1500);
  };

  const handleContactClick = (contact: Contact) => {
    setActiveContact(contact);

    // Mark messages as read
    if (contact.unread > 0) {
      setContacts(
        contacts.map((c) =>
          c.id === contact.id ? { ...c, unread: 0 } : c
        )
      );
    }

    // Initialize conversation if it doesn't exist
    if (!conversations[contact.id]) {
      setConversations({
        ...conversations,
        [contact.id]: [],
      });
    }
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) {
      return "just now";
    } else if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      return `${diffDays}d ago`;
    }
  };

  return (
    <MainLayout>
      <div className="pb-4">
        <h1 className="text-2xl font-semibold text-slate-800">Messages</h1>
        <p className="text-slate-500">Chat with your care team and volunteers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
        <Card className="md:col-span-1 flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle>Contacts</CardTitle>
            <CardDescription>Your care providers and volunteers</CardDescription>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search contacts..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {filteredContacts.length > 0 ? (
              <div className="space-y-2">
                {filteredContacts.map((contact) => (
                  <button
                    key={contact.id}
                    className={`w-full text-left p-3 rounded-lg flex items-center gap-3 ${
                      activeContact?.id === contact.id
                        ? "bg-elder-light-purple"
                        : "hover:bg-slate-100"
                    }`}
                    onClick={() => handleContactClick(contact)}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        {contact.image ? (
                          <AvatarImage src={contact.image} />
                        ) : (
                          <AvatarFallback className="bg-elder-light-purple">
                            {contact.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate">
                          {contact.name}
                        </h3>
                        {contact.lastMessage && (
                          <span className="text-xs text-slate-500">
                            {getRelativeTime(contact.lastMessage.timestamp)}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">{contact.role}</p>
                      {contact.lastMessage && (
                        <p className="text-sm truncate text-slate-600">
                          {contact.lastMessage.text}
                        </p>
                      )}
                    </div>
                    {contact.unread > 0 && (
                      <span className="bg-elder-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {contact.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-slate-500">No contacts found.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2 flex flex-col">
          {activeContact ? (
            <>
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    {activeContact.image ? (
                      <AvatarImage src={activeContact.image} />
                    ) : (
                      <AvatarFallback className="bg-elder-light-purple">
                        {activeContact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">
                      {activeContact.name}
                    </CardTitle>
                    <CardDescription className="flex items-center">
                      <span>{activeContact.role}</span>
                      <span
                        className={`w-2 h-2 rounded-full ml-3 mr-1 ${
                          activeContact.online ? "bg-green-500" : "bg-slate-300"
                        }`}
                      ></span>
                      <span className="text-xs">
                        {activeContact.online ? "Online" : "Offline"}
                      </span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {conversations[activeContact.id]?.length > 0 ? (
                  conversations[activeContact.id].map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === "current-user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.senderId === "current-user"
                            ? "bg-elder-purple text-white"
                            : "bg-slate-100"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p
                          className={`text-xs mt-1 text-right ${
                            message.senderId === "current-user"
                              ? "text-elder-light-purple"
                              : "text-slate-500"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <MessageSquare className="h-16 w-16 text-slate-300 mx-auto" />
                    <p className="text-slate-500 mt-4">
                      No messages yet. Start the conversation with{" "}
                      {activeContact.name}!
                    </p>
                  </div>
                )}
              </CardContent>
              <div className="p-4 border-t border-slate-200 flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4 mr-2" /> Send
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <MessageSquare className="h-16 w-16 text-slate-300" />
              <h3 className="text-xl font-medium mt-4">Start Messaging</h3>
              <p className="text-slate-500 text-center mt-2">
                Select a contact to start messaging with your care providers and
                volunteers.
              </p>
            </div>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default Messages;
