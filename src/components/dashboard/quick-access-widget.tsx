
"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  Plus,
  Eye,
  Users,
  Search,
  Calendar,
  AlertTriangle,
  AlertCircle,
  Info,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import { AddTaskModal } from "@/components/tasks/add-task-modal";

export const QuickAccessWidget = () => {
  const [activeTab, setActiveTab] = useState("tasks");
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  const todaysTasks = [
    {
      id: 1,
      title: "Follow up with Michael Rodriguez",
      description: "High priority lead - interested in downtown properties",
      dueTime: "10:00 AM",
      priority: "high" as const,
      completed: false,
    },
    {
      id: 2,
      title: "Property viewing - Oceanview Villa",
      description: "Client: Sarah Chen - 2:00 PM appointment",
      dueTime: "2:00 PM",
      priority: "medium" as const,
      completed: false,
    },
    {
      id: 3,
      title: "Contract review - Downtown Condo",
      description: "Final review before client signature",
      dueTime: "4:30 PM",
      priority: "high" as const,
      completed: true,
    },
    {
      id: 4,
      title: "Market analysis report",
      description: "Prepare Q4 market trends for team meeting",
      dueTime: "5:00 PM",
      priority: "low" as const,
      completed: false,
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      title: "Property Viewing",
      client: "Sarah Chen",
      property: "Oceanview Villa",
      time: "2:00 PM",
      date: "Today",
      type: "viewing" as const,
    },
    {
      id: 2,
      title: "Client Meeting",
      client: "David Wilson",
      property: "Investment Portfolio Review",
      time: "10:00 AM",
      date: "Tomorrow",
      type: "meeting" as const,
    },
    {
      id: 3,
      title: "Property Inspection",
      client: "Lisa Martinez",
      property: "Modern Townhouse",
      time: "3:30 PM",
      date: "Tomorrow",
      type: "inspection" as const,
    },
  ];

  const priorityNotifications = [
    {
      id: 1,
      title: "New high-value lead",
      message: "Lead score: 95/100 - Immediate attention required",
      type: "urgent" as const,
      timestamp: "5 min ago",
    },
    {
      id: 2,
      title: "Price drop alert",
      message: "Competitor reduced price on similar property by 5%",
      type: "warning" as const,
      timestamp: "1 hour ago",
    },
    {
      id: 3,
      title: "Contract expiring soon",
      message: "Downtown Condo listing expires in 3 days",
      type: "info" as const,
      timestamp: "2 hours ago",
    },
  ];

  const [tasks, setTasks] = useState(todaysTasks);

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const handleAddTask = (newTask: any) => {
    const taskToAdd = {
        ...newTask,
        id: tasks.length + 1,
        completed: false,
        dueTime: new Date(newTask.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setTasks(prev => [taskToAdd, ...prev]);
  };

  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    const colorMap = {
      high: "text-destructive",
      medium: "text-yellow-500",
      low: "text-muted-foreground",
    };
    return colorMap[priority] || "text-muted-foreground";
  };

  const getNotificationIcon = (type: "urgent" | "warning" | "info") => {
    const iconMap: { [key: string]: LucideIcon } = {
      urgent: AlertTriangle,
      warning: AlertCircle,
      info: Info,
    };
    return iconMap[type] || Bell;
  };

  const getNotificationColor = (type: "urgent" | "warning" | "info") => {
    const colorMap = {
      urgent: "text-destructive",
      warning: "text-yellow-500",
      info: "text-primary",
    };
    return colorMap[type] || "text-muted-foreground";
  };

  const tabs = [
    {
      id: "tasks",
      label: "Tasks",
      count: tasks.filter((t) => !t.completed).length,
    },
    { id: "appointments", label: "Appointments", count: upcomingAppointments.length },
    { id: "notifications", label: "Alerts", count: priorityNotifications.length },
  ];

  return (
    <>
    <div className="bg-card border border-border rounded-lg shadow-sm h-full flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Quick Access
        </h2>

        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span
                  className={`px-1.5 py-0.5 text-xs rounded-full ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted-foreground/20 text-muted-foreground"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto flex-1">
        {activeTab === "tasks" && (
          <div className="p-4 space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-start space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                  task.completed
                    ? "bg-muted/50 border-muted opacity-60"
                    : "bg-background border-border hover:border-primary/50"
                }`}
              >
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`w-5 h-5 rounded-sm border-2 flex items-center justify-center mt-0.5 transition-colors duration-200 ${
                    task.completed
                      ? "bg-green-500 border-green-500"
                      : "border-muted-foreground hover:border-primary"
                  }`}
                >
                  {task.completed && (
                    <Check size={12} className="text-white" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3
                      className={`text-sm font-medium ${
                        task.completed
                          ? "line-through text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {task.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-xs font-bold ${getPriorityColor(task.priority)}`}
                      >
                        {task.priority.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {task.dueTime}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {task.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "appointments" && (
          <div className="p-4 space-y-3">
            {upcomingAppointments.map((appointment) => {
              const Icon =
                appointment.type === "viewing"
                  ? Eye
                  : appointment.type === "meeting"
                  ? Users
                  : Search;
              return (
                <div
                  key={appointment.id}
                  className="flex items-center space-x-3 p-3 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors duration-200"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon size={16} className="text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium text-foreground">
                        {appointment.title}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {appointment.date}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {appointment.client} • {appointment.property}
                    </p>
                    <p className="text-xs font-medium text-primary">
                      {appointment.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="p-4 space-y-3">
            {priorityNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  className="flex items-start space-x-3 p-3 bg-background border border-border rounded-lg hover:border-primary/50 transition-colors duration-200"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      notification.type === "urgent"
                        ? "bg-destructive/10"
                        : notification.type === "warning"
                        ? "bg-yellow-500/10"
                        : "bg-primary/10"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={getNotificationColor(notification.type)}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium text-foreground">
                        {notification.title}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {notification.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="p-4 border-t border-border mt-auto">
        {activeTab === 'tasks' && (
            <Button variant="ghost" size="sm" className="w-full" onClick={() => setIsAddTaskModalOpen(true)}>
              <Plus size={16} className="mr-2" />
              Add New Task
            </Button>
        )}
        {activeTab === 'appointments' && (
            <Link href="/tasks" className="w-full">
                <Button variant="ghost" size="sm" className="w-full">
                <Calendar size={16} className="mr-2" />
                View Calendar
                </Button>
            </Link>
        )}
        {activeTab === 'notifications' && (
            <Button variant="ghost" size="sm" className="w-full">
              <Bell size={16} className="mr-2" />
              View All Notifications
            </Button>
        )}
      </div>
    </div>
    <AddTaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onAddTask={handleAddTask}
    />
    </>
  );
};
