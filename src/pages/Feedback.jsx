import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   Star Rating Component
───────────────────────────────────────────── */
const StarRating = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0);
  const labels = ["Terrible", "Poor", "Okay", "Good", "Excellent"];

  return (
    <div className="star-wrapper">
      <div className="stars-row">
        {[1, 2, 3, 4, 5].map((star) => {
          const active = hovered >= star || (!hovered && value >= star);
          return (
            <button
              key={star}
              type="button"
              className={`star-btn ${active ? "active" : ""}`}
              onClick={() => onChange(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon
                  points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          );
        })}
      </div>
      <div className="star-label">
        {(hovered || value) ? labels[(hovered || value) - 1] : "Select a rating"}
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

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!message.trim()) return setError("Please write your feedback.");
    if (rating === 0) return setError("Please give a star rating.");

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/feedbacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ message: message.trim(), rating }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Submission failed.");
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setMessage("");
    setRating(0);
    setError("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .fb-page {
          min-height: 100vh;
          background: #080B0F;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
          font-family: 'Outfit', sans-serif;
        }

        /* ── Background decoration ── */
        .fb-bg-circle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .fb-bg-circle-1 {
          width: 600px; height: 600px;
          top: -200px; left: -200px;
          background: radial-gradient(circle, rgba(234,88,12,0.08) 0%, transparent 65%);
        }
        .fb-bg-circle-2 {
          width: 400px; height: 400px;
          bottom: -150px; right: -100px;
          background: radial-gradient(circle, rgba(234,88,12,0.05) 0%, transparent 65%);
        }
        .fb-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
        }

        /* ── Card ── */
        .fb-card {
          position: relative;
          width: 100%;
          max-width: 560px;
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .fb-card.mounted {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Top accent bar ── */
        .fb-accent-bar {
          height: 3px;
          background: linear-gradient(90deg, #EA580C, #FB923C, transparent);
          border-radius: 2px 2px 0 0;
        }

        .fb-inner {
          background: #0E1318;
          border: 1px solid rgba(255,255,255,0.07);
          border-top: none;
          border-radius: 0 0 20px 20px;
          padding: 44px 44px 40px;
        }

        /* ── Header ── */
        .fb-eyebrow {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #EA580C;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .fb-eyebrow::before {
          content: '';
          display: inline-block;
          width: 20px; height: 2px;
          background: #EA580C;
          border-radius: 1px;
        }

        .fb-heading {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 52px;
          line-height: 0.95;
          color: #F5F5F5;
          letter-spacing: 0.02em;
          margin-bottom: 10px;
        }
        .fb-heading span { color: #EA580C; }

        .fb-subtext {
          font-size: 14px;
          color: #4B5563;
          line-height: 1.6;
          margin-bottom: 36px;
        }

        /* ── Divider ── */
        .fb-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.06), transparent);
          margin: 28px 0;
        }

        /* ── Section label ── */
        .fb-field-label {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6B7280;
          margin-bottom: 14px;
        }

        /* ── Stars ── */
        .star-wrapper { display: flex; flex-direction: column; gap: 10px; }
        .stars-row { display: flex; gap: 6px; }

        .star-btn {
          background: none; border: none; cursor: pointer;
          padding: 4px;
          transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1);
        }
        .star-btn:hover { transform: scale(1.25); }
        .star-btn.active { transform: scale(1.1); }
        .star-btn svg {
          width: 38px; height: 38px;
          stroke: #374151;
          fill: none;
          stroke-width: 1.5;
          transition: stroke 0.15s, fill 0.15s;
        }
        .star-btn.active svg {
          stroke: #F59E0B;
          fill: #F59E0B;
          filter: drop-shadow(0 0 6px rgba(245,158,11,0.5));
        }

        .star-label {
          font-size: 13px;
          font-weight: 500;
          color: #6B7280;
          height: 18px;
          transition: color 0.2s;
        }

        /* ── Textarea ── */
        .fb-textarea {
          width: 100%;
          background: #070A0E;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          color: #E5E7EB;
          font-family: 'Outfit', sans-serif;
          font-size: 14.5px;
          line-height: 1.65;
          padding: 16px 18px;
          resize: none;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s;
          min-height: 130px;
        }
        .fb-textarea:focus {
          border-color: rgba(234,88,12,0.5);
          box-shadow: 0 0 0 3px rgba(234,88,12,0.08);
        }
        .fb-textarea::placeholder { color: #1F2937; }

        .fb-char-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
        }
        .fb-char-count { font-size: 12px; color: #374151; }

        /* ── Error ── */
        .fb-error {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 10px;
          color: #FCA5A5;
          font-size: 13.5px;
          padding: 12px 16px;
          margin-top: 20px;
          animation: fb-shake 0.3s ease;
        }
        @keyframes fb-shake {
          0%,100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }

        /* ── Submit button ── */
        .fb-submit {
          width: 100%;
          margin-top: 28px;
          background: linear-gradient(135deg, #EA580C 0%, #C2410C 100%);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          letter-spacing: 0.12em;
          padding: 16px 24px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s;
          box-shadow: 0 6px 24px rgba(234,88,12,0.3);
        }
        .fb-submit::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%);
          pointer-events: none;
        }
        .fb-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 36px rgba(234,88,12,0.45);
        }
        .fb-submit:active:not(:disabled) { transform: translateY(0); }
        .fb-submit:disabled { opacity: 0.45; cursor: not-allowed; }

        .fb-submit-inner {
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }

        /* ── Loading dots ── */
        .fb-dots { display: flex; gap: 5px; align-items: center; }
        .fb-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.7);
          animation: fb-bounce 0.8s ease-in-out infinite;
        }
        .fb-dot:nth-child(2) { animation-delay: 0.15s; }
        .fb-dot:nth-child(3) { animation-delay: 0.3s; }
        @keyframes fb-bounce {
          0%,80%,100% { transform: scale(0.7); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        /* ── Success state ── */
        .fb-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 10px 0 6px;
        }
        .fb-success-ring {
          width: 90px; height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, #EA580C, #F97316);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 28px;
          box-shadow: 0 0 0 12px rgba(234,88,12,0.1), 0 0 50px rgba(234,88,12,0.3);
          animation: fb-popIn 0.5s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes fb-popIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }

        .fb-success-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          color: #F5F5F5;
          letter-spacing: 0.04em;
          margin-bottom: 10px;
        }
        .fb-success-sub {
          font-size: 14px;
          color: #4B5563;
          line-height: 1.6;
          max-width: 300px;
          margin-bottom: 36px;
        }

        .fb-again-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          color: #6B7280;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 10px 24px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .fb-again-btn:hover {
          border-color: rgba(234,88,12,0.4);
          color: #EA580C;
        }

        @media (max-width: 520px) {
          .fb-inner { padding: 32px 24px 28px; }
          .fb-heading { font-size: 40px; }
          .fb-submit { font-size: 17px; }
          .star-btn svg { width: 32px; height: 32px; }
        }
      `}</style>

      <div className="fb-page">
        <div className="fb-grid" />
        <div className="fb-bg-circle fb-bg-circle-1" />
        <div className="fb-bg-circle fb-bg-circle-2" />

        <div className={`fb-card ${mounted ? "mounted" : ""}`}>
          <div className="fb-accent-bar" />
          <div className="fb-inner">

            {submitted ? (
              /* ── SUCCESS ── */
              <div className="fb-success">
                <div className="fb-success-ring">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                    stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div className="fb-success-title">Thank You!</div>
                <p className="fb-success-sub">
                  Your feedback has been received. We truly appreciate you taking
                  the time to share your thoughts on our project.
                </p>
                <button className="fb-again-btn" onClick={handleReset}>
                  ← Submit another feedback
                </button>
              </div>
            ) : (
              /* ── FORM ── */
              <>
                <div className="fb-eyebrow">DNP 3D Hobby Lobby</div>
                <h1 className="fb-heading">
                  Share Your<br /><span>Feedback</span>
                </h1>
                <p className="fb-subtext">
                  We'd love to hear what you think about our project.
                  Your feedback helps us improve.
                </p>

                <div className="fb-field-label">Your Rating</div>
                <StarRating value={rating} onChange={(v) => { setRating(v); setError(""); }} />

                <div className="fb-divider" />

                <div className="fb-field-label">Your Message</div>
                <textarea
                  ref={textareaRef}
                  className="fb-textarea"
                  placeholder="What did you think about this project? Share your honest thoughts..."
                  value={message}
                  maxLength={500}
                  onChange={(e) => { setMessage(e.target.value); setError(""); }}
                />
                <div className="fb-char-row">
                  <span />
                  <span className="fb-char-count">{message.length} / 500</span>
                </div>

                {error && (
                  <div className="fb-error">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {error}
                  </div>
                )}

                <button
                  className="fb-submit"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  <div className="fb-submit-inner">
                    {loading ? (
                      <div className="fb-dots">
                        <div className="fb-dot" />
                        <div className="fb-dot" />
                        <div className="fb-dot" />
                      </div>
                    ) : (
                      <>
                        Submit Feedback
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"/>
                          <polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </>
                    )}
                  </div>
                </button>
              </>
            )}

          </div>
        </div>
      </div>
    </>
  );
}