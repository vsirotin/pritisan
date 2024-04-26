
// Define the abstract class State with:
// C - (context) the generic type for context (subject of processing).
export abstract class State<C> {

    entranceState(subject: C): C {
        //simply clone and return the subject   
        return { ...subject };
    };

    processState(subject: C): C {
        return subject;
    };

    exitState(subject: C): C {
        return subject;
    }

}
//Define the abstract class Transition with:
// C - (context) the generic type for context (subject of processing),
// E - (finite state) the generic type for states,
// S - (signal) the generic type for the signal,
export abstract class Transition<C, E extends State<C>, S> {
    constructor(
        public from: E,
        public to: E,
        public signal: S) { }

    exitAction(from: E, subject: C, to: E, signal: S): C {
        return subject;
    }
    entranceAction(to: E, subject: C, from: E, signal: S): C {
        return subject;
    };
}
//------------Finite automata -----------------
// Define the abstract class FiniteAutomata with: 
// C - (context) the generic type for context (subject of processing),
// S - (signal) the generic type for signals,
// T - (transition) the generic type for transitions.
// 
export abstract class DetermenisticFiniteAutomatation<C, E extends State<C>, S, T extends Transition<C, E, S>> {

    private states!: Set<E>;
    private signals!: Set<S>;
    private currentState!: E;
    private subject!: C;

    constructor(private transitions: T[], initialState: E, initialSubject: C) {
        this.currentState = initialState;
        this.subject = initialSubject;
        this.states = new Set(transitions.map(t => t.from).concat(transitions.map(t => t.to)));
        this.signals = new Set(transitions.map(t => t.signal));
    }

    processSignal(signal: S): E {
        const transition = this.transitions.find(t => (t.from == this.currentState) && (t.signal === signal));
        if (!transition) {
            throw new Error(`Transition not found for current state ${JSON.stringify(this.currentState)} and signal ${JSON.stringify(signal)} not found`);
        }

        this.subject = transition.exitAction(transition.from, this.subject, transition.to, signal);
        this.subject = transition.entranceAction(transition.to, this.subject, transition.from, signal);

        this.currentState = transition.to;
        this.subject = this.currentState.entranceState(this.subject);
        this.subject = this.currentState.processState(this.subject);
        this.subject = this.currentState.exitState(this.subject);
        return transition.to;
    }

    getCurrentState(): E {
        return this.currentState;
    }

    getSugject(): C {
        return this.subject;
    }
}
