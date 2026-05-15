import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { RiMenuLine, RiArrowLeftLine } from "react-icons/ri"
import { MdDashboard } from "react-icons/md"
import { FaUser, FaBoxOpen, FaHeart } from "react-icons/fa"
import { IoSettings } from "react-icons/io5"
import { RiLogoutBoxLine } from "react-icons/ri"
import { getUserDetailsAPI } from "../api/userOrdersApi"

const navGroups = [
  {
    label: "General",
    items: [
      { label: "Dashboard",  path: "/account/dashboard", icon: <MdDashboard /> },
      { label: "My Orders",  path: "/account/orders",    icon: <FaBoxOpen /> },
      { label: "Wishlist",   path: "/account/wishlist",  icon: <FaHeart /> },
      { label: "My Profile", path: "/account/profile",   icon: <FaUser /> },
    ],
  },
  {
    label: "Preferences",
    items: [
      { label: "Settings", path: "/account/settings", icon: <IoSettings /> },
    ],
  },
]

const tabs = navGroups.flatMap((g) => g.items)

function UserPanelLayout() {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logoutUser()
    navigate("/login")
  }

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U"

  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await getUserDetailsAPI()
        if (mounted) setProfileData(data)
      } catch (err) {
        // ignore
      }
    })()
    return () => { mounted = false }
  }, [])

  const avatarSrc = profileData?.image_url ?? user?.image_url ?? user?.avatar ?? null
  const displayName = profileData?.user_name ?? user?.user_name ?? user?.name ?? "Customer"

  return (
    <div className="w-full min-h-screen pt-[72px]" style={{ backgroundColor: "var(--color-primary)" }}>

      {/* ── Breadcrumb ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <a href="/" className="hover:text-[--color-accent]">Home</a>
          <span>/</span>
          <span className="font-medium" style={{ color: "var(--color-accent)" }}>My Account</span>
        </div>
      </div>

     <div className="w-full px-4 sm:px-6 py-6">

        {/* ── MOBILE ── */}
        <div className="lg:hidden mb-4">

          {/* Mobile top bar */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-3 flex items-center justify-between">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex items-center justify-center w-10 h-10 rounded-lg"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              <RiMenuLine className="text-white text-xl" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="overflow-hidden text-right">
                  <p className="text-sm font-semibold" style={{ color: "var(--color-secondary)" }}>
                    {displayName}
                  </p>
                </div>
                <div>
                  {avatarSrc ? (
                    <img src={avatarSrc} alt={displayName} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ backgroundColor: "var(--color-charm-subtle)", color: "var(--color-accent)" }}
                    >
                      {initials}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile content panel */}
          <div className="relative bg-white rounded-xl border border-gray-200 min-h-[500px] overflow-hidden">

            {/* ── MOBILE DRAWER — inside panel ── */}
            {menuOpen && (
              <div className="absolute inset-0 bg-white z-10 flex flex-col">

                {/* Drawer header */}
                <div
                  className="flex items-center gap-3 px-5 py-4 border-b border-gray-100"
                  style={{ backgroundColor: "var(--color-charm-subtle)" }}
                >
                  <button
                    onClick={() => setMenuOpen(false)}
                    aria-label="Back"
                    className="flex items-center justify-center w-8 h-8 rounded-lg bg-white"
                    style={{ color: "var(--color-accent)" }}
                  >
                    <RiArrowLeftLine className="text-lg" />
                  </button>
                  <span className="font-bold text-base" style={{ color: "var(--color-secondary)" }}>
                    My Account
                  </span>
                </div>

                {/* Grouped nav */}
                <nav className="flex-1 py-3 overflow-y-auto">
                  {navGroups.map((group) => (
                    <div key={group.label} className="mb-2">
                      <p className="px-5 py-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        {group.label}
                      </p>
                      {group.items.map(({ label, path, icon }) => (
                        <NavLink
                          key={path}
                          to={path}
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-4 px-5 py-3.5 text-sm font-medium transition-colors border-l-4"
                          style={({ isActive }) => ({
                            borderLeftColor: isActive ? "var(--color-accent)" : "transparent",
                            backgroundColor: isActive ? "var(--color-charm-subtle)" : "transparent",
                            color: isActive ? "var(--color-accent)" : "var(--color-secondary)",
                          })}
                        >
                          <span className="text-lg flex items-center">{icon}</span>
                          <span>{label}</span>
                          <span className="ml-auto text-gray-300 text-sm">›</span>
                        </NavLink>
                      ))}
                    </div>
                  ))}
                </nav>

                {/* Logout */}
                <div className="px-5 py-4 border-t border-gray-100">
                  <button
                    onClick={() => { setMenuOpen(false); handleLogout() }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold
                               text-red-400 bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    <RiLogoutBoxLine className="text-base" />
                    <span>Logout</span>
                  </button>
                </div>

              </div>
            )}

            {/* Page content */}
            <div className="p-5 sm:p-8">
              <Outlet />
            </div>

          </div>
        </div>

        {/* ── DESKTOP: two panel layout ── */}
        <div className="hidden lg:flex gap-6 items-start">

          {/* LEFT PANEL — sidebar */}
          <aside
            className="w-64 shrink-0 rounded-2xl overflow-hidden sticky top-24 flex flex-col bg-white border border-gray-200 shadow-sm"
            style={{ minHeight: "520px" }}
          >
            {/* User card */}
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                  <div className="shrink-0">
                    {avatarSrc ? (
                      <img src={avatarSrc} alt={displayName} className="w-11 h-11 rounded-full object-cover" />
                    ) : (
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center text-base font-bold shrink-0"
                        style={{ backgroundColor: "var(--color-charm-subtle)", color: "var(--color-accent)" }}
                      >
                        {initials}
                      </div>
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold truncate" style={{ color: "var(--color-secondary)" }}>
                      {displayName}
                    </p>
                  </div>
                </div>
            </div>

            {/* Grouped nav */}
            <nav className="flex-1 py-4 px-3">
              {navGroups.map((group) => (
                <div key={group.label} className="mb-4">
                  <p className="px-3 pb-1.5 text-[10px] font-bold tracking-widest uppercase text-gray-400">
                    {group.label}
                  </p>
                  {group.items.map(({ label, path, icon }) => (
                    <NavLink
                      key={path}
                      to={path}
                      className="flex items-center gap-3 px-3 py-2.5 mb-0.5 text-sm font-medium rounded-lg transition-all"
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? "var(--color-charm-subtle)" : "transparent",
                        color: isActive ? "var(--color-accent)" : "var(--color-secondary)",
                        fontWeight: isActive ? 600 : 400,
                      })}
                    >
                      <span className="text-base flex items-center">{icon}</span>
                      {label}
                    </NavLink>
                  ))}
                </div>
              ))}
            </nav>

            {/* Logout */}
            <div className="px-3 pb-4 border-t border-gray-100 pt-3">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 w-full text-sm font-medium rounded-lg text-red-400 hover:bg-red-50 transition-colors"
              >
                <RiLogoutBoxLine className="text-base" /> Logout
              </button>
            </div>
          </aside>

          {/* RIGHT PANEL — content */}
          <main className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 min-h-[520px]">
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  )
}

export default UserPanelLayout