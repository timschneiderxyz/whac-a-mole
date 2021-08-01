/*  ========================================================================
    # Main JavaScript
    ========================================================================  */

const WhacAMole = {
  cfg: {
    timerContainer: document.getElementById('timer'),
    timerValue: 30,
    scoreContainer: document.getElementById('score'),
    scoreValue: 0,
    cells: document.querySelectorAll('.game-grid__cell'),
    molePosition: 0
  },

  // Place Mole
  // ===========================================================================

  placeMole() {
    this.cfg.cells.forEach(cell => {
      cell.classList.remove('mole');
    });

    const randomCell = this.cfg.cells[Math.floor(Math.random() * 9)];
    randomCell.classList.add('mole');
    this.cfg.molePosition = randomCell.id;
  },

  // Handler
  // ===========================================================================

  handler() {
    this.cfg.cells.forEach(cell => {
      cell.addEventListener('mousedown', () => {
        if (cell.id === this.cfg.molePosition) {
          this.cfg.scoreValue++;
          this.cfg.scoreContainer.innerHTML = this.cfg.scoreValue;
        } else {
          this.cfg.scoreValue--;
          this.cfg.scoreContainer.innerHTML = this.cfg.scoreValue;
        }
      });
    });
  },

  // Timer
  // ===========================================================================

  timer() {
    this.cfg.timerContainer.innerHTML = this.cfg.timerValue;

    const x = setInterval(() => {
      this.cfg.timerValue--;
      this.cfg.timerContainer.innerHTML = this.cfg.timerValue;

      if (this.cfg.timerValue === 0) {
        clearInterval(x);
      }
    }, 1000);
  },

  // Init
  // ===========================================================================

  init() {
    this.handler();
    this.timer();

    const x = setInterval(() => {
      this.placeMole();

      if (this.cfg.timerValue === 0) {
        clearInterval(x);
      }
    }, 500);
  }
};

WhacAMole.init();
