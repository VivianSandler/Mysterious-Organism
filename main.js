// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function to create multiple objects
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    // simulating P. aequor‘s high rate of mutation
    mutate() {
      let randomBaseIndex = Math.floor(Math.random() * this.dna.length);
      let currentBase = this.dna[randomBaseIndex];
      let newBase = returnRandBase();
      while (currentBase === newBase) {
        newBase = returnRandBase();
      }
      this.dna[randomBaseIndex] = newBase;
      return this.dna;
    },
    // Comparing the DNA sequences of different P. aequor
    compareDNA(pAequor2) {
      let commonBases = 0;
      for (i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor2.dna[i]) {
          commonBases++;
        }
      }
      const sharedPercentage = (commonBases / this.dna.length) * 100;
      console.log(
        `specimen #${this.specimenNum} and specimen #${
          pAequor2.specimenNum
        } have ${sharedPercentage.toFixed(2)}% DNA in common`
      );
    },
  };
};

const pAequor = pAequorFactory(1, mockUpStrand());
console.log(pAequor);
// pAequor.mutate();
// console.log(pAequor);

let pAequor2 = pAequorFactory(63, [
  "T",
  "T",
  "T",
  "T",
  "A",
  "A",
  "A",
  "A",
  "G",
  "G",
  "G",
  "G",
  "C",
  "C",
  "C",
]);

console.log(pAequor.compareDNA(pAequor2));