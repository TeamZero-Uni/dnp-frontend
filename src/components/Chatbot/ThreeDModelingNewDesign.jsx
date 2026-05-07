import { IoArrowBack, IoChatbubbleEllipsesOutline, IoPencil } from "react-icons/io5";

const ThreeDModelingNewDesign = ({ onBack }) => {
    const whatsappUrl =
        "https://wa.me/94771509562?text=Hi%2C%20I%20want%20to%20add%20a%20new%203D%20design.%20Please%20tell%20me%20what%20details%20or%20photos%20you%20need%20and%20I%27ll%20send%20them.";

    const exampleItems = [
        "Sketch or photo",
        "Size",
        "Purpose",
        "Logo or text",
    ];

    const simpleExample = "Example: I want a 3D model for a name sign. Size: 20cm. I have a photo.";

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-4 py-4 text-white">
                <h4 className="text-2xl font-bold leading-tight">How can we help?</h4>
                <p className="mt-1 text-sm text-white/90">Get instant quotes</p>
            </div>

            <div className="space-y-4 p-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-800"
                >
                    <IoArrowBack size={16} />
                    Back
                </button>

                <div className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1.5 text-sm font-semibold text-violet-700">
                    <IoPencil size={14} />
                    New Design
                </div>

                <div>
                    <p className="text-base font-bold text-slate-800">Instructions:</p>

                    <div className="mt-3 space-y-2.5">
                        <div className="flex items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 text-slate-700">
                            <IoPencil className="shrink-0 text-violet-500" size={16} />
                            <span className="text-sm">Describe what you want</span>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 text-slate-700">
                            <IoPencil className="shrink-0 text-violet-500" size={16} />
                            <span className="text-sm">Write rough size (cm / inches)</span>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 text-slate-700">
                            <IoPencil className="shrink-0 text-violet-500" size={16} />
                            <span className="text-sm">Add photo or sketch if you have</span>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 text-slate-700">
                            <IoPencil className="shrink-0 text-violet-500" size={16} />
                            <span className="text-sm">Tell the purpose of the item</span>
                        </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm font-semibold text-slate-700">Simple example:</p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">{simpleExample}</p>
                    </div>
                </div>

                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-4 text-base font-bold text-white shadow-md transition-all hover:bg-emerald-600 active:scale-[0.99]"
                >
                    <IoChatbubbleEllipsesOutline size={18} />
                    Open WhatsApp
                </a>

                <button
                    type="button"
                    onClick={onBack}
                    className="mx-auto block text-sm font-semibold text-slate-400 hover:text-slate-600"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default ThreeDModelingNewDesign;