import React, { useState } from 'react';
import { FaStar, FaRegStar, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { HiUserCircle } from 'react-icons/hi';

function ReviewSection() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Nimal Silva",
      date: "1 day ago",
      rating: 5,
      comment: "Great quality! Printed perfectly and arrived fast. Will buy again.",
    },
    {
      id: 2,
      name: "Sarah J.",
      date: "3 days ago",
      rating: 4,
      comment: "The file is excellent, but the supports were a bit tricky to remove. Still a good model.",
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  const handleAddComment = () => {
    if (newComment.trim() === "" || selectedRating === 0) {
      alert("Please add both a comment and a star rating!");
      return;
    }

    const newReviewEntry = {
      id: Date.now(),
      name: "You (Guest User)",
      date: "Just now",
      rating: selectedRating,
      comment: newComment,
    };

    setReviews([newReviewEntry, ...reviews]);
    
    setNewComment("");
    setSelectedRating(0);
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-6 uppercase tracking-wider">Customer Reviews</h3>

      {/* --- Review Input Section --- */}
      <div className="flex gap-4 mb-10 pb-8 border-b border-slate-100">
        <HiUserCircle className="text-slate-300 w-12 h-12 flex-shrink-0" />
        <div className="flex-1">
          <input 
            type="text" 
            placeholder="Add a public review..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full border-b border-slate-200 py-2 focus:outline-none focus:border-blue-500 text-sm"
          />
          
          <div className="flex items-center justify-between mt-4">
            {/* Star Rating Selection Logic */}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setSelectedRating(star)}>
                  {star <= selectedRating ? (
                    <FaStar className="text-yellow-400 w-5 h-5" />
                  ) : (
                    <FaRegStar className="text-slate-200 w-5 h-5" />
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => {setNewComment(""); setSelectedRating(0);}}
                className="px-5 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddComment}
                className="px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-all active:scale-95"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Reviews List --- */}
      <div className="space-y-6 ml-14 ">
        {reviews.map((rev) => (
          <div key={rev.id} className="flex gap-4 animate-fadeIn">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
              <HiUserCircle className="text-slate-400 w-full h-full" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 text-sm">{rev.name}</span>
                <span className="text-slate-400 text-xs">{rev.date}</span>
              </div>
              <div className="flex gap-0.5 my-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'text-yellow-400' : 'text-slate-100'}`} />
                ))}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">{rev.comment}</p>
              <div className="flex gap-4 mt-3 text-slate-400 text-xs font-bold">
                <button className="flex items-center gap-1 hover:text-blue-600"><FaThumbsUp /> Helpful</button>
                <button className="flex items-center gap-1 hover:text-rose-600"><FaThumbsDown /> Dislike</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewSection;