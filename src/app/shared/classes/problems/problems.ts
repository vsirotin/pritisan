/**
 * A problem that can be reported to the user.
 */
class Problem {
  formattedTimestamp: string = Date.now().toString();
  constructor(public source: string,
    public localizedMessage: string) { };
};

export class Warning extends Problem {
  constructor(source: string,
    localizedMessage: string) {
    super(source, localizedMessage);
  }
};

export class Error extends Problem {
  constructor(source: string,
    localizedMessage: string) {
    super(source, localizedMessage);
  }
};


