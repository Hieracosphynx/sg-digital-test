/**
 * Type in console to run: node problem1
 */

const divide = (number, divider) => {
	if (number % divider === 0) {
		return true;
	}
	return false;
};

const main = () => {
	for (let i = 1; i < 101; i++) {
		const divisibleBy3 = divide(i, 3);
		const divisibleBy5 = divide(i, 5);

		if (divisibleBy3 && divisibleBy5) {
			console.log(`${i}: Tri and Max`);
		} else if (divisibleBy3) {
			console.log(`${i}: Tri`);
		} else if (divisibleBy5) {
			console.log(`${i}: Max`);
		} else {
			console.log(`${i}: Not divisible by 3 and 5`);
		}
	}
};

main();
