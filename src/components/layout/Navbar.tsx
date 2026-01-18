"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search, Sparkles, User, Plus, ShoppingBag, Heart, LogOut, Settings, BarChart } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  // Simulate authentication state - in real app, use auth context
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCreator, setIsCreator] = useState(false) // Whether user is a creator/seller

  const user = isAuthenticated ? {
    name: "John Doe",
    email: "john@example.com",
    avatar: "",
    username: "johndoe"
  } : null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Logo & Desktop Nav */}
        <div className="mr-4 hidden md:flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2 group">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-black text-xl">
              Prompt<span className="text-gradient">Era</span>
            </span>
          </Link>
          
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/feed"
              className="transition-colors hover:text-primary text-muted-foreground hover:font-semibold"
            >
              Explore
            </Link>
            <Link
              href="/pricing"
              className="transition-colors hover:text-primary text-muted-foreground hover:font-semibold"
            >
              Pricing
            </Link>
            {isAuthenticated && isCreator && (
              <Link
                href="/create"
                className="transition-colors hover:text-primary text-muted-foreground hover:font-semibold"
              >
                Sell Prompts
              </Link>
            )}
          </nav>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 w-72">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <Link href="/" className="flex items-center space-x-2 mb-8">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-black text-xl">
                Prompt<span className="text-gradient">Era</span>
              </span>
            </Link>
            
            <nav className="flex flex-col gap-4">
              <Link href="/feed" className="text-lg font-medium py-2 hover:text-primary transition-colors">
                Explore Prompts
</Link>
              <Link href="/pricing" className="text-lg font-medium py-2 hover:text-primary transition-colors">
                Pricing
              </Link>
              
              {isAuthenticated ? (
                <>
                  {isCreator && (
                    <Link href="/create" className="text-lg font-medium py-2 hover:text-primary transition-colors">
                      Sell Prompts
                    </Link>
                  )}
                  <Link href={`/profile/@${user?.username}`} className="text-lg font-medium py-2 hover:text-primary transition-colors">
                    My Profile
                  </Link>
                  <Link href="/library" className="text-lg font-medium py-2 hover:text-primary transition-colors">
                    My Library
                  </Link>
                  <Link href="/settings" className="text-lg font-medium py-2 hover:text-primary transition-colors">
                    Settings
                  </Link>
                  <Button variant="outline" className="mt-4 w-full justify-start" onClick={() => setIsAuthenticated(false)}>
                    <LogOut className="mr-2 h-4 w-4" /> Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" className="w-full justify-start">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full justify-start">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Right Side: Search & Actions */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Search (Desktop Only) */}
          <div className="hidden lg:block w-full max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search prompts..."
                className="pl-10 h-10 bg-background/50"
              />
            </div>
          </div>

          {/* Auth State */}
          <nav className="flex items-center space-x-2">
            {isAuthenticated ? (
              <>
                {/* Create Button (for creators) */}
                {isCreator && (
                  <Link href="/create" className="hidden sm:inline-flex">
                    <Button size="sm" variant="default">
                      <Plus className="h-4 w-4 mr-1" />
                      Create
                    </Button>
                  </Link>
                )}

                {/* Library/Favorites */}
                <Button variant="ghost" size="icon" className="hidden sm:inline-flex" asChild>
                  <Link href="/library">
                    <Heart className="h-5 w-5" />
                  </Link>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          @{user?.username}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/profile/@${user?.username}`} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/library" className="cursor-pointer">
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        <span>My Library</span>
                      </Link>
                    </DropdownMenuItem>
                    {isCreator && (
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="cursor-pointer">
                          <BarChart className="mr-2 h-4 w-4" />
                          <span>Analytics</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className="cursor-pointer text-red-600"
                      onClick={() => setIsAuthenticated(false)}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden sm:inline-flex">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}

            {/* Theme Toggle */}
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
