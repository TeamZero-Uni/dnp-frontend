import { useAuth } from "../../hooks/useAuth"

function ProfilePage() {
  const { user } = useAuth()

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-[#06021d]">My Profile</h2>
          <p className="text-sm text-gray-400 mt-1">Your personal information</p>
        </div>
      </div>

      {/* Avatar row */}
      <div className="flex items-center gap-5 mb-8 p-5 bg-[#f5f0ff]
                      rounded-2xl border border-[#e4d9ff]">
        <div className="w-16 h-16 rounded-full bg-white border-2 border-[#894def]
                        flex items-center justify-center text-2xl font-bold text-[#894def]">
          {user?.name?.charAt(0).toUpperCase() ?? "U"}
        </div>
        <div>
          <p className="font-bold text-[#06021d] text-lg">
            {user?.name ?? "Customer"}
          </p>
          <p className="text-sm text-gray-400">{user?.email}</p>
          <span className="inline-block mt-1 text-xs px-3 py-1 rounded-full
                           bg-[#894def] text-white font-medium">
            {user?.role ?? "CUSTOMER"}
          </span>
        </div>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InfoField label="Full name"     value={user?.name} />
        <InfoField label="Email address" value={user?.email} />
        <InfoField label="Phone number"  value={user?.phone} />
        <InfoField label="Date of birth" value={user?.dateOfBirth} />
        <div className="md:col-span-2">
          <InfoField label="Address" value={user?.address} />
        </div>
      </div>

      <p className="text-xs text-gray-300 mt-8">
        Profile editing coming soon.
      </p>
    </div>
  )
}

function InfoField({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-semibold text-[#894def] uppercase tracking-widest">
        {label}
      </span>
      <p className="text-sm text-[#06021d] py-2 border-b border-[#ede8ff]">
        {value || <span className="text-gray-300 italic">Not set</span>}
      </p>
    </div>
  )
}

export default ProfilePage