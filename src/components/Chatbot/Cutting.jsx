import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { MdArrowForward } from "react-icons/md";
import ContactUs from "./ContactUs";
import { getChatbotCutting } from "../../api/chatbotApi";

const Cutting = () => {
    const [tab, setTab] = useState("examples");
    const [previewTarget, setPreviewTarget] = useState(null);
    const [cuttingData, setCuttingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const sampleCategories = useMemo(() => {
        return cuttingData.reduce((categories, item) => {
            const variantName = item?.variant_name || "Wall Art";
            let category = categories.find((entry) => entry.title === variantName);

            if (!category) {
                category = {
                    id: variantName,
                    title: variantName,
                    description: item?.serviceImage?.sub_category || "Laser cutting examples",
                    items: [],
                };
                categories.push(category);
            }

            category.items.push(item);
            return categories;
        }, []);
    }, [cuttingData]);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError(null);

        getChatbotCutting()
            .then((res) => {
                if (!mounted) return;
                const dataList = Array.isArray(res?.data) ? res.data : Array.isArray(res?.data?.data) ? res.data.data : [];
                setCuttingData(dataList);
            })
            .catch((err) => {
                if (!mounted) return;
                setError(err?.message || "Unable to load cutting examples");
                console.error("Failed to fetch cutting examples:", err);
            })
            .finally(() => {
                if (!mounted) return;
                setLoading(false);
            });

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") setPreviewTarget(null);
            if (!previewTarget) return;

            const category = sampleCategories[previewTarget.categoryIndex];
            if (!category || category.items.length === 0) return;

            if (e.key === "ArrowLeft") {
                setPreviewTarget((prev) => ({
                    ...prev,
                    itemIndex: (prev.itemIndex - 1 + category.items.length) % category.items.length,
                }));
            }

            if (e.key === "ArrowRight") {
                setPreviewTarget((prev) => ({
                    ...prev,
                    itemIndex: (prev.itemIndex + 1) % category.items.length,
                }));
            }
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [previewTarget, sampleCategories]);

    return (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div>
                <h4 className="text-sm font-semibold text-slate-900">Laser Cutting</h4>
                
            </div>

            <div className="border-b border-slate-200">
                <div className="flex gap-6 text-sm">
                    <button
                        type="button"
                        onClick={() => setTab("examples")}
                        className={`pb-3 ${tab === "examples" ? "border-b-2 border-purple-500 text-purple-600" : "text-slate-500"}`}
                    >
                        Examples
                    </button>
                    <button
                        type="button"
                        onClick={() => setTab("purchase")}
                        className={`pb-3 ${tab === "purchase" ? "border-b-2 border-purple-500 text-purple-600" : "text-slate-500"}`}
                    >
                        Pricing & Orders
                    </button>
                </div>
            </div>

            {tab === "examples" && (
                <div className="space-y-5">
                    {loading ? (
                        <div className="py-4 text-center text-sm text-slate-500">Loading cutting examples…</div>
                    ) : error ? (
                        <div className="py-4 text-center text-sm text-red-600">{error}</div>
                    ) : sampleCategories.length > 0 ? (
                        sampleCategories.map((category, categoryIndex) => (
                            <div key={category.id} className="space-y-2">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <h5 className="text-sm font-semibold text-slate-900">{category.title}</h5>
                                        <p className="mt-0.5 text-xs text-slate-500">{category.description}</p>
                                    </div>
                                    <span className="rounded-full bg-purple-100 px-2.5 py-1 text-[11px] font-medium text-purple-700">
                                        {category.items.length} photos
                                    </span>
                                </div>

                                <div className="flex gap-2 overflow-x-auto py-1">
                                    {category.items.map((item, itemIndex) => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => setPreviewTarget({ categoryIndex, itemIndex })}
                                            className="shrink-0 h-16 w-20 rounded-md bg-slate-100 shadow-inner flex items-center justify-center overflow-hidden cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-purple-500 transition-all"
                                        >
                                            <img
                                                src={item.image_url}
                                                alt={item.variant_name || `Cutting ${itemIndex + 1}`}
                                                className="h-full w-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-4 text-center text-sm text-slate-500">No cutting examples available</div>
                    )}
                </div>
            )}

            {previewTarget !== null && createPortal(
                <div
                    className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60"
                    onClick={() => setPreviewTarget(null)}
                >
                    <div
                        className="relative w-11/12 h-11/12 md:w-3/4 md:h-3/4 rounded-xl bg-white shadow-2xl p-4 md:p-6 flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setPreviewTarget(null)}
                            className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 z-10"
                            aria-label="Close"
                        >
                            <IoClose size={20} />
                        </button>

                        <div className="relative w-full h-full flex items-center justify-center">
                            <button
                                onClick={() => {
                                    const category = sampleCategories[previewTarget.categoryIndex];
                                    if (!category) return;
                                    setPreviewTarget((prev) => ({
                                        ...prev,
                                        itemIndex: (prev.itemIndex - 1 + category.items.length) % category.items.length,
                                    }));
                                }}
                                className="absolute left-2 md:left-6 z-20 text-4xl md:text-6xl text-slate-700 hover:text-slate-900 font-light cursor-pointer select-none"
                            >
                                &lt;
                            </button>

                            <div className="flex-1 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 overflow-hidden max-w-2xl max-h-96 md:max-h-full">
                                {sampleCategories[previewTarget.categoryIndex]?.items?.[previewTarget.itemIndex] ? (
                                    <img
                                        src={sampleCategories[previewTarget.categoryIndex].items[previewTarget.itemIndex].image_url}
                                        alt={sampleCategories[previewTarget.categoryIndex].items[previewTarget.itemIndex].variant_name}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                ) : (
                                    <div className="text-7xl md:text-9xl font-bold text-slate-400">C{previewTarget.itemIndex + 1}</div>
                                )}
                            </div>

                            <button
                                onClick={() => {
                                    const category = sampleCategories[previewTarget.categoryIndex];
                                    if (!category) return;
                                    setPreviewTarget((prev) => ({
                                        ...prev,
                                        itemIndex: (prev.itemIndex + 1) % category.items.length,
                                    }));
                                }}
                                className="absolute right-2 md:right-6 z-20 text-4xl md:text-6xl text-slate-700 hover:text-slate-900 font-light cursor-pointer select-none"
                            >
                                &gt;
                            </button>
                        </div>

                        <p className="mt-4 text-center text-sm text-slate-600">
                            {sampleCategories[previewTarget.categoryIndex]?.title || "Cutting"} • {previewTarget.itemIndex + 1} / {sampleCategories[previewTarget.categoryIndex]?.items?.length || 0}
                        </p>
                    </div>
                </div>,
                document.body
            )}

            {tab === "purchase" && (
                <div className="rounded-xl border border-slate-100 bg-linear-to-br from-slate-50 to-purple-50 p-6">
                    <div className="space-y-4">
                        <div className="text-center space-y-1">
                            <p className="text-sm font-semibold text-slate-800">Get a Custom Quote</p>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Tell us your requirements and we&apos;ll make your one.
                            </p>
                        </div>

                        <div className="border-t border-slate-200" />

                        <ul className="space-y-2">
                            {[
                                "Fast turnaround",
                                "Custom sizes & materials",
                                "Competitive pricing",
                            ].map((point) => (
                                <li key={point} className="flex items-center gap-2 text-xs text-slate-600">
                                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0" />
                                    {point}
                                </li>
                            ))}
                        </ul>

                        <button
                            type="button"
                            onClick={() => setTab("contact")}
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-purple-500 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-purple-600 active:scale-95 transition-all duration-200"
                        >
                            Contact Us
                            <MdArrowForward size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            )}

            {tab === "contact" && <ContactUs />}
        </div>
    );
};

export default Cutting;
