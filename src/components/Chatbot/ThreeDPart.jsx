import React from "react";

const partTypes = ["Prototype", "Mechanical Part", "Product Model", "Custom Design"];

const ThreeDPart = () => {
    return (
        <div className="space-y-4">
            <div>
                <h4 className="text-sm font-bold text-slate-800">3D Part</h4>
                <p className="text-xs text-slate-500 mt-1">Share your part requirement and preferred finish.</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {partTypes.map((item) => (
                    <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700">
                        {item}
                    </div>
                ))}
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                Upload file type (STL/STEP/OBJ) and quantity in the next step.
            </div>
        </div>
    );
};

export default ThreeDPart;