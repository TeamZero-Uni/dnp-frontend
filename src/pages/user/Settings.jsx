import { useState } from "react"
import toast from "react-hot-toast"

function Settings() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    // connect your API here later
    toast.success("Password changed!")
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Settings</h2>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-md">
        <h3 className="text-sm font-semibold text-gray-700 mb-5">
          Change password
        </h3>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Current password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              New password
            </label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Confirm new password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm
                         focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="mt-2 bg-black text-white text-sm font-medium py-2
                       rounded-lg hover:bg-gray-800 transition-colors"
          >
            Update password
          </button>

        </form>
      </div>
    </div>
  )
}

export default Settings