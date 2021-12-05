import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Body, ContactMaterial, Material, Plane, Vec3, World, Quaternion as Quat } from 'cannon-es';
import { AmbientLight, DirectionalLight, Mesh, Object3D, OrthographicCamera, PCFSoftShadowMap, PlaneGeometry, Quaternion, Scene, ShadowMaterial, Vector2, Vector3, WebGLRenderer } from 'three';

import { DieRoll, DieObject, Die, d4, d6, d8, d10, d12, d20, randomQuaternion } from './dice';
import { Ref } from 'vue';

interface Dice {
  d4: Die;
  d6: Die;
  d8: Die;
  d10: Die;
  d12: Die;
  d20: Die;
}

interface Picker {
  die: Die;
  object: Object3D;
  position: Vector2;
  orientation: Quaternion;
  rotation: number;
}

function loadDice() {
  return {
    d4: d4(0.05, 20),
    d6: d6(0.09, 20),
    d8: d8(0.09, 20),
    d10: d10(0.09, 20),
    d12: d12(0.09, 20),
    d20: d20(0.09, 20),
  };
}

function rollDie(position: Vec3): DieRoll {
  const orientation = randomQuaternion(Math.random);

  const velDir = Math.random() * Math.PI * 2;
  const velocity = new Vec3(Math.cos(velDir), 0, Math.sin(velDir)).scale(3)
    .vadd(new Vec3(8, 0, 0));

  const spinDir = randomQuaternion(Math.random);
  const angularVelocity = spinDir.vmult(Vec3.UNIT_Y.scale(30));

  return {
    position,
    orientation,
    velocity,
    angularVelocity
  };
}

function initScene(canvas: HTMLCanvasElement) {
  const scene = new Scene();
  const camera = new OrthographicCamera(-canvas.width / 200, canvas.width / 200, canvas.height / 200, -canvas.height / 200);
  camera.position.set(0, 100, 0);
  camera.lookAt(0, 0, 0);

  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;

  const ambientLight = new AmbientLight(0xFFFFFF, 0.4);
  scene.add(ambientLight);

  const halfDiagonal = Math.sqrt(camera.right * camera.right + camera.top * camera.top);

  const directionalLight1 = new DirectionalLight(0xFFFFFF, 0.6);
  directionalLight1.position.set(2, 3, -1);
  directionalLight1.shadow.mapSize.width = 4 * canvas.width;
  directionalLight1.shadow.mapSize.height = 4 * canvas.height;
  directionalLight1.shadow.camera.near = -2 * halfDiagonal;
  directionalLight1.shadow.camera.far = 2 * halfDiagonal;
  directionalLight1.shadow.camera.top = halfDiagonal;
  directionalLight1.shadow.camera.bottom = -halfDiagonal;
  directionalLight1.shadow.camera.left = -halfDiagonal;
  directionalLight1.shadow.camera.right = halfDiagonal;
  directionalLight1.castShadow = true;
  scene.add(directionalLight1);

  const tableGeometry = new PlaneGeometry(2 * camera.right, 2 * camera.top);
  const tableMaterial = new ShadowMaterial({ opacity: 0.5 });
  const table = new Mesh(tableGeometry, tableMaterial);
  table.rotateX(-Math.PI / 2);
  table.castShadow = false;
  table.receiveShadow = true;
  scene.add(table);

  return { scene, camera, renderer };
}

function initWorld(viewport: Vector2) {
  const world = new World({
    gravity: new Vec3(0, -30, 0),
  });

  const wallMaterial = new Material();
  const floorMaterial = new Material();

  const floor = new Body({
    type: Body.STATIC,
    shape: new Plane(),
    position: new Vec3(0, 0, 0),
    quaternion: new Quat().setFromVectors(Vec3.UNIT_Z, Vec3.UNIT_Y),
    material: floorMaterial,
  });

  const walls = [
    new Body({
      type: Body.STATIC,
      shape: new Plane(),
      position: new Vec3(-viewport.x / 2, 0, 0),
      quaternion: new Quat().setFromVectors(Vec3.UNIT_Z, Vec3.UNIT_X),
      material: wallMaterial,
    }),
    new Body({
      type: Body.STATIC,
      shape: new Plane(),
      position: new Vec3(+viewport.x / 2, 0, 0),
      quaternion: new Quat().setFromVectors(Vec3.UNIT_Z, Vec3.UNIT_X.negate()),
      material: wallMaterial,
    }),
    new Body({
      type: Body.STATIC,
      shape: new Plane(),
      position: new Vec3(0, 0, -viewport.y / 2),
      quaternion: new Quat().setFromVectors(Vec3.UNIT_Z, Vec3.UNIT_Z),
      material: wallMaterial,
    }),
    new Body({
      type: Body.STATIC,
      shape: new Plane(),
      position: new Vec3(0, 0, +viewport.y / 2),
      quaternion: new Quat().setFromVectors(Vec3.UNIT_Z, Vec3.UNIT_Z.negate()),
      material: wallMaterial,
    }),
  ];

  world.addBody(floor);
  for (const body of walls) world.addBody(body);

  world.addContactMaterial(new ContactMaterial(world.defaultMaterial, wallMaterial, { friction: 0 }));
  world.addContactMaterial(new ContactMaterial(world.defaultMaterial, floorMaterial, { friction: 0.04 }));
  world.addContactMaterial(new ContactMaterial(world.defaultMaterial, world.defaultMaterial, { friction: 0 }));

  return { world, walls, floor };
}

