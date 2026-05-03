import React, { useState, useEffect, useCallback } from "react";
import { FaStar, FaRegStar, FaThumbsUp, FaThumbsDown, FaCheckCircle } from "react-icons/fa";
import { getProductReviews, createReview, voteReviewAPI } from "../../api/api"; 
import { useAuth } from "../../hooks/useAuth"; 

export default function ReviewSection({ productId }) {
  const { user } = useAuth() || {}; 

  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [votedReviews, setVotedReviews] = useState({});

  useEffect(() => {
    const savedVotes = JSON.parse(localStorage.getItem('userVotes')) || {};
    setVotedReviews(savedVotes);
  }, []);

  const fetchReviews = useCallback(async () => {
    if (!productId) return;
    setIsLoading(true);
    try {
      const data = await getProductReviews(productId);
      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handlePostReview = async () => {
    if (!newComment || newRating === 0) {
      alert("Please provide a rating and a comment!");
      return;
    }
    
    const currentUserId = (user && user.userId) ? user.userId : "22222222-2222-2222-2222-222222222222";

    setIsSubmitting(true);
    try {
      const reviewData = {
        p_id: productId,
        userId: currentUserId, 
        comment: newComment,
        rating: newRating,
      };

      const data = await createReview(reviewData);
      if (data.success) {
        setNewComment("");
        setNewRating(0);
        await fetchReviews(); 
      } else {
        alert("Failed to post review.");
      }
    } catch (error) {
      alert("Failed to post review.");
    } finally {
      setIsSubmitting(false);
    }
  };

const handleVote = async (reviewId, type) => {
    const currentVote = votedReviews[reviewId]; 
    let likesChange = 0;
    let dislikesChange = 0;
    let newVoteState = null;

    if (currentVote === type) {
        if (type === 'like') likesChange = -1;
        if (type === 'dislike') dislikesChange = -1;
        newVoteState = null;
    } else {
        if (type === 'like') {
            likesChange = 1;
            if (currentVote === 'dislike') dislikesChange = -1; 
        } else if (type === 'dislike') {
            dislikesChange = 1;
            if (currentVote === 'like') likesChange = -1; 
        }
        newVoteState = type;
    }

    try {
        setReviews(prevReviews => prevReviews.map(r => {
            if (r.id === reviewId) {
                return { ...r, likes: r.likes + likesChange, dislikes: r.dislikes + dislikesChange };
            }
            return r;
        }));

        const newVotes = { ...votedReviews };
        if (newVoteState) {
            newVotes[reviewId] = newVoteState;
        } else {
            delete newVotes[reviewId];
        }
        setVotedReviews(newVotes);
        localStorage.setItem('userVotes', JSON.stringify(newVotes));

        await voteReviewAPI(reviewId, likesChange, dislikesChange);

    } catch (error) {
        console.error("Vote failed:", error);
    }
  };

  // --- CHART CALCULATIONS ---
  const totalReviews = reviews?.length || 0;

  const averageRating = totalReviews === 0 
    ? 0 
    : (reviews.reduce((acc, curr) => acc + (Number(curr.rating) || 5), 0) / totalReviews).toFixed(1);

  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
      const star = Math.round(Number(r.rating)) || 5; 
      if (ratingCounts[star] !== undefined) {
          ratingCounts[star]++;
      }
  });

  return (
    <div className="max-w-7xl mx-auto mt-12 bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
      
      {/* --- TOP SUMMARY & DYNAMIC RATING CHART --- */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-10 border-b border-gray-100 pb-8 gap-8">
        <div className="flex-1">
          <h2 className="text-xl font-black text-[#06021d] uppercase tracking-wider">Customer Reviews</h2>
          <p className="text-sm text-gray-400 font-medium mt-1">{totalReviews} verified reviews</p>
          
          <div className="flex items-center gap-6 mt-6">
            <div className="text-center w-24">
              <span className="text-5xl font-black text-[#06021d]">{averageRating}</span>
              <div className="flex text-amber-400 text-sm mt-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  i < Math.round(averageRating) ? <FaStar key={i} /> : <FaRegStar key={i} />
                ))}
              </div>
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1 block">Out of 5</span>
            </div>

            {/* PROGRESS BARS */}
            <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map(star => {
                    const count = ratingCounts[star];
                    const percentage = totalReviews === 0 ? 0 : (count / totalReviews) * 100;
                    return (
                        <div key={star} className="flex items-center gap-3 text-xs font-bold text-slate-500">
                            <span className="w-2">{star}</span>
                            <FaStar className="text-amber-400" size={10} />
                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-400 rounded-full transition-all duration-1000" style={{ width: `${percentage}%` }}></div>
                            </div>
                            <span className="w-4 text-right">{count}</span>
                        </div>
                    )
                })}
            </div>
          </div>
        </div>
      </div>

      {/* --- WRITE A REVIEW SECTION --- */}
      <div className="mb-12 bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <h3 className="text-xs font-black text-[#5a46c2] uppercase tracking-widest mb-4">Write a Review</h3>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0 uppercase">
             {user?.user_name ? user.user_name.charAt(0) : "Y"}
          </div>
          <div className="flex-1 space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your experience with this product..."
              className="w-full h-24 p-4 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#5a46c2] focus:ring-1 focus:ring-[#5a46c2] resize-none"
            ></textarea>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rating</span>
                <div className="flex gap-1 cursor-pointer">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star} 
                      onClick={() => setNewRating(star)}
                      className={`text-lg transition-colors ${newRating >= star ? "text-amber-400" : "text-gray-300 hover:text-amber-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => { setNewComment(""); setNewRating(0); }}
                  className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-gray-600 uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePostReview}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#a49ee8] hover:bg-[#5a46c2] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Posting..." : "Post Review"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- REVIEWS LIST SECTION --- */}
      {isLoading ? (
        <div className="text-center text-[#5a46c2] font-bold animate-pulse py-10">Loading reviews...</div>
      ) : totalReviews === 0 ? (
        <div className="text-center text-gray-400 py-10">No reviews yet. Be the first to review!</div>
      ) : (
        <div className="space-y-6 divide-y divide-gray-100">
          {reviews.map((review) => {
            const hasVoted = votedReviews[review.id]; 

            return (
            <div key={review.id} className="pt-6 flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-bold text-sm flex-shrink-0 uppercase overflow-hidden">
                {review.reviewerImage ? (
                    <img src={review.reviewerImage} alt="user" className="w-full h-full object-cover" />
                ) : (
                    review.reviewerName ? review.reviewerName.charAt(0) : 'U'
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#06021d]">
                        {review.reviewerName}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(review.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex text-amber-400 text-xs">
                      {[...Array(5)].map((_, i) => {
                        const currentStar = Number(review.rating) || 5;
                        return i < currentStar ? <FaStar key={i} /> : <FaRegStar key={i} />
                      })}
                    </div>
                    <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-wider">
                      <FaCheckCircle size={10} /> Verified
                    </span>
                  </div>
                </div>
                
                {/* Helpful Like / Dislike Buttons */}
                <div className="flex items-center gap-4 mt-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Helpful?</span>

                  <button 
                    onClick={() => handleVote(review.id, 'like')}
                    className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                        hasVoted === 'like' ? 'text-[#5a46c2]' : 'text-gray-400 hover:text-[#5a46c2]'
                    }`}
                  >
                    <FaThumbsUp /> {review.likes || 0}
                  </button>

                  <button 
                    onClick={() => handleVote(review.id, 'dislike')}
                    className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                        hasVoted === 'dislike' ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500'
                    }`}
                  >
                    <FaThumbsDown /> {review.dislikes || 0}
                  </button>
                </div>
              </div>
            </div>
          )})}
        </div>
      )}
    </div>
  );
}