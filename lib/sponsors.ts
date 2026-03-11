export interface Sponsor {
	name: string;
	url: string;
	/** URL/path to a square logo/avatar (recommended 200×200px), or raw SVG source string */
	logo?: string;
	/** Short tagline shown on the card */
	tagline?: string;
}

export function isSvgSource(logo: string): boolean {
	return logo.trimStart().startsWith("<svg");
}

// Add sponsors here as they come in
export const SPONSORS: Sponsor[] = [
	{
		name: "Shoogle",
		url: "https://shoogle.dev/?utm_source=soundcn.xyz",
		logo: "/sponsors/shoogle.png",
	},
	{
		name: "nuqs",
		url: "https://nuqs.dev/?utm_source=soundcn.xyz",
		logo: "https://pbs.twimg.com/profile_images/1825629130852859904/TvP7rOsK_400x400.jpg",
	},
	{
		name: "Beste",
		url: "https://beste.co/?utm_source=soundcn.xyz",
		logo: "https://pbs.twimg.com/profile_images/2019696450482184192/64Ony09u_400x400.png",
	},
	{
		name: "Shadcn Studio",
		url: "https://shadcnstudio.com/?utm_source=soundcn&utm_medium=banner&utm_campaign=github",
		logo: "https://cdn.shadcnstudio.com/ss-assets/marketing/shadcn-studio-logos/shadcn-studio-symbol.svg",
	},
	{
		name: "Shadcn Space",
		url: "https://shadcnspace.com/?utm_source=soundcn.xyz",
		logo: "https://pbs.twimg.com/profile_images/1998745226710757379/OKDPM3p-_400x400.jpg",
	},
	{
		name: "Shadcnblocks",
		url: "https://shadcnblocks.com/?utm_source=soundcn.xyz",
		logo: `<svg width="78" height="90" viewBox="0 0 78 90" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clip-path="url(#clip0_33_3)">
					<path d="M46.7305 4.50982L43.6252 2.72955V17.49L46.7305 19.2924V4.50982Z" fill="currentColor"/>
					<path d="M52.9854 8.14811L49.8765 6.34937V21.1287L52.9854 22.9127V8.14811Z" fill="currentColor"/>
					<path d="M59.1814 11.7684L56.0762 9.9881V24.7485L59.1814 26.5325V11.7684Z" fill="currentColor"/>
					<path d="M6.04712 26.0179L9.15238 27.8019V17.246L6.04712 19.0262V26.0179Z" fill="currentColor"/>
					<path d="M2.93874 24.2184V20.8651L0 22.5491L2.93874 24.2184Z" fill="currentColor"/>
					<path d="M77.889 22.5895L74.7985 20.8056V24.3883L71.6895 26.1685V19.0253L68.6027 17.245V27.9123L65.4937 29.6962V15.3874L62.3293 13.548V28.3305L65.1162 29.959V59.8636L64.9645 59.9561L62.3293 58.4424V61.4921L59.1833 63.2724V56.5474L56.078 54.7079V65.0743L52.9875 66.9101V52.8681L49.8785 51.0324V68.6945L46.7325 70.4748V49.1932L43.6273 47.3537V72.2547L40.5183 74.1127V45.5172L39.0008 44.5105L39.06 14.8159L40.5183 15.7079V0.947497L38.8898 0L37.5795 0.736529V15.5562L34.4372 17.3364V2.57602L31.3283 4.35629V19.1199L28.2193 20.9186V6.1953L25.1325 7.97557V22.6989L21.968 24.4829V9.77771L18.8775 11.6135V26.2807L15.7685 28.1202V13.393L12.3005 15.4397V29.578L12.7743 29.8444L12.889 59.9528L15.7685 61.6405V58.2872L18.8775 56.4477V63.4799L21.968 65.2786V54.6082L25.1325 52.7132V67.0591L28.2193 68.8986V50.8772L31.3283 49.0377V70.6786L34.4372 72.481V47.1797L37.5795 45.3439V74.3168L39.0008 75.1533V75.0941V89.969L77.9445 67.477L78 22.5853L77.889 22.5895Z" fill="currentColor"/>
				</g>
				<defs>
					<clipPath id="clip0_33_3">
					<rect width="78" height="90" fill="currentColor"/>
					</clipPath>
				</defs>
			</svg>
`
	},
	{
		name: "Ali Bey",
		url: "https://x.com/AliBey_10",
		logo: "https://avatars.githubusercontent.com/u/42802922?v=4",
	},
	{
		name: "Bro Bro",
		url: "https://x.com/brobro",
		logo: "https://pbs.twimg.com/profile_images/2004979173547270144/rDHpaxF-_400x400.jpg",
	},
	{
		name: "Edu Calvo",
		url: "https://educalvolopez.com/?utm_source=soundcn.xyz",
		logo: "https://avatars.githubusercontent.com/u/13372238?v=4",
	},
	{
		name: "OrcDev",
		url: "https://www.orcdev.com/?utm_source=soundcn.xyz",
		logo: "https://avatars.githubusercontent.com/u/7549148?v=4",
	},
	{
		name: "Irsyad A. Panjaitan",
		url: "https://irsyad.co/?utm_source=soundcn.xyz",
		logo: "https://avatars.githubusercontent.com/u/44585532?v=4",
	},
	{
		name: "Chánh Đại",
		url: "https://chanhdai.com/?utm_source=soundcn.xyz",
		logo: "https://assets.chanhdai.com/images/chanhdai-avatar-ghibli.webp",
	},
	{
		name: "David Haz",
		url: "https://pro.reactbits.dev/?utm_source=soundcn.xyz",
		logo: "https://avatars.githubusercontent.com/u/48634587?v=4",
	},
	{
		name: "Shaban",
		url: "https://efferd.com/?utm_source=soundcn.xyz",
		logo: "https://pbs.twimg.com/profile_images/2024177105110781953/zPXZyKbx_400x400.jpg",
	},
	{
		name: "Ephraim Duncan",
		url: "https://ephraimduncan.com/?utm_source=soundcn.xyz",
		logo: "https://pbs.twimg.com/profile_images/1740764353408753664/uPGbBhm0_400x400.jpg",
	},
	{
		name: "Dmytro Tovstokoryi",
		url: "https://lucide-animated.com/?utm_source=soundcn.xyz",
		logo: "https://pbs.twimg.com/profile_images/2008873143859888128/SH9UlBBa_400x400.jpg",
	},
	{
		name: "Manu Arora",
		url: "https://ui.aceternity.com/?utm_source=soundcn.xyz",
		logo: "https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg",
	},
	{
		name: "Aniket Pawar",
		url: "https://www.aniketpawar.com/?utm_source=soundcn.xyz",
		logo: "https://pbs.twimg.com/profile_images/2026346581998579718/sTG3FVKy_400x400.jpg",
	},
	{
		name: "Alex Kostyniuk",
		url: "https://mellowlines.dev/?utm_source=soundcn.xyz",
		logo: "https://pbs.twimg.com/profile_images/1780553225067692032/GAal_jdo_400x400.jpg",
	},
	{
		name: "Kartik",
		url: "https://www.kartikk.tech/?utm_source=soundcn.xyz",
		logo: "https://pbs.twimg.com/profile_images/2002424842470203392/4ZusYS4Y_400x400.jpg",
	},
	{
		name: "Nathan Brodin",
		url: "https://brodin.dev/?utm_source=soundcn.xyz",
		logo: "https://pbs.twimg.com/profile_images/1842594307569573888/1ZQfD1w0_400x400.jpg",
	},
	{
		name: "LN",
		url: "https://pro.lndev.me/?utm_source=soundcn.xyz",
		logo: "https://pbs.twimg.com/profile_images/1890537843908374528/wvFcdsEl_400x400.jpg",
	},
];
