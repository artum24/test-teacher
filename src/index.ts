import {EventEmitter} from './emitter';
import {AddActionData, Person, Persons} from "./types";
import {ActionType} from "./enums/actionType";

class Bank extends EventEmitter {
    persons: Persons = {};

    constructor() {
        super();
        this.on(ActionType.Add, (data: AddActionData) => this.add(data));
        this.on(ActionType.Withdraw, (data: AddActionData) => this.withdraw(data))
    }

    register (person: Person) {
        const id = Date.now();

        this.persons[id] = { ...person };
        this.emit(ActionType.Register, person);

        return id;
    }

    private add (data: AddActionData) {
        const { personId, amount } = data;
        const person = this.persons[personId];

        if (!person) {
            throw new Error(`Пользователь с идентификатором ${personId} не найден`);
        }

        person.balance = person.balance + amount;

        this.emit(ActionType.ChangeBalance, { name: person.name, amount: person.balance} as Person);
    }
    private withdraw(data:AddActionData) {
        const {personId, amount} = data;
        const person = this.persons[personId];

        if (!person) {
            throw new Error(`Пользователь с идентификатором ${personId} не найден`);
        }
        if (person.balance <= amount) {
            person.balance = 0;
            console.log('!!! Ваша карта має нульовий баланс !!!')
        } else {
            person.balance = person.balance - amount;
        }

        this.emit(ActionType.ChangeBalance, { name: person.name, amount: person.balance} as Person);
    }
}

const bank = new Bank();

const personId = bank.register({
    name: 'Джон Доу',
    balance: 100
});

bank.emit(ActionType.Add, { personId, amount: 20 } as AddActionData);

// Задание со звёздочкой
bank.emit(ActionType.Withdraw, { personId, amount: 20 } as AddActionData);
