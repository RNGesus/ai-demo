import type { PropsWithChildren } from 'react'
import { Link } from '@tanstack/react-router'

export function NotFound({ children }: PropsWithChildren) {
  return (
    <div className="p-2 lg:container mx-auto">
      <div className="text-gray-600 dark:text-gray-400 mb-2">
        {children || <p>The page you are looking for does not exist.</p>}
      </div>
      <p className="flex items-center gap-2 flex-wrap">
        <Link
          to="/"
          className="btn btn-primary btn-outline"
        >
          Start Over
        </Link>
      </p>
    </div>
  )
}
