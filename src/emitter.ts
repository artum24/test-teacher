import {ActionEmitData, AddActionData, Handler} from "./types";
import {ActionType} from "./enums/actionType";

export class EventEmitter {
    events = Object.create(null);

    constructor() {
        this
            .on(ActionType.Register, (person) => {
                console.log(`Пользователь ${person.name} был успешно зарегистрирован з балансом - ${person.balance}$`);
            })
            .on(ActionType.ChangeBalance, ({ name, amount }) => {
                console.log(`На счету ${name} — ${amount}$`);
            });
    }

    on (type: ActionType, handler: Handler<AddActionData>) {
        if (type in this.events) {
            this.events[type].push(handler);
        } else {
            this.events[type] = [handler];
        }

        return this;
    }

    emit(type: ActionType, data: ActionEmitData) {

        const handlers = this.events[type];

        if (Array.isArray(handlers)) {
            handlers.forEach((handler) => handler(data));
        }

        return this;
    }
}
