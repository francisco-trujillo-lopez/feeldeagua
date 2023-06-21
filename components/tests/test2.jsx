// React is loaded and is available as React and ReactDOM
// imports should NOT be used
const Product = ({ name, votes, onVote, index }) => {
	const plus = () => {
		onVote(votes + 1, index);
		// Call props.onVote to increase the vote count for this product
	};
	const minus = () => {
		onVote(votes - 1, index);
		// Call props.onVote to decrease the vote count for this product
	};
	return (
		<li>
			<span>{name}</span> - <span>votes: {votes}</span>
			<button onClick={plus}>+</button> <button onClick={minus}>-</button>
		</li>
	);
};

const GroceryApp = (props) => {
	let [products, setProducts] = React.useState(props.products);
	const onVote = (votes, index) => {
		// Update the products array accordingly ...
		const newProducts = products;
		newProducts[index].votes = votes;
		setProducts(newProducts);
	};

	return (
		<ul>
			{
				/* Render an array of products, which should call onVote when + or - is clicked */
				products.map((product, index) => {
					return (
						<Product
							key={product.name}
							name={product.name}
							votes={product.votes}
							onVote={onVote}
							index={index}
						/>
					);
				})
			}
		</ul>
	);
};

document.body.innerHTML = "<div id='root'></div>";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<GroceryApp
		products={[
			{ name: "Oranges", votes: 0 },
			{ name: "Bananas", votes: 0 },
		]}
	/>,
);

setTimeout(() => {
	let plusButton = document.querySelector("ul > li > button");
	if (plusButton) {
		plusButton.click();
	}
	setTimeout(() => {
		console.log(document.getElementById("root").outerHTML);
	});
});
