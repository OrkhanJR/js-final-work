function Task(id, description, cost) {
  if (!new.target) {
    throw new Error("Can't create without new");
  }

  this._id = id || "id" + Math.random().toString(16).slice(2);
  this._isCompleted = false;

  if (typeof description === "string") {
    this._description = description;
  } else {
    throw new Error(
      `Description must be a string, received: ${typeof description}`
    );
  }

  if (typeof cost === "number" && cost >= 0) {
    this._cost = cost;
  } else {
    throw new Error(
      `Cost must be a number and should be greater than or equal to 0, received: ${cost}`
    );
  }

  Object.defineProperty(this, "isCompleted", {
    get: function () {
      return this._isCompleted;
    },
  });

  Object.defineProperty(this, "id", {
    get: function () {
      return this._id;
    },
  });

  Object.defineProperty(this, "description", {
    get: function () {
      return this._description;
    },
  });

  Object.defineProperty(this, "cost", {
    get: function () {
      return this._cost;
    },
  });

  Task.prototype.isDone = function () {
    return this._isCompleted;
  };
}

class IncomeTask extends Task {
  constructor(id, description, cost) {
    super(id, description, cost);
  }

  makeDone(budget) {
    this._isCompleted = true;
    budget.addIncome(this.cost);
  }

  makeUnDone(budget) {
    this._isCompleted = false;
    budget.addIncome(-this.cost);
  }
}

class ExpenseTask extends Task {
  constructor(id, description, cost) {
    super(id, description, cost);
  }

  makeDone(budget) {
    this._isCompleted = true;
    budget.addExpenses(this.cost);
  }

  makeUnDone(budget) {
    this._isCompleted = false;
    budget.addExpenses(-this.cost);
  }
}

class TasksController {
  #tasks;
  constructor() {
    this.#tasks = [];
  }

  addTasks(...tasks) {
    this.#tasks.push(...tasks);
  }

  deleteTask(task) {
    const index = this.#tasks.findIndex(function (t) {
      return t.id === task.id;
    });

    if (index !== -1) {
      const deletedTask = this.#tasks.splice(index, 1)[0];

      if (deletedTask.isDone()) {
        deletedTask.makeUnDone();
      }
    } else {
      console.log("Task " + task.id + " isn't recognized");
    }
  }

  getTasks() {
    return this.#tasks;
  }

  getTasksSortedBy(sortBy) {
    switch (sortBy) {
      case "description":
        return this.#tasks.slice().sort(function (a, b) {
          return a.description.localeCompare(b.description);
        });
      case "status":
        return this.#tasks.slice().sort(function (a, b) {
          return a.isCompleted - b.isCompleted;
        });
      case "cost":
        return this.#tasks.slice().sort(function (a, b) {
          return b.cost - a.cost;
        });
      default:
        return this.#tasks;
    }
  }
}

class BudgetController {
  #tasksController;
  #budget;

  constructor(initialBalance = 0) {
    this.#tasksController = new TasksController();
    this.#budget = {
      balance: initialBalance,
      income: 10,
      expenses: 5,
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

  addIncome(amount) {
    this.#budget.income += amount;
  }

  addExpenses(amount) {
    this.#budget.expenses += amount;
  }

  doneTask(task) {
    if (!task.isDone()) {
      task.makeDone(this);
    } else {
      console.log(`Task is already done`);
    }
  }

  unDoneTask(task) {
    if (task.isDone()) {
      task.makeUnDone(this);
    } else {
      console.log(`Task isn't done before`);
    }
  }

  get tasksController() {
    return this.#tasksController;
  }
}

const task1 = new Task("", "1", 10)
console.log(task1);
