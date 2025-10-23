"use client";

import Image from "next/image";
import { recentActivities, type RecentActivityType } from "@/lib/placeholder-data";
import { getImagePlaceholder } from "@/lib/placeholder-images";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const getActivityVariant = (action: RecentActivityType['action']) => {
  switch (action) {
    case 'New Lead': return 'default';
    case 'Deal Won': return 'secondary';
    case 'Task Completed': return 'outline';
    case 'Message Sent': return 'default';
    default: return 'outline';
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>A log of the latest activities in your workspace.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Details</TableHead>
              <TableHead className="text-right">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage 
                        src={getImagePlaceholder(activity.user.avatarId)?.imageUrl}
                        alt={activity.user.name} 
                      />
                      <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{activity.user.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getActivityVariant(activity.action)}>{activity.action}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{activity.details}</TableCell>
                <TableCell className="text-right text-muted-foreground">{activity.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
