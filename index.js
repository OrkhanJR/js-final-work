console.clear();

function Task(id, description, cost) {
  if (!new.target) {
    throw new Error("Can't create without new");
  }

  this._id = id || "id" + Math.random().toString(16).slice(2);

  if (typeof description === "string") {
    this._description = description;
  } else {
    throw new Error("Description must be a string");
  }

  if (typeof cost === "number" && cost >= 0) {
    this._cost = cost;
  } else {
    throw new Error(
      "Cost must be a number and should be greater than or equal to 0"
    );
  }

  Object.defineProperty(this, "id", {
    get() {
      return this._id;
    },
  });

  Object.defineProperty(this, "description", {
    get() {
      return this._description;
    },
  });

  Object.defineProperty(this, "cost", {
    get() {
      return this._cost;
    },
  });
}

class IncomeTask extends Task {
  constructor(id, description, cost) {
    super(id, description, cost);
  }
  makeDone(budget) {
    budget.income += this._cost;
  }

  makeUnDone(budget) {
    budget.income -= this._cost;
  }
}

class ExpenseTask extends Task {
  constructor(id, description, cost) {
    super(id, description, cost);
  }

  makeDone(budget) {
    budget.expenses += this._cost;
  }

  makeUnDone(budget) {
    budget.expenses -= this._cost;
  }
}

class TasksController {
  #tasks;
  constructor() {
    this.#tasks = [];
  }

  addTasks(...tasks) {
    for (const task of tasks) {
      if (task instanceof Task) {
        this.#tasks.push(task);
      }
    }
    return tasks;
  }

  getTasks() {
    return this.#tasks;
  }
}

class BudgetController {
  #tasksController;
  #budget;

  constructor(initialBalance = 0) {
    this.#tasksController = new TasksController();
    this.#budget = {
      balance: initialBalance,
      income: 15,
      expenses: 10,
    };
    Object.defineProperty(this, "balance", {
      get() {
        return this.#budget.balance;
      },
    });

    Object.defineProperty(this, "income", {
      get() {
        return this.#budget.income;
      },
    });

    Object.defineProperty(this, "expenses", {
      get() {
        return this.#budget.expenses;
      },
    });
  }

  calculateBalance() {
    return this.#budget.balance + this.#budget.income - this.#budget.expenses;
  }
}

const task1 = new Task("", "task1", 10);
const tasksController = new TasksController();
const budgetController = new BudgetController();


console.log(task1);
console.log(budgetController.balance);
console.log(tasksController.addTasks());
console.log(tasksController.getTasks());
