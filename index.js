const reservas = [
    {
        tipoHabitacion: "suite",
        desayuno : false,
        pax: 1,
        noches: 1
      },
    {
      tipoHabitacion: "standard",
      desayuno : true,
      pax: 2,
      noches: 1
    },
    {
      tipoHabitacion: "suite",
      desayuno : true,
      pax: 1,
      noches: 1
    },
    {
      tipoHabitacion: "suite",
      desayuno : true,
      pax: 1,
      noches: 1
    }
  ];

  const price = {
    standar:100,
    suite:150
  };


  class precio {
        constructor(reserva){
          this.reserva = reserva;
          this.subtotal = 0;
          this.total = 0;
        }
        
        get Subtotal(){
          return  this.reserva.reduce((acc,reser) => acc += (reser.tipoHabitacion ==="standard")?(100*reser.noches+((reser.pax-1)*40)*reser.noches):150*reser.noches+((reser.pax-1)*40)*reser.noches ,0 )  
        }
        get Total(){
          return this.Subtotal + (this.Subtotal * 0.21); 
        }
  }

  class precioTour extends precio {
     constructor(reserva){
        super(reserva)
     }
        get  Subtotal(){
          return this.reserva.reduce((acc,reser) => acc += (reser.tipoHabitacion ==="standard")?(100*reser.noches+((reser.pax-1)*40)*reser.noches):100*reser.noches+((reser.pax-1)*40)*reser.noches ,0 )  
        }
        get Total(){
          return (this.Subtotal + (this.Subtotal * 0.21))*0.85; 
        }

  }


  const precio1 = new precio (reservas);
  console.log("Al ser un PARTICULAR el Subtotal asciende a ",precio1.Subtotal.toFixed(2),"€ y el Toatal con IVA del 21% asciende a ",precio1.Total.toFixed(2),"€" )

  const precio2 = new precioTour(reservas);
  console.log("Al ser un OPERADOR el Subtotal asciende a ",precio2.Subtotal.toFixed(2),"€ y el Toatal con IVA del 21% y un descuento del 10% asciende a ",precio2.Total.toFixed(2),"€" )

//////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////// DESFIO

class bass {
  constructor(prices) {
      this.prices = prices;
      this.subtotal = 0;
      this.total = 0;
  }
  set reservain (reservaExterna){
    this.reserva = reservaExterna;
    this.calcularSubtotal();
    this.calcularTotal();
  }
  calcularSubtotal(pr1,pr2){
    this.subtotal = this.reserva.reduce((acc,reser) => acc += (((reser.tipoHabitacion ==="standard")?(pr1*reser.noches+((reser.pax-1)*40)*reser.noches):pr2*reser.noches+((reser.pax-1)*40)*reser.noches) + ((reser.desayuno)? reser.noches*15*reser.pax:0)) ,0 )  
  }
  calcularTotal(ds){
    this.total = (this.subtotal + (this.subtotal * 0.21)) - ((this.subtotal + (this.subtotal * 0.21)) * ds); 
  }
}

class child1 extends bass{
  set reservain (reservaExterna){
    this.reserva = reservaExterna;
    this.calcularSubtotal(this.prices.standar,this.prices.suite);
    this.calcularTotal(0);
  }
}

class child2 extends bass{
  set reservain (reservaExterna){
    this.reserva = reservaExterna;
    this.calcularSubtotal(this.prices.standar,this.prices.standar);
    this.calcularTotal(0.15);
  }
}
 const base = new bass(price)
 const precioch1 = new child1 (price);
 const precioch2 = new child2 (price);
 precioch1.reservain = reservas;
 precioch2.reservain = reservas;
  console.log("Al ser un PARTICULAR el Subtotal asciende a ",precioch1.subtotal.toFixed(2),"€ y el Toatal con IVA del 21% asciende a ",precioch1.total.toFixed(2),"€" )
  console.log("Al ser un OPERADOR el Subtotal asciende a ",precioch2.subtotal.toFixed(2),"€ y el Toatal con IVA del 21% y un descuento del 10% asciende a ",precioch2.total.toFixed(2),"€" )

//////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////// EJERCICIO EXTRA (añadir desayuno lo he puesto con el desafio)