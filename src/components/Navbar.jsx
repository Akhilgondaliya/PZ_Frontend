import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FiShield, FiMenu, FiX } from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }
    return () => {
      document.body.classList.remove('mobile-menu-open')
    }
  }, [isOpen])

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Scan', path: '/scan' },
    { name: 'Vulnerability Quiz', path: '/quiz' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <>
      {/* ── Glass-touch Navbar ── */}
      <header
        id="main-navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 50,
          transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',

          /* Fully transparent glass panel */
          background: scrolled
            ? 'rgba(255, 255, 255, 0.08)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(5px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(5px)' : 'none',

          /* Glass-touch: bright top edge highlight + whisper shadow */
          boxShadow: scrolled
            ? 'inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.04), 0 6px 24px rgba(0,0,0,0.07)'
            : 'none',

          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.25)' : '1px solid transparent',
        }}
        className=""
      >

        {/* Dark-mode glass overrides via a pseudo wrapper */}
        <style>{`
          .dark #main-navbar {
            background: rgba(0, 0, 0, 0.06) !important;
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,0.08),
              inset 0 -1px 0 rgba(0,0,0,0.15),
              0 6px 24px rgba(0,0,0,0.20) !important;
            border-bottom: 1px solid rgba(255,255,255,0.05) !important;
          }
          .dark #main-navbar.scrolled-off {
            background: transparent !important;
            box-shadow: none !important;
            border-bottom: 1px solid transparent !important;
          }

          /* ── Neumorphic "Get Now" pill CTA ── */
          .neu-cta {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 9px 22px;
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 800;
            letter-spacing: 0.07em;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.22s ease;
            user-select: none;

            background: linear-gradient(145deg, #dde3ea, #f2f5f8);
            color: #1e293b;
            box-shadow:
              inset 2px 2px 5px rgba(255,255,255,0.90),
              inset -3px -3px 7px rgba(0,0,0,0.13),
              0 4px 12px rgba(0,0,0,0.09);
            border: 1px solid rgba(255,255,255,0.75);
          }
          .neu-cta:hover {
            box-shadow:
              inset 3px 3px 7px rgba(255,255,255,0.85),
              inset -4px -4px 9px rgba(0,0,0,0.16),
              0 6px 18px rgba(0,0,0,0.13);
            transform: translateY(-1px);
          }
          .neu-cta:active {
            box-shadow:
              inset 4px 4px 10px rgba(0,0,0,0.18),
              inset -2px -2px 6px rgba(255,255,255,0.70);
            transform: translateY(0px);
          }

          /* Dark mode CTA */
          .dark .neu-cta {
            background: linear-gradient(145deg, #0d1f33, #162840);
            color: #e0f2fe;
            box-shadow:
              inset 2px 2px 5px rgba(255,255,255,0.05),
              inset -3px -3px 7px rgba(0,0,0,0.40),
              0 4px 14px rgba(0,0,0,0.45);
            border: 1px solid rgba(255,255,255,0.07);
          }
          .dark .neu-cta:hover {
            box-shadow:
              inset 3px 3px 7px rgba(255,255,255,0.06),
              inset -4px -4px 9px rgba(0,0,0,0.50),
              0 6px 20px rgba(0,0,0,0.55);
          }

          /* Nav link underline accent */
          .nav-link-active::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0; right: 0;
            height: 2px;
            border-radius: 9999px;
            background: rgb(var(--color-accent));
          }

          /* Mobile drawer glass */
          .mobile-glass-drawer {
            background: rgba(232, 237, 243, 0.90);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            border-top: 1px solid rgba(255,255,255,0.60);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.80);
          }
          .dark .mobile-glass-drawer {
            background: rgba(8, 18, 30, 0.88);
            border-top: 1px solid rgba(255,255,255,0.06);
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
          }

          /* Mobile neu CTA */
          .neu-cta-mobile {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            padding: 14px 20px;
            border-radius: 50px;
            font-size: 0.875rem;
            font-weight: 800;
            letter-spacing: 0.06em;
            text-decoration: none;
            margin-top: 16px;
            cursor: pointer;
            transition: all 0.22s ease;

            background: linear-gradient(145deg, #dde3ea, #f2f5f8);
            color: #1e293b;
            box-shadow:
              inset 2px 2px 5px rgba(255,255,255,0.90),
              inset -3px -3px 7px rgba(0,0,0,0.13),
              0 4px 12px rgba(0,0,0,0.09);
            border: 1px solid rgba(255,255,255,0.75);
          }
          .dark .neu-cta-mobile {
            background: linear-gradient(145deg, #0d1f33, #162840);
            color: #e0f2fe;
            box-shadow:
              inset 2px 2px 5px rgba(255,255,255,0.05),
              inset -3px -3px 7px rgba(0,0,0,0.40),
              0 4px 14px rgba(0,0,0,0.45);
            border: 1px solid rgba(255,255,255,0.07);
          }
        `}</style>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group focus:outline-none" id="navbar-logo">
              <FiShield className="w-6 h-6 text-accent transition-transform duration-300 group-hover:scale-110" />
              <span className="text-xl font-extrabold tracking-tight text-[#0d1b2a] dark:text-white">
                Phish<span className="text-accent">Zero</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-7">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative py-2 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                      isActive
                        ? 'text-accent font-bold nav-link-active'
                        : 'text-muted hover:text-accent dark:text-muted dark:hover:text-accent'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* ── Neumorphic glass CTA ── */}
              <Link to="/scan" className="neu-cta hidden lg:inline-flex" id="navbar-cta-scan">
                <span>Start Free Scan</span>
                <span style={{ fontFamily: 'sans-serif' }}>→</span>
              </Link>
            </nav>

            {/* Mobile controls */}
            <div className="flex items-center space-x-4 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-muted hover:text-accent dark:text-muted dark:hover:text-accent focus:outline-none cursor-pointer"
                aria-label="Toggle Menu"
                id="navbar-mobile-toggle"
              >
                {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Mobile Glass Drawer ── */}
      {isOpen && (
        <div className="md:hidden mobile-glass-drawer fixed inset-0 top-16 sm:top-20 z-40 transition-all duration-300">
          <nav className="flex flex-col space-y-1 px-6 pt-8 pb-10">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-base font-bold py-3 border-b border-black/5 dark:border-white/5 transition-colors duration-300 ${
                    isActive
                      ? 'text-accent'
                      : 'text-[#1e293b] dark:text-[#b0c8e0] hover:text-accent dark:hover:text-accent'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link to="/scan" className="neu-cta-mobile" id="navbar-mobile-cta-scan">
              <span>Try Now</span>
              <span style={{ fontFamily: 'sans-serif' }}>→</span>
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}

export default Navbar