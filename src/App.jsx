import { useEffect, useMemo, useState } from "react";

/* =========================
   UTMIFY EVENTS (helpers)
========================= */

function utmifyTrack(event, data = {}) {
  try {
    if (window.utmify && typeof window.utmify.track === "function") {
      window.utmify.track(event, data);
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...data });
  } catch (e) {}
}

/* =========================
   1) QUIZ (6 preguntas) — ESPAÑOL LATAM
========================= */

const questions = [
  {
    question:
      "¿Sabes exactamente cuánto dinero entró y cuánto salió de tu cuenta el mes pasado?",
    description:
      "Aquí no hay correcto o incorrecto. Elige la opción que más se parezca a tu realidad hoy. Eso ayudará a armar tu diagnóstico financiero al final.",
    options: [
      { text: "Tengo una idea, pero nada muy organizado", score: 2, emoji: "🙋‍♂️" },
      { text: "Sí, lo tengo todo anotado y muy claro", score: 3, emoji: "😎" },
      { text: "Sinceramente no… solo gasto y luego veo el estado de cuenta", score: 1, emoji: "😅" },
    ],
  },
  {
    question:
      'Cuando termina el mes, ¿sientes que el dinero simplemente “desapareció”?',
    description: "Selecciona una opción:",
    options: [
      { text: "Sí, al final del mes casi nunca sé a dónde se fue el dinero.", score: 1, emoji: "😔" },
      { text: "No, lo reviso todo y sé exactamente en qué se fue cada gasto.", score: 3, emoji: "😏" },
      { text: "A veces lo siento, pero en general me las arreglo y cierro el mes.", score: 2, emoji: "🤷‍♂️" },
    ],
  },
  {
    question:
      "Si sigues haciendo exactamente lo mismo con tu dinero, ¿cómo crees que estará tu vida financiera en 6 meses?",
    description: "Elige la opción que mejor te describa:",
    options: [
      { text: "Probablemente con más deudas y frustración", score: 1, emoji: "😣" },
      { text: "Igual que hoy, sin mucha evolución", score: 2, emoji: "😐" },
      { text: "Con control y logrando ahorrar cada mes", score: 3, emoji: "🤑" },
    ],
  },
  {
    question: "¿Qué es lo que más te impide tener un buen control financiero hoy?",
    description: "Responde con sinceridad.",
    options: [
      { text: "Falta de organización: empiezo y no logro mantener el control", score: 1, emoji: "🙋‍♂️" },
      { text: "No tengo una herramienta simple para controlar mi dinero", score: 2, emoji: "🤷‍♂️" },
      { text: "Se me olvida registrar los gastos del día a día", score: 1, emoji: "❌" },
      { text: "Me parece complicado usar hojas de cálculo y números", score: 1, emoji: "😅" },
    ],
  },
  {
    question:
      "Si tuvieras una hoja automática que muestre, en pocos clics, a dónde se va cada centavo… ¿la usarías?",
    description: "¿Qué opinas?",
    options: [
      { text: "Sí, totalmente. Es justo lo que necesito ahora", score: 3, emoji: "✅" },
      { text: "Tal vez, si es muy simple y no me toma mucho tiempo", score: 2, emoji: "🙋‍♂️" },
      { text: "No lo sé, nunca lo intenté… pero me da curiosidad", score: 2, emoji: "🤔" },
    ],
  },
  {
    question:
      "¿Te gustaría tener acceso a esta hoja hoy mismo para empezar a organizar tu dinero?",
    description: "",
    options: [
      { text: "Sí, quiero acceso inmediato para organizar mi dinero", score: 3, emoji: "✅" },
      { text: "Sí, pero necesito algo muy simple y fácil de usar", score: 2, emoji: "🙋‍♂️" },
      { text: "Por ahora no", score: 1, emoji: "😔" },
    ],
  },
];

/* =========================
   2) OFERTA ÚNICA (Hotmart)
   ✅ Precios en formato: $19,90
========================= */

