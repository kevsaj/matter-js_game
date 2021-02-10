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

let stack = Matter.Composites.stack(400, 270, 6, 6, 0, 0, function(x, y) { 
          return Matter.Bodies.circle(x, y, 30, 30);
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

let ball = Matter.Bodies.circle(600, 200, 20);
let sling = Matter.Constraint.create({ 
      pointA: { x: 600, y: 200 }, 
      bodyB: ball, 
      stiffness: 0.05
  });




Matter.World.add(engine.world, [stack, ground, topWall, leftWall, rightWall, ball, sling, mouseConstraint]);
Matter.Engine.run(engine);
Matter.Render.run(render);