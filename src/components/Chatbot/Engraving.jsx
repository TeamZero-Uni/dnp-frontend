import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { MdArrowForward } from "react-icons/md";
import ContactUs from "./ContactUs";
import { getEngravingExamples } from "../../api/chatbotApi";

const Engraving = () => {
    const [tab, setTab] = useState("examples");
    const [previewIndex, setPreviewIndex] = useState(null);
    const [engravingData, setEngravingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const exampleCount = engravingData.length;

    // Fetch engraving examples from API
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError(null);

        getEngravingExamples()
            .then((res) => {
                if (!mounted) return;
                const dataList = Array.isArray(res?.data) ? res.data : Array.isArray(res?.data?.data) ? res.data.data : [];
                setEngravingData(dataList);
            })
            .catch((err) => {
                if (!mounted) return;
                setError(err?.message || "Unable to load engraving examples");
                console.error("Failed to fetch engraving examples:", err);
            })
            .finally(() => {
                if (!mounted) return;
                setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, []);

    // Keyboard navigation for preview
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") setPreviewIndex(null);
            if (previewIndex === null) return;
            if (e.key === "ArrowLeft") {
                setPreviewIndex((prev) => (prev === 1 ? exampleCount : prev - 1));
            }
            if (e.key === "ArrowRight") {
                setPreviewIndex((prev) => (prev === exampleCount ? 1 : prev + 1));
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [previewIndex, exampleCount]);

    const handleCalculate = () => {
        console.log({ material: selectedMaterial, depth, size });
    };

    return (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div>
                <h4 className="text-sm font-semibold text-slate-900">Laser Engraving</h4>
                <p className="mt-1 text-xs text-slate-500">Surface engraving</p>
            </div>

            {/* ── Tabs ── */}
            <div className="border-b border-slate-200">
                <div className="flex gap-6 text-sm">
                    <button
                        type="button"
                        onClick={() => setTab("examples")}
                        className={`pb-3 font-medium transition-colors ${
                            tab === "examples"
                                ? "border-b-2 border-orange-500 text-orange-600"
                                : "text-slate-400 hover:text-slate-600"
                        }`}
                    >
                        Examples
                    </button>
                    {/* ── NEW professional tab name ── */}
                    <button
                        type="button"
                        onClick={() => setTab("purchase")}
                        className={`pb-3 font-medium transition-colors ${
                            tab === "purchase"
                                ? "border-b-2 border-orange-500 text-orange-600"
                                : "text-slate-400 hover:text-slate-600"
                        }`}
                    >
                        Pricing & Orders
                    </button>
                </div>
            </div>

            {tab === "examples" && (
                <div>
                    {loading ? (
                        <div className="py-4 text-center text-sm text-slate-500">Loading examples…</div>
                    ) : error ? (
                        <div className="py-4 text-center text-sm text-red-600">{error}</div>
                    ) : engravingData.length > 0 ? (
                        <div className="mt-2 flex gap-2 overflow-x-auto py-1">
                            {engravingData.map((item, idx) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setPreviewIndex(idx + 1)}
                                    className="shrink-0 h-16 w-20 rounded-md bg-slate-100 shadow-inner flex items-center justify-center overflow-hidden cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-orange-500 transition-all"
                                >
                                    <img src={item.image_url || item.image} alt={item.variant_name || item.name || `Example ${idx + 1}`} className="h-full w-full object-cover" />
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="py-4 text-center text-sm text-slate-500">No examples available</div>
                    )}
                </div>
            )}

            {/* Portal: Preview modal */}
            {previewIndex !== null && createPortal(
                <div
                    className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60"
                    onClick={() => setPreviewIndex(null)}
                >
                    <div
                        className="relative w-11/12 h-11/12 md:w-3/4 md:h-3/4 rounded-xl bg-white shadow-2xl p-4 md:p-6 flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setPreviewIndex(null)}
                            className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 z-10"
                            aria-label="Close"
                        >
                            <IoClose size={20} />
                        </button>

                        <div className="relative w-full h-full flex items-center justify-center">
                            <button
                                onClick={() => setPreviewIndex((prev) => (prev === 1 ? exampleCount : prev - 1))}
                                className="absolute left-2 md:left-6 z-20 text-4xl md:text-6xl text-slate-700 hover:text-slate-900 font-light cursor-pointer select-none"
                            >
                                &lt;
                            </button>

                            <div className="flex-1 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 overflow-hidden max-w-2xl max-h-96 md:max-h-full">
                                {engravingData[previewIndex - 1] ? (
                                    <img
                                        src={engravingData[previewIndex - 1].image_url || engravingData[previewIndex - 1].image}
                                        alt={engravingData[previewIndex - 1].variant_name || engravingData[previewIndex - 1].name || `Example ${previewIndex}`}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                ) : (
                                    <div className="text-7xl md:text-9xl font-bold text-slate-400">E{previewIndex}</div>
                                )}
                            </div>

                            <button
                                onClick={() => setPreviewIndex((prev) => (prev === exampleCount ? 1 : prev + 1))}
                                className="absolute right-2 md:right-6 z-20 text-4xl md:text-6xl text-slate-700 hover:text-slate-900 font-light cursor-pointer select-none"
                            >
                                &gt;
                            </button>
                        </div>

                        <p className="mt-4 text-center text-sm text-slate-600">{previewIndex} / {exampleCount}</p>
                    </div>
                </div>,
                document.body
            )}

            {/* ── Request a Quote tab ── */}
            {tab === "purchase" && (
                <div className="rounded-xl border border-slate-100 bg-linear-to-br from-slate-50 to-orange-50 p-6">
                    <div className="space-y-4">

                        {/* Header */}
                        <div className="text-center space-y-1">
                            <p className="text-sm font-semibold text-slate-800">Get a Custom Quote</p>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Tell us your requirements and we'll make your one.
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-slate-200" />

                        {/* Feature bullets */}
                        <ul className="space-y-2">
                            {["Fast turnaround", "Custom sizes & materials", "Competitive pricing"].map((point) => (
                                <li key={point} className="flex items-center gap-2 text-xs text-slate-600">
                                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shrink-0" />
                                    {point}
                                </li>
                            ))}
                        </ul>

                        {/* ── Modern Contact Us button ── */}
                        <button
                            type="button"
                            onClick={() => setTab("contact")}
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-orange-600 active:scale-95 transition-all duration-200"
                        >
                            Contact Us
                            <MdArrowForward
                                size={16}
                                className="transition-transform duration-200 group-hover:translate-x-1"
                            />
                        </button>
                    </div>
                </div>
            )}

            {tab === "contact" && (
                <ContactUs />
            )}
        </div>
    );
};

export default Engraving;