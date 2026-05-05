import { IoArrowBack, IoChatbubbleEllipsesOutline, IoImage, IoSearchOutline, IoResize } from "react-icons/io5";

const ThreeDModelingReplacement = ({ onBack }) => {
    const whatsappUrl =
        "https://wa.me/94771509562?text=Hi%2C%20I%20need%20a%203D%20model%20replacement.%20Please%20let%20me%20know%20what%20details%20or%20photos%20you%20need%20from%20me.";

    const simpleExample = "Example: I have a broken 3D printed part. I need an exact copy to replace it.";

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

                <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-3 py-1.5 text-sm font-semibold text-teal-700">
                    <IoImage size={14} />
                    Replacement
                </div>

                <div>
                    <p className="text-base font-bold text-slate-800">Send us on WhatsApp:</p>

                    <div className="mt-3 space-y-2.5">
                        <div className="flex items-center gap-3 rounded-xl bg-teal-50 px-4 py-3 text-slate-700">
                            <IoImage className="shrink-0 text-teal-500" size={16} />
                            <span className="text-sm">Photo — front view</span>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl bg-teal-50 px-4 py-3 text-slate-700">
                            <IoImage className="shrink-0 text-teal-500" size={16} />
                            <span className="text-sm">Photo — side view</span>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl bg-teal-50 px-4 py-3 text-slate-700">
                            <IoImage className="shrink-0 text-teal-500" size={16} />
                            <span className="text-sm">Photo — top view</span>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl bg-teal-50 px-4 py-3 text-slate-700">
                            <IoSearchOutline className="shrink-0 text-teal-500" size={16} />
                            <span className="text-sm">Close-up of broken / detail part</span>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl bg-teal-50 px-4 py-3 text-slate-700">
                            <IoResize className="shrink-0 text-teal-500" size={16} />
                            <span className="text-sm">Size or dimensions</span>
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
                    Chat on WhatsApp
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

export default ThreeDModelingReplacement;
