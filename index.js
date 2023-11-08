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
}

class ExpenseTask extends Task {
  constructor(id, description, cost) {
    super(id, description, cost);
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
      } else {
        throw new Error("Each task must be an instance of Task class");
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

  constructor(initialBalance = 20) {
    this.#tasksController = new TasksController();
    this.#budget = {
      balance: initialBalance,
      income: 15,
      expenses: 5,
    };

    Object.defineProperty(this, "budget", {
      get() {
        return this.#budget;
      },
    });
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

  calculateBalance(balance) {
    let remainingBalance = balance;
    remainingBalance = this.#budget.income - this.#budget.expenses;
  }
}

const task = new Task("", "task1", 1);
const incomeTask = new IncomeTask("", "Income task", 15);
const expenseTask = new ExpenseTask("", "Expense task", 16);
const taskController = new TasksController();
const budgetController = new BudgetController();

console.log(budgetController.calculateBalance());

// console.clear();
// console.log(taskController.getTasks());

//   console.log(task);
//   console.log(incomeTask);
//   console.log(expenseTask);
