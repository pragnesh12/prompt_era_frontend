import { Check, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md shadow-lg border-muted">
        <CardHeader>
            <CardTitle className="text-2xl text-center">Checkout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <h3 className="font-semibold text-lg">Midjourney Photorealistic Portraits</h3>
                <p className="text-sm text-muted-foreground">by Sarah Jones</p>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
                <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>$4.99</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>Platform Fee</span>
                    <span>$0.50</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Total</span>
                    <span>$5.49</span>
                </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg space-y-2">
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    <span>Secure Payment</span>
                 </div>
                 <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Instant Access</span>
                 </div>
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full h-12 text-lg">Pay $5.49</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
