import { useState } from "react";

const ColorResultApp = () => {
	const [red, setRed] = useState(0);
	const [green, setGreen] = useState(0);
	const [blue, setBlue] = useState(0);
	const [hasError, setHasError] = useState(false);

	return (
		<>
			<div>Color result app</div>
			<ColorInput name="Red" setColor={setRed} setHasError={setHasError} />
			<ColorInput name="Blue" setColor={setGreen} setHasError={setHasError} />
			<ColorInput name="Green" setColor={setBlue} setHasError={setHasError} />

			{hasError && (
				<div
					style={{
						color: "red",
						fontSize: "20px",
						border: "1px solid red",
						margin: "10px",
						padding: "10px",
					}}>
					ERROR
				</div>
			)}

			<div>Result</div>
			<div
				style={{
					width: "100px",
					height: "100px",
					backgroundColor: `rgb(${red}, ${green}, ${blue})`,
				}}></div>
		</>
	);
};

export default ColorResultApp;

export const ColorInput = ({ name, color, setColor, setHasError }) => {
	const handleChange = (e) => {
		const colorValue = Number(e.target.value);

		if (isNaN(colorValue) || colorValue < 0 || colorValue > 255) {
			setHasError(true);
		} else {
			setHasError(false);
			setColor(e.target.value);
		}
	};

	return (
		<>
			<div>{name}</div>
			<input type="text" value={color} onChange={handleChange} />
		</>
	);
};

export const Rating = () => {
	const [rating, setRating] = useState(0);

	return (
		<div id="rating">
			<RateStar rating={rating} index={1} setRating={setRating} />
			<RateStar rating={rating} index={2} setRating={setRating} />
			<RateStar rating={rating} index={3} setRating={setRating} />
			<RateStar rating={rating} index={4} setRating={setRating} />
			<RateStar rating={rating} index={5} setRating={setRating} />
		</div>
	);
};

const RateStar = ({ rating, index, setRating }) => {
	return (
		<span
			className={index <= rating ? "active" : ""}
			onClick={setRating(index)}>
			*
		</span>
	);
};
