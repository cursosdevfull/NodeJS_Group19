interface IAnimal {
  comer(): void;
  dormir(): void;
  reproducir(): void;
}

/*interface ISimio {
    comer(): void,
    dormir(): void,
    reproducir(): void
    treparArbol(): void
} */

interface ISimio extends IAnimal {
  treparArbol(): void;
}

class Elefante implements IAnimal {
  comer(): void {
    console.log("elefante comer");
  }
  dormir(): void {
    console.log("elefante dormin");
  }
  reproducir(): void {
    console.log("elefante reproducir");
  }
}

class Jirafa implements IAnimal {
  comer(): void {
    console.log("jirafa comer");
  }
  dormir(): void {
    console.log("jirafa dormir");
  }
  reproducir(): void {
    console.log("jirafa reproducir");
  }
}

class Mono implements ISimio {
  comer(): void {
    console.log("mono comer");
  }
  dormir(): void {
    console.log("mono dormir");
  }
  reproducir(): void {
    console.log("mono reproducir");
  }

  treparArbol(): void {
    console.log("mono trepar árbol");
  }
}

class Gorila implements ISimio {
  comer(): void {
    console.log("gorila comer");
  }
  dormir(): void {
    console.log("gorila dormir");
  }
  reproducir(): void {
    console.log("gorila reproducir");
  }

  treparArbol(): void {
    console.log("gorila trepar árbol");
  }
}
