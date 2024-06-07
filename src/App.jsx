import { useState } from "react";
import { Filter, SortAsc } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";

const initialData = [
  {
    id: 1,
    sender: "John Doe",
    amount: "€250.00",
    status: ["empfangen", "Action Required"],
    ceoCheck: true,
  },
  {
    id: 2,
    sender: "Jane Smith",
    amount: "€150.00",
    status: ["übertragen"],
    ceoCheck: false,
  },
  {
    id: 3,
    sender: "Michael Johnson",
    amount: "€350.00",
    status: ["kontiert"],
    ceoCheck: false,
  },
  {
    id: 4,
    sender: "Sarah Lee",
    amount: "€450.00",
    status: ["übertragen"],
    ceoCheck: false,
  },
  {
    id: 5,
    sender: "David Kim",
    amount: "€550.00",
    status: ["übertragen"],
    ceoCheck: false,
  },
];

function App() {
  const [data, setData] = useState(initialData);
  const [formData, setFormData] = useState({
    Datum: "",
    Konto: "",
    Konstellee: "",
    "EP/VP": "",
    VB: "",
    Belegtext: "",
    Kommentar: "",
    "fällig am": "",
    "gebucht am": "",
    "Ticket Number": "",
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleCheckboxChange = (id) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, ceoCheck: !row.ceoCheck } : row
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="p-4">
      <div className="flex justify-end space-x-2 mb-4">
        <Button variant="outline" className="flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" className="flex items-center">
          <SortAsc className="mr-2 h-4 w-4" />
          Sort
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="table-row">
            <TableHead>ID</TableHead>
            <TableHead>SENDER</TableHead>
            <TableHead>AMOUNT</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>CEO-CHECK</TableHead>
            <TableHead>ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} className="table-row">
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.sender}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>
                {row.status.map((status, index) => (
                  <Badge
                    key={index}
                    variant={
                      status === "empfangen"
                        ? "secondary"
                        : status === "Action Required"
                        ? "destructive"
                        : status === "übertragen"
                        ? "success"
                        : "warning"
                    }
                    className="mr-2"
                  >
                    {status.toUpperCase()}
                  </Badge>
                ))}
              </TableCell>
              <TableCell>
                <Checkbox
                  checked={row.ceoCheck}
                  onCheckedChange={() => handleCheckboxChange(row.id)}
                />
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setIsDrawerOpen(true)}>
                  <Eye className="h-4 w-4" />
                </Button>
                {row.status.includes("Action Required") && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <AlertCircle className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="p-8 w-[80vw]">
                      <DialogHeader>
                        <DialogTitle>Kontierungsstempel</DialogTitle>
                        <DialogDescription>
                          Please fill out the following fields:
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 grid-rows-5 gap-4">
                        <div>
                          <Label htmlFor="Datum">Datum:</Label>
                          <Input
                            id="Datum"
                            name="Datum"
                            value={formData.Datum}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="Konto">Konto:</Label>
                          <Input
                            id="Konto"
                            name="Konto"
                            value={formData.Konto}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="Konstellee">Konstellee:</Label>
                          <Input
                            id="Konstellee"
                            name="Konstellee"
                            value={formData.Konstellee}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="EP/VP">EP/VP:</Label>
                          <Input
                            id="EP/VP"
                            name="EP/VP"
                            value={formData["EP/VP"]}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="VB">VB:</Label>
                          <Input
                            id="VB"
                            name="VB"
                            value={formData.VB}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="Belegtext">Belegtext:</Label>
                          <Input
                            id="Belegtext"
                            name="Belegtext"
                            value={formData.Belegtext}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="Kommentar">Kommentar:</Label>
                          <Input
                            id="Kommentar"
                            name="Kommentar"
                            value={formData.Kommentar}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="fällig am">fällig am:</Label>
                          <Input
                            id="fällig am"
                            name="fällig am"
                            value={formData["fällig am"]}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="gebucht am">gebucht am:</Label>
                          <Input
                            id="gebucht am"
                            name="gebucht am"
                            value={formData["gebucht am"]}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="Ticket Number">Ticket Number:</Label>
                          <Input
                            id="Ticket Number"
                            name="Ticket Number"
                            value={formData["Ticket Number"]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="primary"
                          onClick={() => console.log("Save clicked")}
                        >
                          Save
                        </Button>
                        <DialogClose asChild>
                          <Button variant="secondary">Cancel</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          {/* Content for the drawer goes here */}
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default App;