export function initDice(canvas: HTMLCanvasElement, results: Ref<null | number[]>): any {
  if (document.readyState != 'complete') return window.addEventListener('load', () => initDice(canvas, results));

  const dice = loadDice();

  const box = canvas.getBoundingClientRect();
  canvas.width = box.width;
  canvas.height = box.height;

  const { scene, camera, renderer } = initScene(canvas);
  const viewport = new Vector2(camera.right * 2, camera.top * 2);
  const { world, floor, walls } = initWorld(viewport);

  // const orbit = new OrbitControls(camera, canvas);

  const objects: DieObject[] = [];

  const allDice = Reflect.ownKeys(dice).map(k => dice[k as keyof Dice]);
  const pickers = allDice.map((die, i) => {
    const position = new Vector2(
      -viewport.x / 2 + 0.5,
      1 * ((i + 0.5) - allDice.length / 2),
    );

    const object = Die.createObject(die);
    object.position.set(position.x, 10, position.y);
    object.scale.set(0.6, 0.6, 0.6);

    const rotation = new Quaternion().setFromUnitVectors(
      new Vector3(die.model.faces[0].normal.x, die.model.faces[0].normal.y, die.model.faces[0].normal.z),
      new Vector3(0, -1, 0)
    );

    const center = new Vec3();
    for (const v of die.model.faces[0].vertices) center.vadd(v.point, center);
    center.scale(1 / die.model.faces[0].vertices.length, center);

    const b = new Vector3();
    b.copy(die.model.faces[0].vertices[1].point as any);
    b.sub(center as any);
    b.normalize();
    b.applyQuaternion(rotation);

    const q = new Quaternion();
    if (die.model.faces.length == 6)
      q.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI * 5 / 4);

    else if (die.model.faces.length == 8)
      q.setFromAxisAngle(new Vector3(0, 1, 0), Math.PI * 2 / 3);

    q.multiply(new Quaternion().setFromUnitVectors(b, new Vector3(0, 0, 1)));
    q.multiply(rotation);
    q.normalize();

    object.quaternion.copy(q);
    scene.add(object);

    return {
      die,
      object,
      position,
      orientation: q,
      rotation: 0,
    };
  });

  function hitTest(x: number, y: number) {
    const pos = new Vector2(
      (x / canvas.width - 0.5) * viewport.x,
      (y / canvas.height - 0.5) * viewport.y,
    );

    const offset = new Vector2();
    for (const picker of pickers) {
      offset.copy(pos);
      offset.sub(picker.position);

      if (offset.length() < 0.5) {
        return picker;
      }
    }

    return null;
  }

  function add(die: Die, position: Vec3) {
    const o = Die.create(die);
    objects.push(o);
    scene.add(o.object);
    world.addBody(o.body);

    const roll = rollDie(position);
    Die.initRoll(o, roll);
    Die.update(o);
  }

  let picking: Picker | null = null;
  function onMouseEvent(e: MouseEvent) {
    picking = hitTest(e.offsetX, e.offsetY);
  }

  canvas.addEventListener('mouseenter', onMouseEvent);
  canvas.addEventListener('mouseleave', onMouseEvent);
  canvas.addEventListener('mousemove', onMouseEvent);

  canvas.addEventListener('click', e => {
    const pick = hitTest(e.offsetX, e.offsetY);
    if (pick == null) return;

    if (!active) {
      for (const o of objects) {
        scene.remove(o.object);
        world.removeBody(o.body);
      }

      objects.length = 0;
      results.value = null;
    }

    active = true;
    add(pick.die, new Vec3(pick.object.position.x, 5, pick.object.position.z));
  });

  let active = false;
  function render() {
    canvas.style.cursor = picking ? 'pointer' : 'default';

    const axis = new Vector3(3, 1, -3).normalize();
    for (const picker of pickers) {
      if (picker == picking || picker.rotation % 50 != 0) {
        if (picker == picking)
          picker.rotation += 1;
        else if (picker.rotation > 45 || picker.rotation < 5)
          picker.rotation = 0;
        else if (picker.rotation < 25)
          picker.rotation -= 5;
        else
          picker.rotation += 5;

        picker.rotation %= 50;

        const q = new Quaternion().setFromAxisAngle(axis, picker.rotation * Math.PI / 25);
        q.multiply(picker.orientation);
        q.normalize();
        picker.object.quaternion.copy(q);
      } else {
        picker.object.quaternion.copy(picker.orientation);
      }

      picker.object.updateMatrix();
    }

    if (active) {
      world.step(1 / 60);

      for (const o of objects) {
        Die.update(o);
        if (Die.resolve(o)) {
          o.body.type = Body.STATIC;
        }
      }

      const done: [Body, Body][] = [];
      const bumps = world.contacts.map(c => [c.bi, c.bj]);
      const strength = Math.min(150, 40 * world.time);

      for (const [a, b] of bumps) {
        if (a == floor || b == floor) continue;
        if (done.some(c => a == c[0] && b == c[1] || b == c[0] && a == c[1])) continue;
        done.push([a, b]);

        if (walls.includes(a) || walls.includes(b)) {
          const [die, wall] = walls.includes(a) ? [b, a] : [a, b];
          const normal = wall.quaternion.vmult(Vec3.UNIT_Z);
          die.applyForce(normal.scale(strength));
        } else {
          const dir = a.position.vsub(b.position).unit();
          a.applyForce(dir.scale(strength / 2));
          b.applyForce(dir.scale(-strength / 2));
        }
      }

      active = objects.some(o => o.body.type != Body.STATIC);

      if (!active) {
        results.value = objects.map(o => o.die.results[o.die.model.faces.indexOf(Die.resolve(o)!)]);
      }
      // const results = objects.map(o => Die.resolve(o));
      // active = results.some(e => e == null);
    }

    // orbit.update();
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
