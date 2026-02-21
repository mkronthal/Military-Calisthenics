import { useState, useEffect, useCallback, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────
const EXERCISES = {
  // ARMS
  diamond_pushups: {
    name: "Diamond Push-Ups",
    target: "Arms",
    reps: 15,
    calories: 8,
    icon: "💎",
    desc: "Place hands together under your chest forming a diamond shape with thumbs and index fingers. Lower your chest to your hands, keeping elbows tight to your body. Push back up explosively. Engages triceps and inner chest intensely.",
  },
  wide_pushups: {
    name: "Wide-Grip Push-Ups",
    target: "Arms",
    reps: 20,
    calories: 10,
    icon: "🫸",
    desc: "Set hands wider than shoulder-width, fingers angled slightly outward. Lower chest to the ground with controlled tempo (3 seconds down). Press up powerfully. Emphasizes chest and front deltoids.",
  },
  tricep_dips: {
    name: "Tricep Dips",
    target: "Arms",
    reps: 15,
    calories: 7,
    icon: "🪑",
    desc: "Place hands on a sturdy chair or bench behind you, fingers forward. Extend legs straight out. Lower your body by bending elbows to 90°, keeping back close to the edge. Drive up through your palms. Pure tricep isolation.",
  },
  pike_pushups: {
    name: "Pike Push-Ups",
    target: "Arms",
    reps: 12,
    calories: 9,
    icon: "⛰️",
    desc: "Start in downward dog position — hips high, hands shoulder-width. Bend elbows and lower the crown of your head toward the floor. Press back up. Targets shoulders and upper arms like a military press without weights.",
  },
  commando_planks: {
    name: "Commando Planks",
    target: "Arms",
    reps: 20,
    calories: 11,
    icon: "🎖️",
    desc: "Start in a forearm plank. Push up to a full plank one arm at a time, then lower back down. That's one rep. Alternate leading arm each rep. Builds arm endurance and core stability simultaneously.",
  },
  pseudo_planche: {
    name: "Pseudo Planche Push-Ups",
    target: "Arms",
    reps: 10,
    calories: 10,
    icon: "🤸",
    desc: "In push-up position, rotate hands so fingers point toward your feet. Lean forward past your hands, then lower and press. Extreme bicep and forearm engagement — a true military-grade arm builder.",
  },
  // ABS
  flutter_kicks: {
    name: "Flutter Kicks",
    target: "Abs",
    reps: 40,
    calories: 10,
    icon: "🦵",
    desc: "Lie on your back, hands under your glutes. Lift both legs 6 inches off the ground. Alternate kicking legs up and down in small, rapid motions. Keep lower back pressed into the floor. Each kick = 1 rep.",
  },
  leg_raises: {
    name: "Hanging Leg Raises (Floor)",
    target: "Abs",
    reps: 15,
    calories: 8,
    icon: "📐",
    desc: "Lie flat, arms at sides palms down. Keeping legs straight and together, raise them to 90° then lower slowly — stop 2 inches from the floor. Don't let your lower back arch. Destroys the lower abs.",
  },
  mountain_climbers: {
    name: "Mountain Climbers",
    target: "Abs",
    reps: 30,
    calories: 14,
    icon: "🏔️",
    desc: "High plank position, hands directly under shoulders. Drive one knee toward your chest, then explosively switch legs. Maintain a flat back and tight core. Each leg drive = 1 rep. Speed is the weapon here.",
  },
  russian_twists: {
    name: "Russian Twists",
    target: "Abs",
    reps: 30,
    calories: 9,
    icon: "🌀",
    desc: "Sit with knees bent, feet off the ground, torso leaned back 45°. Clasp hands together. Rotate your torso to touch the ground on each side. Each side = 1 rep. For intensity, straighten your legs.",
  },
  plank_hold: {
    name: "Military Plank Hold",
    target: "Abs",
    reps: 60,
    calories: 6,
    icon: "🧱",
    desc: "Forearm plank: elbows under shoulders, body in a rigid line from head to heels. Squeeze glutes, brace core as if about to take a punch. Hold for 60 seconds. No sagging, no piking. Reps = seconds.",
  },
  v_ups: {
    name: "V-Ups",
    target: "Abs",
    reps: 15,
    calories: 10,
    icon: "✌️",
    desc: "Lie flat, arms overhead. Simultaneously lift legs and torso, reaching hands to touch your toes at the top — forming a V. Lower back down with control. Full range of motion is non-negotiable.",
  },
  // BUTT
  glute_bridges: {
    name: "Glute Bridges",
    target: "Butt",
    reps: 25,
    calories: 8,
    icon: "🌉",
    desc: "Lie on your back, feet flat, knees bent. Drive through your heels to lift hips until your body forms a straight line from shoulders to knees. Squeeze glutes hard at top for 2 seconds. Lower slowly.",
  },
  donkey_kicks: {
    name: "Donkey Kicks",
    target: "Butt",
    reps: 20,
    calories: 7,
    icon: "🫏",
    desc: "On all fours, hands under shoulders, knees under hips. Keeping knee bent at 90°, drive one foot toward the ceiling until thigh is parallel with the floor. Squeeze glute at top. 20 reps each side.",
  },
  fire_hydrants: {
    name: "Fire Hydrants",
    target: "Butt",
    reps: 20,
    calories: 7,
    icon: "🚒",
    desc: "On all fours, lift one knee out to the side, keeping it bent at 90°, until thigh is parallel to the floor. Hold 1 second. Lower with control. 20 reps each side. Targets the gluteus medius.",
  },
  single_leg_bridge: {
    name: "Single-Leg Glute Bridge",
    target: "Butt",
    reps: 15,
    calories: 9,
    icon: "🦩",
    desc: "Standard bridge position but extend one leg straight toward the ceiling. Drive through the planted heel, lifting hips high. Squeeze glute at top. 15 reps each leg. Brutal unilateral work.",
  },
  sumo_pulse: {
    name: "Sumo Squat Pulses",
    target: "Butt",
    reps: 25,
    calories: 11,
    icon: "🏋️",
    desc: "Wide stance, toes pointed out 45°. Squat deep until thighs are parallel. Hold at the bottom and pulse — small 3-inch up-and-down movements. 25 pulses. The burn is the point.",
  },
  curtsy_lunges: {
    name: "Curtsy Lunges",
    target: "Butt",
    reps: 20,
    calories: 10,
    icon: "👑",
    desc: "Standing tall, step one foot behind and across your body as if curtsying. Lower until front thigh is parallel to the floor. Drive through the front heel to return. Alternate legs — 10 each side.",
  },
  // LEGS
  jump_squats: {
    name: "Jump Squats",
    target: "Legs",
    reps: 15,
    calories: 14,
    icon: "🚀",
    desc: "Feet shoulder-width, squat until thighs are parallel. Explode upward, leaving the ground. Land softly with bent knees and immediately descend into the next squat. Power and control in equal measure.",
  },
  lunges: {
    name: "Walking Lunges",
    target: "Legs",
    reps: 20,
    calories: 12,
    icon: "🚶",
    desc: "Step forward into a deep lunge — both knees at 90°, back knee hovering 1 inch off the ground. Drive through the front heel and step the back foot forward into the next lunge. 10 each leg.",
  },
  wall_sit: {
    name: "Wall Sit",
    target: "Legs",
    reps: 45,
    calories: 6,
    icon: "🧱",
    desc: "Back flat against a wall, slide down until thighs are parallel to the floor, knees at 90°. Arms at sides or crossed on chest. Hold for 45 seconds. No shifting, no rising. Reps = seconds.",
  },
  calf_raises: {
    name: "Single-Leg Calf Raises",
    target: "Legs",
    reps: 25,
    calories: 5,
    icon: "🦶",
    desc: "Stand on one foot on an elevated surface (stair step). Lower heel below the edge, then rise to full tip-toe. Squeeze at the top for 1 second. 25 reps each leg. Slow and controlled.",
  },
  squat_hold_march: {
    name: "Squat Hold March",
    target: "Legs",
    reps: 30,
    calories: 13,
    icon: "🪖",
    desc: "Drop into a half-squat. Maintaining the squat position, march in place by lifting knees high. Each knee lift = 1 rep. Keep your torso upright and core braced. Total quad domination.",
  },
  pistol_squat_assist: {
    name: "Assisted Pistol Squats",
    target: "Legs",
    reps: 10,
    calories: 12,
    icon: "🔫",
    desc: "Stand on one leg, extend the other forward. Hold a doorframe or chair for balance. Squat as deep as possible on one leg, then drive up. 10 each leg. The king of bodyweight leg exercises.",
  },
};

const BADGE_DEFS = [
  { id: "first_workout", name: "Enlisted", desc: "Complete your first workout", icon: "🎖️", check: (s) => s.totalWorkouts >= 1 },
  { id: "streak_3", name: "Three-Peat", desc: "3-day streak", icon: "🔥", check: (s) => s.currentStreak >= 3 },
  { id: "streak_7", name: "Iron Week", desc: "7-day streak", icon: "⚡", check: (s) => s.currentStreak >= 7 },
  { id: "streak_14", name: "Battle Hardened", desc: "14-day streak", icon: "🛡️", check: (s) => s.currentStreak >= 14 },
  { id: "streak_30", name: "War Machine", desc: "30-day streak", icon: "💀", check: (s) => s.currentStreak >= 30 },
  { id: "cal_500", name: "Furnace", desc: "Burn 500 total calories", icon: "🔥", check: (s) => s.totalCalories >= 500 },
  { id: "cal_2000", name: "Inferno", desc: "Burn 2000 total calories", icon: "☄️", check: (s) => s.totalCalories >= 2000 },
  { id: "workouts_10", name: "Sergeant", desc: "Complete 10 workouts", icon: "🎗️", check: (s) => s.totalWorkouts >= 10 },
  { id: "workouts_25", name: "Lieutenant", desc: "Complete 25 workouts", icon: "⭐", check: (s) => s.totalWorkouts >= 25 },
  { id: "workouts_50", name: "Commander", desc: "Complete 50 workouts", icon: "🏅", check: (s) => s.totalWorkouts >= 50 },
];

// Generates a unique daily workout based on the date
function getDailyWorkout(dateStr) {
  const seed = dateStr.split("-").join("") | 0;
  const groups = { Arms: [], Abs: [], Butt: [], Legs: [] };
  Object.entries(EXERCISES).forEach(([k, v]) => groups[v.target].push(k));

  // Deterministic shuffle using date seed
  const pick = (arr, n, s) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.abs(((s * (i + 1) * 9301 + 49297) % 233280) % (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
  };

  const arms = pick(groups.Arms, 2, seed);
  const abs = pick(groups.Abs, 2, seed + 1);
  const butt = pick(groups.Butt, 2, seed + 2);
  const legs = pick(groups.Legs, 2, seed + 3);

  return [...arms, ...abs, ...butt, ...legs].map((k) => ({ key: k, ...EXERCISES[k] }));
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

const MOTIVATIONAL = [
  "Pain is weakness leaving the body.",
  "The only easy day was yesterday.",
  "Sweat dries. Blood clots. Bones heal. Suck it up.",
  "Don't count the days. Make the days count.",
  "Discipline equals freedom.",
  "Your body can handle almost anything. It's your mind you have to convince.",
  "Fall down seven times, stand up eight.",
  "The more you sweat in training, the less you bleed in combat.",
  "Embrace the suck.",
  "Victory belongs to the most persevering.",
];

// ─── APP ────────────────────────────────────────────────────────────────
export default function MilCalApp() {
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    totalCalories: 0,
    currentStreak: 0,
    longestStreak: 0,
    badges: [],
    completedDates: [],
    history: [],
  });
  const [completed, setCompleted] = useState({});
  const [view, setView] = useState("workout"); // workout | stats | badges
  const [expandedEx, setExpandedEx] = useState(null);
  const [showComplete, setShowComplete] = useState(false);
  const [newBadge, setNewBadge] = useState(null);
  const timerRef = useRef(null);

  const today = getToday();
  const workout = getDailyWorkout(today);
  const totalCal = workout.reduce((s, e) => s + e.calories, 0);
  const completedCount = Object.keys(completed).filter((k) => completed[k]).length;
  const allDone = completedCount === workout.length;
  const earnedCal = workout.reduce((s, e) => s + (completed[e.key] ? e.calories : 0), 0);

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = dayNames[new Date().getDay()];
  const quote = MOTIVATIONAL[new Date().getDate() % MOTIVATIONAL.length];

  // Load state
  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("mil-cal-stats");
        if (res) setStats(JSON.parse(res.value));
      } catch (e) {}
      try {
        const res = await window.storage.get(`mil-cal-completed-${today}`);
        if (res) setCompleted(JSON.parse(res.value));
      } catch (e) {}
    })();
  }, []);

  // Save completions
  useEffect(() => {
    (async () => {
      try {
        await window.storage.set(`mil-cal-completed-${today}`, JSON.stringify(completed));
      } catch (e) {}
    })();
  }, [completed]);

  const toggleExercise = (key) => {
    const next = { ...completed, [key]: !completed[key] };
    setCompleted(next);
  };

  const finishWorkout = async () => {
    if (!allDone) return;
    const alreadyDone = stats.completedDates.includes(today);
    if (alreadyDone) {
      setShowComplete(true);
      return;
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    const wasYesterday = stats.completedDates.includes(yesterday);
    const newStreak = wasYesterday ? stats.currentStreak + 1 : 1;

    const newStats = {
      ...stats,
      totalWorkouts: stats.totalWorkouts + 1,
      totalCalories: stats.totalCalories + totalCal,
      currentStreak: newStreak,
      longestStreak: Math.max(stats.longestStreak, newStreak),
      completedDates: [...stats.completedDates, today],
      history: [
        ...stats.history,
        { date: today, calories: totalCal, exercises: workout.length },
      ],
    };

    // Check badges
    const newBadges = BADGE_DEFS.filter(
      (b) => b.check(newStats) && !stats.badges.includes(b.id)
    );
    if (newBadges.length > 0) {
      newStats.badges = [...stats.badges, ...newBadges.map((b) => b.id)];
      setNewBadge(newBadges[0]);
      setTimeout(() => setNewBadge(null), 3500);
    }

    setStats(newStats);
    try {
      await window.storage.set("mil-cal-stats", JSON.stringify(newStats));
    } catch (e) {}
    setShowComplete(true);
  };

  const todayAlreadyDone = stats.completedDates.includes(today);

  // ─── RENDER ─────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0c0f",
      color: "#e8e6e1",
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
      maxWidth: 480,
      margin: "0 auto",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Oswald:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
        @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes badgeIn { 0% { transform: scale(0) rotate(-20deg); opacity:0; } 60% { transform: scale(1.2) rotate(5deg); opacity:1; } 100% { transform: scale(1) rotate(0); opacity:1; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes checkPop { 0% { transform: scale(0); } 60% { transform: scale(1.3); } 100% { transform: scale(1); } }
        @keyframes confetti { 0% { transform: translateY(0) rotate(0); opacity:1; } 100% { transform: translateY(-80px) rotate(360deg); opacity:0; } }
        .exercise-card { 
          animation: slideUp 0.4s ease both;
          transition: all 0.2s ease;
        }
        .exercise-card:active { transform: scale(0.98); }
        .nav-btn { transition: all 0.15s ease; }
        .nav-btn:active { transform: scale(0.92); }
        .finish-btn:active { transform: scale(0.96); }
      `}</style>

      {/* NOISE TEXTURE OVERLAY */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* HEADER */}
      <div style={{
        position: "relative", zIndex: 1,
        background: "linear-gradient(135deg, #1a1e24 0%, #0d1117 100%)",
        borderBottom: "1px solid #c5a44e22",
        padding: "20px 20px 16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 11,
              letterSpacing: 4,
              color: "#c5a44e",
              textTransform: "uppercase",
              fontWeight: 600,
            }}>Military Calisthenics</div>
            <div style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 1,
              marginTop: 2,
              color: "#f0ede6",
            }}>DAILY OPS</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, color: "#8b8878", fontWeight: 500 }}>{dayOfWeek}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
              <span style={{ fontSize: 20 }}>🔥</span>
              <span style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 28,
                fontWeight: 700,
                color: stats.currentStreak > 0 ? "#e8622c" : "#555",
              }}>{stats.currentStreak}</span>
            </div>
          </div>
        </div>
        {/* Quote */}
        <div style={{
          marginTop: 12,
          fontSize: 12,
          fontStyle: "italic",
          color: "#6b6860",
          letterSpacing: 0.3,
          lineHeight: 1.5,
        }}>"{quote}"</div>
      </div>

      {/* NAV */}
      <div style={{
        display: "flex",
        background: "#12141a",
        borderBottom: "1px solid #1e2028",
        position: "relative",
        zIndex: 1,
      }}>
        {[
          { key: "workout", label: "WORKOUT", icon: "⚔️" },
          { key: "stats", label: "INTEL", icon: "📊" },
          { key: "badges", label: "MEDALS", icon: "🏅" },
        ].map((tab) => (
          <button
            key={tab.key}
            className="nav-btn"
            onClick={() => setView(tab.key)}
            style={{
              flex: 1,
              padding: "12px 0",
              background: "none",
              border: "none",
              borderBottom: view === tab.key ? "2px solid #c5a44e" : "2px solid transparent",
              color: view === tab.key ? "#c5a44e" : "#5a5850",
              fontFamily: "'Oswald', sans-serif",
              fontSize: 12,
              letterSpacing: 2,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <span style={{ fontSize: 14 }}>{tab.icon}</span>{tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 0 100px" }}>

        {/* ─── WORKOUT VIEW ─── */}
        {view === "workout" && (
          <div>
            {/* Progress Bar */}
            <div style={{ padding: "16px 20px 8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: "#8b8878", fontWeight: 500 }}>
                  {completedCount}/{workout.length} exercises
                </span>
                <span style={{ fontSize: 12, color: "#c5a44e", fontWeight: 500 }}>
                  {earnedCal}/{totalCal} cal
                </span>
              </div>
              <div style={{
                height: 6,
                background: "#1a1e24",
                borderRadius: 3,
                overflow: "hidden",
              }}>
                <div style={{
                  height: "100%",
                  width: `${(completedCount / workout.length) * 100}%`,
                  background: allDone
                    ? "linear-gradient(90deg, #c5a44e, #e8c84e)"
                    : "linear-gradient(90deg, #c5a44e, #8b7830)",
                  borderRadius: 3,
                  transition: "width 0.4s ease",
                }} />
              </div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 6, textAlign: "center" }}>
                ~15 min · 8 exercises · Full body
              </div>
            </div>

            {/* Exercise List */}
            <div style={{ padding: "4px 16px" }}>
              {workout.map((ex, i) => {
                const done = completed[ex.key];
                const expanded = expandedEx === ex.key;
                const targetColor = {
                  Arms: "#e8622c",
                  Abs: "#4e9ee8",
                  Butt: "#c54eb0",
                  Legs: "#4ec578",
                }[ex.target];
                return (
                  <div
                    key={ex.key}
                    className="exercise-card"
                    style={{
                      animationDelay: `${i * 0.06}s`,
                      marginBottom: 10,
                      background: done
                        ? "linear-gradient(135deg, #1a2418 0%, #141a13 100%)"
                        : "linear-gradient(135deg, #16181e 0%, #111318 100%)",
                      border: `1px solid ${done ? "#2a4a2222" : "#1e2028"}`,
                      borderRadius: 12,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      onClick={() => setExpandedEx(expanded ? null : ex.key)}
                      style={{
                        padding: "14px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        cursor: "pointer",
                      }}
                    >
                      {/* Checkbox */}
                      <div
                        onClick={(e) => { e.stopPropagation(); toggleExercise(ex.key); }}
                        style={{
                          width: 32, height: 32, borderRadius: 8,
                          border: done ? "none" : `2px solid ${targetColor}44`,
                          background: done ? targetColor : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0, cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {done && (
                          <span style={{ animation: "checkPop 0.3s ease", fontSize: 16 }}>✓</span>
                        )}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          display: "flex", alignItems: "center", gap: 6, marginBottom: 3,
                        }}>
                          <span style={{ fontSize: 15 }}>{ex.icon}</span>
                          <span style={{
                            fontFamily: "'Oswald', sans-serif",
                            fontSize: 15,
                            fontWeight: 600,
                            color: done ? "#5a7a55" : "#e0ddd5",
                            textDecoration: done ? "line-through" : "none",
                            letterSpacing: 0.5,
                          }}>{ex.name}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{
                            fontSize: 10, fontWeight: 600, letterSpacing: 1,
                            color: targetColor, textTransform: "uppercase",
                            fontFamily: "'Oswald', sans-serif",
                          }}>{ex.target}</span>
                          <span style={{ color: "#333", fontSize: 10 }}>•</span>
                          <span style={{ fontSize: 11, color: "#6b6860" }}>
                            {ex.reps} {ex.target === "Abs" && (ex.key === "plank_hold" || ex.key === "wall_sit") ? "sec" : "reps"}
                          </span>
                          <span style={{ color: "#333", fontSize: 10 }}>•</span>
                          <span style={{ fontSize: 11, color: "#6b6860" }}>{ex.calories} cal</span>
                        </div>
                      </div>

                      {/* Expand arrow */}
                      <span style={{
                        fontSize: 12, color: "#444",
                        transform: expanded ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.2s ease",
                      }}>▼</span>
                    </div>

                    {/* Expanded description */}
                    {expanded && (
                      <div style={{
                        padding: "0 16px 14px 60px",
                        animation: "slideUp 0.2s ease",
                      }}>
                        <p style={{
                          fontSize: 13,
                          lineHeight: 1.65,
                          color: "#8b8878",
                        }}>{ex.desc}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Finish Button */}
            <div style={{ padding: "12px 16px 20px" }}>
              <button
                className="finish-btn"
                onClick={finishWorkout}
                disabled={!allDone}
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: 12,
                  border: "none",
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: 3,
                  cursor: allDone ? "pointer" : "default",
                  color: allDone ? "#0a0c0f" : "#444",
                  background: allDone
                    ? "linear-gradient(135deg, #c5a44e 0%, #e8c84e 50%, #c5a44e 100%)"
                    : "#1a1e24",
                  backgroundSize: allDone ? "200% 100%" : "auto",
                  animation: allDone ? "shimmer 2s linear infinite" : "none",
                  transition: "all 0.3s ease",
                  ...(todayAlreadyDone && { background: "#1a3a1a", color: "#4ec578" }),
                }}
              >
                {todayAlreadyDone ? "✓ MISSION COMPLETE" : allDone ? "COMPLETE MISSION" : `${workout.length - completedCount} EXERCISES REMAINING`}
              </button>
            </div>
          </div>
        )}

        {/* ─── STATS VIEW ─── */}
        {view === "stats" && (
          <div style={{ padding: 20 }}>
            <div style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 2,
              color: "#c5a44e",
              marginBottom: 16,
            }}>MISSION INTEL</div>

            {/* Stat Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[
                { label: "TOTAL OPS", value: stats.totalWorkouts, icon: "⚔️", color: "#c5a44e" },
                { label: "CALORIES", value: stats.totalCalories, icon: "🔥", color: "#e8622c" },
                { label: "STREAK", value: stats.currentStreak, icon: "📈", color: "#4ec578" },
                { label: "BEST STREAK", value: stats.longestStreak, icon: "🏆", color: "#e8c84e" },
              ].map((s, i) => (
                <div key={i} style={{
                  background: "linear-gradient(135deg, #16181e, #111318)",
                  border: "1px solid #1e2028",
                  borderRadius: 12,
                  padding: "16px 14px",
                  animation: "slideUp 0.4s ease both",
                  animationDelay: `${i * 0.08}s`,
                }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 30,
                    fontWeight: 700,
                    color: s.color,
                  }}>{s.value}</div>
                  <div style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: 10,
                    letterSpacing: 2,
                    color: "#5a5850",
                    fontWeight: 600,
                    marginTop: 2,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Week tracker */}
            <div style={{
              background: "linear-gradient(135deg, #16181e, #111318)",
              border: "1px solid #1e2028",
              borderRadius: 12,
              padding: 16,
              marginBottom: 20,
            }}>
              <div style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 12,
                letterSpacing: 2,
                color: "#8b8878",
                fontWeight: 600,
                marginBottom: 12,
              }}>THIS WEEK</div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => {
                  const date = new Date();
                  const dayOfWeekIdx = (date.getDay() + 6) % 7; // Monday = 0
                  const diff = i - dayOfWeekIdx;
                  const targetDate = new Date(date);
                  targetDate.setDate(date.getDate() + diff);
                  const dateStr = targetDate.toISOString().split("T")[0];
                  const isComplete = stats.completedDates.includes(dateStr);
                  const isToday = dateStr === today;
                  return (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div style={{
                        fontSize: 10, color: "#555", marginBottom: 6,
                        fontFamily: "'Oswald', sans-serif", letterSpacing: 1,
                      }}>{d}</div>
                      <div style={{
                        width: 36, height: 36, borderRadius: 8,
                        background: isComplete ? "#c5a44e" : isToday ? "#1e2028" : "transparent",
                        border: isToday && !isComplete ? "2px solid #c5a44e44" : "2px solid transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 14,
                      }}>
                        {isComplete ? "✓" : isToday ? "•" : ""}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent History */}
            {stats.history.length > 0 && (
              <div>
                <div style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 12,
                  letterSpacing: 2,
                  color: "#8b8878",
                  fontWeight: 600,
                  marginBottom: 10,
                }}>RECENT OPS</div>
                {stats.history.slice(-7).reverse().map((h, i) => (
                  <div key={i} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid #1a1e24",
                  }}>
                    <span style={{ fontSize: 13, color: "#6b6860" }}>{h.date}</span>
                    <div style={{ display: "flex", gap: 12 }}>
                      <span style={{ fontSize: 12, color: "#4ec578" }}>{h.exercises} ex</span>
                      <span style={{ fontSize: 12, color: "#e8622c" }}>{h.calories} cal</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ─── BADGES VIEW ─── */}
        {view === "badges" && (
          <div style={{ padding: 20 }}>
            <div style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 2,
              color: "#c5a44e",
              marginBottom: 4,
            }}>MEDALS OF HONOR</div>
            <div style={{ fontSize: 12, color: "#5a5850", marginBottom: 20 }}>
              {stats.badges.length}/{BADGE_DEFS.length} earned
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {BADGE_DEFS.map((badge, i) => {
                const earned = stats.badges.includes(badge.id);
                return (
                  <div key={badge.id} style={{
                    background: earned
                      ? "linear-gradient(135deg, #1e1c14, #18160f)"
                      : "linear-gradient(135deg, #131517, #0e1012)",
                    border: `1px solid ${earned ? "#c5a44e33" : "#1a1c20"}`,
                    borderRadius: 12,
                    padding: 16,
                    textAlign: "center",
                    opacity: earned ? 1 : 0.4,
                    animation: "slideUp 0.4s ease both",
                    animationDelay: `${i * 0.05}s`,
                  }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>
                      {earned ? badge.icon : "🔒"}
                    </div>
                    <div style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: 1,
                      color: earned ? "#c5a44e" : "#444",
                      marginBottom: 4,
                    }}>{badge.name}</div>
                    <div style={{ fontSize: 11, color: earned ? "#6b6860" : "#333", lineHeight: 1.4 }}>
                      {badge.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* COMPLETION MODAL */}
      {showComplete && (
        <div
          onClick={() => setShowComplete(false)}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 100,
            animation: "slideUp 0.3s ease",
          }}
        >
          <div style={{
            background: "linear-gradient(135deg, #1a1e24, #111318)",
            border: "1px solid #c5a44e33",
            borderRadius: 20,
            padding: "40px 30px",
            textAlign: "center",
            maxWidth: 320,
            width: "90%",
          }}>
            <div style={{ fontSize: 50, marginBottom: 12 }}>⚔️</div>
            <div style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 2,
              color: "#c5a44e",
              marginBottom: 8,
            }}>MISSION COMPLETE</div>
            <div style={{ fontSize: 14, color: "#8b8878", lineHeight: 1.6 }}>
              {totalCal} calories burned<br />
              Streak: {stats.currentStreak} days
            </div>
            <div style={{
              marginTop: 20,
              fontSize: 12,
              color: "#5a5850",
            }}>Tap anywhere to dismiss</div>
          </div>
        </div>
      )}

      {/* NEW BADGE NOTIFICATION */}
      {newBadge && (
        <div style={{
          position: "fixed",
          top: 20, left: "50%",
          transform: "translateX(-50%)",
          background: "linear-gradient(135deg, #2a2410, #1a1808)",
          border: "1px solid #c5a44e66",
          borderRadius: 14,
          padding: "14px 20px",
          display: "flex", alignItems: "center", gap: 12,
          zIndex: 200,
          animation: "badgeIn 0.5s ease",
          boxShadow: "0 8px 30px rgba(197,164,78,0.15)",
        }}>
          <span style={{ fontSize: 28, animation: "pulse 1s ease infinite" }}>{newBadge.icon}</span>
          <div>
            <div style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 11,
              letterSpacing: 2,
              color: "#c5a44e",
              fontWeight: 600,
            }}>NEW MEDAL</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#e0ddd5" }}>{newBadge.name}</div>
          </div>
        </div>
      )}
    </div>
  );
}
