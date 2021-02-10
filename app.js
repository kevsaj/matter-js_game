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

let topWall = Matter.Bodies.rectangle(500, 0, 1400, 20, {
        isStatic: true, render: {
            visible: true
        }
});

let leftWall = Matter.Bodies.rectangle(0, 250, 20, window.innerHeight, {
        isStatic: true, render: {
            visible: true
        }
});

let rightWall = Matter.Bodies.rectangle(1200, 250, 20, window.innerHeight, {
        isStatic: true, render: {
            visible: true
        }
});

let boxA = Matter.Bodies.circle(400, 200, 30, 80);
let boxB = Matter.Bodies.circle(450, 50, 30, 80);
let boxC = Matter.Bodies.circle(450, 50, 30, 80);
let boxD = Matter.Bodies.circle(450, 50, 30, 80);

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: {
            visible: true
        }
    }
});
render.mouse = mouse;

Matter.World.add(engine.world, [boxA, boxB, boxC, boxD, ground, topWall, leftWall, rightWall, mouseConstraint]);
Matter.Engine.run(engine);
Matter.Render.run(render);