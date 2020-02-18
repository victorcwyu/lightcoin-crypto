// let balance = 500.00;

// class Account {
//   constructor(username) {
//     this.username = username;
//     // Have the account balance start at $0 since that makes more sense.
//     this.balance = 0;
//   }
// }

// class Withdrawal {
//   constructor(amount) {
//     this.amount = amount;
//   }
//   commit() {
//     balance -= this.amount;
//   }
// }

// class Withdrawal {
//   // Pass in the account that the withdrawal this for
//   constructor(amount, account) {
//     this.amount = amount;
//     this.account = account;
//   }
//   // Update the balance in the account
//   commit() {
//     this.account.balance -= this.amount;
//   }
// }

// // class Deposit {
// //   constructor(amount) {
// //     this.amount = amount;
// //   }
// //   commit() {
// //     balance += this.amount;
// //   }
// // }

// class Deposit {
//   // Pass in the account that the deposit this for
//   constructor(amount, account) {
//     this.amount = amount;
//     this.account = account;
//   }
//   // Update the balance in the account
//   commit() {
//     this.account.balance += this.amount;
//   }
// }

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    let balance = 0;
    for (let item of this.transactions) {
      balance += item.value;
    }
    return balance
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      console.log("Insufficent Funds")
      return false
    }else
      this.time = new Date();
      // Add the transaction to the account
      this.account.addTransaction(this);
      return true
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount
  }
  isAllowed() {
    return true
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    if (this.account.balance < 0)
    return false
  }

}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
// const myAccount = new Account("snow-patrol");
// t1 = new Withdrawal(50.25, myAccount);
// t1.commit();
// console.log('Transaction 1:', t1);
// t2 = new Withdrawal(9.99, myAccount);
// t2.commit();
// console.log('Transaction 2:', t2);
// t3 = new Deposit(120.00, myAccount);
// t3.commit();
// console.log('Transaction 3:', t3);

const myAccount = new Account('billybob');
console.log(`Starting Balance: $${myAccount.balance}`)
const t1 = new Deposit(120.00, myAccount);
t1.isAllowed();
t1.commit();
console.log(`Current Balance: $${myAccount.balance}`)
const t2 = new Withdrawal(50.00, myAccount);
t2.commit();
console.log(`Current Balance: $${myAccount.balance}`)
const t3 = new Withdrawal(500.00, myAccount);
t3.commit();
console.log(`Current Balance: $${myAccount.balance}`)
const t4 = new Withdrawal(500.00, myAccount);
t4.commit();
console.log(`Ending Balance: $${myAccount.balance}`)
