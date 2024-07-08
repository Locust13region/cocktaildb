const arrays = [
	[
		{ id: 1, name: "Alice" },
		{ id: 2, name: "Bob" },
		{ id: 3, name: "Charlie" },
	],
	[
		{ id: 2, name: "Bob" },
		{ id: 3, name: "Charlie" },
		{ id: 4, name: "David" },
	],
	[
		{ id: 1, name: "Alice" },
		{ id: 3, name: "Clair" },
	],
];

console.log(
	arrays.reduce((r, c) =>
		r.filter((item1) => c.some((item2) => item1.name === item2.name))
	)
);
