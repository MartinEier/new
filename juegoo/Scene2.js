class Scene2 extends Phaser.Scene {
    constructor() {
      super('juego');
      
    }
    preload() {
     
        this.load.spritesheet('personaje1', 'assets/sprites/personaje1.png', { frameWidth: 57, frameHeight: 62 });
        this.load.tilemapTiledJSON('mapa', 'assets/mapa/mapa.json');
        this.load.image('tiles','assets/mapa/tileSets.png');
        this.load.image('tiles','assets/mapa/tileSets.png');
        this.load.image('gasolina','assets/gasolina.png');
        this.load.image('gasolinaa','assets/gasolinaa.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('enemigo', 'assets/enemigo.png', { frameWidth: 32, frameHeight: 48 }); 
        this.load.image('enemigoo', 'assets/enemigoo.png', { frameWidth: 32, frameHeight: 48 }); 
        this.load.image('enemigoo', 'assets/enemigooo.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('enemigoo', 'assets/enemigoooo.png', { frameWidth: 32, frameHeight: 48 });
        this.load.audio('coin', 'assets/Sonido/coin.wav');
        this.load.audio('go', 'assets/Sonido/go.wav');
        this.load.audio('golpe', 'assets/Sonido/golpe.mp3');
        this.load.audio('nivelcompleto', 'assets/Sonido/nivelcompleto.wav');
        this.load.audio('salto', 'assets/Sonido/salto.wav');
        this.load.audio('musica','assets/Sonido/musica.mp3');
        this.load.image('enemigo6', 'assets/enemigo6abajo.png', { frameWidth: 32, frameHeight: 48 }); 
        this.load.image('enemigo7', 'assets/enemigo7abajo.png', { frameWidth: 32, frameHeight: 48 }); 
        this.load.image('Dead', 'assets/sprites/Dead.png');
    }
    create() {

        coin = this.sound.add('coin');
        knock = this.sound.add('golpe');
        go = this.sound.add('go')
        nivelcompleto = this.sound.add('nivelcompleto')
        salto = this.sound.add('salto')
        musica = this.sound.add('musica')
        musica.play();
        var setTint;
        var enemigo6;
        var enemigo7;

        var ganaste;
        var perdiste;
        game.config.backgroundColor.setTo(108, 210, 222);
    
        mapa = this.make.tilemap({ key: 'mapa' });
        var tilesets = mapa.addTilesetImage('tileSets', 'tiles');
    
        var nubes = mapa.createDynamicLayer('nubes', tilesets, 0, 0);
    
        var solidos = mapa.createDynamicLayer('solidos', tilesets, 0, 0);
        solidos.setCollisionByProperty({ solido: true });
        
        jugador = this.physics.add.sprite(100,100,'personaje1',0);
        jugador.setSize(30,0);

        this.anims.create({
            key: 'caminar',
            frames: this.anims.generateFrameNumbers('personaje1', { start: 1, end: 8 }),
            frameRate: 10
        });
    
        this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);
        this.cameras.main.startFollow(jugador);
    
        arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        enemigo6 = this.physics.add.sprite(2170, 400, 'enemigo6');
        enemigo6.setScale(0.5); 

        enemigo7 = this.physics.add.sprite(3150, 300, 'enemigo7');
        enemigo7.setScale(0.5); 


        enemigo = this.physics.add.sprite(1000, 520, 'enemigo');
        enemigo.setBounce(0.2);
        enemigo.setCollideWorldBounds(true);
        enemigo.setScale(0.5); 
        enemigo.setVelocity(Phaser.Math.Between(-200, 500), 20);

        enemigoo = this.physics.add.sprite(700, 600, 'enemigoo');
        enemigoo.setBounce(0.2);
        enemigoo.setCollideWorldBounds(true);
        enemigoo.setScale(0.5); 
        enemigoo.setVelocity(Phaser.Math.Between(-200, 500), 20);

        enemigooo = this.physics.add.sprite(1600, 300, 'enemigoo');
        enemigooo.setBounce(0.2);
        enemigooo.setCollideWorldBounds(false);
        enemigooo.setScale(0.5); 
        enemigooo.setVelocity(Phaser.Math.Between(-200, 500), 20);

        enemigoooo = this.physics.add.sprite(2800, 100, 'enemigoo');
        enemigoooo.setBounce(0.2);
        enemigoooo.setCollideWorldBounds(false);
        enemigoooo.setScale(0.5); 
        enemigoooo.setVelocity(Phaser.Math.Between(-500, 500), 20);
        
        if (cursors =! undefined){
            cursors = this.input.keyboard.createCursorKeys();
        } 

        power = this.physics.add.group({
            key: 'power',
            repeat: 1,
            setXY: { x: 1700, y: 100, }
        });

        gasolina = this.physics.add.group({
            key: 'gasolina',
            repeat: 1,
            setXY: { x: 1450, y: 400, }
        });
        
        stars = this.physics.add.group({
            key: 'star',
            repeat: 10,
            setXY: { x: 200, y: 200, stepX: 550 }
         });
        stars.children.iterate(function (child) {

        
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
              
        });

        this.physics.add.collider(gasolina, solidos);
        this.physics.add.collider(stars, solidos);
        this.physics.add.collider(jugador, solidos);
        this.physics.add.collider(enemigo, solidos);
        this.physics.add.collider(enemigoo, solidos);
        this.physics.add.collider(enemigooo, solidos);
        this.physics.add.collider(enemigoooo, solidos);
        this.physics.add.collider(enemigo6, solidos);
        this.physics.add.collider(enemigo7, solidos);

        this.physics.add.overlap(jugador, stars, this.collectStar, null, this);
        this.physics.add.overlap(jugador, gasolina, this.collectgasolina, null, this);
        this.physics.add.overlap(enemigo, jugador, this.collectenemigoo, null, this);
        this.physics.add.overlap(enemigoo, jugador, this.collectenemigo, null, this);
        this.physics.add.overlap(enemigooo, jugador, this.collectenemigooo, null, this);
        this.physics.add.overlap(enemigoooo, jugador, this.collectenemigoooo, null, this);
        this.physics.add.overlap(enemigo6, jugador, this.collectenemigo6, null, this);
        this.physics.add.overlap(enemigo7, jugador, this.collectenemigo7, null, this);
        
        score = 0;
        gameOver = false;

        
        

        this.vida = 3;

        initialTime = 45
      
        
        

        timedEvent = this.time.addEvent({ delay: 1000, callback: this.onSecond, callbackScope: this, loop: true });
        timeText = this.add.text(400, 600, '', { fontSize: '32px', fill: '#FFFFFF' });
        timeText.scrollFactorX = 0;
        timeText.scrollFactorY = 0;

        this.add.text(2980, 550, 'Aca no hay nada', { fontFamily: 'Arial black', fontSize: 20, color: '#FFFFFF' })
        

        scoreText = this.add.text(200, 600, 'Score: 0', { fontSize: '32px', fill: '#FFFFFF' });
        scoreText.scrollFactorX = 0;
        scoreText.scrollFactorY = 0;

        
        vidaText = this.add.text(40, 600, 'vida:' + this.vida , { fontSize: '32px', fill: '#FFFFFF' }); 
        vidaText.scrollFactorX = 0;
        vidaText.scrollFactorY = 0;
    } 

 update(){
 jugador.body.setVelocityX(0);

 if(izquierda.isDown){
     jugador.body.setVelocityX(-velocidad);
     jugador.flipX = true;
 }

 if(derecha.isDown){
     jugador.body.setVelocityX(velocidad);
     jugador.flipX = false;
 }

 if(arriba.isDown && jugador.body.onFloor()){
     jugador.body.setVelocityY(alturaSalto);
     salto.play();
 }

 if((izquierda.isDown || derecha.isDown) && jugador.body.onFloor()){
     jugador.anims.play('caminar',true);
 }else if(!jugador.body.onFloor()){
     jugador.setFrame(9);
 }else{
     jugador.setFrame(0);
 }
 }
 collectgasolina (player, gasolina, ) 
   {
     gasolina.disableBody(true, true);

     
     this.ganaste()
     
    }
    ganaste(){
        musica.stop();
        this.scene.start('final');
        nivelcompleto.play();
    }

    collectStar (player, star, ) 
    {
      star.disableBody(true, true);
      coin.play();
       
      score += 10;   
      
      scoreText.setText('Score:' + score);
       
   
       
          
       
        
           
        //var bomb = bombs.create(x, 16, 'bomb');
        //bomb.setBounce(1);
        //bomb.setCollideWorldBounds(true);
        //bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        //bomb.allowGravity = false;
        //level += 1
         //initialTime = 30 - level; 
      
       
    } 

    collectenemigo (enemigo, player ) 
    {
      enemigo.disableBody(true, true);
      knock.play();

      this.vida = this.vida - 1;
      console.log('vida:' + this.vida)   
      vidaText.setText('vida: ' + this.vida);
      if (this.vida == 0) {
        player.disableBody(true, true);
        this.gameOver()
        } 

    }
    collectenemigoo (enemigoo, player ) 
    {
      enemigoo.disableBody(true, true);
      knock.play();

      this.vida = this.vida - 1;
      console.log('vida:' + this.vida)   
      vidaText.setText('vida: ' + this.vida);
      if (this.vida == 0) {
        player.disableBody(true, true);
        this.gameOver()
        } 
    }
    collectenemigooo (enemigooo, player ) 
    {
      enemigooo.disableBody(true, true);
      knock.play();

      this.vida = this.vida - 1;
      console.log('vida:' + this.vida)   
      vidaText.setText('vida: ' + this.vida);
      if (this.vida == 0) {
        player.disableBody(true, true);
        this.gameOver()
        } 
    }
    collectenemigoooo (enemigoooo, player ) 
    {
      enemigoooo.disableBody(true, true);
      knock.play();

      this.vida = this.vida - 1;
      console.log('vida:' + this.vida)   
      vidaText.setText('vida: ' + this.vida);
      if (this.vida == 0) {
        player.disableBody(true, true);
        this.gameOver()
        } 
    }
    collectenemigo6(enemigo6, player )
        {
         enemigo6.disableBody(true, true);
         player.disableBody(true, true);
         this.gameOver();
        }
    collectenemigo7(enemigo7, player )
        {
         enemigo7.disableBody(true, true);
         player.disableBody(true, true);
         this.gameOver();
        }
    

  onSecond() 
  {
      if (! gameOver)
      {       
          initialTime = initialTime - 1; // One second
          timeText.setText('Time: ' + initialTime);
          if (initialTime == 0) {
              timedEvent.paused = true;
              this.gameOver()
          }            
      }

  }
  gameOver() 
    {
        go.play();
        setTimeout(() => {
        
        musica.stop();
        this.scene.start('perdiste')}, 1000);
    }
    
}
