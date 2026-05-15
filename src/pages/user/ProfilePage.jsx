import { useEffect, useState, useRef } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getUserDetailsAPI, updateUserDetailsAPI } from "../../api/userOrdersApi"
import { uploadImageToCloudinary } from "../../api/cloudinaryApi"
import toast from "react-hot-toast"
import { MdPerson, MdEmail, MdPhone, MdLocationOn, MdEdit, MdCheck, MdClose, MdCameraAlt } from "react-icons/md"

// ─── Validation rules ───────────────────────────────────────────────
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"]
const MAX_IMAGE_SIZE_MB   = 2

const validate = (form) => {
  const errors = {}

  if (!form.user_name.trim())
    errors.user_name = "Name is required."

  if (!form.email.trim())
    errors.email = "Email is required."
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Enter a valid email address."

  if (!form.user_contactnumber.trim())
    errors.user_contactnumber = "Phone number is required."
  else if (!/^[0-9+\-\s()]{7,15}$/.test(form.user_contactnumber))
    errors.user_contactnumber = "Enter a valid phone number (7–15 digits)."

  if (!form.user_address.trim())
    errors.user_address = "Address is required."

  return errors
}

const validateImage = (file) => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type))
    return "Only JPG, PNG, or WEBP images are allowed."
  if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024)
    return `Image must be under ${MAX_IMAGE_SIZE_MB}MB.`
  return null
}
// ────────────────────────────────────────────────────────────────────

function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile]               = useState(null)
  const [isLoading, setIsLoading]           = useState(true)
  const [isEditing, setIsEditing]           = useState(false)
  const [isSaving, setIsSaving]             = useState(false)
  const [form, setForm]                     = useState({})
  const [originalForm, setOriginalForm]     = useState(null)
  const [errors, setErrors]                 = useState({})
  const [imageError, setImageError]         = useState(null)
  const [selectedImageFile, setSelectedImageFile] = useState(null)
  const [imagePreview, setImagePreview]     = useState(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getUserDetailsAPI()
        setProfile(data)
        const initial = {
          user_name:          data?.user_name          ?? "",
          email:              data?.email              ?? "",
          user_contactnumber: data?.user_contactnumber ?? "",
          user_address:       data?.user_address       ?? "",
        }
        setForm(initial)
        setOriginalForm(initial)
      } catch (error) {
        setProfile(null)
      } finally {
        setIsLoading(false)
      }
    }
    loadProfile()
    return () => { if (imagePreview) URL.revokeObjectURL(imagePreview) }
  }, [])

  const profileImage = imagePreview ?? profile?.image_url

  const handleChange = (field) => (e) => {
    const value = e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
    // Clear field error on change
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }))
  }

  const handleEdit = () => setIsEditing(true)

  const handleImageClick = () => fileInputRef.current?.click()

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const err = validateImage(file)
    if (err) { setImageError(err); return }
    setImageError(null)
    setSelectedImageFile(file)
    setImagePreview(URL.createObjectURL(file))
    // Reset file input so same file can be re-selected after cancel
    e.target.value = ""
  }

  const resetForm = () => {
    setForm(originalForm)
    setErrors({})
    setImageError(null)
    if (imagePreview) { URL.revokeObjectURL(imagePreview); setImagePreview(null) }
    setSelectedImageFile(null)
  }

  const handleCancel = () => { resetForm(); setIsEditing(false) }

  const hasChanges = () => {
    if (!originalForm) return false
    if (selectedImageFile) return true
    return Object.keys(form).some((k) => form[k] !== originalForm[k])
  }

