"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [username, setUsername] = useState("amanxridex");
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Profile updated successfully! Username is now ${username}`);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password updated successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1.5rem" }}>Settings</h1>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        
        {/* Profile Settings Card */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "1rem", color: "var(--foreground)" }}>Profile Settings</h2>
          <form onSubmit={handleUpdateProfile} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Username</label>
              <input 
                required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }} 
                placeholder="Enter username" 
              />
            </div>
            <div>
              <button type="submit" className="btn-primary">Update Profile</button>
            </div>
          </form>
        </div>

        {/* Security Settings Card */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 600, marginBottom: "1rem", color: "var(--foreground)" }}>Security Settings</h2>
          <form onSubmit={handleUpdatePassword} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Current Password</label>
              <input 
                required 
                type="password"
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)} 
                style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }} 
                placeholder="Enter current password" 
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>New Password</label>
              <input 
                required 
                type="password"
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }} 
                placeholder="Enter new password" 
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600 }}>Confirm New Password</label>
              <input 
                required 
                type="password"
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                style={{ padding: "0.75rem", borderRadius: "6px", border: "1px solid var(--border)" }} 
                placeholder="Confirm new password" 
              />
            </div>
            <div>
              <button type="submit" className="btn-primary" style={{ backgroundColor: "var(--danger)", borderColor: "var(--danger)" }}>
                Update Password
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
