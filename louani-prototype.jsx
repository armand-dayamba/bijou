import React, { useState } from "react";
import {
  Home,
  Search,
  CalendarCheck,
  User,
  MapPin,
  Star,
  ShieldCheck,
  Lock,
  Unlock,
  ChevronLeft,
  Car,
  Sofa,
  Wrench,
  Phone,
  BadgeCheck,
  Clock,
  ArrowRight,
} from "lucide-react";

const CATS = [
  { id: "logement", label: "Logements", icon: Home, color: "#E8552E" },
  { id: "vehicule", label: "Véhicules", icon: Car, color: "#1F9E8C" },
  { id: "materiel", label: "Matériel", icon: Wrench, color: "#8B5FBF" },
];

function catColor(id) {
  return CATS.find((c) => c.id === id)?.color || "#E8552E";
}

const LISTINGS = [
  {
    id: 1,
    cat: "logement",
    title: "Chambre meublée à Ouaga 2000",
    quartier: "Ouaga 2000, Ouagadougou",
    price: 45000,
    unit: "mois",
    rating: 4.8,
    reviews: 23,
    verified: true,
    img: "🏠",
    owner: "Aïcha K.",
    caution: 45000,
  },
  {
    id: 2,
    cat: "vehicule",
    title: "Toyota Hilux double cabine",
    quartier: "Koulouba, Ouagadougou",
    price: 35000,
    unit: "jour",
    rating: 4.6,
    reviews: 41,
    verified: true,
    img: "🚙",
    owner: "Issa T.",
    caution: 100000,
  },
  {
    id: 3,
    cat: "materiel",
    title: "Sono complète + groupe électrogène",
    quartier: "Dagnoën, Ouagadougou",
    price: 25000,
    unit: "jour",
    rating: 4.9,
    reviews: 67,
    verified: true,
    img: "🔊",
    owner: "Boukary S.",
    caution: 20000,
  },
  {
    id: 4,
    cat: "vehicule",
    title: "Moto Sanili 125",
    quartier: "Gounghin, Ouagadougou",
    price: 5000,
    unit: "jour",
    rating: 4.3,
    reviews: 15,
    verified: false,
    img: "🏍️",
    owner: "Rasmané O.",
    caution: 15000,
  },
  {
    id: 5,
    cat: "logement",
    title: "Studio à Bobo-Dioulasso",
    quartier: "Secteur 15, Bobo-Dioulasso",
    price: 30000,
    unit: "mois",
    rating: 4.7,
    reviews: 12,
    verified: true,
    img: "🏘️",
    owner: "Fatou D.",
    caution: 30000,
  },
  {
    id: 6,
    cat: "materiel",
    title: "Chaises + bâches (100 places)",
    quartier: "Tampouy, Ouagadougou",
    price: 15000,
    unit: "jour",
    rating: 4.5,
    reviews: 34,
    verified: true,
    img: "⛺",
    owner: "Salif N.",
    caution: 10000,
  },
];

function fmt(n) {
  return n.toLocaleString("fr-FR").replace(/,/g, " ");
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [tab, setTab] = useState("home");
  const [activeCat, setActiveCat] = useState("tous");
  const [selected, setSelected] = useState(null);
  const [bookingStep, setBookingStep] = useState(0);

  const filtered =
    activeCat === "tous" ? LISTINGS : LISTINGS.filter((l) => l.cat === activeCat);

  function openListing(l) {
    setSelected(l);
    setScreen("detail");
  }

  function startBooking() {
    setBookingStep(0);
    setScreen("booking");
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1B2A4A] via-[#2A3F6B] to-[#8B5FBF] p-6 font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Work+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500&display=swap');
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      {/* Phone frame */}
      <div className="relative w-[380px] h-[780px] bg-[#FFF8ED] rounded-[2.5rem] shadow-2xl overflow-hidden border-8 border-[#1B2A4A] font-body">
        {/* Status bar notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#12203a] rounded-b-2xl z-20" />

        <div className="h-full w-full overflow-y-auto pb-20 pt-8">
          {screen === "home" && (
            <HomeScreen
              activeCat={activeCat}
              setActiveCat={setActiveCat}
              filtered={filtered}
              openListing={openListing}
            />
          )}
          {screen === "detail" && selected && (
            <DetailScreen
              listing={selected}
              onBack={() => setScreen("home")}
              onBook={startBooking}
            />
          )}
          {screen === "booking" && selected && (
            <BookingScreen
              listing={selected}
              step={bookingStep}
              setStep={setBookingStep}
              onBack={() => setScreen("detail")}
              onDone={() => setScreen("home")}
            />
          )}
          {screen === "profile" && <ProfileScreen />}
        </div>

        {/* Bottom nav */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#12203a] border-t border-[#2a3b5c] flex justify-around items-center h-16 px-2">
          <NavBtn
            icon={Home}
            label="Accueil"
            active={screen === "home"}
            onClick={() => setScreen("home")}
          />
          <NavBtn icon={Search} label="Rechercher" active={false} onClick={() => setScreen("home")} />
          <NavBtn
            icon={CalendarCheck}
            label="Réservations"
            active={screen === "booking"}
            onClick={() => selected && setScreen("booking")}
          />
          <NavBtn
            icon={User}
            label="Profil"
            active={screen === "profile"}
            onClick={() => setScreen("profile")}
          />
        </div>
      </div>
    </div>
  );
}

function NavBtn({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 px-3 py-1.5"
    >
      <Icon
        size={20}
        className={active ? "text-[#E8A33D]" : "text-[#8494b0]"}
        strokeWidth={active ? 2.4 : 1.8}
      />
      <span
        className={`text-[10px] font-medium ${
          active ? "text-[#E8A33D]" : "text-[#8494b0]"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

function HomeScreen({ activeCat, setActiveCat, filtered, openListing }) {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-1">
        <div>
          <p className="text-[11px] tracking-wide text-[#8a7350] font-mono uppercase">
            Ouagadougou
          </p>
          <h1 className="font-display text-[26px] font-semibold text-[#1B2A4A] leading-tight">
            Louani
          </h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#1B2A4A] flex items-center justify-center text-[#F5EFE0] text-sm font-semibold">
          BJ
        </div>
      </div>
      <p className="text-[13px] text-[#5c5240] mb-4">
        Loue ce qu'il te faut, quand il te le faut.
      </p>

      {/* Search bar */}
      <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 mb-4 border border-[#e5dcc7]">
        <Search size={16} className="text-[#8a7350]" />
        <span className="text-[13px] text-[#a89a7c]">
          Chercher une chambre, une voiture...
        </span>
      </div>

      {/* Category chips */}
      <div className="flex gap-2 mb-5 overflow-x-auto">
        <Chip
          label="Tout"
          active={activeCat === "tous"}
          onClick={() => setActiveCat("tous")}
          color="#1B2A4A"
        />
        {CATS.map((c) => (
          <Chip
            key={c.id}
            label={c.label}
            icon={c.icon}
            active={activeCat === c.id}
            onClick={() => setActiveCat(c.id)}
            color={c.color}
          />
        ))}
      </div>

      {/* Trust banner */}
      <div className="bg-gradient-to-r from-[#1B2A4A] to-[#3D2B6B] rounded-2xl p-4 mb-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#F5A623]/20 flex items-center justify-center flex-shrink-0">
          <ShieldCheck size={18} className="text-[#F5A623]" />
        </div>
        <p className="text-[12px] text-[#cdd6e8] leading-snug">
          Paiement bloqué en séquestre jusqu'à remise du bien. Orange Money & Moov Money.
        </p>
      </div>

      {/* Listings */}
      <div className="flex flex-col gap-3">
        {filtered.map((l) => (
          <ListingCard key={l.id} listing={l} onClick={() => openListing(l)} />
        ))}
      </div>
    </div>
  );
}

function Chip({ label, icon: Icon, active, onClick, color }) {
  const bg = color || "#C1440E";
  return (
    <button
      onClick={onClick}
      style={active ? { backgroundColor: bg, borderColor: bg } : undefined}
      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12.5px] font-medium whitespace-nowrap border transition-colors ${
        active
          ? "text-white"
          : "bg-white text-[#5c5240] border-[#e5dcc7]"
      }`}
    >
      {Icon && <Icon size={13} />}
      {label}
    </button>
  );
}

function ListingCard({ listing, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex gap-3 bg-white rounded-2xl p-3 border border-[#e5dcc7] text-left active:scale-[0.98] transition-transform"
    >
      <div
        className="w-20 h-20 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
        style={{ backgroundColor: `${catColor(listing.cat)}1F` }}
      >
        {listing.img}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-1">
          <h3 className="font-semibold text-[13.5px] text-[#1B2A4A] leading-snug">
            {listing.title}
          </h3>
          {listing.verified && (
            <BadgeCheck size={15} className="text-[#1F9E8C] flex-shrink-0 mt-0.5" />
          )}
        </div>
        <p className="flex items-center gap-1 text-[11px] text-[#8a7350] mt-0.5">
          <MapPin size={11} /> {listing.quartier}
        </p>
        <div className="flex items-center justify-between mt-1.5">
          <p
            className="font-mono text-[13px] font-semibold"
            style={{ color: catColor(listing.cat) }}
          >
            {fmt(listing.price)} F<span className="text-[#a89a7c]">/{listing.unit}</span>
          </p>
          <p className="flex items-center gap-0.5 text-[11px] text-[#5c5240]">
            <Star size={11} className="fill-[#F5A623] text-[#F5A623]" />
            {listing.rating}
          </p>
        </div>
      </div>
    </button>
  );
}

function DetailScreen({ listing, onBack, onBook }) {
  return (
    <div>
      <div className="px-5 flex items-center gap-3 mb-3">
        <button onClick={onBack} className="p-1.5 -ml-1.5">
          <ChevronLeft size={22} className="text-[#1B2A4A]" />
        </button>
        <p className="text-[11px] font-mono uppercase tracking-wide text-[#8a7350]">
          Détail de l'annonce
        </p>
      </div>

      <div
        className="mx-5 h-44 rounded-2xl flex items-center justify-center text-6xl mb-4"
        style={{
          background: `linear-gradient(135deg, ${catColor(listing.cat)}, #1B2A4A)`,
        }}
      >
        {listing.img}
      </div>

      <div className="px-5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-display text-[20px] font-semibold text-[#1B2A4A] leading-tight">
            {listing.title}
          </h2>
        </div>
        <p className="flex items-center gap-1 text-[12.5px] text-[#8a7350] mt-1">
          <MapPin size={12} /> {listing.quartier}
        </p>

        <div className="flex items-center gap-4 mt-3">
          <p className="flex items-center gap-1 text-[12.5px] text-[#5c5240]">
            <Star size={13} className="fill-[#F5A623] text-[#F5A623]" />
            <span className="font-semibold">{listing.rating}</span> ({listing.reviews} avis)
          </p>
          {listing.verified && (
            <p className="flex items-center gap-1 text-[12.5px] text-[#1F9E8C] font-medium">
              <BadgeCheck size={13} /> Vérifié
            </p>
          )}
        </div>

        <div className="h-px bg-[#e5dcc7] my-4" />

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#1B2A4A] flex items-center justify-center text-[#F5EFE0] text-sm font-semibold flex-shrink-0">
            {listing.owner.split(" ").map((w) => w[0]).join("")}
          </div>
          <div>
            <p className="text-[13px] font-semibold text-[#1B2A4A]">{listing.owner}</p>
            <p className="text-[11.5px] text-[#8a7350]">Loueur depuis 2024</p>
          </div>
          <button className="ml-auto w-9 h-9 rounded-full bg-[#f0e9d8] flex items-center justify-center">
            <Phone size={15} className="text-[#1B2A4A]" />
          </button>
        </div>

        <div className="h-px bg-[#e5dcc7] my-4" />

        <div className="bg-[#f0e9d8] rounded-2xl p-4">
          <p className="text-[12px] font-semibold text-[#1B2A4A] mb-2 flex items-center gap-1.5">
            <Lock size={13} /> Sécurité de la transaction
          </p>
          <ul className="text-[11.5px] text-[#5c5240] leading-relaxed list-disc pl-4 space-y-0.5">
            <li>Paiement en séquestre, débloqué à la remise</li>
            <li>Caution remboursable : {fmt(listing.caution)} F</li>
            <li>Identité vérifiée par pièce + parrainage</li>
          </ul>
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 max-w-[364px] mx-auto px-5">
        <div className="bg-white rounded-2xl p-3.5 border border-[#e5dcc7] flex items-center justify-between shadow-lg">
          <div>
            <p
              className="font-mono text-[16px] font-semibold"
              style={{ color: catColor(listing.cat) }}
            >
              {fmt(listing.price)} F
            </p>
            <p className="text-[10.5px] text-[#8a7350]">par {listing.unit}</p>
          </div>
          <button
            onClick={onBook}
            style={{ backgroundColor: catColor(listing.cat) }}
            className="text-white text-[13px] font-semibold px-5 py-2.5 rounded-xl flex items-center gap-1.5"
          >
            Réserver <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

const STEPS = [
  { label: "Demande envoyée", icon: Clock },
  { label: "Paiement en séquestre", icon: Lock },
  { label: "Bien remis", icon: Unlock },
  { label: "Confirmé", icon: BadgeCheck },
];

function BookingScreen({ listing, step, setStep, onBack, onDone }) {
  const isLast = step === STEPS.length - 1;
  return (
    <div className="px-5">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={onBack} className="p-1.5 -ml-1.5">
          <ChevronLeft size={22} className="text-[#1B2A4A]" />
        </button>
        <p className="text-[11px] font-mono uppercase tracking-wide text-[#8a7350]">
          Réservation
        </p>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-[#e5dcc7] mb-5">
        <div className="flex gap-3 items-center">
          <div className="w-14 h-14 rounded-xl bg-[#f0e9d8] flex items-center justify-center text-2xl">
            {listing.img}
          </div>
          <div>
            <p className="font-semibold text-[13px] text-[#1B2A4A]">{listing.title}</p>
            <p className="text-[11.5px] text-[#8a7350]">{listing.quartier}</p>
          </div>
        </div>
      </div>

      <p className="text-[12px] font-semibold text-[#1B2A4A] mb-3">
        Statut de la transaction
      </p>
      <div className="flex flex-col gap-0">
        {STEPS.map((s, i) => {
          const done = i <= step;
          const Icon = s.icon;
          return (
            <div key={s.label} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: done ? "#1F9E8C" : "#e5dcc7" }}
                >
                  <Icon size={14} className={done ? "text-white" : "text-[#a89a7c]"} />
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className="w-0.5 h-8"
                    style={{ backgroundColor: done ? "#1F9E8C" : "#e5dcc7" }}
                  />
                )}
              </div>
              <p
                className={`text-[13px] pt-1.5 ${
                  done ? "text-[#1B2A4A] font-medium" : "text-[#a89a7c]"
                }`}
              >
                {s.label}
              </p>
            </div>
          );
        })}
      </div>

      <div className="bg-[#f0e9d8] rounded-2xl p-4 mt-5 mb-24">
        <div className="flex justify-between text-[12.5px] text-[#5c5240] mb-1.5">
          <span>Prix ({listing.unit})</span>
          <span className="font-mono">{fmt(listing.price)} F</span>
        </div>
        <div className="flex justify-between text-[12.5px] text-[#5c5240] mb-1.5">
          <span>Caution remboursable</span>
          <span className="font-mono">{fmt(listing.caution)} F</span>
        </div>
        <div className="h-px bg-[#e0d5b8] my-2" />
        <div className="flex justify-between text-[13.5px] font-semibold text-[#1B2A4A]">
          <span>Total à bloquer</span>
          <span className="font-mono">{fmt(listing.price + listing.caution)} F</span>
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 max-w-[364px] mx-auto px-5">
        <button
          onClick={() => (isLast ? onDone() : setStep(step + 1))}
          style={{ backgroundColor: catColor(listing.cat) }}
          className="w-full text-white text-[13.5px] font-semibold py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-lg"
        >
          {isLast ? "Terminer" : "Simuler l'étape suivante"}
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="px-5">
      <div className="flex flex-col items-center pt-2 pb-5">
        <div className="w-16 h-16 rounded-full bg-[#1B2A4A] flex items-center justify-center text-[#F5EFE0] text-lg font-semibold mb-2">
          BJ
        </div>
        <p className="font-display text-[18px] font-semibold text-[#1B2A4A]">Bijou</p>
        <p className="flex items-center gap-1 text-[12px] text-[#4C7A5E] font-medium mt-0.5">
          <BadgeCheck size={13} /> Identité vérifiée
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white rounded-2xl p-3.5 border border-[#e5dcc7] text-center">
          <p className="font-mono text-[18px] font-semibold text-[#1B2A4A]">4.9</p>
          <p className="text-[11px] text-[#8a7350]">Note moyenne</p>
        </div>
        <div className="bg-white rounded-2xl p-3.5 border border-[#e5dcc7] text-center">
          <p className="font-mono text-[18px] font-semibold text-[#1B2A4A]">7</p>
          <p className="text-[11px] text-[#8a7350]">Locations faites</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {["Mes réservations", "Mes annonces", "Moyens de paiement", "Devenir loueur vérifié", "Aide & support"].map(
          (item) => (
            <button
              key={item}
              className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-[#e5dcc7] text-[13px] text-[#1B2A4A] font-medium"
            >
              {item}
              <ArrowRight size={14} className="text-[#a89a7c]" />
            </button>
          )
        )}
      </div>
    </div>
  );
}
