import React, { useState } from 'react';
import { FaStar, FaThumbsUp, FaThumbsDown, FaUserCircle } from 'react-icons/fa';

/* ─────────────── mock logged-in user ───────────────────────── */
/* Replace this with your real auth context, e.g:
   const { user } = useAuth();
   const loggedInName = user?.displayName || 'Anonymous';
*/
const LOGGED_IN_NAME = 'You'; // swap with real user name from your auth context

/* ─────────────── initial review data ───────────────────────── */
const INITIAL_REVIEWS = [
  {
    id: 1,
    name: 'Nimal Silva',
    initials: 'NS',
    rating: 5,
    date: '1 day ago',
    comment: 'Great quality! Printed perfectly and arrived fast. Will buy again.',
    helpful: 12,
    dislike: 1,
    voted: null,
  },
  {
    id: 2,
    name: 'Sarah J.',
    initials: 'SJ',
    rating: 4,
    date: '3 days ago',
    comment: 'The file is excellent, but the supports were a bit tricky to remove. Still a good model.',
    helpful: 7,
    dislike: 0,
    voted: null,
  },
  {
    id: 3,
    name: 'Kasun Perera',
    initials: 'KP',
    rating: 5,
    date: '1 week ago',
    comment: 'Absolutely stunning detail. Worth every rupee — the PLA+ finish is incredibly smooth.',
    helpful: 19,
    dislike: 0,
    voted: null,
  },
];

/* ─────────────── rating summary helper ─────────────────────── */
function getRatingSummary(reviews) {
  if (!reviews.length) return { avg: 0, counts: [0, 0, 0, 0, 0] };
  const counts = [0, 0, 0, 0, 0];
  let total = 0;
  reviews.forEach(r => { counts[r.rating - 1]++; total += r.rating; });
  return { avg: (total / reviews.length).toFixed(1), counts };
}