const offer = {
  id: "card1",
  title: "Hoja de Cálculo Vida Sin Deudas",
  subtitle: "Acceso de por vida",
  oldPrice: "$97,00",
  newPrice: "$19,90",
  url: "https://pay.hotmart.com/X104304638O?checkoutMode=10",
  image: "/card1-gringa.png",
  bullets: [
    "Acceso de por vida",
    "Actualizaciones constantes",
    "Video guía para aprender a usarla",
    "Sin mensualidad",
    "Personalízala según tus necesidades",
    "Hecha para principiantes y avanzados",
  ],
};

/* =========================
   3) TESTIMONIOS
========================= */

const testimonials = [
  {
    text:
      "Siempre perdía el control de los gastos pequeños. Con la hoja, empecé a monitorear todo y ya estoy logrando guardar un ahorro mensual.",
    name: "María Silva",
    role: "Trabajadora independiente",
    avatar: "/maria.jpg",
  },
  {
    text:
      "Súper simple y práctica. Logré organizar mis cuentas y armar un presupuesto mensual que realmente funciona. ¡Vale cada centavo!",
    name: "Breno Silva",
    role: "Asistente de TI",
    avatar: "/breno.jpg",
  },
  {
    text:
      "Pensé que organizar las finanzas era difícil hasta usar esta hoja. Es intuitiva y los reportes me ayudan a tomar mejores decisiones.",
    name: "Paulo B.",
    role: "Empleado",
    avatar: "/paulo.jpg",
  },
];

/* =========================
   4) CONTADOR (10 min)
========================= */

