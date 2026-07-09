import React, { useState, useMemo } from "react";
import {
  Search, MapPin, Star, Clock, ShoppingBag, X, Plus, Minus,
  ChevronLeft, SlidersHorizontal, Check, Map as MapIcon, List as ListIcon,
  LayoutDashboard, User, Trash2, Power, Package, Receipt, ChevronDown, Info
} from "lucide-react";
import PartnerWithUs from "./PartnerWithUs.jsx";

/* ---------------------------------------------------------
   Design tokens (hand-rolled — no arbitrary Tailwind colors)
--------------------------------------------------------- */
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
  rose: "#CE8497",
  roseDeep: "#5E2436",
  card: "#FFFDF7",
};

const CATEGORY_STYLE = {
  Bakery:    { bg: "#FBE6C2", fg: COLORS.butterDeep, dot: COLORS.butter },
  "Plant shop": { bg: "#DCE7D5", fg: COLORS.sageDeep, dot: COLORS.sage },
  Bookstore: { bg: "#E3E6E1", fg: "#2C3B2E",          dot: "#4B5D45" },
  Grocery:   { bg: "#F3D9CC", fg: COLORS.brickDeep,   dot: COLORS.brick },
  Florist:   { bg: "#F3DDE3", fg: COLORS.roseDeep,    dot: COLORS.rose },
  Cafe:      { bg: "#EBDCC9", fg: "#4A2E12",          dot: "#7A4A1E" },
};

/* ---------------------------------------------------------
   Mock data — local vendors around Bengaluru neighborhoods
--------------------------------------------------------- */
const STORES = [
  {
    id: "s1", name: "Kneaded", category: "Bakery", area: "Indiranagar",
    distance: 0.6, rating: 4.8, reviews: 214, openNow: true, hours: "8am – 8pm",
    tagline: "Sourdough, laminated pastry, and slow-fermented loaves.",
    pin: { x: 28, y: 34 },
    products: [
      { id: "p1", name: "Classic sourdough loaf", price: 180, unit: "each", tag: "Bestseller" },
      { id: "p2", name: "Almond croissant", price: 90, unit: "each" },
      { id: "p3", name: "Cardamom bun, box of 4", price: 260, unit: "box" },
      { id: "p4", name: "Whole wheat batard", price: 150, unit: "each" },
    ],
  },
  {
    id: "s2", name: "Terra & Pot", category: "Plant shop", area: "Koramangala",
    distance: 1.2, rating: 4.6, reviews: 132, openNow: true, hours: "10am – 7pm",
    tagline: "Low-maintenance greens and hand-thrown planters.",
    pin: { x: 62, y: 52 },
    products: [
      { id: "p5", name: "Snake plant, 6in pot", price: 349, unit: "each", tag: "Low light" },
      { id: "p6", name: "Money plant, hanging", price: 220, unit: "each" },
      { id: "p7", name: "Terracotta planter, medium", price: 260, unit: "each" },
      { id: "p8", name: "Potting mix, 2kg", price: 199, unit: "bag" },
    ],
  },
  {
    id: "s3", name: "Page & Pencil", category: "Bookstore", area: "HSR Layout",
    distance: 2.1, rating: 4.9, reviews: 301, openNow: false, hours: "11am – 9pm",
    tagline: "Independent press, secondhand fiction, and staff picks.",
    pin: { x: 74, y: 22 },
    products: [
      { id: "p9", name: "Staff pick: fiction", price: 399, unit: "each", tag: "Signed copy" },
      { id: "p10", name: "Used paperback, assorted", price: 120, unit: "each" },
      { id: "p11", name: "Reading journal", price: 220, unit: "each" },
      { id: "p12", name: "Letterpress bookmark", price: 60, unit: "each" },
    ],
  },
  {
    id: "s4", name: "Jayanagar Grocer", category: "Grocery", area: "Jayanagar",
    distance: 1.7, rating: 4.5, reviews: 189, openNow: true, hours: "7am – 10pm",
    tagline: "Farm produce, cold-pressed oils, and daily essentials.",
    pin: { x: 20, y: 68 },
    products: [
      { id: "p13", name: "Cold-pressed groundnut oil, 1L", price: 260, unit: "bottle" },
      { id: "p14", name: "Heirloom tomatoes, 1kg", price: 90, unit: "kg" },
      { id: "p15", name: "Millet flour, 1kg", price: 110, unit: "kg", tag: "Local mill" },
      { id: "p16", name: "Farm eggs, tray of 12", price: 130, unit: "tray" },
    ],
  },
  {
    id: "s5", name: "Petal & Stem", category: "Florist", area: "Whitefield",
    distance: 3.4, rating: 4.7, reviews: 98, openNow: true, hours: "9am – 8pm",
    tagline: "Seasonal bunches, dried arrangements, and same-day pickup.",
    pin: { x: 88, y: 40 },
    products: [
      { id: "p17", name: "Seasonal bunch, medium", price: 450, unit: "bunch", tag: "Fresh today" },
      { id: "p18", name: "Dried flower jar", price: 380, unit: "each" },
      { id: "p19", name: "Single stem rose, x6", price: 300, unit: "set" },
    ],
  },
  {
    id: "s6", name: "Filter & Fold", category: "Cafe", area: "JP Nagar",
    distance: 2.6, rating: 4.4, reviews: 156, openNow: true, hours: "8am – 9pm",
    tagline: "Small-batch roast beans and brewing gear to take home.",
    pin: { x: 38, y: 82 },
    products: [
      { id: "p20", name: "House blend beans, 250g", price: 420, unit: "bag", tag: "Roasted weekly" },
      { id: "p21", name: "Filter papers, pack of 100", price: 190, unit: "pack" },
      { id: "p22", name: "Ceramic pour-over dripper", price: 650, unit: "each" },
    ],
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(STORES.map((s) => s.category)))];

