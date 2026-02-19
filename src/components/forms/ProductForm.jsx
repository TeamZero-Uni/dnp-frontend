import { useState } from "react";

function ProductForm({ product, onSave, onClose }) {
  const [form, setForm] = useState(
    product || { id: "", name: "", price: "", status: "in_stock", category: "", stock: "", image: "" }
  );

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-slate-600 mb-1">Product Name</label>
          <input name="name" value={form.name} onChange={handleChange} required
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Price ($)</label>
          <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Stock Qty</label>
          <input name="stock" type="number" value={form.stock} onChange={handleChange} required
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Category</label>
          <input name="category" value={form.category} onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Status</label>
          <select name="status" value={form.status} onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="in_stock">In Stock</option>
            <option value="out_stock">Out of Stock</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-slate-600 mb-1">Image URL</label>
          <input name="image" value={form.image} onChange={handleChange}
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onClose}
          className="flex-1 border border-slate-200 text-slate-600 rounded-lg py-2 text-sm font-medium hover:bg-slate-50 transition-colors">
          Cancel
        </button>
        <button type="submit"
          className="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-indigo-700 transition-colors">
          {product ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm