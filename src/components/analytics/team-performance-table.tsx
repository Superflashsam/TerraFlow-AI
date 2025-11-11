"use client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { teamMembers } from "@/lib/placeholder-data";
import { getImagePlaceholder } from "@/lib/placeholder-images";

const performanceData = teamMembers.map(member => ({
  ...member,
  completed: Math.floor(Math.random() * 50) + 10,
  overdue: Math.floor(Math.random() * 10),
  completionRate: Math.floor(Math.random() * 31) + 70, // 70-100%
}));

export function TeamPerformanceTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Performance</CardTitle>
        <CardDescription>Productivity metrics by team member.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Completed</TableHead>
              <TableHead>Overdue</TableHead>
              <TableHead>Completion Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {performanceData.map((member) => {
              const avatar = getImagePlaceholder(member.avatarId);
              return (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={avatar?.imageUrl} alt={member.name} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{member.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{member.completed}</TableCell>
                  <TableCell className={member.overdue > 5 ? "text-destructive" : ""}>
                    {member.overdue}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{member.completionRate}%</span>
                      <Progress value={member.completionRate} className="w-20" />
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
