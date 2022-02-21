/**
 * Type in console to run: node problem2
 */

class Student {
	constructor() {
		this.name;
		this.age;
		this.students = [];
	}
	add(name, age) {
		this.name = name;
		this.age = age;
		const studentField = {
			name: this.name,
			age: this.age,
		};
		this.students = [...this.students, studentField];
	}
	get() {
		return this.students;
	}
}

// Get a random Integer for age within minimum and max.
const getRandomInteger = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const ageGenerator = () => {
	const ageMinimum = 20;
	const ageMaximum = 70;

	const ageGenerated = getRandomInteger(ageMinimum, ageMaximum);
	return ageGenerated;
};

// Random index for fakeNames
const getFloorIndex = (arrSize) => {
	return Math.floor(Math.random() * arrSize);
};

const nameGenerator = () => {
	const fakeNames = [
		'John',
		'Jane',
		'Alice',
		'Smith',
		'Mary',
		'Jane',
		'Peter',
		'Parker',
		'Mike',
		'Yoda',
		'Skywalker',
		'Kaolin',
		'Zeus',
		'Spence',
		'Angelo',
	];

	const fakeNameSize = fakeNames.length;
	const firstName = fakeNames[getFloorIndex(fakeNameSize)];
	const lastName = fakeNames[getFloorIndex(fakeNameSize)];

	const nameGenerated = `${firstName} ${lastName}`;
	return nameGenerated;
};

const compareStudentLists = (studentList1, studentList2) => {
	let matchingStudents = [];
	studentList1.map((studentL1) => {
		const studentL1Name = studentL1.name.toLowerCase();
		const studentL1Age = studentL1.age;
		studentList2.map((studentL2) => {
			const studentL2Name = studentL2.name.toLowerCase();
			const studentL2Age = studentL2.age;

			if (studentL1Name === studentL2Name && studentL1Age === studentL2Age) {
				const studentMatchingData = { name: studentL1Name, age: studentL2Age };
				matchingStudents = [...matchingStudents, studentMatchingData];
			}
		});
	});
	return matchingStudents;
};

const main = () => {
	const studentList1 = new Student();
	const studentList2 = new Student();

	for (let i = 0; i < 100; i++) {
		studentList1.add(nameGenerator(), ageGenerator());
		studentList2.add(nameGenerator(), ageGenerator());
	}

	const matchingStudents = compareStudentLists(
		studentList1.get(),
		studentList2.get()
	);
	console.log(matchingStudents);
	/*const mapStudentList1 = new Map();
	studentList1.get().map(({ name, age }) => {
		mapStudentList1.set(name, age);
	});
	console.log(studentList1.get().length);
	console.log(mapStudentList1);*/
};

main();
