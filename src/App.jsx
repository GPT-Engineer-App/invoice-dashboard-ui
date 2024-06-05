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

  const handleCheckboxChange = (id) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, ceoCheck: !row.ceoCheck } : row
      )
    );
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
                    {status}
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
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Kontierungstempel</DialogTitle>
                        <DialogDescription>
                          Please fill out the following fields:
                        </DialogDescription>
                      </DialogHeader>
                      <form className="space-y-4">
                        <div>
                          <label htmlFor="datum">Datum:</label>
                          <Input id="datum" type="text" />
                        </div>
                        <div>
                          <label htmlFor="konto">Konto:</label>
                          <Input id="konto" type="text" />
                        </div>
                        <div>
                          <label htmlFor="konstellee">Konstellee:</label>
                          <Input id="konstellee" type="text" />
                        </div>
                        <div>
                          <label htmlFor="ep-vp">EP/VP:</label>
                          <Input id="ep-vp" type="text" />
                        </div>
                        <div>
                          <label htmlFor="vb">VB:</label>
                          <Input id="vb" type="text" />
                        </div>
                        <div>
                          <label htmlFor="belegtext">Belegtext:</label>
                          <Input id="belegtext" type="text" />
                        </div>
                        <div>
                          <label htmlFor="kommentar">Kommentar:</label>
                          <Input id="kommentar" type="text" />
                        </div>
                        <div>
                          <label htmlFor="faellig-am">fällig am:</label>
                          <Input id="faellig-am" type="text" />
                        </div>
                        <div>
                          <label htmlFor="gebucht-am">gebucht am:</label>
                          <Input id="gebucht-am" type="text" />
                        </div>
                        <div>
                          <label htmlFor="ticket-number">Ticket Number:</label>
                          <Input id="ticket-number" type="text" />
                        </div>
                      </form>
                      <DialogFooter>
                        <Button type="submit">Save</Button>
                        <DialogClose asChild>
                          <Button variant="ghost">Cancel</Button>
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