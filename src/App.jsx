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
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

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
    datum: "",
    konto: "",
    konstellee: "",
    epvp: "",
    vb: "",
    belegtext: "",
    kommentar: "",
    faelligAm: "",
    gebuchtAm: "",
    ticketNumber: "",
    eingegangen_am: "",
    skonto: false,
    kostenstelle: "",
    wer_geprüft: "",
    wer_bezahlt: ""
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
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
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
                      <div className="grid grid-cols-2 grid-rows-7 gap-4">
                        <div>
                          <Label htmlFor="eingegangen_am">Eingegangen am:</Label>
                          <DatePicker
                            id="eingegangen_am"
                            name="eingegangen_am"
                            selected={formData.eingegangen_am}
                            onSelect={(date) => handleInputChange({ target: { name: "eingegangen_am", value: date } })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="konto">Konto:</Label>
                          <Input
                            id="konto"
                            name="konto"
                            value={formData.konto}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="epvp">EP/VP:</Label>
                          <Input
                            id="epvp"
                            name="epvp"
                            value={formData.epvp}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="belegtext">Belegtext:</Label>
                          <Input
                            id="belegtext"
                            name="belegtext"
                            value={formData.belegtext}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="kommentar">Kommentar:</Label>
                          <Textarea
                            id="kommentar"
                            name="kommentar"
                            value={formData.kommentar}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="faelligAm">Fällig am:</Label>
                          <DatePicker
                            id="faelligAm"
                            name="faelligAm"
                            selected={formData.faelligAm}
                            onSelect={(date) => handleInputChange({ target: { name: "faelligAm", value: date } })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="gebuchtAm">Gebucht am:</Label>
                          <DatePicker
                            id="gebuchtAm"
                            name="gebuchtAm"
                            selected={formData.gebuchtAm}
                            onSelect={(date) => handleInputChange({ target: { name: "gebuchtAm", value: date } })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="skonto">Skonto:</Label>
                          <Switch
                            id="skonto"
                            name="skonto"
                            checked={formData.skonto}
                            onCheckedChange={(checked) => handleInputChange({ target: { name: "skonto", value: checked, type: "checkbox" } })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="kostenstelle">Kostenstelle:</Label>
                          <Select
                            id="kostenstelle"
                            name="kostenstelle"
                            value={formData.kostenstelle}
                            onValueChange={(value) => handleInputChange({ target: { name: "kostenstelle", value } })}
                          >
                            <SelectTrigger>Choose...</SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Option 1</SelectItem>
                              <SelectItem value="2">Option 2</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="vb">VB:</Label>
                          <Select
                            id="vb"
                            name="vb"
                            value={formData.vb}
                            onValueChange={(value) => handleInputChange({ target: { name: "vb", value } })}
                          >
                            <SelectTrigger>Choose...</SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Option 1</SelectItem>
                              <SelectItem value="2">Option 2</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="wer_geprüft">Wer geprüft:</Label>
                          <Select
                            id="wer_geprüft"
                            name="wer_geprüft"
                            value={formData.wer_geprüft}
                            onValueChange={(value) => handleInputChange({ target: { name: "wer_geprüft", value } })}
                          >
                            <SelectTrigger>Choose...</SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Option 1</SelectItem>
                              <SelectItem value="2">Option 2</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="wer_bezahlt">Wer bezahlt:</Label>
                          <Select
                            id="wer_bezahlt"
                            name="wer_bezahlt"
                            value={formData.wer_bezahlt}
                            onValueChange={(value) => handleInputChange({ target: { name: "wer_bezahlt", value } })}
                          >
                            <SelectTrigger>Choose...</SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Option 1</SelectItem>
                              <SelectItem value="2">Option 2</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="ticketNumber">Ticket Number:</Label>
                          <Input
                            id="ticketNumber"
                            name="ticketNumber"
                            type="number"
                            value={formData.ticketNumber}
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