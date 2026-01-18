import Link from "next/link"
import { Copy, Eye } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface PromptCardProps {
  id: string
  title: string
  description: string
  tags: string[]
  creator: {
    name: string
    avatar?: string
  }
  price: "Free" | "Paid"
  priceAmount?: string
}

export function PromptCard({
  id,
  title,
  description,
  tags,
  creator,
  price,
  priceAmount,
}: PromptCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:shadow-primary/10 border-muted group h-full relative">
       {/* Gradient Border on Hover */}
       <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/20 pointer-events-none transition-colors duration-300" />
       
      <CardHeader className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/prompt/${id}`} className="hover:underline flex-1">
             <CardTitle className="text-lg font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
               {title}
             </CardTitle>
          </Link>
          <Badge 
            variant={price === "Free" ? "secondary" : "default"}
            className={price !== "Free" ? "bg-gradient-to-r from-blue-600 to-violet-600 border-none" : ""}
          >
            {price === "Free" ? "Free" : priceAmount || "Paid"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-2 flex-1 relative z-10">
        <p className="line-clamp-3 text-sm text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs font-normal bg-muted/50">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4 bg-muted/10 relative z-10">
        <div className="flex items-center space-x-2 text-sm font-medium">
          <Avatar className="h-6 w-6 ring-2 ring-background">
            <AvatarImage src={creator.avatar} alt={creator.name} />
            <AvatarFallback>{creator.name[0]}</AvatarFallback>
          </Avatar>
          <span className="line-clamp-1 max-w-[100px] hover:text-primary transition-colors cursor-pointer">{creator.name}</span>
        </div>
        <div className="flex gap-2">
             <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary hover:bg-primary/10" asChild>
                <Link href={`/prompt/${id}`}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                </Link>
             </Button>
             <Button size="sm" className="h-8 text-xs font-semibold shadow-sm">
                {price === "Free" ? "Get" : "Buy"}
             </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
