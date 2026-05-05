import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { getChatbotMaterials, postThreeDPartEstimate } from "../../api/chatbotApi";

const ThreeDPart = () => {
    const [tab, setTab] = useState("examples");
    const [previewIndex, setPreviewIndex] = useState(null);
    const [materials, setMaterials] = useState([]);
    const [loadingMaterials, setLoadingMaterials] = useState(false);
    const [materialsError, setMaterialsError] = useState(null);

    // ── new states ───────────────────────────────────────
    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [weight, setWeight] = useState("");
    const [weightError, setWeightError] = useState(null);
    const [estimating, setEstimating] = useState(false);
    const [estimateError, setEstimateError] = useState(null);
    const [estimateResult, setEstimateResult] = useState(null);

    const activeItem = previewIndex ? materials[previewIndex - 1] : null;

    const handleClosePreview = () => {
        setPreviewIndex(null);
    };

    // ── weight validation ────────────────────────────────
    const handleWeightChange = (value) => {
        setWeight(value);
        setEstimateResult(null);
        setEstimateError(null);

        if (value === "") {
            setWeightError("Weight is required");
            return;
        }
       
        if (Number(value) <= 0) {
            setWeightError("Weight must be greater than 0");
            return;
        }
        if (Number(value) > 10000) {
            setWeightError("Weight cannot exceed 10,000 grams");
            return;
        }

        setWeightError(null);
    };

    // ── calculate price ──────────────────────────────────
    const handleGetMaterialPrice = async () => {
        if (!selectedMaterial) {
            setEstimateError("Please select a material.");
            return;
        }

        if (!weight || weightError) return;

        setEstimating(true);
        setEstimateError(null);
        setEstimateResult(null);

        try {
            const selectedItem = materials.find((item) => item.variant_name === selectedMaterial);
            const response = await postThreeDPartEstimate({
                material: selectedMaterial,
                weight: Number(weight),
            });

            setEstimateResult(response?.data ?? response);
        } catch (error) {
            setEstimateError(error?.response?.data?.message || error?.message || "Estimate failed");
        } finally {
            setEstimating(false);
        }
        
    };

    useEffect(() => {
        let mounted = true;
        setLoadingMaterials(true);
        setMaterialsError(null);

        getChatbotMaterials()
            .then((response) => {
                if (!mounted) return;
                const items = Array.isArray(response?.data)
                    ? response.data
                    : Array.isArray(response?.data?.data)
                    ? response.data.data
                    : [];
                setMaterials(items);
                if (items.length > 0) {
                    setSelectedMaterial(items[0].variant_name); // ← set default material
                }
            })
            .catch((error) => {
                if (!mounted) return;
                setMaterialsError(error?.message || "Unable to load materials");
            })
            .finally(() => {
                if (!mounted) return;
                setLoadingMaterials(false);
            });

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        const onKey = (event) => {
            if (event.key === "Escape") setPreviewIndex(null);
            if (previewIndex === null) return;
            if (event.key === "ArrowLeft") {
                setPreviewIndex((current) => (current === 1 ? materials.length : current - 1));
            }
            if (event.key === "ArrowRight") {
                setPreviewIndex((current) => (current === materials.length ? 1 : current + 1));
            }
        };

        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [previewIndex, materials.length]);

    return (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div>
                <h4 className="text-sm font-semibold text-slate-900">3D Parts</h4>
                <p className="mt-1 text-xs text-slate-500">Custom parts & prototypes</p>
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
                        onClick={() => setTab("calculate")}
                        className={`pb-3 ${tab === "calculate" ? "border-b-2 border-purple-500 text-purple-600" : "text-slate-500"}`}
                    >
                        Calculate Price
                    </button>
                </div>
            </div>

            {tab === "examples" && (
                <div className="space-y-3">
                    {loadingMaterials ? (
                        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">Loading materials…</div>
                    ) : materialsError ? (
                        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-red-600">{materialsError}</div>
                    ) : materials.length > 0 ? (
                        materials.map((item, index) => (
                            <button
                                key={item.id ?? item.variant_name ?? index}
                                type="button"
                                onClick={() => setPreviewIndex(index + 1)}
                                className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-2 text-left shadow-sm transition-colors hover:bg-slate-50"
                            >
                                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                                    <img src={item.image_url} alt={item.variant_name || "3D material"} className="h-full w-full object-cover" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="truncate text-sm font-semibold text-slate-900">{item.variant_name || "3D Material"}</div>
                                    <div className="mt-1 text-xs text-slate-500">3D printing material example</div>
                                    <span className="mt-2 inline-flex rounded bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                                        {item.variant_name || "Material"}
                                    </span>
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">No materials found.</div>
                    )}
                </div>
            )}

            {tab === "calculate" && (
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="space-y-3">

                        {/* Material Select */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Material</label>
                            <select
                                value={selectedMaterial}
                                onChange={(e) => {
                                    setSelectedMaterial(e.target.value);
                                    setEstimateResult(null);
                                    setEstimateError(null);
                                }}
                                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
                            >
                                {materials.length > 0 ? (
                                    materials.map((item) => (
                                        <option key={item.id} value={item.variant_name}>
                                            {item.variant_name}
                                        </option>
                                    ))
                                ) : (
                                    <option>No materials available</option>
                                )}
                            </select>
                        </div>

                        {/* Weight Input */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Weight (grams)</label>
                            <input
                                type="number"
                                min="1"
                                step="1"
                                inputMode="numeric"
                                value={weight}
                                onChange={(e) => handleWeightChange(e.target.value)}
                                placeholder="e.g., 500"
                                className={`h-12 w-full rounded-xl border px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-400 ${
                                    weightError ? "border-red-400 bg-red-50" : "border-slate-300 bg-white"
                                }`}
                            />
                            {weightError && (
                                <p className="mt-1 text-xs text-red-500">⚠️ {weightError}</p>
                            )}
                        </div>

                        {estimateError && (
                            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
                                {estimateError}
                            </div>
                        )}

                        {/* Price Result */}
                        {estimateResult && !weightError && (
                            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 space-y-1">
                                <p className="text-xs font-medium text-green-700 uppercase tracking-wide">Estimated Price</p>
                                <p className="text-2xl font-bold text-green-800">
                                    Rs {estimateResult.total ?? estimateResult.estimatedPrice ?? estimateResult.price ?? "-"}
                                </p>
                                <p className="text-xs text-green-600">
                                    {estimateResult.details || `${weight}g of ${selectedMaterial}`}
                                </p>
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleGetMaterialPrice}
                            disabled={!selectedMaterial || !weight || !!weightError || estimating}
                            className="h-12 w-full rounded-xl bg-slate-800 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-700 active:scale-95 transition-all"
                        >
                            {estimating ? "Getting Price..." : "Get Price"}
                        </button>

                    </div>
                </div>
            )}

            {previewIndex !== null && createPortal(
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
                    onClick={handleClosePreview}
                >
                    <div
                        className="relative flex h-[90vh] w-[92vw] flex-col overflow-hidden rounded-xl bg-white shadow-2xl md:h-[80vh] md:w-[78vw]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            onClick={handleClosePreview}
                            onMouseDown={handleClosePreview}
                            className="absolute right-4 top-4 z-20 rounded-full bg-slate-100 p-2 text-slate-600 shadow-sm hover:bg-slate-200"
                            aria-label="Close"
                        >
                            <IoClose size={20} />
                        </button>

                        <div className="relative flex h-full w-full items-center justify-center bg-slate-50">
                            <button
                                type="button"
                                onClick={() => setPreviewIndex((current) => (current === 1 ? materials.length : current - 1))}
                                className="absolute left-2 z-10 rounded-full bg-white/90 px-3 py-2 text-3xl font-light text-slate-700 shadow hover:bg-white md:left-5 md:text-5xl"
                            >
                                &lt;
                            </button>

                            <div className="flex h-full w-full items-center justify-center overflow-hidden">
                                <img
                                    src={activeItem?.image_url}
                                    alt={activeItem?.variant_name || `Example ${previewIndex}`}
                                    className="max-h-full max-w-full object-contain p-4"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => setPreviewIndex((current) => (current === materials.length ? 1 : current + 1))}
                                className="absolute right-2 z-10 rounded-full bg-white/90 px-3 py-2 text-3xl font-light text-slate-700 shadow hover:bg-white md:right-5 md:text-5xl"
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default ThreeDPart;