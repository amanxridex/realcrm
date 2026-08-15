"use client";

import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";
import { PROPERTIES } from "@/data/properties";

export default function Home() {
export default function Home() {
  const [propertiesList, setPropertiesList] = useState(PROPERTIES);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Load from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem("crm_properties");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) setPropertiesList(parsed);
      } catch (e) {}
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    if (propertiesList.length !== PROPERTIES.length) {
      localStorage.setItem("crm_properties", JSON.stringify(propertiesList));
    }
  }, [propertiesList]);

  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [sizeFilter, setSizeFilter] = useState("All Sizes");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<number | null>(null);
  const [newPropertyForm, setNewPropertyForm] = useState({
    title: "",
    location: "",
    type: "Residential",
    price: "",
    sqft: 0,
    beds: 0,
    baths: 0,
    status: "Active",
    image: "",
    description: "A great property in prime location.",
    agent: "Admin Agent",
    agentPhone: "+91 00000 00000"
  });

  // Extract unique locations from the data
  const locations = useMemo(() => {
    const locs = propertiesList.map(p => p.location);
    return ["All Locations", ...Array.from(new Set(locs))].sort();
  }, [propertiesList]);

  // Extract unique types from the data
  const types = useMemo(() => {
    const ts = propertiesList.map(p => p.type);
    return ["All Types", ...Array.from(new Set(ts))].sort();
  }, [propertiesList]);

  // Generate size options from 100 to 3000 in increments of 100
  const sizeOptions = useMemo(() => {
    const opts = ["All Sizes"];
    for (let i = 100; i < 3000; i += 100) {
      opts.push(`${i} - ${i + 100} sqft`);
    }
    opts.push("Over 3000 sqft");
    return opts;
  }, []);

  const priceOptions = ["All Prices", "Under ₹1 Cr", "₹1 Cr - ₹3 Cr", "₹3 Cr - ₹5 Cr", "Over ₹5 Cr"];

  const filteredProperties = useMemo(() => {
    return propertiesList.filter(property => {
      // Location Filter
      if (locationFilter !== "All Locations" && property.location !== locationFilter) {
        return false;
      }

      // Type Filter
      if (typeFilter !== "All Types" && property.type !== typeFilter) {
        return false;
      }
      
      // Size Filter
      if (sizeFilter !== "All Sizes") {
        if (sizeFilter === "Over 3000 sqft") {
          if (property.sqft <= 3000) return false;
        } else {
          const match = sizeFilter.match(/^(\d+) - (\d+) sqft$/);
          if (match) {
            const min = parseInt(match[1]);
            const max = parseInt(match[2]);
            if (property.sqft < min || property.sqft > max) return false;
          }
        }
      }

      // Price Filter
      let numericPrice = 0;
      if (property.price.includes("Cr")) {
        numericPrice = parseFloat(property.price.replace("₹", "").replace(" Cr", "")) * 10000000;
      } else if (property.price.includes("Lacs")) {
        numericPrice = parseFloat(property.price.replace("₹", "").replace(" Lacs", "")) * 100000;
      } else {
        // Fallback for custom entries
        numericPrice = parseFloat(property.price.replace(/[^0-9.]/g, ""));
      }

      if (minPrice && !isNaN(Number(minPrice))) {
        if (numericPrice < Number(minPrice)) return false;
      }
      if (maxPrice && !isNaN(Number(maxPrice))) {
        if (numericPrice > Number(maxPrice)) return false;
      }
      
      return true;
    });
  }, [propertiesList, locationFilter, sizeFilter, typeFilter, minPrice, maxPrice]);

  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = propertiesList.length > 0 ? Math.max(...propertiesList.map(p => p.id)) + 1 : 1;
    const newProp = {
      id: newId,
      ...newPropertyForm
    };
    setPropertiesList([newProp, ...propertiesList]);
    setShowAddModal(false);
    setNewPropertyForm({
      title: "",
      location: "",
      type: "Residential",
      price: "",
      sqft: 0,
      beds: 0,
      baths: 0,
      status: "Active",
      image: "",
      description: "A great property in prime location.",
      agent: "Admin Agent",
      agentPhone: "+91 00000 00000"
    });
  };

  const confirmDelete = () => {
    if (propertyToDelete !== null) {
      setPropertiesList(propertiesList.filter(p => p.id !== propertyToDelete));
      setPropertyToDelete(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;

      const lines = text.split('\n');
      if (lines.length < 2) return; // Need at least header and one row

      // Parse headers
      const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
      
      const newProperties = [];
      let currentMaxId = propertiesList.length > 0 ? Math.max(...propertiesList.map(p => p.id)) : 0;

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Simple CSV parse (doesn't handle commas inside quotes perfectly, but good enough for simple use cases)
        const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        
        const prop: any = {
          id: ++currentMaxId,
          beds: 0,
          baths: 0,
          image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
          description: "Uploaded via CSV",
          agent: "Admin Agent",
          agentPhone: "+91 00000 00000"
        };

        headers.forEach((header, index) => {
          if (values[index] === undefined) return;
          
          if (header.includes('property') || header.includes('detail')) {
            prop.title = values[index];
          } else if (header.includes('location')) {
            prop.location = values[index];
          } else if (header.includes('type')) {
            prop.type = values[index];
          } else if (header.includes('price')) {
            prop.price = values[index];
          } else if (header.includes('size')) {
            prop.sqft = parseInt(values[index].replace(/[^0-9]/g, '')) || 0;
          } else if (header.includes('status')) {
            prop.status = values[index];
          }
        });

        if (prop.title && prop.price) {
          newProperties.push(prop);
        }
      }

      if (newProperties.length > 0) {
        setPropertiesList(prev => [...newProperties, ...prev]);
        alert(`Successfully imported ${newProperties.length} properties!`);
      }
      
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
    
    reader.readAsText(file);
  };

  return (
    <div className="card" style={{ position: "relative" }}>
      <div className="card-header" style={{ flexDirection: "column", alignItems: "flex-start", gap: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, letterSpacing: "-0.025em" }}>All Properties</h2>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <input 
              type="file" 
              accept=".csv" 
              style={{ display: "none" }} 
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
            <button className="btn-primary" style={{ background: "rgba(255, 255, 255, 0.1)", border: "1px solid var(--border)", boxShadow: "none" }} onClick={() => fileInputRef.current?.click()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              Upload CSV
            </button>
            <button className="btn-primary" onClick={() => setShowAddModal(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Property
            </button>
          </div>
        </div>
      </div>
      
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Property Details</th>
              <th>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span>Location</span>
                  <select 
                    value={locationFilter} 
                    onChange={(e) => setLocationFilter(e.target.value)}
                    style={{ padding: "4px", borderRadius: "4px", border: "1px solid var(--border)", outline: "none", fontSize: "0.8rem", width: "100%", maxWidth: "150px" }}
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </th>
              <th>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span>Type</span>
                  <select 
                    value={typeFilter} 
                    onChange={(e) => setTypeFilter(e.target.value)}
                    style={{ padding: "4px", borderRadius: "4px", border: "1px solid var(--border)", outline: "none", fontSize: "0.8rem", width: "100%", maxWidth: "120px" }}
                  >
                    {types.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </th>
              <th>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span>Price (₹)</span>
                  <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                    <input 
                      type="number" 
                      placeholder="Min" 
                      value={minPrice} 
                      onChange={(e) => setMinPrice(e.target.value)}
                      style={{ padding: "4px", borderRadius: "4px", border: "1px solid var(--border)", outline: "none", fontSize: "0.8rem", width: "100%", maxWidth: "70px" }}
                    />
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>to</span>
                    <input 
                      type="number" 
                      placeholder="Max" 
                      value={maxPrice} 
                      onChange={(e) => setMaxPrice(e.target.value)}
                      style={{ padding: "4px", borderRadius: "4px", border: "1px solid var(--border)", outline: "none", fontSize: "0.8rem", width: "100%", maxWidth: "70px" }}
                    />
                  </div>
                </div>
              </th>
              <th>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span>Size</span>
                  <select 
                    value={sizeFilter} 
                    onChange={(e) => setSizeFilter(e.target.value)}
                    style={{ padding: "4px", borderRadius: "4px", border: "1px solid var(--border)", outline: "none", fontSize: "0.8rem", width: "100%", maxWidth: "150px" }}
                  >
                    {sizeOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <tr key={property.id}>
                  <td data-label="Property" style={{ fontWeight: 600, color: "var(--foreground)" }}>
                    {property.title}
                  </td>
                  <td data-label="Location" style={{ color: "var(--text-muted)" }}>{property.location}</td>
                  <td data-label="Type">{property.type}</td>
                  <td data-label="Price" style={{ fontWeight: 700, color: "var(--primary-color)" }}>{property.price}</td>
                  <td data-label="Size" style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    {property.beds}bd • {property.baths}ba • {property.sqft} sqft
                  </td>
                  <td data-label="Status">
                    <span className={`status-badge ${property.status.toLowerCase() === 'sold' ? 'sold' : ''}`}>
                      {property.status}
                    </span>
                  </td>
                  <td data-label="Actions">
                    <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                      <Link href={`/properties/${property.id}`} className="btn-icon" title="View">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </Link>
                      <button className="btn-icon" title="Edit">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button className="btn-icon" title="Delete" style={{ color: "var(--danger)", background: "none", border: "none", cursor: "pointer" }} onClick={() => setPropertyToDelete(property.id)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                  No properties found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div className="card" style={{ width: "100%", maxWidth: "500px", padding: "2rem", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "1.5rem" }}>Add New Property</h2>
            <form onSubmit={handleSaveProperty} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Property Title</label>
                <input required value={newPropertyForm.title} onChange={(e) => setNewPropertyForm({...newPropertyForm, title: e.target.value})} style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }} placeholder="E.g. Modern Villa" />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Image URL</label>
                <input required value={newPropertyForm.image} onChange={(e) => setNewPropertyForm({...newPropertyForm, image: e.target.value})} style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }} placeholder="https://example.com/image.jpg" />
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Location</label>
                  <input required value={newPropertyForm.location} onChange={(e) => setNewPropertyForm({...newPropertyForm, location: e.target.value})} style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }} placeholder="Ahmedabad" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Type</label>
                  <select value={newPropertyForm.type} onChange={(e) => setNewPropertyForm({...newPropertyForm, type: e.target.value})} style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }}>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Plot">Plot</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Price</label>
                  <input required value={newPropertyForm.price} onChange={(e) => setNewPropertyForm({...newPropertyForm, price: e.target.value})} style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }} placeholder="₹1.50 Cr" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Size (sqft)</label>
                  <input required type="number" value={newPropertyForm.sqft || ""} onChange={(e) => setNewPropertyForm({...newPropertyForm, sqft: parseInt(e.target.value) || 0})} style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }} placeholder="1200" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Beds</label>
                  <input type="number" value={newPropertyForm.beds || ""} onChange={(e) => setNewPropertyForm({...newPropertyForm, beds: parseInt(e.target.value) || 0})} style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }} placeholder="3" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Baths</label>
                  <input type="number" value={newPropertyForm.baths || ""} onChange={(e) => setNewPropertyForm({...newPropertyForm, baths: parseInt(e.target.value) || 0})} style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }} placeholder="2" />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Status</label>
                <select value={newPropertyForm.status} onChange={(e) => setNewPropertyForm({...newPropertyForm, status: e.target.value})} style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }}>
                  <option value="Active">Active</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "1rem" }}>
                <button type="button" onClick={() => setShowAddModal(false)} style={{ padding: "0.5rem 1rem", border: "1px solid var(--border)", background: "transparent", borderRadius: "4px", cursor: "pointer", fontWeight: 500 }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {propertyToDelete !== null && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div className="card" style={{ width: "100%", maxWidth: "400px", padding: "2rem", textAlign: "center" }}>
            <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "var(--danger-bg)", color: "var(--danger)", marginBottom: "1rem" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Delete Property?</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2rem" }}>
              Are you sure you want to delete this property? This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button onClick={() => setPropertyToDelete(null)} style={{ padding: "0.6rem 1.25rem", border: "1px solid var(--border)", background: "transparent", color: "var(--foreground)", borderRadius: "var(--radius-pill)", cursor: "pointer", fontWeight: 600, flex: 1 }}>
                Cancel
              </button>
              <button onClick={confirmDelete} style={{ padding: "0.6rem 1.25rem", border: "none", background: "var(--danger)", color: "white", borderRadius: "var(--radius-pill)", cursor: "pointer", fontWeight: 600, flex: 1 }}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
