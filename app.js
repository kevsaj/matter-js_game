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

let topWall1 = Matter.Bodies.rectangle(1300, 0, 1400, 20, {
    isStatic: true,
    angle: -Math.PI * 0.06,
    render: {
        visible: true
    }
});

let topWall2 = Matter.Bodies.rectangle(0, 20, 1200, 20, {
    isStatic: true,
    angle: Math.PI * 0.05,
    render: {
        visible: true
    }
});

let leftWall = Matter.Bodies.rectangle(0, 250, 20, window.innerHeight, {
    isStatic: true,
    render: {
        visible: true
    }
});

let rightWall = Matter.Bodies.rectangle(1200, 250, 20, window.innerHeight, {
    isStatic: true,
    render: {
        visible: true
    }
});

let stack = Matter.Composites.stack(0, 0, 40, 4, 0, 0, function (x, y) {
    return Matter.Bodies.circle(x, y, 10, { friction: 0.00001, restitution: 0.9, density: 0.001 });
});

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

let ball = Matter.Bodies.circle(300, 400, 20);
let sling = Matter.Constraint.create({
    pointA: {
        x: 300,
        y: 400
    },
    bodyB: ball,
    stiffness: 0.05
});

let firing = false;
Matter.Events.on(mouseConstraint, 'enddrag', function (e) {
    if (e.body === ball) firing = true;
});
Matter.Events.on(engine, 'afterUpdate', function () {
    if (firing && Math.abs(ball.position.x - 300) < 20 && Math.abs(ball.position.y - 400) < 20) {
        ball = Matter.Bodies.circle(300, 400, 20);
        Matter.World.add(engine.world, ball);
        sling.bodyB = ball;
        firing = false;
    }
});




Matter.World.add(engine.world, [stack, ground, topWall1, topWall2, leftWall, rightWall, ball, sling, mouseConstraint]);
Matter.Engine.run(engine);
Matter.Render.run(render);