/* ─────────────── Star renderer ─────────────────────────────── */
function Stars({ rating, size = 12, interactive = false, onRate }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(n => (
        <FaStar
          key={n}
          size={size}
          className={`transition-colors ${
            n <= (interactive ? (hovered || rating) : rating)
              ? 'text-amber-400'
              : 'text-slate-200'
          } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onMouseEnter={() => interactive && setHovered(n)}
          onMouseLeave={() => interactive && setHovered(0)}
          onClick={() => interactive && onRate && onRate(n)}
        />
      ))}
    </div>
  );
}

/* ─────────────── Avatar circle ─────────────────────────────── */
const AVATAR_COLORS = [
  'bg-blue-100 text-blue-600',
  'bg-emerald-100 text-emerald-600',
  'bg-violet-100 text-violet-600',
  'bg-amber-100 text-amber-600',
  'bg-rose-100 text-rose-500',
];

function Avatar({ initials, index }) {
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  return (
    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black uppercase ${color}`}>
      {initials}
    </div>
  );
}

/* ─────────────── Main ReviewSection ────────────────────────── */
export default function ReviewSection() {
  const [reviews,    setReviews]   = useState(INITIAL_REVIEWS);
  const [newText,    setNewText]   = useState('');
  const [newRating,  setNewRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);

  const { avg, counts } = getRatingSummary(reviews);
  const total = reviews.length;

  /* derive initials from the logged-in user's name */
  const userInitials = LOGGED_IN_NAME
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  /* vote handler */
  const handleVote = (id, type) => {
    setReviews(prev => prev.map(r => {
      if (r.id !== id || r.voted === type) return r;
      return {
        ...r,
        helpful: type === 'helpful' ? r.helpful + 1 : r.helpful,
        dislike: type === 'dislike' ? r.dislike + 1 : r.dislike,
        voted: type,
      };
    }));
  };

  /* submit handler — name comes from auth, not from a form field */
  const handleSubmit = () => {
    if (!newText.trim() || newRating === 0) return;
    setSubmitting(true);
    setTimeout(() => {
      setReviews(prev => [{
        id: Date.now(),
        name: LOGGED_IN_NAME,
        initials: userInitials,
        rating: newRating,
        date: 'just now',
        comment: newText.trim(),
        helpful: 0,
        dislike: 0,
        voted: null,
      }, ...prev]);
      setNewText('');
      setNewRating(0);
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto mt-6">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* ── Header bar ── */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Customer Reviews</h2>
            <p className="text-[10px] text-slate-400 font-bold mt-0.5">
              {total} verified {total === 1 ? 'review' : 'reviews'}
            </p>
          </div>

          {/* avg score + bar chart */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-3xl font-black text-slate-800 leading-none">{avg}</p>
              <div className="mt-1"><Stars rating={Math.round(avg)} size={11} /></div>
              <p className="text-[9px] text-slate-400 font-bold mt-0.5">out of 5</p>
            </div>
            <div className="space-y-1 w-32">
              {[5, 4, 3, 2, 1].map(star => {
                const count = counts[star - 1];
                const pct   = total ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={star} className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black text-slate-400 w-2">{star}</span>
                    <FaStar size={8} className="text-amber-400 flex-shrink-0" />
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[9px] text-slate-400 font-bold w-5 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Write a review ── */}
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/40">
          <p className="text-[10px] font-black text-accent uppercase tracking-widest mb-3">Write a Review</p>
          <div className="flex gap-3">
            {/* avatar from logged-in user */}
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-xs font-black text-blue-600 uppercase">
              {userInitials === 'YO' /* fallback for default 'You' */
                ? <FaUserCircle size={22} className="text-slate-400" />
                : userInitials}
            </div>

            <div className="flex-1 space-y-2">
              {/* comment textarea only — no name field */}
              <textarea
                value={newText}
                onChange={e => setNewText(e.target.value)}
                placeholder="Share your experience with this product…"
                rows={3}
                className="w-full text-xs font-medium text-slate-700 placeholder-slate-300 bg-white border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-blue-400 transition-colors resize-none"
              />

              {/* rating + action buttons */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Rating</span>
                  <Stars rating={newRating} size={16} interactive onRate={setNewRating} />
                  {newRating > 0 && (
                    <span className="text-[10px] font-bold text-amber-500">
                      {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][newRating]}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setNewText(''); setNewRating(0); }}
                    className="px-3 py-1.5 text-[10px] font-black text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider">
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!newText.trim() || newRating === 0 || submitting}
                    className="px-4 py-1.5 btn-color hover:bg-blue-700 text-white text-[10px] font-black rounded-lg uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] shadow-sm shadow-blue-200/60">
                    {submitting ? 'Posting…' : submitted ? '✓ Posted!' : 'Post Review'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Review list ── */}
        <div className="divide-y divide-slate-100">
          {reviews.map((review, idx) => (
            <div key={review.id} className="px-6 py-4 hover:bg-slate-50/30 transition-colors">
              <div className="flex gap-3">
                <Avatar initials={review.initials} index={idx} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                    <div>
                      <span className="text-xs font-black text-slate-800">{review.name}</span>
                      <span className="text-[10px] text-slate-400 font-bold ml-2">{review.date}</span>
                    </div>
                    <Stars rating={review.rating} size={11} />
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-2">{review.comment}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Helpful?</span>
                    <button
                      onClick={() => handleVote(review.id, 'helpful')}
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        review.voted === 'helpful'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          : 'text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 border border-transparent'
                      }`}>
                      <FaThumbsUp size={9} /> {review.helpful}
                    </button>
                    <button
                      onClick={() => handleVote(review.id, 'dislike')}
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                        review.voted === 'dislike'
                          ? 'bg-rose-50 text-rose-500 border border-rose-200'
                          : 'text-slate-400 hover:text-rose-400 hover:bg-rose-50 border border-transparent'
                      }`}>
                      <FaThumbsDown size={9} /> {review.dislike}
                    </button>
                    <span className="ml-auto text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      ✓ Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {reviews.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="text-sm font-bold text-slate-400">No reviews yet — be the first!</p>
          </div>
        )}

      </div>
    </div>
  );
}