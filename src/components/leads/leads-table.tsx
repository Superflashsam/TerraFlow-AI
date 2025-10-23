"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { leadsData } from "@/lib/placeholder-data";
import { getImagePlaceholder } from "@/lib/placeholder-images";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

const getStatusVariant = (stage: string) => {
  switch (stage) {
    case "New":
      return "secondary";
    case "Contacted":
      return "outline";
    case "Qualified":
      return "default";
    case "Negotiation":
      return "default";
    case "Lost":
      return "destructive";
    default:
      return "outline";
  }
};

const getScoreColor = (score: number) => {
  if (score > 90) return "text-green-500";
  if (score > 75) return "text-yellow-500";
  return "text-red-500";
};

export function LeadsTable() {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox />
            </TableHead>
            <TableHead>
              <Button variant="ghost" size="sm">
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" size="sm">
                Score
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" size="sm">
                Stage
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>Last Contacted</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leadsData.map((lead) => (
            <TableRow key={lead.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://picsum.photos/seed/${lead.email}/40/40`} alt={lead.name} data-ai-hint="person portrait" />
                    <AvatarFallback>{lead.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div>{lead.name}</div>
                    <div className="text-xs text-muted-foreground">{lead.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className={`font-bold ${getScoreColor(lead.score)}`}>
                {lead.score}
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(lead.stage)}>{lead.stage}</Badge>
              </TableCell>
              <TableCell>{lead.assigned}</TableCell>
              <TableCell>{lead.source}</TableCell>
              <TableCell className="text-muted-foreground">{lead.lastContacted}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
