import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
	{ name: "Jan", balance: 200 },
	{ name: "Feb", balance: 350 },
	{ name: "Mar", balance: 500 },
	{ name: "Apr", balance: 750 },
	{ name: "May", balance: 900 },
	{ name: "Jun", balance: 1200 },
];

export default function Dashboard() {
	const stars = useMemo(() => {
		return Array.from({ length: 45 }).map(() => ({
			size: Math.random() * 2 + 1,
			top: Math.random() * 100,
			left: Math.random() * 100,
			delay: Math.random() * 3,
			pulse: Math.random() > 0.6,
		}));
	}, []);

	// selection / hover state for actions and filters
	const [selectedAction, setSelectedAction] = React.useState("Home");
	const [selectedFilter, setSelectedFilter] = React.useState("Today");

	// small button component with animated width fill
	function AnimButton({ label, onClick, selected, size = "md" }) {
		const base = "relative overflow-hidden rounded-xl transition-transform transform active:scale-95";
		const sizing = size === "sm" ? "py-2 text-xs" : "py-3 text-sm";
		return (
			<button
				onClick={onClick}
				className={`${base} ${sizing} w-full bg-white/6`}
				aria-pressed={selected}
			>
				{/* animated fill */}
				<span
					className={
						"absolute inset-0 bg-white/20 origin-left transform transition-transform duration-300 " +
						(selected ? "scale-x-100" : "scale-x-0")
					}
					style={{ pointerEvents: "none" }}
				/>
				{/* label above the fill */}
				<span className="relative z-10">{label}</span>
			</button>
		);
	}

	// sample user: replace with real user state/props/auth source
	const user = React.useMemo(() => ({ name: "Hamza Khan", email: "hamza@example.com" }), []);

	const handleLogout = () => {
		// clear auth token / session — adapt to your auth logic
		localStorage.removeItem("token");
		// optionally redirect to login or refresh
		window.location.reload();
	};

	return (
		<div className="min-h-screen w-full bg-black text-white flex flex-col relative overflow-hidden p-4 sm:p-6">
			<div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
				{stars.map((s, i) => (
					<div
						key={i}
						className={`absolute bg-white rounded-full ${s.pulse ? "animate-pulse" : "animate-twinkle"}`}
						style={{
							width: `${s.size}px`,
							height: `${s.size}px`,
							top: `${s.top}%`,
							left: `${s.left}%`,
							animationDelay: `${s.delay}s`,
							opacity: 0.8,
						}}
					/>
				))}
				<div className="animate-float w-1 h-1 bg-white rounded-full absolute top-[10%] left-[25%] opacity-60" />
				<div className="animate-float w-1 h-1 bg-white rounded-full absolute top-[33%] left-[66%] opacity-60" />
				<div className="animate-float w-1 h-1 bg-white rounded-full absolute top-[50%] left-[20%] opacity-60" />
				<div className="animate-shoot absolute w-1 h-1 bg-white rounded-full left-[-10%] top-[10%] opacity-90" />
			</div>

			<div className="text-center text-lg sm:text-2xl font-bold mb-2 bg-white/10 backdrop-blur-xl p-3 rounded-2xl shadow-lg">
				GET RICH WITH HAMZA
			</div>

			{/* user banner placed directly under title */}
			<UserBanner user={user} onLogout={handleLogout} />

			{/* primary actions — stacked on mobile, row on larger screens */}
			<div className="flex flex-col sm:flex-row gap-2 mb-4">
				<AnimButton
					label="Home"
					selected={selectedAction === "Home"}
					onClick={() => setSelectedAction("Home")}
				/>
				<AnimButton
					label="Deposit"
					selected={selectedAction === "Deposit"}
					onClick={() => setSelectedAction("Deposit")}
				/>
				<AnimButton
					label="Withdraw"
					selected={selectedAction === "Withdraw"}
					onClick={() => setSelectedAction("Withdraw")}
				/>
				<AnimButton
					label="History"
					selected={selectedAction === "History"}
					onClick={() => setSelectedAction("History")}
				/>
			</div>

			<div className="bg-neutral-900/50 backdrop-blur-xl rounded-2xl p-4 mb-4 text-center">
				<p className="text-gray-400 text-xs">Total Balance</p>
				<h1 className="text-2xl sm:text-4xl font-bold mt-2">$1,200.00</h1>
			</div>

			{/* filter buttons with same animated behaviour */}
			<div className="flex gap-2 mb-4">
				<AnimButton
					label="Today"
					size="sm"
					selected={selectedFilter === "Today"}
					onClick={() => setSelectedFilter("Today")}
				/>
				<AnimButton
					label="This Month"
					size="sm"
					selected={selectedFilter === "This Month"}
					onClick={() => setSelectedFilter("This Month")}
				/>
				<AnimButton
					label="Lifetime"
					size="sm"
					selected={selectedFilter === "Lifetime"}
					onClick={() => setSelectedFilter("Lifetime")}
				/>
			</div>

			<div className="bg-neutral-900/50 backdrop-blur-xl p-3 rounded-2xl h-56 sm:h-72">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={data}>
						<defs>
							<linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
								<stop offset="0%" stopColor="#0ea5e9" />
								<stop offset="100%" stopColor="#4ade80" />
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" stroke="#888" />
						<YAxis stroke="#888" />
						<Tooltip />
						<Line type="monotone" dataKey="balance" stroke="url(#grad)" strokeWidth={4} dot={false} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

// small user banner component (mobile-friendly)
function UserBanner({ user, onLogout }) {
	return (
		<div className="mt-3 bg-white/6 backdrop-blur-sm rounded-xl p-3 flex items-center justify-between gap-3">
			<div className="flex items-center gap-3">
				<div className="w-12 h-12 bg-gradient-to-tr from-sky-400 to-green-400 rounded-full flex items-center justify-center text-sm font-semibold text-white">
					{user?.name ? user.name[0].toUpperCase() : "U"}
				</div>
				<div className="text-left">
					<div className="text-sm font-medium text-white">{user?.name || "Unknown User"}</div>
					<div className="text-xs text-gray-300">{user?.email || "no-email@example.com"}</div>
				</div>
			</div>

			<button
				onClick={onLogout}
				className="bg-red-500 hover:bg-red-600 text-white text-xs py-2 px-3 rounded-md"
				aria-label="Logout"
			>
				Logout
			</button>
		</div>
	);
}
