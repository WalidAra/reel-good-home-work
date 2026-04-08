import React from "react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import { LucideArrowRight } from "lucide-react"

interface SectionProps {
  children: React.ReactNode
  title: string
  description?: string
  viewAllLink?: string
  viewAllText?: string
}

const Section = ({
  children,
  title,
  description,
  viewAllLink,
  viewAllText = "View All",
}: SectionProps) => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        {viewAllLink && (
          <Link to={viewAllLink}>
            <Button variant="outline" className="rounded-full" size="lg">
              {viewAllText}
              <LucideArrowRight />
            </Button>
          </Link>
        )}
      </div>
      <div>{children}</div>
    </section>
  )
}

export default Section
