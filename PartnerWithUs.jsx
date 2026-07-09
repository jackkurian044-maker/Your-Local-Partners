import React, { useState } from "react";
import {
  Store, Users, HandHeart, TrendingDown, MapPin, Wallet, Clock, ArrowRight,
  Check, Sparkles,
} from "lucide-react";

/* Shares the same design tokens as App.jsx so the two pages feel like one product. */
const COLORS = {
  paper: "#FAF6EC",
  ink: "#1E2A32",
  inkSoft: "#5B6670",
  line: "#E4DCC8",
  butter: "#F3B23E",
  butterDeep: "#8A5A0A",
  sage: "#7C9A72",
  sageDeep: "#33461F",
  brick: "#BE4F2E",
  brickDeep: "#5E2611",
  card: "#FFFDF7",
};

const REASONS = [
  {
    icon: Store,
    title: "Your storefront stays yours",
    body: "No dark stores, no warehouses replacing shopfronts. Customers still walk in, meet you, and come back because of you — we just help more of them find you first.",
  },
  {
    icon: Wallet,
    title: "Pricing that doesn't race to zero",
    body: "Quick-commerce apps compete on discounts subsidised by investors. We don't ask you to sell at a loss to stay listed — your margins are your business.",
  },
  {
    icon: Users,
    title: "Local relationships, kept local",
    body: "The baker who remembers your order, the grocer who sets aside the good tomatoes — that only survives if people can still find you. We're built to protect that, not replace it.",
  },
  {
    icon: Clock,
    title: "Set up in an afternoon",
    body: "Add your store, list your products, set your hours. No warehouse contracts, no exclusivity clauses, no minimum order volumes.",
  },
];

const STEPS = [
  { title: "Tell us about your store", body: "Name, category, address, and hours — five minutes, done." },
  { title: "List what you sell", body: "Add products with photos and prices. Update anytime from your dashboard." },
  { title: "Get discovered nearby", body: "Customers searching your neighbourhood see you show up, open, and ready." },
];

function inputStyle() {
  return {
    width: "100%",
    fontSize: 14,
    border: `1px solid ${COLORS.line}`,
    borderRadius: 8,
    padding: "10px 12px",
    color: COLORS.ink,
    fontFamily: "'Inter', sans-serif",
    background: COLORS.paper,
  };
}

