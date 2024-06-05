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
  });

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
      <div className="flex justify-between mb-4">
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
                <Button variant="ghost" size="icon">
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
                          <Label htmlFor="datum">Datum:</Label>
                          <Input
                            id="datum"
                            name="datum"
                            value={formData.datum}
                            onChange={handleInputChange}
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
                          <Label htmlFor="konstellee">Konstellee:</Label>
                          <Input
                            id="konstellee"
                            name="konstellee"
                            value={formData.konstellee}
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
                          <Label htmlFor="vb">VB:</Label>
                          <Input
                            id="vb"
                            name="vb"
                            value={formData.vb}
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
                          <Input
                            id="kommentar"
                            name="kommentar"
                            value={formData.kommentar}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="faelligAm">fällig am:</Label>
                          <Input
                            id="faelligAm"
                            name="faelligAm"
                            value={formData.faelligAm}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="gebuchtAm">gebucht am:</Label>
                          <Input
                            id="gebuchtAm"
                            name="gebuchtAm"
                            value={formData.gebuchtAm}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="ticketNumber">Ticket Number:</Label>
                          <Input
                            id="ticketNumber"
                            name="ticketNumber"
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
    </div>
  );
}

export default App;