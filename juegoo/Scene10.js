class Scene10 extends Phaser.Scene {
    constructor() {
      super("ganarr");
    }
  
    preload ()
    {
      this.load.image('logooo', 'assets/logooo.png');   
    }
    
    create() {
      this.add.image(700, 300, 'logooo');
      this.add.text(550, 350, '¿Queres ser mi novia sofi?', { fontFamily: 'Arial black', fontSize: 20, color: '#FF0000' })
      //this.add.text(410, 250, 'Haz logrado conseguir el tubo, se te atorgo una vida más', { fontFamily: 'Arial black', fontSize: 20, color: '#FF0000' })
      //this.add.text(455, 300, 'Ahora hay que cargar gasolina para la nave', { fontFamily: 'Arial black', fontSize: 20, color: '#FF0000' })
      //this.add.text(415, 400, 'Cuidado, hay objetos que no se pueden agarrar, no te rindas', { fontFamily: 'Arial black', fontSize: 20, color: '#FF0000' })
      //var restartButton = this.add.text(620, 450, 'Siguiente nivel', { fontFamily: 'Arial black', fontSize: 20, color: '#FF0000' })
      .setInteractive()
      .on('pointerdown', () => this.seguir() );
    }
  
    seguir() {
      this.scene.start('juego');
    }
  
    
  }