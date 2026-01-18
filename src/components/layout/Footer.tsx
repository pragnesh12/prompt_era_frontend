export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} PromptEra. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
             <span className="text-sm text-muted-foreground">Built with 💗 by PromptEra</span>
        </div>
      </div>
    </footer>
  )
}
