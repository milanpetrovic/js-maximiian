let person = {
    name: 'Milan',
    age: 35,
    hobbies: ['Weightlifting'],
    greet: () => {
        alert('Hi');
    }
};

delete person.greet;
person.isAdmin = true;

console.log(person);