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

// Factory function to create multiple objects that simulate the DNA of P. aequor
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    // Simulating P. aequor‘s high rate of mutation
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
    compareDNA(OtherPAequor) {
      let commonBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === OtherPAequor.dna[i]) {
          commonBases++;
        }
      }
      const sharedPercentage = (commonBases / this.dna.length) * 100;
      console.log(
        `specimen #${this.specimenNum} and specimen #${
          OtherPAequor.specimenNum
        } have ${sharedPercentage.toFixed(2)}% DNA in common`
      );
    },
    // Checking chances of survival of P. aequor in its natural environment
    willLikelySurvive() {
      let cOrGBases = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === "C" || this.dna[i] === "G") {
          cOrGBases++;
        }
      }
      let survivalPercentage = (cOrGBases / this.dna.length) * 100;
      if (survivalPercentage >= 60) {
        return true;
      } else {
        return false;
      }
    },
    // Finding the complement of P. aequor's DNA strand
    complementStrand() {
      return this.dna.map((base) => {
        switch (base) {
          case "A":
            return "T";
          case "T":
            return "A";
          case "C":
            return "G";
          case "G":
            return "C";
        }
      });
    },
  };
};

// Creating and logging an instance of P. aequor
const pAequor = pAequorFactory(1, mockUpStrand());
console.log(pAequor);

// Mutating one random base of DNA of pAequor and logging the result
pAequor.mutate();
console.log(pAequor);

// Finding the complement of the latest version (mutated) of pAequor
console.log(pAequor.complementStrand());

// Manutally creating a second instance of P. aequor to compare to the mutated version of the first instance made above
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

// Finding 30 instances of P. aequor that are likely to survive in their natural environment
let survivingPAequor = [];
let j = 1;
while (survivingPAequor.length < 30) {
  let arrOfPAequor = [];
  arrOfPAequor.push(pAequorFactory(j, mockUpStrand()));
  for (obj of arrOfPAequor) {
    if (obj.willLikelySurvive()) {
      survivingPAequor.push(obj);
    }
  }
  j++;
}

// Logging the 30 instances of P. aequor that can survive in their natural environment
console.log(survivingPAequor);
