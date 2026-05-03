export type BillingMode = "subscription" | "one-time";
export type TierKey = "shu-puer" | "support" | "premium";

export type Tier = {
	key: TierKey;
	name: string;
	tagline: string;
	price: number;
	perks: string[];
	urls: Record<BillingMode, string>;
	highlight?: boolean;
};

export const BILLING_MODES: {
	key: BillingMode;
	label: string;
	suffix: string;
}[] = [
		{ key: "subscription", label: "Monthly", suffix: "/mo" },
		{ key: "one-time", label: "One-time", suffix: " once" },
	];

export const TIERS: Tier[] = [
	{
		key: "shu-puer",
		name: "Shu-puer",
		tagline: "Like buying us a warm cup.",
		price: 10,
		perks: [
			"Your name & link on the sponsors page",
			"A heartfelt thank-you on Twitter",
			"Good karma for keeping the project alive",
		],
		urls: {
			subscription: "https://www.creem.io/payment/prod_BmTv0iT4eu41RW7bAO2mh",
			"one-time": "https://www.creem.io/payment/prod_6HJFTdpzKJPSsXuBFpG1RC",
		},
	},
	{
		key: "support",
		name: "Support",
		tagline: "Power a real chunk of development.",
		price: 50,
		perks: [
			"Everything in Shu-puer",
			"Logo on the sponsors page (larger placement)",
			"Priority on small feature requests",
		],
		urls: {
			subscription: "https://www.creem.io/payment/prod_1hVtcuOzcMCnozNOIFs62T",
			"one-time": "https://www.creem.io/payment/prod_6NPY4haNPGF6BBSyKy1TnX",
		},
	},
	{
		key: "premium",
		name: "Premium",
		tagline: "Most impact. Built into every page.",
		price: 100,
		highlight: true,
		perks: [
			"Everything in Support",
			"Banner placement on every page of soundcn",
			"Top-of-page logo on the sponsors page",
			"Direct line for collaboration",
		],
		urls: {
			subscription: "https://www.creem.io/payment/prod_3J6XgvVMSrHmOwPlIwz4dO",
			"one-time": "https://www.creem.io/payment/prod_Hv95cmQ7ZSDsxKoq0VsUm",
		},
	},
];
