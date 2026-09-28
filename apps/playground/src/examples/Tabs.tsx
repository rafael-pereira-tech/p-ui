import { Card, CardDescription, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger } from "@p-ui/react"

export default function TabsExample() {
  return (
    <Tabs defaultValue="account" className="max-w-sm">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card><CardHeader><CardTitle>Account</CardTitle><CardDescription>Make changes to your account here. Click save when you&apos;re done.</CardDescription></CardHeader></Card>
      </TabsContent>
      <TabsContent value="password">
        <Card><CardHeader><CardTitle>Password</CardTitle><CardDescription>Change your password here.</CardDescription></CardHeader></Card>
      </TabsContent>
    </Tabs>
  )
}
