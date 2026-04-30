import React from "react";

const options = ["Acrylic", "Metal", "RGB Lighting", "Outdoor Use"];

const LightLetter = () => {
    return (
        <div className="space-y-4">
            <div>
                <h4 className="text-sm font-bold text-slate-800">Light Letter</h4>
                <p className="text-xs text-slate-500 mt-1">Tell us your sign details for a quick quote.</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {options.map((item) => (
                    <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700">
                        {item}
                    </div>
                ))}
            </div>

            <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs text-indigo-700">
                Add text, size, and preferred material in the next step.
            </div>
        </div>
    );
};

export default LightLetter;