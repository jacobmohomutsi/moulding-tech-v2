"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "loading", message: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed");
      setStatus({ state: "success", message: data?.message || "Message sent!" });
      setForm({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (err) {
      setStatus({ state: "error", message: err.message || "Something went wrong. Please try again." });
    }
  }

  return (
    <form onSubmit={onSubmit} className="card rounded-2xl p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-sm">Full Name</label>
          <input
            className="rounded-xl border border-gray-300 px-3 py-2"
            placeholder="Jane Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm">Email Address</label>
          <input
            type="email"
            className="rounded-xl border border-gray-300 px-3 py-2"
            placeholder="jane@company.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm">Phone Number</label>
          <input
            className="rounded-xl border border-gray-300 px-3 py-2"
            placeholder="+27…"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm">Company (optional)</label>
          <input
            className="rounded-xl border border-gray-300 px-3 py-2"
            placeholder="Company Pty Ltd"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="text-sm">Message</label>
          <textarea
            rows={5}
            className="rounded-xl border border-gray-300 px-3 py-2"
            placeholder="Tell us about your project…"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <button type="submit" className="btn btn-primary" disabled={status.state === "loading"}>
          {status.state === "loading" ? "Sending…" : "SEND MESSAGE"}
        </button>
        {status.state !== "idle" && (
          <span className={`ml-3 text-sm ${status.state === "error" ? "text-red-600" : "text-green-700"}`}>
            {status.message}
          </span>
        )}
      </div>
    </form>
  );
}
