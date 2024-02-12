/**
 * A problem that can be reported to the user.
 */
class Problem {
  formattedTimestamp: string;
  constructor(public source: string,
    public localizedMessage: string) { 
      const t = new Date();
      this.formattedTimestamp =`${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()} ${t.getHours()}:${t.getMinutes()}:t.getSeconds()`;
    };
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


