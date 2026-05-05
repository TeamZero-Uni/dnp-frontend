import React from 'react'
import {
  FiCheck, FiChevronRight, FiChevronLeft, FiUpload,
  FiX, FiMinus, FiPlus, FiSend, FiUser, FiMail, FiPhone,
} from "react-icons/fi";

function StepUploadFiles({ files, dragging, onDragOver, onDragLeave, onDrop, onBrowseClick, onFileChange, onRemoveFile }) {
  return (
    <div>
      <h2 className="text-lg font-black text-slate-900 mb-1">Upload Your Files</h2>
      <p className="text-sm text-slate-400 mb-5">STL, STEP, OBJ, DXF, AI, PDF — max 50MB each (up to 5 files)</p>

      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={onBrowseClick}
        className="relative border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer mb-4"
        style={
          dragging
            ? { borderColor: "#0284c7", background: "#e0f2fe" }
            : { borderColor: "#bfdbfe", background: "linear-gradient(135deg,#eff6ff,#f0fdf4)" }
        }
      >
        <input
          id="file-input"
          type="file"
          multiple
          className="hidden"
          onChange={onFileChange}
          accept=".stl,.step,.stp,.obj,.dxf,.ai,.pdf,.igs,.iges"
        />
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 text-white"
          style={{ background: "linear-gradient(135deg,#0284c7,#075985)", boxShadow: "0 6px 16px rgba(2,132,199,0.3)" }}
        >
          <FiUpload size={22} />
        </div>
        <p className="text-sm font-bold text-slate-700 mb-1">
          {dragging ? "Drop files here!" : "Drag & drop files here"}
        </p>
        <p className="text-xs text-slate-400 mb-3">or click to browse</p>
        <span
          className="inline-block px-5 py-2 rounded-full text-xs font-bold text-white"
          style={{ background: "linear-gradient(135deg,#0284c7,#075985)", boxShadow: "0 4px 12px rgba(2,132,199,0.3)" }}
        >
          Browse Files
        </span>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white border border-blue-100 rounded-xl px-4 py-3"
              style={{ boxShadow: "0 2px 8px rgba(2,132,199,0.08)" }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-black uppercase shrink-0"
                style={{ background: "linear-gradient(135deg,#0284c7,#075985)" }}
              >
                {file.name.split(".").pop()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">{file.name}</p>
                <p className="text-[10px] text-slate-400">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
              <button
                onClick={() => onRemoveFile(i)}
                className="w-7 h-7 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center transition-colors shrink-0"
              >
                <FiX size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      {files.length === 0 && (
        <p className="text-center text-xs text-slate-400 mt-3">
          No files required — you can skip this step and describe your project in notes.
        </p>
      )}
    </div>
  );
}

export default StepUploadFiles;