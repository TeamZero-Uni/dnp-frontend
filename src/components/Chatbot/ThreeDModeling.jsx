import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoArrowBack, IoPencil, IoFolderOpen, IoConstruct, IoClose } from "react-icons/io5";

// workItems will be loaded from the API

const situationCards = [
    {
        id: "new-design",
        title: "New Design",
        subtitle: "I have an idea",
        icon: IoPencil,
        gradient: "from-violet-600 to-fuchsia-500",
    },
    {
        id: "my-file",
        title: "My File",
        subtitle: "STL · OBJ · 3MF",
        icon: IoFolderOpen,
        gradient: "from-blue-600 to-indigo-500",
    },
    {
        id: "replacement",
        title: "Replacement",
        subtitle: "Copy my object",
        icon: IoConstruct,
        gradient: "from-teal-600 to-cyan-600",
    },
];

const ThreeDModeling = ({ onBack, onSelectSituation }) => {
    const [previewIndex, setPreviewIndex] = useState(null);
    const [workItems, setWorkItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") setPreviewIndex(null);
            if (previewIndex === null) return;
            if (e.key === "ArrowLeft") {
                setPreviewIndex((prev) => (prev === 0 ? workItems.length - 1 : prev - 1));
            }
            if (e.key === "ArrowRight") {
                setPreviewIndex((prev) => (prev === workItems.length - 1 ? 0 : prev + 1));
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [previewIndex, workItems.length]);

    // fetch images from API
    useEffect(() => {
        let mounted = true;
        setLoading(true);
        fetch("http://localhost:5000/api/v1/chatbot/modeling")
            .then((res) => res.json())
            .then((json) => {
                if (!mounted) return;
                const items = (json?.data || []).map((it) => ({
                    title: it.sub_category || `Model ${it.id}`,
                    image: it.image_url || "",
                    id: it.id,
                }));
                setWorkItems(items);
            })
            .catch(() => {
                // keep empty list on error
                setWorkItems([]);
            })
            .finally(() => mounted && setLoading(false));

        return () => { mounted = false; };
    }, []);

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
            <div className="bg-linear-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-4 py-4 text-white">
                <h4 className="text-2xl font-bold leading-tight">How can we help?</h4>
                <p className="mt-1 text-sm text-white/90">Get instant quotes</p>
            </div>

            <div className="space-y-4 p-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center gap-2 text-2sm font-semibold text-indigo-700 hover:text-indigo-800"
                >
                    <IoArrowBack size={16} />
                    Back
                </button>

                <div>
                    <p className="text-lg font-bold uppercase tracking-wide text-slate-500">Our 3D modeling work</p>

                    <div className="mt-3 flex gap-3 overflow-x-auto pb-2 px-1">
                        {workItems.map((item, index) => (
                            <button
                                type="button"
                                key={item.title}
                                onClick={() => setPreviewIndex(index)}
                                className="h-28 w-44 sm:w-48 md:w-52 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md hover:ring-2 hover:ring-indigo-400 cursor-pointer"
                            >
                                <div className="h-24 w-full bg-slate-200 sm:h-28 md:h-32">
                                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                                </div>
                                <p className="truncate px-2 py-1.5 text-[11px] font-semibold text-slate-700">{item.title}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <p className="text-center text-xs font-medium text-slate-400">— Pick your situation —</p>

                <div className="flex justify-center gap-2 w-full">
                                        {situationCards.map((card) => (
                                                <button
                                                        key={card.id}
                                                        type="button"
                                                        onClick={() => {
                                                                if (card.id === "new-design") {
                                                                        onSelectSituation?.({ id: "3d-modeling-new-design", title: "New Design" });
                                                                } else if (card.id === "my-file") {
                                                                        onSelectSituation?.({ id: "3d-modeling-my-file", title: "My File" });
                                                                } else if (card.id === "replacement") {
                                                                        onSelectSituation?.({ id: "3d-modeling-replacement", title: "Replacement" });
                                                                }
                                                        }}
                                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-100 bg-white px-3 py-2 shadow-sm transition-all hover:border-slate-200 hover:bg-slate-50 hover:shadow-md active:scale-[0.98]"
                                                >
                                                        <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-linear-to-br ${card.gradient}`}>
                                                                <card.icon size={12} className="text-white" />
                                                        </div>
                                                        <span className="truncate text-[11px] font-semibold text-slate-700">{card.title}</span>
                                                </button>
                                        ))}
                                </div>

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
                                    onClick={() => setPreviewIndex((prev) => (prev === 0 ? workItems.length - 1 : prev - 1))}
                                    className="absolute left-2 md:left-6 z-20 text-4xl md:text-6xl text-slate-700 hover:text-slate-900 font-light cursor-pointer select-none"
                                >
                                    &lt;
                                </button>

                                <div className="flex-1 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 overflow-hidden max-w-2xl max-h-96 md:max-h-full">
                                    {workItems[previewIndex] ? (
                                        <img
                                            src={workItems[previewIndex].image}
                                            alt={workItems[previewIndex].title}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    ) : (
                                        <div className="text-7xl md:text-9xl font-bold text-slate-400">M{previewIndex + 1}</div>
                                    )}
                                </div>

                                <button
                                    onClick={() => setPreviewIndex((prev) => (prev === workItems.length - 1 ? 0 : prev + 1))}
                                    className="absolute right-2 md:right-6 z-20 text-4xl md:text-6xl text-slate-700 hover:text-slate-900 font-light cursor-pointer select-none"
                                >
                                    &gt;
                                </button>
                            </div>

                            <p className="mt-4 text-center text-sm text-slate-600">{workItems[previewIndex]?.title} • {previewIndex + 1} / {workItems.length}</p>
                        </div>
                    </div>,
                    document.body
                )}
            </div>
        </div>
    );
};

export default ThreeDModeling;