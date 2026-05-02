import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { getChatbotServices, getChatbotSizes, postLightLetterEstimate } from "../../api/api";

const LightLetter = () => {
    const sizeOptions = [
    { size: 1,  price: 100 },
    { size: 2,  price: 300 },
    { size: 3,  price: 500 },
    { size: 4,  price: 600 },
    { size: 5,  price: 700 },
    { size: 6,  price: 2100 },
    { size: 7,  price: 2200 },
    { size: 8,  price: 2300 },
    { size: 9,  price: 2400 },
    { size: 10, price: 2500 },
    { size: 11, price: 2650 },
    { size: 12, price: 2750 },
    { size: 13, price: 2850 },
    { size: 14, price: 2950 },
];

    const normalizeImageItem = (item, fallbackLabel) => ({
        ...item,
        image_url: item?.image_url || item?.image || item?.url || "",
        variant_name: item?.variant_name || item?.name || fallbackLabel,
    });

    const [formData, setFormData] = useState({
        quantity: "",
        sizeInch: "1",
    });
    const [quantityError, setQuantityError] = useState(null);
    const MAX_LETTERS = 500;
    const [showPrice, setShowPrice] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(null);
    const [sizePreviewIndex, setSizePreviewIndex] = useState(null);
    const [examples, setExamples] = useState([]);
    const [loadingExamples, setLoadingExamples] = useState(false);
    const [examplesError, setExamplesError] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [loadingSizes, setLoadingSizes] = useState(false);
    const [sizesError, setSizesError] = useState(null);
    const [estimating, setEstimating] = useState(false);
    const [estimateError, setEstimateError] = useState(null);
    const [estimateResult, setEstimateResult] = useState(null);
    const exampleCount = examples.length > 0 ? examples.length : 6;
    const sizeCount = sizes.length > 0 ? sizes.length : 2;

    const selectedPrice = sizeOptions.find((item) => String(item.size) === formData.sizeInch)?.price ?? 100;
    const totalPrice = formData.quantity ? Number(formData.quantity) * selectedPrice : 0;

    const handleChange = (field, value) => {
        // validate quantity
        if (field === "quantity") {
            const v = String(value).trim();
            if (v === "") {
                setQuantityError("Please enter quantity");
            } else if (!/^[0-9]+$/.test(v)) {
                setQuantityError("Enter a whole number");
            } else {
                const n = parseInt(v, 10);
                if (n < 1) setQuantityError("Minimum 1 letter");
                else if (n > MAX_LETTERS) setQuantityError(`Maximum ${MAX_LETTERS} letters`);
                else setQuantityError(null);
            }
        }

        setFormData((prev) => ({ ...prev, [field]: value }));
        // hide calculated price until user requests it again
        if (field === "quantity" || field === "sizeInch") setShowPrice(false);
    };

    const handleGetPrice = async () => {
        // final validation
        const q = String(formData.quantity).trim();
        if (!/^[0-9]+$/.test(q)) {
            setQuantityError("Enter a whole number");
            return;
        }
        const n = parseInt(q, 10);
        if (n < 1) {
            setQuantityError("Minimum 1 letter");
            return;
        }
        if (n > MAX_LETTERS) {
            setQuantityError(`Maximum ${MAX_LETTERS} letters`);
            return;
        }

        setEstimateError(null);
        setEstimateResult(null);
        setEstimating(true);

        try {
            const payload = {
                quantity: n,
                sizeInch: formData.sizeInch,
            };
            const res = await postLightLetterEstimate(payload);
            // prefer res.data if API uses { success, data }
            const data = res?.data ?? res;
            setEstimateResult(data);
            setShowPrice(true);
        } catch (err) {
            setEstimateError(err?.response?.data?.message || err?.message || "Estimate failed");
        } finally {
            setEstimating(false);
        }
    };

    useEffect(() => {
        let mounted = true;
        setLoadingExamples(true);
        setExamplesError(null);

        getChatbotServices()
            .then((res) => {
                if (!mounted) return;
                const services = res?.data ?? [];
                const allImages = services.flatMap((s) => s.images ?? []);
                const lightImages = allImages.filter((img) => {
                    const sub = (img.sub_category || "").toString().toLowerCase();
                    return sub === "light letter" || sub === "light-letter" || sub === "light_letter";
                });
                setExamples(lightImages);
            })
            .catch((err) => {
                if (!mounted) return;
                setExamplesError(err?.message || "Unable to load examples");
            })
            .finally(() => {
                if (!mounted) return;
                setLoadingExamples(false);
            });

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        let mounted = true;
        setLoadingSizes(true);
        setSizesError(null);

        getChatbotSizes()
            .then((res) => {
                if (!mounted) return;
                const sizeList = Array.isArray(res?.data) ? res.data : Array.isArray(res?.data?.data) ? res.data.data : [];
                setSizes(sizeList.map((item, index) => normalizeImageItem(item, `Size ${index + 1}`)));
            })
            .catch((err) => {
                if (!mounted) return;
                setSizesError(err?.message || "Unable to load sizes");
            })
            .finally(() => {
                if (!mounted) return;
                setLoadingSizes(false);
            });

        return () => {
            mounted = false;
        };
    }, []);

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

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") setSizePreviewIndex(null);
            if (sizePreviewIndex === null) return;
            if (e.key === "ArrowLeft") {
                setSizePreviewIndex((prev) => (prev === 1 ? sizeCount : prev - 1));
            }
            if (e.key === "ArrowRight") {
                setSizePreviewIndex((prev) => (prev === sizeCount ? 1 : prev + 1));
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [sizePreviewIndex, sizeCount]);

    return (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Example photos - small horizontal strip */}
            <div>
                <h4 className="text-sm font-semibold text-slate-900">Examples</h4>
                <div className="mt-2 flex gap-2 overflow-x-auto py-1">
                    {loadingExamples ? (
                        <div className="py-2 text-sm text-slate-500">Loading examples…</div>
                    ) : examplesError ? (
                        <div className="py-2 text-sm text-red-600">{examplesError}</div>
                    ) : examples.length > 0 ? (
                        examples.map((img, idx) => (
                            <div
                                key={img.id ?? idx}
                                onClick={() => setPreviewIndex(idx + 1)}
                                role="button"
                                tabIndex={0}
                                className="shrink-0 h-12 w-16 rounded-md bg-slate-100 shadow-inner flex items-center justify-center overflow-hidden cursor-pointer"
                            >
                                <img src={img.image_url} alt={img.sub_category || `Example ${idx + 1}`} className="h-full w-full object-cover" />
                            </div>
                        ))
                    ) : (
                        [1, 2, 3, 4, 5, 6].map((n) => (
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
                        ))
                    )}
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
                                {examples.length > 0 && examples[previewIndex - 1] ? (
                                    <img src={examples[previewIndex - 1].image_url} alt={examples[previewIndex - 1].sub_category || `Example ${previewIndex}`} className="max-h-full max-w-full object-contain" />
                                ) : (
                                    <div className="text-7xl md:text-9xl font-bold text-slate-400">A{previewIndex}</div>
                                )}
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
                                {sizes.length > 0 && sizes[sizePreviewIndex - 1] ? (
                                    <img src={sizes[sizePreviewIndex - 1].image_url} alt={sizes[sizePreviewIndex - 1].variant_name || `Size ${sizePreviewIndex}`} className="max-h-full max-w-full object-contain" />
                                ) : (
                                    <div className="text-7xl md:text-9xl font-bold text-slate-400">S{sizePreviewIndex}</div>
                                )}
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
                    {loadingSizes ? (
                        <div className="py-2 text-sm text-slate-500">Loading sizes…</div>
                    ) : sizesError ? (
                        <div className="py-2 text-sm text-red-600">{sizesError}</div>
                    ) : sizes.length > 0 ? (
                        sizes.map((item, idx) => (
                            <div
                                key={item.id ?? idx}
                                className="shrink-0 w-28 cursor-pointer"
                                onClick={() => setSizePreviewIndex(idx + 1)}
                            >
                                <div className="h-20 w-full rounded-md bg-slate-100 overflow-hidden flex items-center justify-center hover:bg-slate-200 transition-colors">
                                    <img src={item.image_url} alt={item.variant_name || `Size ${idx + 1}`} className="h-full w-full object-cover" />
                                </div>
                            </div>
                        ))
                    ) : (
                        [
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
                        ))
                    )}
                </div>
            </div>

            
            {/* Price form */}
