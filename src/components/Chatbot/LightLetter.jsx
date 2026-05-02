import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

const LightLetter = () => {
    const smallSizeGuide = [
        { size: 1, price: 100 },
        { size: 2, price: 300 },
        { size: 3, price: 500 },
        { size: 4, price: 600 },
        { size: 5, price: 700 },
    ];

    const [formData, setFormData] = useState({
        quantity: "",
        sizeInch: "1",
    });
    const [showPrice, setShowPrice] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(null);
    const [sizePreviewIndex, setSizePreviewIndex] = useState(null);
    const exampleCount = 6;
    const sizeCount = 2;

    const selectedPrice = smallSizeGuide.find((item) => String(item.size) === formData.sizeInch)?.price ?? 100;
    const totalPrice = formData.quantity ? Number(formData.quantity) * selectedPrice : 0;

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // hide calculated price until user requests it again
        if (field === "quantity" || field === "sizeInch") setShowPrice(false);
    };

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

    return (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Example photos - small horizontal strip */}
            <div>
                <h4 className="text-sm font-semibold text-slate-900">Examples</h4>
                <div className="mt-2 flex gap-2 overflow-x-auto py-1">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <div
                            key={n}
                            onClick={() => setPreviewIndex(n)}
                            role="button"
                            tabIndex={0}
                            className="shrink-0 h-12 w-16 rounded-md bg-slate-100 shadow-inner flex items-center justify-center text-sm font-medium text-slate-700 cursor-pointer"
                            aria-hidden
                        >
                            A{n}
                        </div>
                    ))}
                </div>
            </div>

            {/* Portal: Preview modal for examples - truly full screen outside chatbot */}
            {previewIndex !== null && createPortal(
                <div
                    className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60"
                    onClick={() => setPreviewIndex(null)}
                >
                    <div
                        className="relative w-11/12 h-11/12 md:w-3/4 md:h-3/4 rounded-xl bg-white shadow-2xl p-4 md:p-6 flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setPreviewIndex(null)}
                            className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 z-10"
                            aria-label="Close"
                        >
                            <IoClose size={20} />
                        </button>

                        {/* Photo display - large and centered */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Left arrow */}
                            <button
                                onClick={() => setPreviewIndex((prev) => (prev === 1 ? exampleCount : prev - 1))}
                                className="absolute left-2 md:left-6 z-20 text-4xl md:text-6xl text-slate-700 hover:text-slate-900 font-light cursor-pointer select-none"
                            >
                                &lt;
                            </button>

                            {/* Photo area */}
                            <div className="flex-1 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 overflow-hidden max-w-2xl max-h-96 md:max-h-full">
                                <div className="text-7xl md:text-9xl font-bold text-slate-400">A{previewIndex}</div>
                            </div>

                            {/* Right arrow */}
                            <button
                                onClick={() => setPreviewIndex((prev) => (prev === exampleCount ? 1 : prev + 1))}
                                className="absolute right-2 md:right-6 z-20 text-4xl md:text-6xl text-slate-700 hover:text-slate-900 font-light cursor-pointer select-none"
                            >
                                &gt;
                            </button>
                        </div>

                        {/* Counter at bottom */}
                        <p className="mt-4 text-center text-sm text-slate-600">{previewIndex} / {exampleCount}</p>
                    </div>
                </div>,
                document.body
            )}

            {/* Portal: Preview modal for sizes - same layout */}
            {sizePreviewIndex !== null && createPortal(
                <div
                    className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60"
                    onClick={() => setSizePreviewIndex(null)}
                >
                    <div
                        className="relative w-11/12 h-11/12 md:w-3/4 md:h-3/4 rounded-xl bg-white shadow-2xl p-4 md:p-6 flex flex-col items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSizePreviewIndex(null)}
                            className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200 z-10"
                            aria-label="Close"
                        >
                            <IoClose size={20} />
                        </button>

                        {/* Photo display - large and centered */}
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* Left arrow */}
                            <button
                                onClick={() => setSizePreviewIndex((prev) => (prev === 1 ? sizeCount : prev - 1))}
                                className="absolute left-2 md:left-6 z-20 text-4xl md:text-6xl text-slate-700 hover:text-slate-900 font-light cursor-pointer select-none"
                            >
                                &lt;
                            </button>

                            {/* Photo area */}
                            <div className="flex-1 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 overflow-hidden max-w-2xl max-h-96 md:max-h-full">
                                <div className="text-7xl md:text-9xl font-bold text-slate-400">S{sizePreviewIndex}</div>
                            </div>

                            {/* Right arrow */}
                            <button
                                onClick={() => setSizePreviewIndex((prev) => (prev === sizeCount ? 1 : prev + 1))}
                                className="absolute right-2 md:right-6 z-20 text-4xl md:text-6xl text-slate-700 hover:text-slate-900 font-light cursor-pointer select-none"
                            >
                                &gt;
                            </button>
                        </div>

                        {/* Counter at bottom */}
                        <p className="mt-4 text-center text-sm text-slate-600">{sizePreviewIndex} / {sizeCount}</p>
                    </div>
                </div>,
                document.body
            )}

            {/* Our sizes preview - two simple photos */}
            <div>
                <h4 className="text-sm font-semibold text-slate-900">Our Sizes</h4>
                <div className="mt-2 flex gap-3 overflow-x-auto py-1">
                    {[
                        { key: "s", label: "Small" },
                        { key: "m", label: "Medium" },
                    ].map((it, idx) => (
                        <div 
                            key={it.key} 
                            className="shrink-0 w-28 cursor-pointer"
                            onClick={() => setSizePreviewIndex(idx + 1)}
                        >
                            <div className="h-20 w-full rounded-md bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors">
                                {it.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Price form */}
            <div className="space-y-4">
                <h4 className="text-base font-semibold text-slate-900">Get Your Price:</h4>

                <label className="space-y-2">
                    <span className="block text-sm font-medium text-slate-700">How many letters?</span>
                    <input
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={(event) => handleChange("quantity", event.target.value)}
                        placeholder="e.g., 10"
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-400"
                    />
                </label>

                <label className="space-y-2">
                    <span className="block text-sm font-medium text-slate-700">Size</span>
                    <select
                        value={formData.sizeInch}
                        onChange={(event) => handleChange("sizeInch", event.target.value)}
                        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
                    >
                        {smallSizeGuide.map((item) => (
                            <option key={item.size} value={item.size}>
                                {item.size} inch{item.size > 1 ? "es" : ""}
                            </option>
                        ))}
                    </select>
                </label>

                <button
                    type="button"
                    onClick={() => setShowPrice(true)}
                    className="h-10 w-full rounded-lg bg-slate-300 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-400 disabled:opacity-60"
                    disabled={!formData.quantity}
                >
                    Get Price
                </button>

                {showPrice && formData.quantity && (
                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                        <p className="text-xs text-slate-600">Total Price:</p>
                        <p className="mt-1 text-lg font-semibold text-slate-900">Rs {totalPrice}</p>
                        <p className="text-[13px] text-slate-600 mt-1">
                            {formData.quantity} × Rs {selectedPrice}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LightLetter;