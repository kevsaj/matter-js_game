let engine = Matter.Engine.create();

let render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 1200,
        height: 700,
        wireframes: false
    }
});

let ground = Matter.Bodies.rectangle(500, 600, 1400, 30, {
    isStatic: true
});

let boxA = Matter.Bodies.rectangle(400, 200, 80, 80);
let boxB = Matter.Bodies.rectangle(450, 50, 80, 80);

Matter.World.add(engine.world, [boxA, boxB, ground]);
Matter.Engine.run(engine);
Matter.Render.run(render);