<div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
    <h4 className="text-base font-semibold text-slate-900 border-b border-slate-200 pb-2">💰 Get Your Price</h4>

    <label className="space-y-1">
        <span className="block text-sm font-medium text-slate-700">How many letters?</span>
        <input
            type="number"
            min="1"
            max="500"
            step="1"
            inputMode="numeric"
            value={formData.quantity}
            onChange={(event) => handleChange("quantity", event.target.value)}
            placeholder="e.g., 10"
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all"
        />
        {quantityError && (
            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                ⚠️ {quantityError}
            </p>
        )}
    </label>

    <label className="space-y-1">
        <span className="block text-sm font-medium text-slate-700 ">Select Size</span>
        <select
            value={formData.sizeInch}
            onChange={(event) => handleChange("sizeInch", event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none focus:border-slate-500 focus:ring-2 focus:ring-slate-200 transition-all "
        >
            {sizeOptions.map((item) => (
                <option key={item.size} value={item.size}>
                    {item.size} inch{item.size > 1 ? "es" : ""} — Rs {item.price}
                </option>
            ))}
        </select>
    </label>

    <button
        type="button"
        onClick={handleGetPrice}
        className="h-11 w-full rounded-xl bg-slate-800 text-sm font-semibold text-white transition-all hover:bg-slate-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 pt-2.5 mt-4"
        disabled={!formData.quantity || quantityError || estimating}
    >
        {estimating ? (
            <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
                Calculating…
            </span>
        ) : "Get Price →"}
    </button>

    {estimateError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-xs text-red-600 flex items-center gap-1">⚠️ {estimateError}</p>
        </div>
    )}

    {estimateResult && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 space-y-1">
            <p className="text-xs font-medium text-green-700 uppercase tracking-wide">Estimated Price</p>
            <p className="text-2xl font-bold text-green-800">
                Rs {estimateResult.total ?? estimateResult.estimatedPrice ?? estimateResult.price ?? totalPrice}
            </p>
            
            {estimateResult.details && (
                <p className="text-xs text-green-600 mt-1">{estimateResult.details}</p>
            )}
        </div>
    )}
</div>
        </div>
    );
};

export default LightLetter;