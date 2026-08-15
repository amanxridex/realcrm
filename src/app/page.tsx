"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { PROPERTIES } from "@/data/properties";

export default function Home() {
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [sizeFilter, setSizeFilter] = useState("All Sizes");

  // Extract unique locations from the data
  const locations = useMemo(() => {
    const locs = PROPERTIES.map(p => p.location);
    return ["All Locations", ...Array.from(new Set(locs))].sort();
  }, []);

  // Generate size options from 100 to 3000 in increments of 100
  const sizeOptions = useMemo(() => {
    const opts = ["All Sizes"];
    for (let i = 100; i < 3000; i += 100) {
      opts.push(`${i} - ${i + 100} sqft`);
    }
    opts.push("Over 3000 sqft");
    return opts;
  }, []);

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(property => {
      // Location Filter
      if (locationFilter !== "All Locations" && property.location !== locationFilter) {
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
      
      return true;
    });
  }, [locationFilter, sizeFilter]);

  return (
    <div className="card">
      <div className="card-header" style={{ flexDirection: "column", alignItems: "flex-start", gap: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600 }}>All Properties</h2>
          <button className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Property
          </button>
        </div>
        
        {/* Filters Bar */}
        <div style={{ display: "flex", gap: "1rem", width: "100%", padding: "0.5rem 0", borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>Location</label>
            <select 
              value={locationFilter} 
              onChange={(e) => setLocationFilter(e.target.value)}
              style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--border)", outline: "none", minWidth: "200px" }}
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>Land Size</label>
            <select 
              value={sizeFilter} 
              onChange={(e) => setSizeFilter(e.target.value)}
              style={{ padding: "0.5rem", borderRadius: "4px", border: "1px solid var(--border)", outline: "none", minWidth: "200px", maxHeight: "200px" }}
            >
              {sizeOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Property Details</th>
              <th>Location</th>
              <th>Type</th>
              <th>Price</th>
              <th>Size</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <tr key={property.id}>
                  <td style={{ fontWeight: 500, color: "var(--foreground)" }}>
                    {property.title}
                  </td>
                  <td style={{ color: "var(--text-muted)" }}>{property.location}</td>
                  <td>{property.type}</td>
                  <td style={{ fontWeight: 600 }}>{property.price}</td>
                  <td style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    {property.beds}bd • {property.baths}ba • {property.sqft} sqft
                  </td>
                  <td>
                    <span className={`status-badge ${property.status.toLowerCase() === 'sold' ? 'sold' : ''}`}>
                      {property.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Link href={`/properties/${property.id}`} className="btn-icon" title="View">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      </Link>
                      <button className="btn-icon" title="Edit">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </button>
                      <button className="btn-icon" title="Delete" style={{ color: "var(--danger)" }}>
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
    </div>
  );
}
