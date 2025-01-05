import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"), // Public route
	route("/profile", "routes/profile.jsx"),
	route("/pengaturan", "routes/pengaturan.jsx"),
	route("/dashboard", "routes/dashboard.jsx"),
] satisfies RouteConfig;
