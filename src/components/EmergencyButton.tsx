import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";  // Direct import from sonner library

const EmergencyButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmergency = (type: string) => {
    // In a real app, this would send alerts to family members and/or emergency services
    toast.success(`${type} alert sent to emergency contacts`, {
      description: "Help is on the way",
    });
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 p-4 rounded-full bg-elder-red text-white shadow-lg hover:bg-red-600 transition-all z-50 flex items-center justify-center"
        onClick={() => setIsOpen(true)}
      >
        <AlertTriangle className="h-6 w-6" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-elder-red">Emergency Assistance</DialogTitle>
            <DialogDescription className="text-center pt-2">
              What type of emergency assistance do you need?
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button 
              variant="destructive" 
              className="h-20 text-lg font-semibold"
              onClick={() => handleEmergency("Medical")}
            >
              Medical Emergency
            </Button>
            <Button 
              variant="destructive" 
              className="h-20 text-lg font-semibold"
              onClick={() => handleEmergency("Fall")}
            >
              Fall Detection
            </Button>
            <Button 
              variant="destructive"
              className="h-20 text-lg font-semibold"
              onClick={() => handleEmergency("Assistance")}
            >
              Need Immediate Assistance
            </Button>
            <Button 
              variant="outline" 
              className="h-20 text-lg"
              onClick={() => setIsOpen(false)}
            >
              Cancel
              <X className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmergencyButton;
