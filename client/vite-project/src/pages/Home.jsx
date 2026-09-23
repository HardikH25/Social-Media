import { Link } from 'react-router-dom'
import React from 'react'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background texture-noise p-6 md:p-12 pb-24">
      <div className="max-w-6xl mx-auto border-t-[8px] border-foreground pt-12">

        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
          <div>
            <h1 className="text-4xl md:text-6xl font-playfair tracking-tight text-foreground mb-4">
              Welcome, {user.name}.
            </h1>
            <p className="text-sm font-mono text-mutedForeground tracking-widest uppercase">
              Your Feed / Recent
            </p>
          </div>
          <Link
            to={`/profile/${user.username}`}
            className="group inline-flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-foreground hover:text-mutedForeground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground"
          >
            <span>View Profile</span>
            <span className="w-8 h-[2px] bg-foreground group-hover:w-12 transition-all duration-100"></span>
          </Link>
        </div>

        {/* Feed List */}
        <div className="space-y-0">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div key={item} className="border-t-[4px] border-foreground pt-8 pb-16 group">
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Metadata */}
                <div className="w-full lg:w-48 shrink-0">
                  <p className="text-xs font-mono text-mutedForeground tracking-widest uppercase mb-2">
                    Post {index + 1}
                  </p>
                  <p className="text-xs font-mono text-foreground tracking-widest uppercase">
                    Sep {19 - index}, 2026
                  </p>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="aspect-[21/9] bg-muted mb-8 border border-border texture-grid transition-all duration-100 group-hover:border-[4px] flex items-center justify-center">
                    <span className="font-mono text-xs uppercase tracking-widest text-mutedForeground">Attachment {item}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-playfair text-foreground mb-6 leading-tight">
                    Update #{item}
                  </h2>
                  <p className="text-lg font-source text-mutedForeground max-w-2xl leading-relaxed">
                    Just a quick update shared with the network. Keeping things simple.
                  </p>

                  <button className="mt-8 text-xs font-mono uppercase tracking-widest text-foreground hover:underline underline-offset-4 decoration-1 transition-none focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-foreground">
                    View Post →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
