"use client";

import { useState } from "react";

export default function LeadFormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    type: "Individual Home",
    preferredLocation: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    const newLead = {
      id: Date.now(),
      name: formData.name,
      email: formData.email || "N/A",
      phone: formData.phone,
      location: formData.preferredLocation,
      type: formData.type,
      budget: formData.budget,
      status: "Hot" // Default status for new leads
    };

    try {
      const existing = localStorage.getItem("crm_leads");
      let leadsArray = [];
      if (existing) {
        leadsArray = JSON.parse(existing);
      } else {
        // Fallback default dummy leads if local storage is empty
        leadsArray = [
          { id: 1, name: "Rahul Sharma", email: "rahul.s@example.com", phone: "+91 98765 43210", location: "Ahmedabad", type: "Premium Villa", budget: "₹2 Cr - ₹3 Cr", status: "Hot" },
          { id: 2, name: "Priya Desai", email: "priya.d@example.com", phone: "+91 87654 32109", location: "Surat", type: "Penthouse", budget: "₹1.5 Cr", status: "Warm" },
          { id: 3, name: "Amit Patel", email: "amit.p@example.com", phone: "+91 76543 21098", location: "Vadodara", type: "Individual Home", budget: "Under ₹1 Cr", status: "Cold" }
        ];
      }
      
      leadsArray.unshift(newLead); // Add new lead to the beginning
      localStorage.setItem("crm_leads", JSON.stringify(leadsArray));
      
      alert(`Lead for ${formData.name} submitted successfully!`);
    } catch (err) {
      alert("Error saving lead!");
    }

    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      budget: "",
      type: "Individual Home",
      preferredLocation: ""
    });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem 0" }}>
      <div className="card" style={{ padding: "2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--foreground)", marginBottom: "0.5rem" }}>
            Real Estate Inquiry
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Fill out this form and our agents will get back to you with the best property matches.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Full Name <span style={{ color: "var(--danger)" }}>*</span></label>
            <input 
              required 
              value={formData.name} 
              onChange={(e) => setFormData({...formData, name: e.target.value})} 
              style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }} 
              placeholder="e.g. Rahul Sharma" 
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Phone Number <span style={{ color: "var(--danger)" }}>*</span></label>
              <input 
                required 
                type="tel"
                value={formData.phone} 
                onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }} 
                placeholder="+91 98765 43210" 
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Email Address (Optional)</label>
              <input 
                type="email"
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }} 
                placeholder="rahul@example.com" 
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Preferred Location <span style={{ color: "var(--danger)" }}>*</span></label>
            <input 
              required 
              value={formData.preferredLocation} 
              onChange={(e) => setFormData({...formData, preferredLocation: e.target.value})} 
              style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }} 
              placeholder="e.g. S.G. Highway, Ahmedabad" 
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Property Type <span style={{ color: "var(--danger)" }}>*</span></label>
              <select 
                required
                value={formData.type} 
                onChange={(e) => setFormData({...formData, type: e.target.value})} 
                style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)", backgroundColor: "white" }}
              >
                <option value="Individual Home">Individual Home</option>
                <option value="Flat">Flat</option>
                <option value="Apartment">Apartment</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Estimated Budget <span style={{ color: "var(--danger)" }}>*</span></label>
              <input 
                required 
                value={formData.budget} 
                onChange={(e) => setFormData({...formData, budget: e.target.value})} 
                style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }} 
                placeholder="e.g. ₹1 Cr - ₹2 Cr" 
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: "1rem", padding: "1rem", justifyContent: "center", fontSize: "1rem", fontWeight: 600 }}>
            Submit Inquiry
          </button>
        </form>
      </div>
    </div>
  );
}