const handleSave = async () => {
    const errs = validate(form)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setIsSaving(true)
    try {
      let finalImageUrl = profile?.image_url; 

      // 1. Upload the image using our clean, separate file!
      if (selectedImageFile) {
        finalImageUrl = await uploadImageToCloudinary(selectedImageFile);
      }

      // 2. Send the fast JSON payload to your backend
      const payload = {
        user_name:          form.user_name,
        email:              form.email,
        user_contactnumber: form.user_contactnumber,
        user_address:       form.user_address,
        image_url:          finalImageUrl, 
      }

      const res     = await updateUserDetailsAPI(payload)
      const updated = res?.data ?? res
      
      setProfile((prev) => ({ ...prev, ...updated, image_url: finalImageUrl }))
      setOriginalForm({ ...form })
      setSelectedImageFile(null)
      setIsEditing(false)
      toast.success("Profile updated successfully")
      
    } catch (err) {
      console.error("Save error:", err)
      toast.error("Failed to save profile. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }
  const changed = hasChanges()

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-8 flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-gray-200 rounded-full" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden my-8">

      {/* Header */}
      <div className="p-8 sm:p-10">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              onClick={isEditing ? handleImageClick : undefined}
              className={`relative w-24 h-24 rounded-full overflow-hidden bg-white
                          ring-4 ring-accent/20 shadow-sm flex items-center justify-center
                          ${isEditing ? "cursor-pointer" : ""}`}
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={form.user_name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100?text=?" }}
                />
              ) : (
                <MdPerson className="text-accent" size={48} />
              )}

              {isEditing && (
                <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center gap-0.5">
                  <MdCameraAlt size={22} className="text-white" />
                  <span className="text-white text-[9px] font-semibold tracking-wide">Change</span>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleImageChange}
            />

            {/* Image format error below avatar */}
            {imageError && (
              <p className="text-[11px] text-red-500 mt-1.5 w-28 text-center leading-tight">
                {imageError}
              </p>
            )}
            {isEditing && !imageError && (
              <p className="text-[10px] text-gray-400 mt-1.5 w-28 text-center leading-tight">
                JPG, PNG, WEBP · max 2 MB
              </p>
            )}
          </div>

          {/* Name + badge */}
          <div className="text-center sm:text-left mt-2 sm:mt-4 flex-1">
            <h2 className="text-2xl font-bold text-secondary">
              {form.user_name || "Unknown User"}
            </h2>
            <span className="inline-block mt-3 px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
              Personal Profile
            </span>
          </div>

          {/* Buttons */}
          <div className="sm:mt-4 flex items-center gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 px-4 py-2 border border-gray-200
                             text-gray-500 text-sm font-semibold rounded-lg hover:bg-gray-50
                             transition-colors disabled:opacity-50"
                >
                  <MdClose size={16} /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!changed || isSaving}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-semibold
                              rounded-lg transition-colors
                              ${changed && !isSaving
                                ? "bg-accent text-white hover:bg-accent/90"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                >
                  <MdCheck size={16} />
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center gap-1.5 px-4 py-2 border border-accent/30
                           text-accent text-sm font-semibold rounded-lg hover:bg-accent/5 transition-colors"
              >
                <MdEdit size={16} /> Edit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="px-8 sm:px-10 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InfoField
            icon={<MdPerson size={16} />}
            label="Full name"
            value={form.user_name}
            error={errors.user_name}
            isEditing={isEditing}
            onChange={handleChange("user_name")}
          />
          <InfoField
            icon={<MdEmail size={16} />}
            label="Email address"
            value={form.email}
            error={errors.email}
            isEditing={isEditing}
            onChange={handleChange("email")}
            type="email"
          />
          <InfoField
            icon={<MdPhone size={16} />}
            label="Phone number"
            value={form.user_contactnumber}
            error={errors.user_contactnumber}
            isEditing={isEditing}
            onChange={handleChange("user_contactnumber")}
            type="tel"
          />
          <div className="md:col-span-2">
            <InfoField
              icon={<MdLocationOn size={16} />}
              label="Address"
              value={form.user_address}
              error={errors.user_address}
              isEditing={isEditing}
              onChange={handleChange("user_address")}
            />
          </div>
        </div>
      </div>

    </div>
  )
}

function InfoField({ icon, label, value, error, isEditing, onChange, type = "text" }) {
  return (
    <div className={`flex flex-col gap-1.5 p-4 rounded-xl border transition-colors bg-white
                     ${error ? "border-red-300" : "border-charm-subtle hover:border-accent/40"}`}>
      <span className="flex items-center gap-1.5 text-[11px] font-bold text-accent uppercase tracking-widest opacity-80">
        {icon} {label}
      </span>
      {isEditing ? (
        <>
          <input
            type={type}
            value={value}
            onChange={onChange}
            className={`text-sm text-secondary font-medium bg-transparent border-b outline-none
                        py-0.5 w-full transition-colors placeholder:text-gray-300
                        ${error ? "border-red-400 focus:border-red-500" : "border-accent/30 focus:border-accent"}`}
            placeholder={`Enter ${label.toLowerCase()}`}
          />
          {error && (
            <p className="text-[11px] text-red-500 mt-0.5">{error}</p>
          )}
        </>
      ) : (
        <p className="text-sm text-secondary font-medium">
          {value || <span className="text-gray-400 font-normal italic">Not provided</span>}
        </p>
      )}
    </div>
  )
}

export default ProfilePage