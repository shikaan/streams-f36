class Stats {
  constructor(user, nice, system, idle, iowait, irq, softirq, steal, gues, guestNice) {
    this.nice = nice;
    this.system = system;
    this.idle = idle;
    this.iowait = iowait;
    this.irq = irq;
    this.softirq = softirq;
    this.steal = steal;
    this.gues = gues;
    this.guestNice = guestNice;
    this.user = user;
  }

  getNonIdle() {
    return this.user + this.nice + this.system + this.irq + this.softirq + this.steal
  }

  getIdle() {
    return this.idle + this.iowait
  }

  getTotal() {
    return this.getIdle() + this.getNonIdle()
  }

  getPercentage(previous) {
    const totalDifference = this.getTotal() - previous.getTotal();
    const idleDifference = this.getIdle() - previous.getIdle();
    return Math.round(100*(totalDifference - idleDifference)/totalDifference);
  }
}

exports.Stats = Stats;
