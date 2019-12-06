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
}

exports.Stats = Stats;
