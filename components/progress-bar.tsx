export type ProgressBarProps = {
	percentage: number;
	isComplete: boolean;
	error: string;
};

export const ProgressBar = ({
	percentage,
	isComplete,
	error,
}: ProgressBarProps) => {
	return (
		<div className="flex flex-col ">
			{percentage > 0 && (
				<progress value={percentage} max={100} className="mx-10" />
			)}
			<div className="mr-10 pt-1 text-right text-yellow-500">
				{percentage > 0 && <p className="text-sm">{percentage}%</p>}
				{isComplete && <p className="mt-3">Descarga completa!</p>}
				{!!error && <p className="text-red-400">{error}</p>}
			</div>
		</div>
	);
};