function formatRupee(n) {
  return "₹" + n.toLocaleString("en-IN");
}

/* ---------------------------------------------------------
   Small building blocks
--------------------------------------------------------- */
function PriceTag({ children }) {
  return (
    <span
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 13,
        color: COLORS.ink,
        background: COLORS.paper,
        border: `1px dashed ${COLORS.line}`,
        borderRadius: 4,
        padding: "3px 8px",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function CategoryChip({ label, active, onClick }) {
  const style = CATEGORY_STYLE[label];
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 13.5,
        fontWeight: 500,
        padding: "7px 14px",
        borderRadius: 999,
        border: `1px solid ${active ? COLORS.ink : COLORS.line}`,
        background: active ? COLORS.ink : "transparent",
        color: active ? COLORS.paper : COLORS.inkSoft,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 6,
        flexShrink: 0,
        transition: "all 120ms ease",
      }}
    >
      {label !== "All" && (
        <span
          style={{
            width: 7, height: 7, borderRadius: "50%",
            background: active ? COLORS.paper : style?.dot || COLORS.inkSoft,
          }}
        />
      )}
      {label}
    </button>
  );
}

function AwningStrip({ color }) {
  return (
    <div
      style={{
        height: 6,
        width: "100%",
        borderRadius: "12px 12px 0 0",
        background: `repeating-linear-gradient(90deg, ${color} 0 10px, ${COLORS.card} 10px 20px)`,
      }}
    />
  );
}

/* ---------------------------------------------------------
   Store card (grid item on Home)
--------------------------------------------------------- */
function StoreCard({ store, onOpen }) {
  const style = CATEGORY_STYLE[store.category];
  return (
    <div
      onClick={() => onOpen(store)}
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 120ms ease, box-shadow 120ms ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      <AwningStrip color={style?.dot || COLORS.ink} />
      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, color: COLORS.ink, margin: 0 }}>
              {store.name}
            </h3>
            <p style={{ fontSize: 13, color: COLORS.inkSoft, margin: "4px 0 0" }}>{store.tagline}</p>
          </div>
          <span
            style={{
              fontSize: 11.5, fontWeight: 600, padding: "3px 9px", borderRadius: 999,
              background: style?.bg, color: style?.fg, whiteSpace: "nowrap",
            }}
          >
            {store.category}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 12, fontSize: 12.5, color: COLORS.inkSoft }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Star size={13} fill={COLORS.butter} color={COLORS.butter} />
            <strong style={{ color: COLORS.ink }}>{store.rating}</strong> ({store.reviews})
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <MapPin size={13} /> {store.area} · {store.distance} km
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 12.5 }}>
          <Clock size={13} color={store.openNow ? COLORS.sageDeep : COLORS.brick} />
          <span style={{ color: store.openNow ? COLORS.sageDeep : COLORS.brick, fontWeight: 500 }}>
            {store.openNow ? "Open now" : "Closed"}
          </span>
          <span style={{ color: COLORS.inkSoft }}>· {store.hours}</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Mock map — simple dot-pin layout, no external map dependency
