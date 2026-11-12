import { useState } from "react";
import { 
  PlusCircle, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Camera, 
  ShieldAlert, 
  Sparkles,
  ThermometerSun
} from "lucide-react";
import { useApp } from "../context/AppContext";

export const DonateFood = ({ setActiveTab }) => {
  const { currentUser, addDonation } = useApp();

  const [formData, setFormData] = useState({
    foodName: "",
    category: "Cooked Meals",
    quantity: "",
    mealsCount: "",
    prepTime: new Date().toISOString().slice(0, 16),
    expiryTime: new Date(Date.now() + 6 * 3600000).toISOString().slice(0, 16), // safe deadline (6 hrs default)
    storageCondition: "Hot insulated containers (>65°C)",
    allergens: "None",
    notes: "",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Suggested quick images based on category
  const categoryImages = {
    "Cooked Meals": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80",
    "Bakery & Bread": "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    "Fresh Produce": "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80",
    "Dairy & Cold Storage": "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80",
    "Packaged & Canned Goods": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
  };

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setFormData(prev => ({
      ...prev,
      category: cat,
      imageUrl: categoryImages[cat] || prev.imageUrl
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Food Safety & Freshness Validation Rules
    if (!formData.foodName.trim()) {
      setError("Please specify the Food Name.");
      return;
    }
    if (!formData.quantity.trim() || !formData.mealsCount) {
      setError("Please enter quantity and estimated number of meals.");
      return;
    }

    const prep = new Date(formData.prepTime).getTime();
    const expiry = new Date(formData.expiryTime).getTime();
    const now = Date.now();

    if (expiry <= now) {
      setError("Safety Violation: Safe collection deadline has already passed. We cannot accept expired food.");
      return;
    }
    if (expiry <= prep) {
      setError("Validation Error: Collection deadline must be after preparation time.");
      return;
    }

    // Pass all safety checks
    addDonation({
      ...formData,
      mealsCount: Number(formData.mealsCount)
    });

    setSuccess(true);
    setTimeout(() => {
      setActiveTab("supplier-dashboard");
    }, 1800);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div className="fb-card">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "1rem" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PlusCircle size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800 }}>Donate Excess Food</h2>
            <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
              Publish surplus food for registered food shelters and NGOs to collect safely.
            </p>
          </div>
        </div>

        {/* Safety Notice */}
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "0.85rem 1rem", marginBottom: "1.5rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
          <ShieldAlert size={20} color="#16a34a" style={{ flexShrink: 0, marginTop: "2px" }} />
          <div style={{ fontSize: "0.82rem", color: "#166534", lineHeight: 1.5 }}>
            <strong>Food Safety Guarantee:</strong> Only post food that was prepared in clean commercial kitchens or unexpired packaged goods. System strictly rejects expired or improperly stored donations.
          </div>
        </div>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#dc2626", padding: "0.75rem 1rem", borderRadius: "8px", marginBottom: "1.25rem", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div style={{ background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", padding: "1rem", borderRadius: "8px", marginBottom: "1.25rem", textAlign: "center", fontSize: "0.95rem", fontWeight: 700 }}>
            🎉 Donation published successfully! Nearby NGOs are being notified. Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Food Basics */}
          <div className="form-group">
            <label className="form-label">Food Item Title *</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. Steamed Rice, Mixed Dal & Roti Basket" 
              value={formData.foodName}
              onChange={e => setFormData({ ...formData, foodName: e.target.value })}
              required
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select className="form-control" value={formData.category} onChange={handleCategoryChange}>
                <option value="Cooked Meals">Cooked Meals (Buffet / Banquet)</option>
                <option value="Bakery & Bread">Bakery & Bread</option>
                <option value="Fresh Produce">Fresh Produce (Fruits & Veggies)</option>
                <option value="Dairy & Cold Storage">Dairy & Cold Storage</option>
                <option value="Packaged & Canned Goods">Packaged & Canned Goods</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Storage Conditions *</label>
              <select className="form-control" value={formData.storageCondition} onChange={e => setFormData({ ...formData, storageCondition: e.target.value })}>
                <option value="Hot insulated containers (>65°C)">Hot insulated containers (&gt;65°C)</option>
                <option value="Refrigerated (<4°C)">Refrigerated (&lt;4°C)</option>
                <option value="Frozen (-18°C)">Frozen (-18°C)</option>
                <option value="Ambient, Dry sealed boxes">Ambient, Dry sealed boxes</option>
              </select>
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Quantity (e.g. 25 kg / 50 boxes) *</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. 35 kg" 
                value={formData.quantity}
                onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Number of Estimated Meals *</label>
              <input 
                type="number" 
                min="1"
                className="form-control" 
                placeholder="e.g. 100" 
                value={formData.mealsCount}
                onChange={e => setFormData({ ...formData, mealsCount: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Time & Safety */}
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Prepared Date & Time *</label>
              <input 
                type="datetime-local" 
                className="form-control" 
                value={formData.prepTime}
                onChange={e => setFormData({ ...formData, prepTime: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ color: "#b45309" }}>Safe Collection Deadline *</label>
              <input 
                type="datetime-local" 
                className="form-control" 
                value={formData.expiryTime}
                onChange={e => setFormData({ ...formData, expiryTime: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Allergens Present</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. Dairy, Nuts, Gluten (or None)" 
                value={formData.allergens}
                onChange={e => setFormData({ ...formData, allergens: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Food Photo URL</label>
              <input 
                type="url" 
                className="form-control" 
                placeholder="https://images.unsplash.com/..." 
                value={formData.imageUrl}
                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div className="form-group">
            <label className="form-label">Special Packaging or Pickup Notes</label>
            <textarea 
              className="form-control" 
              rows={3} 
              placeholder="e.g. Enter through kitchen loading bay 2. Please bring insulated transport crates."
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          {/* Live Location / Contact Snapshot */}
          <div style={{ background: "#f8fafc", padding: "1rem", borderRadius: "10px", marginBottom: "1.5rem", border: "1px solid #e2e8f0" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.25rem", color: "#334155" }}>
              Pickup Location & Contact (Auto-populated from Profile):
            </div>
            <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
              <strong>Supplier:</strong> {currentUser?.name} • <strong>Phone:</strong> {currentUser?.phone}
            </div>
            <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
              <strong>Address:</strong> {currentUser?.address}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
            <button type="button" className="btn btn-outline" onClick={() => setActiveTab("supplier-dashboard")}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-lg">
              <PlusCircle size={18} />
              <span>Verify & Publish Food Listing</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

