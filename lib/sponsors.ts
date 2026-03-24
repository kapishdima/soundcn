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
		name: "TurboStarter",
		url: "https://www.turbostarter.dev/",
		logo: `<svg width="46" height="56" viewBox="0 0 46 56" fill="none" xmlns="http://www.w3.org/2000/svg" style="transform: scale(0.8);">
<g clip-path="url(#clip0_1_2)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M36.4746 2.00154C36.4746 1.35861 36.9958 0.837414 37.6386 0.837414C38.2816 0.837414 38.8028 1.35861 38.8028 2.00154V13.8425C38.8028 15.5321 38.0687 17.1382 36.7909 18.2439L34.8191 19.9503L37.3626 22.4938L41.2417 21.0518C42.6099 20.5434 43.5174 19.2378 43.5174 17.7784V7.046C43.5174 6.40309 44.0385 5.8819 44.6815 5.8819C45.3245 5.8819 45.8457 6.40309 45.8457 7.046V17.7784C45.8457 20.2109 44.3329 22.3867 42.053 23.2342L38.7947 24.4453C39.9408 26.6692 39.9408 29.3308 38.7947 31.5547L42.5586 32.9537C44.5347 33.6881 45.8457 35.574 45.8457 37.682V48.9539C45.8457 49.5969 45.3245 50.1181 44.6815 50.1181C44.0385 50.1181 43.5174 49.5969 43.5174 48.9539V37.682C43.5174 36.547 42.8114 35.5314 41.7475 35.136L37.3626 33.5063L34.8191 36.0497L37.0593 37.9882C38.1665 38.9464 38.8028 40.3385 38.8028 41.8027V53.9984C38.8028 54.6414 38.2816 55.1626 37.6386 55.1626C36.9958 55.1626 36.4746 54.6414 36.4746 53.9984V41.8027C36.4746 41.0143 36.132 40.2648 35.5357 39.7487L33.1686 37.7002L24.0643 46.8045C23.458 47.4108 22.4754 47.4108 21.8691 46.8045L12.7957 37.7311L10.4643 39.7487C9.86793 40.2648 9.52534 41.0143 9.52534 41.8027V53.9984C9.52534 54.6414 9.00417 55.1626 8.36136 55.1626C7.71838 55.1626 7.19718 54.6414 7.19718 53.9984V41.8027C7.19718 40.3385 7.83344 38.9464 8.94069 37.9882L11.1451 36.0806L8.58884 33.5243L4.25246 35.136C3.18843 35.5314 2.48253 36.547 2.48253 37.682V48.9539C2.48253 49.5969 1.96135 50.1181 1.31842 50.1181C0.675507 50.1181 0.154312 49.5969 0.154312 48.9539V37.682C0.154312 35.574 1.46527 33.6881 3.44132 32.9537L7.14951 31.5754C5.98907 29.3404 5.98907 26.6594 7.14952 24.4246L3.94702 23.2342C1.66695 22.3867 0.154312 20.2109 0.154312 17.7784V7.046C0.154312 6.40309 0.675507 5.8819 1.31842 5.8819C1.96135 5.8819 2.48253 6.40309 2.48253 7.046V17.7784C2.48253 19.2378 3.39011 20.5434 4.75816 21.0518L8.58884 22.4757L11.1451 19.9194L9.20883 18.2439C7.93133 17.1382 7.19718 15.5321 7.19718 13.8425V2.00154C7.19718 1.35861 7.71838 0.837414 8.36136 0.837414C9.00417 0.837414 9.52534 1.35861 9.52534 2.00154V13.8425C9.52534 14.8562 9.96589 15.82 10.7324 16.4834L12.7957 18.2689L21.8691 9.19539C22.4754 8.58924 23.458 8.58924 24.0643 9.19539L33.1686 18.2996L35.2676 16.4834C36.0341 15.82 36.4746 14.8562 36.4746 13.8425V2.00154ZM24.1408 18.5321C24.7049 17.9642 25.6551 18.5185 25.4386 19.289L24.3185 23.275C24.1099 24.0177 24.668 24.7541 25.4393 24.7541H29.6382C31.3635 24.7541 32.2306 26.8375 31.0146 28.0615L21.7591 37.3796C21.1951 37.9474 20.2448 37.3933 20.4613 36.6227L21.5812 32.6367C21.7898 31.8942 21.2318 31.1577 20.4606 31.1577H16.2617C14.5364 31.1577 13.6692 29.0744 14.8852 27.8502L24.1408 18.5321Z" fill="#F14705"/>
</g>
<defs>
<clipPath id="clip0_1_2">
<rect width="46" height="56" fill="white"/>
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
		logo: "https://pbs.twimg.com/profile_images/2031999290869153792/hNRxbUiT_400x400.jpg",
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
	{
		name: "Ricardo Ruiz",
		url: "https://ruizrica.io?utm_source=soundcn.xyz",
		logo: "https://avatars.githubusercontent.com/u/3713144?v=4",
	},
];