--------------------------------------------------------- */
function MockMap({ stores, onOpen, activeId }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 320,
        borderRadius: 12,
        border: `1px solid ${COLORS.line}`,
        background:
          `linear-gradient(${COLORS.paper}, ${COLORS.paper}), repeating-linear-gradient(0deg, transparent 0 39px, ${COLORS.line}55 39px 40px), repeating-linear-gradient(90deg, transparent 0 39px, ${COLORS.line}55 39px 40px)`,
        overflow: "hidden",
      }}
    >
      {stores.map((s) => {
        const style = CATEGORY_STYLE[s.category];
        const isActive = s.id === activeId;
        return (
          <button
            key={s.id}
            onClick={() => onOpen(s)}
            title={s.name}
            style={{
              position: "absolute",
              left: `${s.pin.x}%`,
              top: `${s.pin.y}%`,
              transform: "translate(-50%, -100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              background: "none",
              border: "none",
              padding: 0,
            }}
          >
            {isActive && (
              <span
                style={{
                  fontFamily: "'Inter', sans-serif", fontSize: 11.5, fontWeight: 600,
                  background: COLORS.ink, color: COLORS.paper, borderRadius: 6,
                  padding: "3px 7px", marginBottom: 4, whiteSpace: "nowrap",
                }}
              >
                {s.name}
              </span>
            )}
            <MapPin
              size={isActive ? 30 : 24}
              color={style?.dot || COLORS.ink}
              fill={isActive ? style?.dot : "none"}
              strokeWidth={2}
            />
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------
   Store detail — product grid + add to cart
--------------------------------------------------------- */
function StoreDetail({ store, cart, onAdd, onRemove, onBack }) {
  const style = CATEGORY_STYLE[store.category];
  return (
    <div>
      <button
        onClick={onBack}
        style={{
          display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
          color: COLORS.inkSoft, fontSize: 13.5, cursor: "pointer", padding: "4px 0", marginBottom: 14,
        }}
      >
        <ChevronLeft size={16} /> Back to stores
      </button>

      <AwningStrip color={style?.dot || COLORS.ink} />
      <div
        style={{
          background: COLORS.card, border: `1px solid ${COLORS.line}`, borderTop: "none",
          borderRadius: "0 0 12px 12px", padding: "20px 22px", marginBottom: 22,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
          <div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600, color: COLORS.ink, margin: 0 }}>
              {store.name}
            </h2>
            <p style={{ fontSize: 14, color: COLORS.inkSoft, margin: "6px 0 0", maxWidth: 440 }}>{store.tagline}</p>
          </div>
          <span
            style={{
              fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 999,
              background: style?.bg, color: style?.fg,
            }}
          >
            {store.category}
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 14, fontSize: 13, color: COLORS.inkSoft }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Star size={14} fill={COLORS.butter} color={COLORS.butter} />
            <strong style={{ color: COLORS.ink }}>{store.rating}</strong> ({store.reviews} reviews)
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <MapPin size={14} /> {store.area} · {store.distance} km away
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Clock size={14} color={store.openNow ? COLORS.sageDeep : COLORS.brick} />
            <span style={{ color: store.openNow ? COLORS.sageDeep : COLORS.brick, fontWeight: 500 }}>
              {store.openNow ? "Open now" : "Closed"}
            </span>{" "}
            · {store.hours}
          </span>
        </div>
      </div>

      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: COLORS.ink, margin: "0 0 12px" }}>
        Products
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
        {store.products.map((p) => {
          const key = `${store.id}-${p.id}`;
          const qty = cart[key]?.qty || 0;
          return (
            <div
              key={p.id}
              style={{
                background: COLORS.card, border: `1px solid ${COLORS.line}`, borderRadius: 12,
                padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10,
              }}
            >
              <div>
                {p.tag && (
                  <span style={{ fontSize: 11, fontWeight: 600, color: COLORS.brickDeep, background: "#F3D9CC", borderRadius: 999, padding: "2px 8px" }}>
                    {p.tag}
                  </span>
                )}
                <p style={{ fontFamily: "'Fraunces', serif", fontSize: 15.5, fontWeight: 600, color: COLORS.ink, margin: "6px 0 2px" }}>
                  {p.name}
                </p>
                <p style={{ fontSize: 12.5, color: COLORS.inkSoft, margin: 0 }}>per {p.unit}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                <PriceTag>{formatRupee(p.price)}</PriceTag>
                {qty === 0 ? (
                  <button
                    onClick={() => onAdd(store, p)}
                    style={{
                      display: "flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 500,
                      background: COLORS.ink, color: COLORS.paper, border: "none", borderRadius: 8,
                      padding: "7px 12px", cursor: "pointer",
                    }}
                  >
                    <Plus size={14} /> Add
                  </button>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: "4px 6px" }}>
                    <button onClick={() => onRemove(store, p)} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.ink, display: "flex" }}>
                      <Minus size={14} />
                    </button>
                    <span style={{ fontSize: 13.5, fontWeight: 600, minWidth: 14, textAlign: "center" }}>{qty}</span>
                    <button onClick={() => onAdd(store, p)} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.ink, display: "flex" }}>
                      <Plus size={14} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Cart drawer
--------------------------------------------------------- */
function CartDrawer({ cart, onAdd, onRemove, onClose, onCheckout }) {
  const items = Object.values(cart);
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const byStore = items.reduce((acc, it) => {
    acc[it.storeName] = acc[it.storeName] || [];
    acc[it.storeName].push(it);
    return acc;
  }, {});

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(30,42,50,0.35)", zIndex: 50,
        display: "flex", justifyContent: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 360, maxWidth: "90vw", height: "100%", background: COLORS.paper,
          padding: "22px 20px", display: "flex", flexDirection: "column", overflowY: "auto",
          borderLeft: `1px solid ${COLORS.line}`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: COLORS.ink, margin: 0 }}>
            Your basket
          </h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.inkSoft }}>
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <p style={{ color: COLORS.inkSoft, fontSize: 14 }}>Nothing here yet. Browse a store to add products.</p>
        ) : (
          <>
            <div style={{ flex: 1 }}>
              {Object.entries(byStore).map(([storeName, its]) => (
                <div key={storeName} style={{ marginBottom: 18 }}>
                  <p style={{ fontSize: 12.5, fontWeight: 600, color: COLORS.inkSoft, textTransform: "uppercase", letterSpacing: 0.4, margin: "0 0 8px" }}>
                    {storeName}
                  </p>
                  {its.map((it) => (
                    <div key={it.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${COLORS.line}` }}>
                      <div>
                        <p style={{ fontSize: 13.5, fontWeight: 500, color: COLORS.ink, margin: 0 }}>{it.name}</p>
                        <p style={{ fontSize: 12, color: COLORS.inkSoft, margin: "2px 0 0" }}>{formatRupee(it.price)} × {it.qty}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <button onClick={() => onRemove(it.store, it.product)} style={{ background: "none", border: `1px solid ${COLORS.line}`, borderRadius: 6, cursor: "pointer", color: COLORS.ink, display: "flex", padding: 3 }}>
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: 13, fontWeight: 600, minWidth: 12, textAlign: "center" }}>{it.qty}</span>
                        <button onClick={() => onAdd(it.store, it.product)} style={{ background: "none", border: `1px solid ${COLORS.line}`, borderRadius: 6, cursor: "pointer", color: COLORS.ink, display: "flex", padding: 3 }}>
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div style={{ borderTop: `1px solid ${COLORS.line}`, paddingTop: 14, marginTop: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 600, color: COLORS.ink, marginBottom: 12 }}>
                <span>Total</span>
                <PriceTag>{formatRupee(total)}</PriceTag>
              </div>
              <button
                onClick={onCheckout}
                style={{
                  width: "100%", background: COLORS.ink, color: COLORS.paper, border: "none",
                  borderRadius: 10, padding: "12px 0", fontSize: 14.5, fontWeight: 600, cursor: "pointer",
                }}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Order confirmation
--------------------------------------------------------- */
function Confirmation({ order, onDone }) {
  const byStore = order.items.reduce((acc, it) => {
    acc[it.storeName] = acc[it.storeName] || [];
    acc[it.storeName].push(it);
    return acc;
  }, {});
  return (
    <div style={{ maxWidth: 480, margin: "40px auto", textAlign: "center" }}>
      <div
        style={{
          width: 56, height: 56, borderRadius: "50%", background: "#DCE7D5",
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px",
        }}
      >
        <Check size={26} color={COLORS.sageDeep} />
      </div>
      <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 600, color: COLORS.ink, margin: "0 0 6px" }}>
        Order placed
      </h2>
      <p style={{ fontSize: 14, color: COLORS.inkSoft, margin: "0 0 26px" }}>
        Order #{order.id} · {formatRupee(order.total)} total
      </p>

      <div style={{ textAlign: "left", background: COLORS.card, border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: "18px 20px" }}>
        {Object.entries(byStore).map(([storeName, its]) => (
          <div key={storeName} style={{ marginBottom: 14 }}>
            <p style={{ fontSize: 13.5, fontWeight: 600, color: COLORS.ink, margin: "0 0 2px" }}>{storeName}</p>
            <p style={{ fontSize: 12.5, color: COLORS.inkSoft, margin: "0 0 6px" }}>Ready for pickup in ~20 min</p>
            {its.map((it) => (
              <p key={it.key} style={{ fontSize: 13, color: COLORS.inkSoft, margin: "2px 0" }}>
                {it.qty} × {it.name}
              </p>
            ))}
          </div>
        ))}
      </div>

      <button
        onClick={onDone}
        style={{
          marginTop: 24, background: COLORS.ink, color: COLORS.paper, border: "none",
          borderRadius: 10, padding: "12px 26px", fontSize: 14.5, fontWeight: 600, cursor: "pointer",
        }}
      >
        Back to browsing
      </button>
    </div>
  );
}

/* ---------------------------------------------------------
   Vendor Dashboard — manage one store's status, inventory, orders
--------------------------------------------------------- */
function VendorDashboard({ stores, vendorStoreId, setVendorStoreId, ordersLog, onToggleOpen, onUpdatePrice, onRemoveProduct, onAddProduct }) {
  const store = stores.find((s) => s.id === vendorStoreId) || stores[0];
  const style = CATEGORY_STYLE[store.category];
  const [newProduct, setNewProduct] = useState({ name: "", price: "", unit: "each" });
  const [editingPrice, setEditingPrice] = useState({}); // productId -> draft string

  // Orders that include at least one item from this store
  const storeOrders = ordersLog
    .map((o) => ({ ...o, items: o.items.filter((it) => it.storeId === store.id) }))
    .filter((o) => o.items.length > 0);

  const revenue = storeOrders.reduce(
    (sum, o) => sum + o.items.reduce((s, it) => s + it.price * it.qty, 0),
    0
  );

  function submitNewProduct(e) {
    e.preventDefault();
    const price = Number(newProduct.price);
    if (!newProduct.name.trim() || !price || price <= 0) return;
    onAddProduct(store.id, { name: newProduct.name.trim(), price, unit: newProduct.unit || "each" });
    setNewProduct({ name: "", price: "", unit: "each" });
  }

  function commitPrice(productId) {
    const draft = editingPrice[productId];
    const price = Number(draft);
    if (draft !== undefined && price > 0) onUpdatePrice(store.id, productId, price);
    setEditingPrice((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }

  const cardStyle = {
    background: COLORS.card,
    border: `1px solid ${COLORS.line}`,
    borderRadius: 12,
    padding: "16px 18px",
  };

  return (
    <div style={{ padding: "28px 0 40px" }}>
      {/* Store switcher — simulates picking which vendor account you're signed in as */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 22 }}>
        <div>
          <p style={{ fontSize: 12.5, color: COLORS.inkSoft, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 0.4 }}>
            Managing
          </p>
          <div style={{ position: "relative", display: "inline-block" }}>
            <select
              value={store.id}
              onChange={(e) => setVendorStoreId(e.target.value)}
              style={{
                fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: COLORS.ink,
                background: "transparent", border: "none", appearance: "none", cursor: "pointer",
                paddingRight: 26,
              }}
            >
              {stores.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
            <ChevronDown size={16} style={{ position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: COLORS.inkSoft }} />
          </div>
        </div>

        <button
          onClick={() => onToggleOpen(store.id)}
          style={{
            display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 10,
            border: `1px solid ${store.openNow ? COLORS.sageDeep : COLORS.line}`,
            background: store.openNow ? "#DCE7D5" : COLORS.card,
            color: store.openNow ? COLORS.sageDeep : COLORS.inkSoft,
            fontSize: 13.5, fontWeight: 600, cursor: "pointer",
          }}
        >
          <Power size={15} />
          {store.openNow ? "Open — tap to close" : "Closed — tap to open"}
        </button>
      </div>

      {/* Overview cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 26 }}>
        <div style={cardStyle}>
          <p style={{ fontSize: 12.5, color: COLORS.inkSoft, margin: "0 0 6px" }}>Orders (this session)</p>
          <p style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600, margin: 0 }}>{storeOrders.length}</p>
        </div>
        <div style={cardStyle}>
          <p style={{ fontSize: 12.5, color: COLORS.inkSoft, margin: "0 0 6px" }}>Revenue (this session)</p>
          <p style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600, margin: 0 }}>{formatRupee(revenue)}</p>
        </div>
        <div style={cardStyle}>
          <p style={{ fontSize: 12.5, color: COLORS.inkSoft, margin: "0 0 6px" }}>Products listed</p>
          <p style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600, margin: 0 }}>{store.products.length}</p>
        </div>
        <div style={cardStyle}>
          <p style={{ fontSize: 12.5, color: COLORS.inkSoft, margin: "0 0 6px" }}>Rating</p>
          <p style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600, margin: 0, display: "flex", alignItems: "center", gap: 6 }}>
            <Star size={20} fill={COLORS.butter} color={COLORS.butter} /> {store.rating}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 22, alignItems: "start" }}>
        {/* Inventory management */}
        <div>
          <h3 style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, margin: "0 0 12px" }}>
            <Package size={17} /> Inventory
          </h3>
          <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
            {store.products.map((p, i) => (
              <div
                key={p.id}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
                  padding: "12px 16px", borderBottom: i < store.products.length - 1 ? `1px solid ${COLORS.line}` : "none",
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 13.5, fontWeight: 500, color: COLORS.ink, margin: 0 }}>{p.name}</p>
                  <p style={{ fontSize: 12, color: COLORS.inkSoft, margin: "2px 0 0" }}>per {p.unit}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12.5, color: COLORS.inkSoft }}>₹</span>
                  <input
                    value={editingPrice[p.id] ?? p.price}
                    onChange={(e) => setEditingPrice((prev) => ({ ...prev, [p.id]: e.target.value }))}
                    onBlur={() => commitPrice(p.id)}
                    onKeyDown={(e) => e.key === "Enter" && commitPrice(p.id)}
                    style={{
                      width: 64, fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, border: `1px solid ${COLORS.line}`,
                      borderRadius: 6, padding: "5px 7px", textAlign: "right", color: COLORS.ink,
                    }}
                  />
                  <button
                    onClick={() => onRemoveProduct(store.id, p.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.brick, display: "flex", padding: 4 }}
                    title="Remove product"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
            {store.products.length === 0 && (
              <p style={{ fontSize: 13, color: COLORS.inkSoft, padding: "16px" }}>No products listed yet — add your first one below.</p>
            )}
          </div>

          {/* Add product form */}
          <form onSubmit={submitNewProduct} style={{ ...cardStyle, marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <input
              value={newProduct.name}
              onChange={(e) => setNewProduct((p) => ({ ...p, name: e.target.value }))}
              placeholder="New product name"
              style={{ flex: "2 1 160px", fontSize: 13, border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: "8px 10px", color: COLORS.ink }}
            />
            <input
              value={newProduct.price}
              onChange={(e) => setNewProduct((p) => ({ ...p, price: e.target.value }))}
              placeholder="Price ₹"
              type="number"
              min="1"
              style={{ flex: "1 1 80px", fontSize: 13, border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: "8px 10px", color: COLORS.ink }}
            />
            <input
              value={newProduct.unit}
              onChange={(e) => setNewProduct((p) => ({ ...p, unit: e.target.value }))}
              placeholder="Unit (each, kg…)"
              style={{ flex: "1 1 100px", fontSize: 13, border: `1px solid ${COLORS.line}`, borderRadius: 8, padding: "8px 10px", color: COLORS.ink }}
            />
            <button
              type="submit"
              style={{
                display: "flex", alignItems: "center", gap: 6, background: COLORS.ink, color: COLORS.paper,
                border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer",
              }}
            >
              <Plus size={14} /> Add
            </button>
          </form>
        </div>

        {/* Orders */}
        <div>
          <h3 style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, margin: "0 0 12px" }}>
            <Receipt size={17} /> Orders
          </h3>
          <div style={cardStyle}>
            {storeOrders.length === 0 ? (
              <p style={{ fontSize: 13, color: COLORS.inkSoft, margin: 0 }}>
                No orders yet this session. Switch to Customer mode and place one to see it appear here.
              </p>
            ) : (
              storeOrders.map((o, i) => (
                <div key={o.id} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: i < storeOrders.length - 1 ? `1px solid ${COLORS.line}` : "none" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink }}>Order #{o.id}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, background: style?.bg, color: style?.fg, borderRadius: 999, padding: "2px 8px" }}>
                      New
                    </span>
                  </div>
                  {o.items.map((it) => (
                    <p key={it.key} style={{ fontSize: 12.5, color: COLORS.inkSoft, margin: "2px 0" }}>
                      {it.qty} × {it.name}
                    </p>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   App
--------------------------------------------------------- */
export default function App() {
  const [view, setView] = useState("home"); // home | store | confirm
  const [activeStore, setActiveStore] = useState(null);
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [mapMode, setMapMode] = useState("list"); // list | map
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [order, setOrder] = useState(null);

  // Role + vendor-editable data. storesState is the live source of truth so
  // edits made in the Vendor Dashboard (price changes, open/closed, new
  // products) show up immediately on the customer side.
  const [role, setRole] = useState("customer"); // customer | vendor
  const [storesState, setStoresState] = useState(() =>
    STORES.map((s) => ({ ...s, products: s.products.map((p) => ({ ...p })) }))
  );
  const [vendorStoreId, setVendorStoreId] = useState(STORES[0].id);
  const [ordersLog, setOrdersLog] = useState([]); // all completed orders, for vendor view

  const filteredStores = useMemo(() => {
    return storesState.filter((s) => {
      const matchesCategory = category === "All" || s.category === category;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q || s.name.toLowerCase().includes(q) || s.area.toLowerCase().includes(q) || s.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [category, query, storesState]);

  function toggleStoreOpen(storeId) {
    setStoresState((prev) => prev.map((s) => (s.id === storeId ? { ...s, openNow: !s.openNow } : s)));
  }

  function updateProductPrice(storeId, productId, price) {
    setStoresState((prev) =>
      prev.map((s) =>
        s.id !== storeId
          ? s
          : { ...s, products: s.products.map((p) => (p.id === productId ? { ...p, price } : p)) }
      )
    );
  }

  function removeProduct(storeId, productId) {
    setStoresState((prev) =>
      prev.map((s) => (s.id !== storeId ? s : { ...s, products: s.products.filter((p) => p.id !== productId) }))
    );
  }

  function addProduct(storeId, product) {
    setStoresState((prev) =>
      prev.map((s) =>
        s.id !== storeId ? s : { ...s, products: [...s.products, { ...product, id: `p-${Date.now()}` }] }
      )
    );
  }

  const cartCount = Object.values(cart).reduce((sum, it) => sum + it.qty, 0);

  function addToCart(store, product) {
    const key = `${store.id}-${product.id}`;
    setCart((prev) => {
      const existing = prev[key];
      return {
        ...prev,
        [key]: {
          key, store, product, storeId: store.id, storeName: store.name,
          productId: product.id, name: product.name, price: product.price,
          qty: (existing?.qty || 0) + 1,
        },
      };
    });
  }

  function removeFromCart(store, product) {
    const key = `${store.id}-${product.id}`;
    setCart((prev) => {
      const existing = prev[key];
      if (!existing) return prev;
      if (existing.qty <= 1) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: { ...existing, qty: existing.qty - 1 } };
    });
  }

  function checkout() {
    const items = Object.values(cart);
    const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);
    const newOrder = {
      id: Math.floor(1000 + Math.random() * 9000),
      items,
      total,
      placedAt: new Date(),
    };
    setOrder(newOrder);
    setOrdersLog((prev) => [newOrder, ...prev]);
    setCart({});
    setCartOpen(false);
    setView("confirm");
  }

  function openStore(store) {
    setActiveStore(store);
    setView("store");
  }

  if (view === "partner") {
    return <PartnerWithUs onBack={() => setView("home")} />;
  }

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: COLORS.paper,
        minHeight: 600,
        color: COLORS.ink,
        padding: "0 0 60px",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      {/* Header */}
      <header
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 24px", borderBottom: `1px solid ${COLORS.line}`, position: "sticky", top: 0,
          background: COLORS.paper, zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: COLORS.ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <MapPin size={16} color={COLORS.butter} />
          </div>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600 }}>Your Local Partners</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={() => setView("partner")}
            style={{
              background: "none", border: "none", color: COLORS.inkSoft, fontSize: 13.5,
              fontWeight: 500, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3,
            }}
          >
            Partner with us
          </button>
          <div style={{ display: "flex", border: `1px solid ${COLORS.line}`, borderRadius: 8, overflow: "hidden" }}>
            {[
              { key: "customer", label: "Customer", icon: User },
              { key: "vendor", label: "Vendor", icon: LayoutDashboard },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => {
                  setRole(key);
                  if (key === "customer") setView("home");
                }}
                style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", fontSize: 13,
                  fontWeight: 500, border: "none", cursor: "pointer",
                  background: role === key ? COLORS.ink : "transparent",
                  color: role === key ? COLORS.paper : COLORS.inkSoft,
                }}
              >
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>

          {role === "customer" && (
            <button
              onClick={() => setCartOpen(true)}
              style={{
                display: "flex", alignItems: "center", gap: 8, background: "none",
                border: `1px solid ${COLORS.line}`, borderRadius: 10, padding: "8px 14px", cursor: "pointer",
              }}
            >
              <ShoppingBag size={16} color={COLORS.ink} />
              <span style={{ fontSize: 13.5, fontWeight: 500 }}>Basket</span>
              {cartCount > 0 && (
                <span style={{ background: COLORS.brick, color: "#fff", fontSize: 11, fontWeight: 700, borderRadius: 999, padding: "1px 7px" }}>
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </header>

      <main style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>
        {role === "vendor" ? (
          <VendorDashboard
            stores={storesState}
            vendorStoreId={vendorStoreId}
            setVendorStoreId={setVendorStoreId}
            ordersLog={ordersLog}
            onToggleOpen={toggleStoreOpen}
            onUpdatePrice={updateProductPrice}
            onRemoveProduct={removeProduct}
            onAddProduct={addProduct}
          />
        ) : (
        <>
        {view === "home" && (
          <>
            {/* Hero */}
            <section style={{ padding: "40px 0 20px" }}>
              <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 40, fontWeight: 700, lineHeight: 1.15, margin: "0 0 10px", maxWidth: 560 }}>
                Shop your street.
              </h1>
              <p style={{ fontSize: 15.5, color: COLORS.inkSoft, margin: "0 0 24px", maxWidth: 480 }}>
                Find bakeries, plant shops, grocers, and more within walking distance — order ahead, pick up local.
              </p>

              {/* Search bar */}
              <div
                style={{
                  display: "flex", alignItems: "center", gap: 10, background: COLORS.card,
                  border: `1px solid ${COLORS.line}`, borderRadius: 12, padding: "10px 16px", maxWidth: 520,
                }}
              >
                <Search size={17} color={COLORS.inkSoft} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search stores, categories, or neighborhoods"
                  style={{ border: "none", outline: "none", background: "transparent", fontSize: 14, flex: 1, color: COLORS.ink, fontFamily: "'Inter', sans-serif" }}
                />
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12.5, color: COLORS.inkSoft, borderLeft: `1px solid ${COLORS.line}`, paddingLeft: 10 }}>
                  <MapPin size={13} /> Bengaluru
                </span>
              </div>

              {/* Category chips */}
              <div style={{ display: "flex", gap: 8, marginTop: 18, overflowX: "auto", paddingBottom: 4 }}>
                {CATEGORIES.map((c) => (
                  <CategoryChip key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
                ))}
              </div>
            </section>

            {/* List/Map toggle + results */}
            <section style={{ padding: "10px 0 40px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <p style={{ fontSize: 13.5, color: COLORS.inkSoft, margin: 0 }}>
                  {filteredStores.length} {filteredStores.length === 1 ? "store" : "stores"} nearby
                </p>
                <div style={{ display: "flex", border: `1px solid ${COLORS.line}`, borderRadius: 8, overflow: "hidden" }}>
                  {["list", "map"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMapMode(m)}
                      style={{
                        display: "flex", alignItems: "center", gap: 6, padding: "7px 13px", fontSize: 13,
                        fontWeight: 500, border: "none", cursor: "pointer",
                        background: mapMode === m ? COLORS.ink : "transparent",
                        color: mapMode === m ? COLORS.paper : COLORS.inkSoft,
                      }}
                    >
                      {m === "list" ? <ListIcon size={14} /> : <MapIcon size={14} />}
                      {m === "list" ? "List" : "Map"}
                    </button>
                  ))}
                </div>
              </div>

              {mapMode === "map" ? (
                <MockMap stores={filteredStores} onOpen={openStore} activeId={activeStore?.id} />
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                  {filteredStores.map((s) => (
                    <StoreCard key={s.id} store={s} onOpen={openStore} />
                  ))}
                  {filteredStores.length === 0 && (
                    <p style={{ color: COLORS.inkSoft, fontSize: 14 }}>No stores match that search. Try a different neighborhood or category.</p>
                  )}
                </div>
              )}
            </section>
          </>
        )}

        {view === "store" && activeStore && (
          <div style={{ padding: "24px 0" }}>
            <StoreDetail
              store={storesState.find((s) => s.id === activeStore.id) || activeStore}
              cart={cart}
              onAdd={addToCart}
              onRemove={removeFromCart}
              onBack={() => setView("home")}
            />
          </div>
        )}

        {view === "confirm" && order && (
          <Confirmation order={order} onDone={() => setView("home")} />
        )}
        </>
        )}
      </main>

      {cartOpen && (
        <CartDrawer cart={cart} onAdd={addToCart} onRemove={removeFromCart} onClose={() => setCartOpen(false)} onCheckout={checkout} />
      )}
    </div>
  );
}
