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
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/datepicker";
import { Select, SelectTrigger, SelectContent, SelectOption } from "@/components/ui/select";

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
    eingegangen_am: "",
    konto: "",
    ev_vp: "",
    belegtext: "",
    kommentar: "",
    faellig_am: "",
    gebucht: "",
    skonto: false,
    kostenstelle: "",
    VB: "",
    wer_geprueft: "",
    wer_bezahlt: "",
    Ticket_Number: "",
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
      [name]: type === "checkbox" ? checked : value,
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
                      <div className="grid grid-cols-2 grid-rows-6 gap-4">
                        <div>
                          <Label htmlFor="eingegangen_am">eingegangen am:</Label>
                          <DatePicker
                            id="eingegangen_am"
                            name="eingegangen_am"
                            value={formData.eingegangen_am}
                            onChange={(date) => handleInputChange({ target: { name: "eingegangen_am", value: date } })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="konto">konto:</Label>
                          <Input
                            id="konto"
                            name="konto"
                            value={formData.konto}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="ev_vp">ev/vp:</Label>
                          <Input
                            id="ev_vp"
                            name="ev_vp"
                            value={formData.ev_vp}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="belegtext">belegtext:</Label>
                          <Input
                            id="belegtext"
                            name="belegtext"
                            value={formData.belegtext}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="kommentar">kommentar:</Label>
                          <Textarea
                            id="kommentar"
                            name="kommentar"
                            value={formData.kommentar}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="faellig_am">fällig am:</Label>
                          <DatePicker
                            id="faellig_am"
                            name="faellig_am"
                            value={formData.faellig_am}
                            onChange={(date) => handleInputChange({ target: { name: "faellig_am", value: date } })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="gebucht">gebucht:</Label>
                          <DatePicker
                            id="gebucht"
                            name="gebucht"
                            value={formData.gebucht}
                            onChange={(date) => handleInputChange({ target: { name: "gebucht", value: date } })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="skonto">skonto:</Label>
                          <Checkbox
                            id="skonto"
                            name="skonto"
                            checked={formData.skonto}
                            onCheckedChange={handleInputChange}
                          />
                          {formData.skonto && (
                            <Input
                              id="skonto_percent"
                              name="skonto_percent"
                              type="number"
                              placeholder="Percent"
                              onChange={handleInputChange}
                            />
                          )}
                        </div>
                        <div>
                          <Label htmlFor="kostenstelle">kostenstelle:</Label>
                          <Select
                            id="kostenstelle"
                            name="kostenstelle"
                            value={formData.kostenstelle}
                            onChange={(value) => handleInputChange({ target: { name: "kostenstelle", value } })}
                          >
                            <SelectTrigger>Choose...</SelectTrigger>
                            <SelectContent>
                              <SelectOption value="option1">Option 1</SelectOption>
                              <SelectOption value="option2">Option 2</SelectOption>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="VB">VB:</Label>
                          <Select
                            id="VB"
                            name="VB"
                            value={formData.VB}
                            onChange={(value) => handleInputChange({ target: { name: "VB", value } })}
                          >
                            <SelectTrigger>Choose...</SelectTrigger>
                            <SelectContent>
                              <SelectOption value="option1">Option 1</SelectOption>
                              <SelectOption value="option2">Option 2</SelectOption>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="wer_geprueft">wer geprüft:</Label>
                          <Select
                            id="wer_geprueft"
                            name="wer_geprueft"
                            value={formData.wer_geprueft}
                            onChange={(value) => handleInputChange({ target: { name: "wer_geprueft", value } })}
                          >
                            <SelectTrigger>Choose...</SelectTrigger>
                            <SelectContent>
                              <SelectOption value="option1">Option 1</SelectOption>
                              <SelectOption value="option2">Option 2</SelectOption>
                              <SelectOption value="create_new">Create new</SelectOption>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="wer_bezahlt">wer bezahlt:</Label>
                          <Select
                            id="wer_bezahlt"
                            name="wer_bezahlt"
                            value={formData.wer_bezahlt}
                            onChange={(value) => handleInputChange({ target: { name: "wer_bezahlt", value } })}
                          >
                            <SelectTrigger>Choose...</SelectTrigger>
                            <SelectContent>
                              <SelectOption value="option1">Option 1</SelectOption>
                              <SelectOption value="option2">Option 2</SelectOption>
                              <SelectOption value="create_new">Create new</SelectOption>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="Ticket_Number">Ticket Number:</Label>
                          <Input
                            id="Ticket_Number"
                            name="Ticket_Number"
                            type="number"
                            value={formData.Ticket_Number}
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