"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

const agentData = [
  { rank: 1, name: "Priya Sharma", avatar: "avatar-priya", leads: 89, conversion: 12.4, responseTime: 12, deals: 11, revenue: 12000000 },
  { rank: 2, name: "Rajesh Kumar", avatar: "avatar-rajesh", leads: 76, conversion: 10.5, responseTime: 15, deals: 8, revenue: 9500000 },
  { rank: 3, name: "Amit Patel", avatar: "avatar-amit", leads: 68, conversion: 9.8, responseTime: 18, deals: 7, revenue: 8200000 },
  { rank: 4, name: "Kavya Iyer", avatar: "avatar-2", leads: 65, conversion: 9.1, responseTime: 22, deals: 6, revenue: 7500000 },
  { rank: 5, name: "Vikram Singh", avatar: "avatar-3", leads: 62, conversion: 8.5, responseTime: 20, deals: 5, revenue: 6800000 },
  { rank: 6, name: "Sunita Reddy", avatar: "avatar-sunita", leads: 58, conversion: 8.1, responseTime: 25, deals: 5, revenue: 6200000 },
  { rank: 7, name: "Arjun Mehta", avatar: "avatar-1", leads: 55, conversion: 7.9, responseTime: 16, deals: 4, revenue: 5800000 },
  { rank: 8, name: "Deepa Nair", avatar: "avatar-sunita", leads: 52, conversion: 7.5, responseTime: 28, deals: 4, revenue: 5500000 },
  { rank: 9, name: "Rohit Krishnan", avatar: "avatar-3", leads: 48, conversion: 7.1, responseTime: 32, deals: 3, revenue: 4800000 },
  { rank: 10, name: "Anjali Singh", avatar: "avatar-2", leads: 45, conversion: 6.8, responseTime: 30, deals: 3, revenue: 4500000 },
]

const rankMedals: { [key: number]: string } = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
}

export function AgentLeaderboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agent Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"><Button variant="ghost" size="sm"><ArrowUpDown className="h-4 w-4" /></Button></TableHead>
              <TableHead>Agent</TableHead>
              <TableHead className="text-right">Leads</TableHead>
              <TableHead className="text-right">Conversion</TableHead>
              <TableHead className="text-right">Avg. Resp. Time</TableHead>
              <TableHead className="text-right">Deals Closed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agentData.map((agent) => (
              <TableRow key={agent.rank}>
                <TableCell className="font-medium">{rankMedals[agent.rank] || `#${agent.rank}`}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://i.pravatar.cc/40?u=${agent.avatar}`} alt={agent.name} />
                      <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{agent.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{agent.leads}</TableCell>
                <TableCell className="text-right">{agent.conversion}%</TableCell>
                <TableCell className="text-right">{agent.responseTime} min</TableCell>
                <TableCell className="text-right">
                  <div>{agent.deals}</div>
                  <div className="text-xs text-muted-foreground">₹{(agent.revenue / 100000).toFixed(0)}L</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
