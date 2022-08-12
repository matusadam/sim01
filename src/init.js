

function init_game() {
    document.documentElement.style.overflow = 'hidden';
    c = document.getElementById('area');
    ctx = c.getContext('2d');
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    window.onresize = () => {
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }
    
    assets = load_assets();
    keys = init_control();
    add_listeners();

    world = new World(2048, 2048);
    new HitObserver(world);
    new MonsterDespawnObserver(world);
    var player = new PlayerEntity();
    var crosshair = new CrosshairEntity(player);
    player.crosshair = crosshair;
    new CameraEntity(player);
     
    // First spawn event
    make_event(100, generate_monster_event, []);

    render_interval = window.setInterval(simloop, 1000/fps);
}