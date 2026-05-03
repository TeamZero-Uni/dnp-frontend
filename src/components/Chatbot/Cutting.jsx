import { useState } from "react";

const Cutting = () => {
    const [tab, setTab] = useState("examples");

    // Dummy data - replace with API call later
    const dummyMaterials = [
        {
            id: 1,
            image_url: "https://via.placeholder.com/150?text=Metal+Sheet",
            variant_name: "Metal Sheet",
            description: "Precision metal cutting",
            material_type: "Steel"
        },
        {
            id: 2,
            image_url: "https://via.placeholder.com/150?text=Wood+Board",
            variant_name: "Wood Board",
            description: "Accurate wood cutting",
            material_type: "Oak"
        },
        {
            id: 3,
            image_url: "https://via.placeholder.com/150?text=Acrylic",
            variant_name: "Acrylic Sheet",
            description: "Clear acrylic cutting",
            material_type: "Acrylic"
        },
    ];

    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [thickness, setThickness] = useState("");
    const [size, setSize] = useState("");

    const handleCalculate = () => {
        // TODO: Call backend API here
        console.log({ material: selectedMaterial, thickness, size });
    };

    return (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div>
                <h4 className="text-sm font-semibold text-slate-900">Laser Cutting</h4>
                <p className="mt-1 text-xs text-slate-500">Precise material cutting</p>
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
                    {dummyMaterials.map((item, index) => (
                        <button
                            key={item.id}
                            type="button"
                            className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-2 text-left shadow-sm transition-colors hover:bg-slate-50"
                        >
                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                                <img src={item.image_url} alt={item.variant_name} className="h-full w-full object-cover" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="truncate text-sm font-semibold text-slate-900">{item.variant_name}</div>
                                <div className="mt-1 text-xs text-slate-500">{item.description}</div>
                                <span className="mt-2 inline-flex rounded bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                                    {item.material_type}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {tab === "calculate" && (
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="space-y-3">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Material</label>
                            <select
                                value={selectedMaterial}
                                onChange={(e) => setSelectedMaterial(e.target.value)}
                                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none focus:border-slate-400"
                            >
                                <option value="">Select material</option>
                                {dummyMaterials.map((item) => (
                                    <option key={item.id} value={item.variant_name}>
                                        {item.variant_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Thickness (mm)</label>
                            <input
                                type="number"
                                value={thickness}
                                onChange={(e) => setThickness(e.target.value)}
                                placeholder="e.g., 3"
                                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-400"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">Size</label>
                            <input
                                type="text"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                placeholder="e.g., 100x100 mm"
                                className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-400"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleCalculate}
                            disabled={!selectedMaterial || !thickness || !size}
                            className="h-12 w-full rounded-xl bg-slate-800 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-700 active:scale-95 transition-all"
                        >
                            Get Price
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cutting;
