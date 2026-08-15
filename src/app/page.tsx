import Link from "next/link";
import { PROPERTIES } from "@/data/properties";

export default function Home() {
  return (
    <div className="card">
      <div className="card-header">
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600 }}>All Properties</h2>
        <button className="btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add Property
        </button>
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
            {PROPERTIES.map((property) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
