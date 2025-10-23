import { PageHeader } from "@/components/shared/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Settings"
        description="Manage your account, organization, and application settings."
      />
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="organization">Organization</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="users">Users &amp; Roles</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your personal information and preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Form to edit user profile will be here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="organization">
          <Card>
            <CardHeader>
              <CardTitle>Organization Settings</CardTitle>
              <CardDescription>Manage your company's branding and details.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Form to edit organization settings will be here.</p>
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>Connect Terraflow AI with your favorite tools.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">List of available integrations (WhatsApp, Gmail, etc.) will be here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Users &amp; Roles</CardTitle>
              <CardDescription>Manage who has access to your workspace.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Table of users with roles and permissions will be here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>Manage your subscription and view invoices.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Billing details and invoice history will be here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
