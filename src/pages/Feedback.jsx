import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Star Rating Component
───────────────────────────────────────────── */

const StarRating = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0);

  const labels = [
    "Terrible",
    "Poor",
    "Okay",
    "Good",
    "Excellent",
  ];

  return (
    <div className="flex flex-col gap-2">

      {/* Stars */}
      <div className="flex gap-2">

        {[1, 2, 3, 4, 5].map((star) => {

          const active =
            hovered >= star ||
            (!hovered && value >= star);

          return (
            <button
              key={star}
              type="button"
              aria-label={`Rate ${star}`}
              onClick={() => onChange(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className={`
                p-1 transition-all duration-200
                hover:scale-110
                ${active
                  ? "text-yellow-400"
                  : "text-gray-300"}
              `}
            >
              <svg
                viewBox="0 0 24 24"
                width="30"
                height="30"
                fill="currentColor"
              >
                <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.402 8.169L12 18.897 4.664 23.166l1.402-8.169L.132 9.21l8.2-1.192z" />
              </svg>
            </button>
          );
        })}
      </div>

      {/* Label */}
      <div className="text-sm text-gray-500 font-medium">
        {value
          ? labels[value - 1]
          : "Select a rating"}
      </div>
    </div>
  );
};


/* ─────────────────────────────────────────────
   Main Feedback Page
───────────────────────────────────────────── */

export default function FeedbackPage() {

  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  const textareaRef = useRef(null);


  /* =========================================
     Page Animation
  ========================================= */

  useEffect(() => {

    const t = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => clearTimeout(t);

  }, []);


  /* =========================================
     Submit Handler
  ========================================= */

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    // Validation
    if (!message.trim()) {
      return setError("Please write your feedback.");
    }

    if (rating === 0) {
      return setError("Please select a rating.");
    }

    setLoading(true);

    try {

      const token = localStorage.getItem("token");

      const res = await fetch("/api/feedbacks", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          ...(token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {}),
        },

        body: JSON.stringify({
          message: message.trim(),
          rating,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
          "Submission failed."
        );
      }

      setSubmitted(true);

    } catch (err) {

      setError(
        err.message ||
        "Something went wrong."
      );

    } finally {

      setLoading(false);
    }
  };


  /* =========================================
     Reset Form
  ========================================= */

  const handleReset = () => {

    setSubmitted(false);
    setMessage("");
    setRating(0);
    setError("");
  };


  return (

    /* =========================================
       Main Background
    ========================================= */

    <div className="relative min-h-screen overflow-hidden bg-[#eef4ff]">

      {/* =====================================
          Background Glow Effects
      ===================================== */}

      {/* Top Left Glow */}
      <div
        className="
          absolute top-[-120px] left-[-120px]
          w-[350px] h-[350px]
          rounded-full
          bg-blue-400/30
          blur-3xl
        "
      />

      {/* Bottom Right Glow */}
      <div
        className="
          absolute bottom-[-150px] right-[-120px]
          w-[400px] h-[400px]
          rounded-full
          bg-indigo-500/25
          blur-3xl
        "
      />

      {/* Center Glow */}
      <div
        className="
          absolute top-[40%] left-1/2
          -translate-x-1/2
          w-[300px] h-[300px]
          rounded-full
          bg-cyan-300/20
          blur-3xl
        "
      />


      {/* =====================================
          Main Container
      ===================================== */}

      <div
        className={`
          relative z-10
          max-w-3xl mx-auto
          py-16 px-6
          transition-all duration-700
          ${mounted
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5"}
        `}
      >

        {/* ===================================
            Glass Card
        =================================== */}

        <div
          className="
            bg-white/80
            backdrop-blur-xl
            rounded-3xl
            shadow-2xl
            border border-white/40
            p-8 md:p-10
          "
        >

          {!submitted ? (

            /* =================================
               Feedback Form
            ================================= */

            <form
              onSubmit={handleSubmit}
              className="space-y-8"
            >

              {/* Header */}
              <div>

                <div
                  className="
                    inline-flex items-center
                    px-4 py-1 rounded-full
                    bg-indigo-100
                    text-indigo-700
                    text-xs font-bold
                    uppercase tracking-wider
                  "
                >
                  DNP 3D Hobby Lobby
                </div>

                <h1
                  className="
                    text-4xl font-black
                    text-gray-900
                    mt-5
                  "
                >
                  Share Your Feedback
                </h1>

                <p
                  className="
                    text-gray-500
                    mt-3 text-sm md:text-base
                    leading-relaxed
                  "
                >
                  We'd love to hear your thoughts
                  about our project and services.
                  Your feedback helps us improve.
                </p>
              </div>


              {/* Rating */}
              <div>

                <label
                  className="
                    block text-xs
                    font-bold text-gray-600
                    uppercase tracking-widest
                    mb-3
                  "
                >
                  Your Rating
                </label>

                <StarRating
                  value={rating}
                  onChange={(v) => {
                    setRating(v);
                    setError("");
                  }}
                />
              </div>


              {/* Message */}
              <div>

                <label
                  className="
                    block text-xs
                    font-bold text-gray-600
                    uppercase tracking-widest
                    mb-3
                  "
                >
                  Your Message
                </label>

                <textarea
                  ref={textareaRef}
                  value={message}
                  maxLength={500}
                  placeholder="Write your feedback here..."
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setError("");
                  }}
                  className="
                    w-full
                    rounded-2xl
                    border border-gray-200
                    bg-white/70
                    p-4
                    min-h-[160px]
                    text-sm text-gray-800
                    placeholder-gray-400
                    outline-none
                    transition-all
                    focus:ring-4
                    focus:ring-indigo-100
                    focus:border-indigo-300
                  "
                />

                <div
                  className="
                    text-right
                    text-xs text-gray-400
                    mt-2
                  "
                >
                  {message.length} / 500
                </div>
              </div>


              {/* Error */}
              {error && (

                <div
                  className="
                    text-sm text-red-600
                    bg-red-50
                    border border-red-100
                    rounded-2xl
                    p-4
                  "
                >
                  {error}
                </div>
              )}


              {/* Submit Button */}
              <div>

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    py-4
                    rounded-2xl
                    text-white
                    font-bold
                    text-sm
                    bg-gradient-to-r
                    from-[#5a46c2]
                    to-[#4838a3]
                    shadow-xl
                    hover:scale-[1.01]
                    transition-all
                    disabled:opacity-60
                    disabled:cursor-not-allowed
                  "
                >

                  {loading ? (

                    <div
                      className="
                        flex items-center
                        justify-center gap-2
                      "
                    >
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse delay-75" />
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse delay-150" />
                    </div>

                  ) : (
                    "Submit Feedback"
                  )}

                </button>
              </div>

            </form>

          ) : (

            /* =================================
               Success Screen
            ================================= */

            <div className="text-center py-10">

              {/* Success Icon */}
              <div
                className="
                  mx-auto
                  w-28 h-28
                  rounded-full
                  bg-gradient-to-r
                  from-[#5a46c2]
                  to-[#4838a3]
                  flex items-center
                  justify-center
                  text-white
                  text-4xl
                  font-black
                  shadow-2xl
                "
              >
                ✓
              </div>


              {/* Title */}
              <h2
                className="
                  text-4xl
                  font-black
                  text-gray-900
                  mt-8
                "
              >
                Thank You!
              </h2>


              {/* Description */}
              <p
                className="
                  text-gray-500
                  mt-4
                  max-w-md
                  mx-auto
                  leading-relaxed
                "
              >
                Your feedback has been submitted
                successfully. We truly appreciate
                your support and suggestions.
              </p>


              {/* Reset Button */}
              <div className="mt-8">

                <button
                  onClick={handleReset}
                  className="
                    px-6 py-3
                    rounded-xl
                    border border-gray-200
                    bg-white
                    text-sm font-semibold
                    text-gray-700
                    hover:bg-gray-50
                    transition-all
                  "
                >
                  Submit Another Feedback
                </button>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}