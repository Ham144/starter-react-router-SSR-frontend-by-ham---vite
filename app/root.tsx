import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLocation,
	useNavigate,
	useParams,
	useSearchParams,
} from "react-router";

import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";
import { useEffect } from "react";

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
	{ rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

const TidakAdaAkses = () => {
	return <h2>Anda tidak diizinkan</h2>;
};

type PengaturanProps = {
	userLevel: number;
	pathname: string;
};

const userLevel1 = ["/", "/profile"];
const userLevel2 = ["/", "/pengaturan"];
const userLevel3 = ["/", "/dashboard"];

const PengaturanPage = ({ userLevel }: PengaturanProps) => {
	const location = useLocation();
	const navigate = useNavigate();
	const pathname = location.pathname;

	useEffect(() => {
		// Periksa apakah pengguna memiliki akses ke halaman ini
		if (
			(userLevel === 1 && !userLevel1.includes(pathname)) ||
			(userLevel === 2 && !userLevel2.includes(pathname)) ||
			(userLevel === 3 && !userLevel3.includes(pathname))
		) {
			// Jika tidak diizinkan, arahkan pengguna ke halaman sebelumnya atau halaman lain
			navigate(-1);
		}
	}, [pathname, userLevel, navigate]);

	return userLevel === 1 && userLevel1.includes(pathname) ? (
		<Outlet />
	) : userLevel === 2 && userLevel2.includes(pathname) ? (
		<Outlet />
	) : userLevel === 3 && userLevel3.includes(pathname) ? (
		<Outlet />
	) : null; // Menghindari render konten jika tidak diizinkan
};

export default function App() {
	const userLevel = 1;
	const { pathname } = useLocation();
	console.log(pathname);

	return (
		<div className={`font-sans mx-auto  h-full`}>
			{/* <ToastContainer /> */}
			<main>
				<PengaturanPage pathname={pathname} userLevel={userLevel} />
			</main>
			{/* <Menu /> */}
			{/* <Navigation /> */}
		</div>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
