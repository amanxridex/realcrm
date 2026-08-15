export default function LeadsPage() {
  const LEADS = [
    { id: 1, name: "Rahul Sharma", email: "rahul.s@example.com", phone: "+91 98765 43210", interest: "Premium Villa in Ahmedabad", status: "Hot" },
    { id: 2, name: "Priya Desai", email: "priya.d@example.com", phone: "+91 87654 32109", interest: "Downtown Penthouse", status: "Warm" },
    { id: 3, name: "Amit Patel", email: "amit.p@example.com", phone: "+91 76543 21098", interest: "Suburban Family Home", status: "Cold" },
    { id: 4, name: "Neha Joshi", email: "neha.j@example.com", phone: "+91 65432 10987", interest: "Beachfront Condo", status: "Hot" },
    { id: 5, name: "Vikram Singh", email: "vikram.s@example.com", phone: "+91 54321 09876", interest: "Mountain Retreat", status: "Warm" }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600 }}>Recent Leads</h2>
        <button className="btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Add Lead
        </button>
      </div>
      
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Info</th>
              <th>Property Interest</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {LEADS.map((lead) => (
              <tr key={lead.id}>
                <td style={{ fontWeight: 500, color: "var(--foreground)" }}>{lead.name}</td>
                <td>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{lead.email}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{lead.phone}</div>
                </td>
                <td>{lead.interest}</td>
                <td>
                  <span className={`status-badge ${lead.status === 'Hot' ? 'sold' : ''}`} style={lead.status === 'Cold' ? { backgroundColor: '#f1f5f9', color: '#475569' } : {}}>
                    {lead.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button className="btn-icon" title="Contact">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    </button>
                    <button className="btn-icon" title="Edit">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
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
