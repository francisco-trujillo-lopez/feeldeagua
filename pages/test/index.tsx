import { NextPage } from "next";
import { useEffect, useReducer, useState } from "react";

const TestPage: NextPage = () => {
	return <App />;
};

const OPERATIONS = {
	ADD: "ADD",
	SUBTRACT: "SUBTRACT",
};

function reducer(state: any, action: any) {
	/* implement the reducer which should update the state based on the action */

	console.log("STATE; ", state, action);

	switch (action.type) {
		case OPERATIONS.ADD: {
			return { value: state.value + 1 };
		}
		case OPERATIONS.SUBTRACT: {
			return { value: state.value - 1 };
		}
		default:
			return { value: action.payload };
	}
}

function App() {
	const [number, setNumber] = useState(0);
	const [state, dispatch] = useReducer(reducer, { value: number });

	useEffect(() => console.log("NUM: ", number));

	/* implement dispatches */
	const add = () => dispatch({ type: OPERATIONS.ADD });
	const subtract = () => dispatch({ type: OPERATIONS.SUBTRACT });

	const handleNumberChange = (e: any) => {
		setNumber(Number(e.target.value));
		dispatch({ payload: e.target.value });
	};

	return (
		<div>
			<div id="result">{state?.value}</div>
			<div>
				<button id="add" onClick={add}>
					Add
				</button>
				<button id="subtract" onClick={subtract}>
					Subtract
				</button>
			</div>
			<div>
				<input type="text" value={number} onChange={handleNumberChange} />
			</div>
		</div>
	);
}

export default TestPage;
