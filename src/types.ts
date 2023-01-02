interface Person {
    name:string;
    balance: number;
    amount?: number;
}

interface AddActionData extends Person {
    amount: number;
    personId: number;
}

type Persons = Record<string, Person>

interface Handler<T> {
    (item: T): void;
}

// action emit data
type ActionEmitData = AddActionData | Person;

export {Person, Persons, Handler, ActionEmitData, AddActionData};
