import Transaction from '../models/Transaction';

interface CreateTransationDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions.filter(
      transtion => transtion.type === 'income',
    );
    const outcome = this.transactions.filter(
      transtion => transtion.type === 'outcome',
    );
    const incomeTotal = incomes.reduce((acc, item) => acc + item.value, 0);
    const outcomeTotal = outcome.reduce((acc, item) => acc + item.value, 0);
    const total = incomeTotal - outcomeTotal;

    return {
      income: incomeTotal,
      outcome: outcomeTotal,
      total,
    };
  }

  public create({ title, value, type }: CreateTransationDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }

  public hasMoney(value: number): boolean {
    const balance = this.getBalance();

    return balance.total > value;
  }
}

export default TransactionsRepository;