function useCountdown(startSeconds = 600) {
  const [secondsLeft, setSecondsLeft] = useState(startSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

/* =========================
   APP
========================= */

export default function App() {
  const [stage, setStage] = useState("hook"); // hook | quiz | offers
  const [current, setCurrent] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const maxScore = useMemo(() => questions.length * 3, []);
  const progressPct = useMemo(
    () => Math.round(((current + 1) / questions.length) * 100),
    [current]
  );

  function start() {
    utmifyTrack("quiz_start");
    setStage("quiz");
    setCurrent(0);
    setTotalScore(0);
  }

  function answer(score) {
    const nextTotal = totalScore + score;

    setTotalScore((s) => s + score);

    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    } else {
      utmifyTrack("quiz_complete", { totalScore: nextTotal, maxScore });
      setStage("offers");
    }
  }

  /* ===== PÁGINA 1: ENTRADA con MOCKUP ===== */
  if (stage === "hook") {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.mockWrap}>
            <img
              src="/mockup-gringa.png"
              alt="Mockup de la hoja"
              style={styles.mockImg}
            />
          </div>

          <h1 style={styles.title}>Responde 6 preguntas rápidas 💰</h1>
          <p style={styles.subtitle}>
            En menos de 1 minuto, descubre si tu dinero realmente está bajo control
            o se te está escapando sin que te des cuenta.
          </p>

          <div style={styles.badgeRow}>
            <span style={styles.badge}>🕐 Toma solo unos segundos</span>
          </div>

          <button style={styles.primaryBtn} onClick={start}>
            Iniciar diagnóstico financiero
          </button>
        </div>
      </div>
    );
  }

  /* ===== QUIZ ===== */
  if (stage === "quiz") {
    const q = questions[current];

    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.topRow}>
            <span style={styles.stepPill}>
              Pregunta {current + 1} de {questions.length}
            </span>
            <span style={styles.stepPct}>{progressPct}%</span>
          </div>

          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progressPct}%` }} />
          </div>

          <h2 style={styles.qTitle}>{q.question}</h2>
          {q.description && <p style={styles.qDesc}>{q.description}</p>}

          <div style={{ marginTop: 6 }}>
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                style={styles.optionBtn}
                onClick={() => answer(opt.score)}
              >
                <span style={styles.optEmoji}>{opt.emoji}</span>
                <span style={styles.optText}>{opt.text}</span>
              </button>
            ))}
          </div>

          <div style={styles.helpRow}>
            <span style={styles.helpText}>
              No hay correcto o incorrecto — sé sincero.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return <OffersPage totalScore={totalScore} maxScore={maxScore} />;
}

/* =========================
   PÁGINA FINAL (OFERTA)
========================= */

function OffersPage({ totalScore, maxScore }) {
  const time = useCountdown(10 * 60);

  const perfil =
    totalScore <= 8
      ? "Tu dinero probablemente se está escapando sin que te des cuenta 💸"
      : totalScore <= 13
      ? "Te las arreglas, pero estás perdiendo dinero por el descontrol invisible 👀"
      : "Ya tienes una buena base — ahora es mantener consistencia y optimizar 📌";

  return (
    <div style={styles.page}>
      <div style={{ ...styles.card, padding: 18 }}>
        {/* Contador */}
        <div style={offersStyles.timerWrap}>
          <div style={offersStyles.timerText}>
            ASEGURA TU DESCUENTO AHORA <span style={offersStyles.timer}>{time}</span>
          </div>
        </div>

        {/* Título + Diagnóstico */}
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <div style={offersStyles.headerTag}>TU MEJOR OPCIÓN</div>
          <div style={offersStyles.headerTitle}>Tu diagnóstico está listo ✅</div>
          <div style={offersStyles.headerSub}>
            {perfil}
            <div style={{ marginTop: 6, color: "#6b7280", fontSize: 12 }}>
              Puntuación: <strong>{totalScore}</strong> / {maxScore}
            </div>
          </div>
        </div>

        {/* Imagen hoja */}
        <div style={offersStyles.planilhaOnlyWrap}>
          <img
            src="/planilha-gringa.png"
            alt="Hoja de cálculo"
            style={offersStyles.planilhaOnlyImg}
          />
        </div>

        {/* Card único */}
        <div style={offersStyles.gridOne}>
          <OfferCard offer={offer} />
        </div>

        {/* ===== GARANTÍA ===== */}
        <div style={guaranteeStyles.wrap}>
          <div style={guaranteeStyles.badge}>GARANTÍA TOTAL</div>

          <div style={guaranteeStyles.title}>
            Pruébalo por <span style={guaranteeStyles.titleStrong}>7 días</span> — Sin riesgo ✅
          </div>

          <div style={guaranteeStyles.text}>
            Confío tanto en que esta hoja te dará claridad y control de tu dinero,
            que te doy <strong>7 días para probarla sin miedo</strong>.
            <br />
            <br />
            Si dentro de <strong>7 días</strong> sientes que no valió la pena, solo lo pides
            y recibes <strong>el 100% de tu dinero</strong> de vuelta.
            <br />
            <br />
            Sin vueltas. Sin burocracia. El riesgo es mío. <strong>Tú solo pruebas.</strong>
          </div>

          <div style={guaranteeStyles.footerLine}>
            O organizas tu vida financiera… <strong>o te devuelvo tu dinero.</strong>
          </div>

          {/* ✅ imagem correta */}
          <img
            src="/garantia-7dias.png"
            alt="Garantía 7 días"
            style={guaranteeStyles.image}
          />
        </div>

        {/* Testimonios */}
        <div style={{ marginTop: 18 }}>
          <h3 style={offersStyles.h3}>TESTIMONIOS DE QUIENES YA COMPRARON</h3>
          {testimonials.map((t, i) => (
            <Testimonial key={i} {...t} />
          ))}
        </div>
      </div>
    </div>
  );
}

function OfferCard({ offer }) {
  return (
    <div style={offersStyles.card}>
      <div style={offersStyles.cardTitle}>{offer.title}</div>
      <div style={offersStyles.cardSubtitle}>{offer.subtitle}</div>

      <div style={offersStyles.cardImageWrap}>
        <img src={offer.image} alt={offer.title} style={offersStyles.cardImage} />
      </div>

      <div style={offersStyles.priceBox}>
        <div style={offersStyles.oldPrice}>Antes: {offer.oldPrice}</div>
        <div style={offersStyles.newPrice}>Hoy: {offer.newPrice}</div>
      </div>

      {offer.bullets?.length > 0 && (
        <ul style={offersStyles.bullets}>
          {offer.bullets.map((b, i) => (
            <li key={i} style={offersStyles.bulletItem}>
              ✅ {b}
            </li>
          ))}
        </ul>
      )}

      <button
        style={offersStyles.buyBtn}
        onClick={() => {
          utmifyTrack("offer_click", { offerId: offer.id, offerTitle: offer.title });

          const currentParams = new URLSearchParams(window.location.search);
          const paramsString = currentParams.toString();

          let finalUrl = offer.url;

          if (paramsString) {
            finalUrl += (offer.url.includes("?") ? "&" : "?") + paramsString;
          }

          window.location.href = finalUrl;
        }}
      >
        Quiero este
      </button>
    </div>
  );
}

function Testimonial({ text, name, role, avatar }) {
  return (
    <div style={offersStyles.testimonial}>
      <div style={offersStyles.testHeader}>
        <img src={avatar} alt={name} style={offersStyles.avatar} />
        <div>
          <div style={offersStyles.testName}>{name}</div>
          <div style={offersStyles.testRole}>{role}</div>
        </div>
      </div>

      <div style={{ marginBottom: 6, marginTop: 10 }}>{"⭐".repeat(5)}</div>
      <div style={{ fontSize: 14, lineHeight: 1.45, color: "#111827" }}>{text}</div>
    </div>
  );
}

/* =========================
   ESTILOS
========================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial",
    padding: 16,
  },
  card: {
    background: "#ffffff",
    borderRadius: 20,
    width: "100%",
    maxWidth: 980,
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.22)",
    padding: "26px 22px",
  },
  mockWrap: {
    width: "100%",
    maxWidth: 520,
    margin: "0 auto 14px auto",
    borderRadius: 16,
    overflow: "hidden",
    background: "#0b1220",
    padding: 10,
    height: 240,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mockImg: { width: "100%", height: "100%", objectFit: "contain", display: "block" },

  title: { fontSize: 22, marginBottom: 10, color: "#0f172a" },
  subtitle: { fontSize: 14, color: "#475569", marginBottom: 14, lineHeight: 1.45 },
  badgeRow: { display: "flex", justifyContent: "center", marginBottom: 14 },
  badge: {
    fontSize: 12,
    fontWeight: 700,
    background: "#eef2ff",
    color: "#3730a3",
    padding: "8px 12px",
    borderRadius: 999,
  },
  primaryBtn: {
    width: "100%",
    padding: 15,
    borderRadius: 12,
    border: "none",
    background: "#16a34a",
    color: "white",
    fontSize: 16,
    fontWeight: 800,
    cursor: "pointer",
  },

  topRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  stepPill: {
    fontSize: 12,
    fontWeight: 800,
    background: "#f1f5f9",
    color: "#0f172a",
    padding: "7px 10px",
    borderRadius: 999,
  },
  stepPct: { fontSize: 12, fontWeight: 800, color: "#16a34a" },
  progressBar: { width: "100%", height: 8, background: "#e2e8f0", borderRadius: 10, overflow: "hidden", marginBottom: 18 },
  progressFill: { height: "100%", background: "#16a34a", transition: "width 0.25s ease" },

  qTitle: { fontSize: 17, marginBottom: 10, color: "#0f172a", lineHeight: 1.35 },
  qDesc: { fontSize: 13, color: "#64748b", marginBottom: 12, lineHeight: 1.45 },

  optionBtn: {
    width: "100%",
    padding: 14,
    marginTop: 10,
    borderRadius: 14,
    border: "1px solid #e5e7eb",
    background: "#f8fafc",
    cursor: "pointer",
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    textAlign: "left",
  },
  optEmoji: { width: 22, display: "inline-flex", justifyContent: "center" },
  optText: { fontSize: 14, color: "#0f172a", lineHeight: 1.35 },
  helpRow: { marginTop: 14, textAlign: "center" },
  helpText: { fontSize: 12, color: "#94a3b8" },
};

const offersStyles = {
  timerWrap: { width: "100%", display: "flex", justifyContent: "center", marginBottom: 12 },
  timerText: {
    background: "#111827",
    color: "white",
    padding: "10px 14px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: 0.3,
  },
  timer: { marginLeft: 8, padding: "4px 8px", borderRadius: 999, background: "#16a34a", color: "white", fontWeight: 900 },

  headerTag: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: 999,
    background: "#111827",
    color: "white",
    fontSize: 12,
    fontWeight: 900,
    marginBottom: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: 900, color: "#0f172a" },
  headerSub: { marginTop: 8, fontSize: 13, color: "#334155", lineHeight: 1.45 },

  planilhaOnlyWrap: {
    width: "100%",
    maxWidth: 720,
    margin: "14px auto 0 auto",
    borderRadius: 18,
    overflow: "hidden",
    background: "transparent",
  },
  planilhaOnlyImg: { width: "100%", height: "auto", display: "block", borderRadius: 18 },

  gridOne: {
    marginTop: 18,
    display: "grid",
    gap: 14,
    gridTemplateColumns: "minmax(260px, 520px)",
    justifyContent: "center",
    alignItems: "start",
  },

  card: {
    position: "relative",
    border: "1px solid #e5e7eb",
    borderRadius: 18,
    padding: 16,
    textAlign: "left",
    background: "#ffffff",
    boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
  },

  cardTitle: { fontSize: 16, fontWeight: 900, color: "#0f172a" },
  cardSubtitle: { fontSize: 12, color: "#64748b", marginTop: 4 },

  cardImageWrap: {
    width: "100%",
    marginTop: 10,
    borderRadius: 14,
    overflow: "hidden",
    background: "#0b1220",
    aspectRatio: "9 / 16",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: { width: "100%", height: "100%", objectFit: "cover", display: "block" },

  priceBox: { marginTop: 12, borderRadius: 14, padding: 12, background: "#f8fafc", border: "1px solid #e5e7eb" },
  oldPrice: { fontSize: 12, color: "#6b7280", textDecoration: "line-through" },
  newPrice: { marginTop: 6, fontSize: 20, fontWeight: 900, color: "#0f172a" },

  bullets: { listStyle: "none", padding: 0, margin: "12px 0 0 0" },
  bulletItem: { fontSize: 12, color: "#334155", marginTop: 8, lineHeight: 1.35, whiteSpace: "normal", wordBreak: "break-word" },

  buyBtn: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    border: "none",
    background: "#16a34a",
    color: "white",
    fontSize: 15,
    fontWeight: 900,
    cursor: "pointer",
    marginTop: "auto",
  },

  h3: { fontSize: 13, letterSpacing: 0.6, margin: "0 0 10px 0", textAlign: "center" },

  testimonial: { border: "1px solid #e5e7eb", background: "#ffffff", borderRadius: 14, padding: 14, marginTop: 10, textAlign: "left" },
  testHeader: { display: "flex", alignItems: "center", gap: 10 },
  avatar: { width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "1px solid #e5e7eb" },
  testName: { fontWeight: 900, color: "#111827", fontSize: 14, lineHeight: 1.2 },
  testRole: { color: "#64748b", fontSize: 12, marginTop: 2 },
};

const guaranteeStyles = {
  wrap: {
    marginTop: 18,
    borderRadius: 18,
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    padding: 18,
    textAlign: "center",
    boxShadow: "0 10px 24px rgba(0,0,0,0.06)",
  },
  badge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: 10,
    background: "#7c3aed",
    color: "white",
    fontSize: 12,
    fontWeight: 900,
    letterSpacing: 0.3,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 900,
    color: "#0f172a",
    lineHeight: 1.25,
    marginBottom: 10,
  },
  titleStrong: { color: "#7c3aed" },
  text: {
    maxWidth: 780,
    margin: "0 auto",
    fontSize: 14,
    color: "#334155",
    lineHeight: 1.6,
  },
  footerLine: {
    marginTop: 12,
    fontSize: 14,
    color: "#0f172a",
  },
  image: {
    width: "100%",
    maxWidth: 520,
    display: "block",
    margin: "14px auto 0 auto",
    borderRadius: 14,
  },
};