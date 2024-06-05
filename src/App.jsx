import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckboxChange = (id) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, ceoCheck: !row.ceoCheck } : row
      )
    );
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
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
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(true)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Kontierungstempel</DialogTitle>
                      <DialogDescription>
                        Please fill out the following fields:
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="datum">Datum:</Label>
                        <Input id="datum" />
                      </div>
                      <div>
                        <Label htmlFor="konto">Konto:</Label>
                        <Input id="konto" />
                      </div>
                      <div>
                        <Label htmlFor="konstelle">Konstelle:</Label>
                        <Input id="konstelle" />
                      </div>
                      <div>
                        <Label htmlFor="ep-vp">EP/VP:</Label>
                        <Input id="ep-vp" />
                      </div>
                      <div>
                        <Label htmlFor="vb">VB:</Label>
                        <Input id="vb" />
                      </div>
                      <div>
                        <Label htmlFor="belegtext">Belegtext:</Label>
                        <Input id="belegtext" />
                      </div>
                      <div>
                        <Label htmlFor="kommentar">Kommentar:</Label>
                        <Input id="kommentar" />
                      </div>
                      <div>
                        <Label htmlFor="fallig-am">fällig am:</Label>
                        <Input id="fallig-am" />
                      </div>
                      <div>
                        <Label htmlFor="gebucht-am">gebucht am:</Label>
                        <Input id="gebucht-am" />
                      </div>
                      <div>
                        <Label htmlFor="ticket-number">Ticket Number:</Label>
                        <Input id="ticket-number" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="default" onClick={handleCloseModal}>Save</Button>
                      <DialogClose asChild>
                        <Button variant="ghost">Cancel</Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(true)}>
                  <Eye className="h-4 w-4" />
                </Button>
                {row.status.includes("Action Required") && (
                  <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(true)}>
                    <AlertCircle className="h-4 w-4" />
                  </Button>
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