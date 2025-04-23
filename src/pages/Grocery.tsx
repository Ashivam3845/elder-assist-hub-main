
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
import { Label } from "@/components/ui/label";
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
import { ShoppingCart, Pill, Search, Plus, Check, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
  category: string;
}

interface MedicineItem {
  id: string;
  name: string;
  manufacturer: string;
  price: string;
  description: string;
  imageUrl: string;
}

const Grocery = () => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([
    { id: "1", name: "Milk", quantity: "1 gallon", checked: false, category: "Dairy" },
    { id: "2", name: "Eggs", quantity: "1 dozen", checked: false, category: "Dairy" },
    { id: "3", name: "Bread", quantity: "1 loaf", checked: true, category: "Bakery" },
    { id: "4", name: "Apples", quantity: "5", checked: false, category: "Produce" },
    { id: "5", name: "Chicken Breast", quantity: "2 lbs", checked: false, category: "Meat" },
  ]);

  const medicines = [
    {
      id: "1",
      name: "Vitamin D3",
      manufacturer: "Nature's Way",
      price: "$12.99",
      description: "Supports bone health and immune function",
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "2",
      name: "Magnesium Citrate",
      manufacturer: "NOW Foods",
      price: "$9.99",
      description: "Supports muscle and nerve function",
      imageUrl: "https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "3",
      name: "Omega-3 Fish Oil",
      manufacturer: "Nordic Naturals",
      price: "$24.99",
      description: "Supports heart and brain health",
      imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
    {
      id: "4",
      name: "Probiotics",
      manufacturer: "Garden of Life",
      price: "$29.99",
      description: "Supports digestive and immune health",
      imageUrl: "https://images.unsplash.com/photo-1584015611881-f6074a5ee4af?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    },
  ];

  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    category: "Other",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleAddItem = () => {
    if (!newItem.name || !newItem.quantity) {
      toast.error("Please fill all required fields");
      return;
    }

    const item: GroceryItem = {
      id: Date.now().toString(),
      name: newItem.name,
      quantity: newItem.quantity,
      checked: false,
      category: newItem.category,
    };

    setGroceryItems([...groceryItems, item]);
    setNewItem({
      name: "",
      quantity: "",
      category: "Other",
    });
    setIsAddItemOpen(false);
    toast.success("Item added to grocery list");
  };

  const handleToggleItem = (itemId: string) => {
    setGroceryItems(
      groceryItems.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleOrderMedicine = (medicine: MedicineItem) => {
    toast.success(`Added ${medicine.name} to cart`, {
      description: "You can checkout from your grocery list",
    });

    // Add to grocery list
    const newMedItem: GroceryItem = {
      id: Date.now().toString(),
      name: medicine.name,
      quantity: "1",
      checked: false,
      category: "Medicine",
    };

    setGroceryItems([...groceryItems, newMedItem]);
  };

  const categorizedItems: Record<string, GroceryItem[]> = {};
  groceryItems.forEach((item) => {
    if (!categorizedItems[item.category]) {
      categorizedItems[item.category] = [];
    }
    categorizedItems[item.category].push(item);
  });

  const filteredMedicines = medicines.filter((med) =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    med.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const placeOrder = () => {
    toast.success("Grocery order placed successfully", {
      description: "Your order will be delivered soon",
    });
    setGroceryItems(groceryItems.map(item => ({ ...item, checked: false })));
  };

  return (
    <MainLayout>
      <div className="pb-4">
        <h1 className="text-2xl font-semibold text-slate-800">Grocery & Medicine</h1>
        <p className="text-slate-500">Manage your grocery list and order medicines</p>
      </div>

      <Tabs defaultValue="grocery" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grocery" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span>Grocery List</span>
          </TabsTrigger>
          <TabsTrigger value="medicine" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            <span>Medicine Marketplace</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grocery" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-medium">Your Grocery List</h2>
            <Button onClick={() => setIsAddItemOpen(true)}>
              <Plus className="h-4 w-4 mr-1" /> Add Item
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Shopping List</CardTitle>
              <CardDescription>
                {groceryItems.length} items in your list (
                {groceryItems.filter((item) => item.checked).length} checked)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {Object.keys(categorizedItems).length > 0 ? (
                <div className="space-y-6">
                  {Object.entries(categorizedItems).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="font-medium mb-2">{category}</h3>
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-6 h-6 rounded border ${
                                  item.checked
                                    ? "bg-elder-purple border-elder-purple"
                                    : "border-slate-300"
                                } flex items-center justify-center cursor-pointer`}
                                onClick={() => handleToggleItem(item.id)}
                              >
                                {item.checked && (
                                  <Check className="h-4 w-4 text-white" />
                                )}
                              </div>
                              <div>
                                <p
                                  className={`font-medium ${
                                    item.checked ? "line-through text-slate-500" : ""
                                  }`}
                                >
                                  {item.name}
                                </p>
                                <p className="text-sm text-slate-500">{item.quantity}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-slate-500">Your grocery list is empty.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setIsAddItemOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Item
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                disabled={groceryItems.length === 0}
                onClick={placeOrder}
              >
                Place Order
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="medicine" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search for medicines..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMedicines.map((medicine) => (
              <Card key={medicine.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{medicine.name}</CardTitle>
                  <CardDescription>{medicine.manufacturer}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full overflow-hidden rounded-md mb-3">
                    <img
                      src={medicine.imageUrl}
                      alt={medicine.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="text-slate-600 text-sm">{medicine.description}</p>
                  <p className="text-elder-purple font-bold mt-2">{medicine.price}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" /> Details
                  </Button>
                  <Button size="sm" onClick={() => handleOrderMedicine(medicine)}>
                    <ShoppingCart className="h-4 w-4 mr-1" /> Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {filteredMedicines.length === 0 && (
              <div className="col-span-full text-center py-10">
                <p className="text-slate-500">No medicines found. Try a different search term.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Grocery Item</DialogTitle>
            <DialogDescription>
              Add a new item to your grocery shopping list.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Item Name
              </Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                className="col-span-3"
                placeholder="Enter item name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                value={newItem.quantity}
                onChange={(e) =>
                  setNewItem({ ...newItem, quantity: e.target.value })
                }
                className="col-span-3"
                placeholder="e.g. 2 lbs, 1 dozen, etc."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <select
                id="category"
                value={newItem.category}
                onChange={(e) =>
                  setNewItem({ ...newItem, category: e.target.value })
                }
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Produce">Produce</option>
                <option value="Dairy">Dairy</option>
                <option value="Meat">Meat</option>
                <option value="Bakery">Bakery</option>
                <option value="Pantry">Pantry</option>
                <option value="Frozen">Frozen</option>
                <option value="Medicine">Medicine</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddItemOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddItem}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Grocery;
