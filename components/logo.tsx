const EQ_LOGO_HEIGHTS = [55, 90, 35, 75, 45];

export function EqLogo() {
	return (
		<div className="flex items-end gap-[2.5px] h-[18px]" aria-hidden="true">
			{EQ_LOGO_HEIGHTS.map((h, i) => (
				<span
					key={`eq-logo-${i}-${h}`}
					className="w-[3px] rounded-full bg-primary"
					style={{ height: `${h}%` }}
				/>
			))}
		</div>
	);
}
