import { PROPERTIES } from "@/data/properties";

export default function DashboardSummary() {
  const totalProperties = PROPERTIES.length;
  // Mocking total leads since we don't have a leads database yet
  const totalLeads = 124;

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1.5rem" }}>Dashboard Overview</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
        
        {/* Total Properties Card */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ padding: "0.75rem", backgroundColor: "#e0e7ff", color: "var(--primary-color)", borderRadius: "8px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>
              Total Properties
            </div>
          </div>
          <div style={{ fontSize: "2.5rem", fontWeight: 700 }}>
            {totalProperties}
          </div>
        </div>

        {/* Total Leads Card */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ padding: "0.75rem", backgroundColor: "#dcfce7", color: "#166534", borderRadius: "8px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </div>
            <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>
              Total Leads
            </div>
          </div>
          <div style={{ fontSize: "2.5rem", fontWeight: 700 }}>
            {totalLeads}
          </div>
        </div>

      </div>
    </div>
  );
}
