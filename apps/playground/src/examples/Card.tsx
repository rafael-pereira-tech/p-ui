import { Button, Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from "@pereira-ui/react"

export default function CardExample() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
        <CardAction><Button variant="link">Sign Up</Button></CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Label htmlFor="card-email">Email</Label>
          <Input id="card-email" type="email" placeholder="m@example.com" />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">Login</Button>
        <Button variant="outline" className="w-full">Login with Google</Button>
      </CardFooter>
    </Card>
  )
}