export default function PartnerWithUs({ onBack }) {
  const [form, setForm] = useState({ owner: "", storeName: "", category: "", area: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.owner.trim() || !form.storeName.trim() || !form.phone.trim()) return;
    setSubmitted(true);
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: COLORS.paper, color: COLORS.ink, minHeight: 600 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      {/* Header */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: `1px solid ${COLORS.line}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: COLORS.ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <MapPin size={16} color={COLORS.butter} />
          </div>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600 }}>Your Local Partners</span>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            style={{ background: "none", border: `1px solid ${COLORS.line}`, borderRadius: 10, padding: "8px 14px", fontSize: 13.5, fontWeight: 500, cursor: "pointer", color: COLORS.ink }}
          >
            Back to app
          </button>
        )}
      </header>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 70px" }}>
        {/* Hero */}
        <section style={{ padding: "52px 0 30px", textAlign: "center" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600,
            color: COLORS.brickDeep, background: "#F3D9CC", borderRadius: 999, padding: "5px 12px", marginBottom: 18,
          }}>
            <Sparkles size={13} /> For local shop owners
          </span>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 42, fontWeight: 700, lineHeight: 1.15, margin: "0 0 14px" }}>
            10-minute delivery apps didn't kill<br />the local market. They just made it harder to find.
          </h1>
          <p style={{ fontSize: 16, color: COLORS.inkSoft, maxWidth: 560, margin: "0 auto 28px" }}>
            Bakeries, plant shops, grocers, florists — the neighbourhood still wants you.
            We help people find you online without asking you to become a warehouse.
          </p>
          <a href="#signup" style={{
            display: "inline-flex", alignItems: "center", gap: 8, background: COLORS.ink, color: COLORS.paper,
            border: "none", borderRadius: 10, padding: "13px 24px", fontSize: 15, fontWeight: 600,
            textDecoration: "none", cursor: "pointer",
          }}>
            List your store <ArrowRight size={16} />
          </a>
        </section>

        {/* The problem, framed honestly as a perspective rather than a claim about any one company */}
        <section style={{ padding: "34px 0", borderTop: `1px solid ${COLORS.line}` }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14, maxWidth: 680, margin: "0 auto" }}>
            <TrendingDown size={22} color={COLORS.brick} style={{ flexShrink: 0, marginTop: 3 }} />
            <p style={{ fontSize: 15, color: COLORS.inkSoft, margin: 0, lineHeight: 1.6 }}>
              Quick-commerce apps built their speed on dark stores and deep discounts, not on the
              corner shops people grew up with. That's a fair trade for some things. But it's pulled
              foot traffic and visibility away from vendors who built real relationships with their
              neighbourhood — often without giving them any way to compete for that same customer
              online. We think local vendors deserve the same discoverability, on terms that don't
              require becoming a warehouse.
            </p>
          </div>
        </section>

        {/* Reasons / value props */}
        <section style={{ padding: "20px 0 40px" }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600, textAlign: "center", margin: "0 0 30px" }}>
            Built for the shop, not the warehouse
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
            {REASONS.map(({ icon: Icon, title, body }) => (
              <div key={title} style={{ background: COLORS.card, border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: "20px 20px" }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "#DCE7D5", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <Icon size={18} color={COLORS.sageDeep} />
                </div>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 16.5, fontWeight: 600, margin: "0 0 6px" }}>{title}</h3>
                <p style={{ fontSize: 13.5, color: COLORS.inkSoft, margin: 0, lineHeight: 1.55 }}>{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section style={{ padding: "20px 0 46px", borderTop: `1px solid ${COLORS.line}` }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600, textAlign: "center", margin: "30px 0 30px" }}>
            Three steps to get listed
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
            {STEPS.map((s, i) => (
              <div key={s.title} style={{ textAlign: "center", padding: "0 12px" }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%", background: COLORS.ink, color: COLORS.paper,
                  display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px",
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, fontWeight: 600,
                }}>
                  {i + 1}
                </div>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 600, margin: "0 0 6px" }}>{s.title}</h3>
                <p style={{ fontSize: 13.5, color: COLORS.inkSoft, margin: 0, lineHeight: 1.55 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Signup form */}
        <section id="signup" style={{ padding: "10px 0 20px", borderTop: `1px solid ${COLORS.line}` }}>
          <div style={{ maxWidth: 460, margin: "36px auto 0", background: COLORS.card, border: `1px solid ${COLORS.line}`, borderRadius: 14, padding: "28px 26px" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#DCE7D5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                  <Check size={22} color={COLORS.sageDeep} />
                </div>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, margin: "0 0 6px" }}>
                  Thanks, {form.owner.split(" ")[0] || "there"} — we've got it
                </h3>
                <p style={{ fontSize: 13.5, color: COLORS.inkSoft, margin: 0 }}>
                  Someone from our onboarding team will reach out about {form.storeName || "your store"} within a couple of days.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, margin: "0 0 4px", display: "flex", alignItems: "center", gap: 8 }}>
                  <HandHeart size={18} color={COLORS.sageDeep} /> List your store
                </h3>
                <p style={{ fontSize: 13, color: COLORS.inkSoft, margin: "0 0 18px" }}>
                  No fees to list. Tell us a bit about your shop and we'll help you set it up.
                </p>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input placeholder="Your name" value={form.owner} onChange={(e) => update("owner", e.target.value)} style={inputStyle()} />
                  <input placeholder="Store name" value={form.storeName} onChange={(e) => update("storeName", e.target.value)} style={inputStyle()} />
                  <input placeholder="Category (e.g. Bakery, Grocery, Florist)" value={form.category} onChange={(e) => update("category", e.target.value)} style={inputStyle()} />
                  <input placeholder="Neighbourhood / area" value={form.area} onChange={(e) => update("area", e.target.value)} style={inputStyle()} />
                  <input placeholder="Phone number" value={form.phone} onChange={(e) => update("phone", e.target.value)} style={inputStyle()} />
                  <button type="submit" style={{
                    marginTop: 4, background: COLORS.ink, color: COLORS.paper, border: "none", borderRadius: 10,
                    padding: "12px 0", fontSize: 14.5, fontWeight: 600, cursor: "pointer",
                  }}>
                    Submit
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
