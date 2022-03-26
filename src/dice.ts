import { assert } from '@mfro/ts-common/assert';
import { Vec3, Quaternion as Quat, ConvexPolyhedron, Shape, Body } from 'cannon-es';
import { BufferGeometry, Object3D, Vector2, BufferAttribute, SphereGeometry, Matrix4, Texture, CanvasTexture, MeshStandardMaterial, Matrix3, Vector3, Group, Mesh, ShaderMaterial, UniformsLib, MeshPhysicalMaterial, MixOperation, UniformsUtils, ShaderLib, Shader, Renderer, Material } from 'three';
import colorShader from './color.glsl';

type Random = () => number;

type GeometryFn = (rounding: number, edgeDetail: number) => BufferGeometry[];

export interface Vertex {
  point: Vec3;
  edges: Edge[];
  faces: Face[];
}

export interface Edge {
  vertices: [Vertex, Vertex];
  faces: [Face, Face];
}

export namespace Edge {
  export function otherVertex(e: Edge, v: Vertex) {
    return e.vertices[1] == v
      ? e.vertices[0]
      : e.vertices[1];
  }
}

export interface Face {
  vertices: Vertex[];
  edges: Edge[];
  normal: Vec3;
}

export interface Model {
  vertices: Vertex[];
  edges: Edge[];
  faces: Face[];
}

export interface DieCtor {
  (rounding: number, edgeDetail: number): Die;
}

export interface Die {
  model: Model;
  shape: Shape;
  texture: Texture;
  geometry: BufferGeometry[];
  results: number[];
}

export namespace Die {
  const materials = new Map<Die, MeshPhysicalMaterial>();
  const shaders = new WeakMap<Material, Shader[]>();

  function getMaterial(die: Die) {
    let material = materials.get(die);
    if (material) return material;

    material = new MeshPhysicalMaterial({
      map: die.texture,
      visible: true,
      roughness: 0.5,
      metalness: 0.1,
      reflectivity: 1,
    });

    material.onBeforeCompile = (shader, renderer) => {
      let list = shaders.get(material!);
      if (!list) shaders.set(material!, list = []);
      list.push(shader);

      shader.uniforms['uTime'] = { value: 0 };
      shader.uniforms['uColor'] = { value: new Vec3(0, 0, 0) };
      shader.vertexShader = 'varying vec3 mPosition;\n' + shader.vertexShader;
      shader.fragmentShader = 'varying vec3 mPosition;\n' + colorShader + shader.fragmentShader;

      shader.vertexShader = shader.vertexShader
        .replace('void main() {', `void main() {\n  mPosition = position;`);

      shader.fragmentShader = shader.fragmentShader
        .replace('#include <map_fragment>', 'vec4 texelColor = texture2D( map, vUv ); texelColor = mapTexelToLinear( texelColor ); vec4 mfroColor = mfroColorMap(); diffuseColor.a = texelColor.a + mfroColor.a * (1.0 - texelColor.a); diffuseColor.rgb = (mfroColor.rgb * (1.0 - texelColor.a) + texelColor.rgb * texelColor.a) / diffuseColor.a;');
    };

    materials.set(die, material);
    return material;
  }

  export function createObject(die: Die, color: Vec3) {
    const material = getMaterial(die);

    const object = new Group();
    object.add(...die.geometry.map(g => {
      const mesh = new Mesh(g, material);
      mesh.castShadow = true;
      return mesh;
    }));

    object.children[0].onBeforeRender = (renderer, scene, camera, geometry, material, group) => {
      const list = shaders.get(material);
      if (!list) return;

      const now = performance.now();
      for (const shader of list) {
        shader.uniforms['uTime'].value = now / 1000;
        shader.uniforms['uColor'].value = color;
      }
    };

    return object;
  }

  export function createBody(die: Die) {
    return new Body({
      mass: 1,
      shape: die.shape,
    });
  }

  export function create(die: Die, color: Vec3): DieObject {
    const body = createBody(die);
    const object = createObject(die, color);

    return { die, body, object };
  }

  export function initRoll(o: DieObject | Body, roll: DieRoll) {
    ('body' in o ? o.body : o).position = roll.position.clone();
    ('body' in o ? o.body : o).quaternion = roll.orientation.clone();
    ('body' in o ? o.body : o).velocity = roll.velocity.clone();
    ('body' in o ? o.body : o).angularVelocity = roll.angularVelocity.clone();
  }

  export function update(o: DieObject) {
    o.object.position.set(
      o.body.position.x,
      o.body.position.y,
      o.body.position.z,
    );

    o.object.quaternion.set(
      o.body.quaternion.x,
      o.body.quaternion.y,
      o.body.quaternion.z,
      o.body.quaternion.w,
    );
  }

  export function resolve(o: { body: Body, die: Die }) {
    let spin = o.body.angularVelocity.lengthSquared();
    let velocity = o.body.velocity.lengthSquared();
    let index = o.die.model.faces.findIndex(f => o.body.quaternion.vmult(f.normal).dot(Vec3.UNIT_Y) < -0.999);

    if ((o.body.type == Body.STATIC || spin < 0.0001 && velocity < 0.0001) && index != -1) {
      return o.die.results[index];
    } else {
      return null;
    }
  }
}

export interface DieRoll {
  position: Vec3;
  orientation: Quat;
  velocity: Vec3;
  angularVelocity: Vec3;
}

export interface DieObject {
  die: Die;
  object: Object3D;
  body: Body;
}

export function randomQuaternion(random: Random) {
  const u = random();
  const v = 2 * Math.PI * random();
  const w = 2 * Math.PI * random();

  return new Quat(
    Math.sqrt(1 - u) * Math.sin(v),
    Math.sqrt(1 - u) * Math.cos(v),
    Math.sqrt(u) * Math.sin(w),
    Math.sqrt(u) * Math.cos(w),
  );
}

function defineDieGeometry(m: Model): GeometryFn {
  return (rounding, edgeDetail) => {
    function angleCCW(p1: Vec3, p2: Vec3, origin: Vec3, normal: Vec3) {
      const v1 = p1.vsub(origin);
      const v2 = p2.vsub(origin);
      const cosine = Math.min(1, Math.max(-1, v1.dot(v2) / v1.length() / v2.length()));
      const theta = Math.acos(cosine);
      const cross = v1.cross(v2).dot(normal);

      if (cross >= 0) {
        return theta;
      } else {
        return Math.PI * 2 - theta;
      }
    }

    function sortCCW(points: Vec3[], normal: Vec3) {
      const center = new Vec3();
      for (const v of points) center.vadd(v, center);
      center.scale(1 / points.length, center);

      const ref = points[0];
      return points.slice().sort((a, b) => {
        return angleCCW(ref, a, center, normal) - angleCCW(ref, b, center, normal);
      });
    }

    const allFaces: [Vec3, Vec3, Vector2][][] = [];

    const vertexCenters = m.vertices.map(v => {
      const A = new Matrix3().set(
        v.faces[0].normal.x, v.faces[0].normal.y, v.faces[0].normal.z,
        v.faces[1].normal.x, v.faces[1].normal.y, v.faces[1].normal.z,
        v.faces[2].normal.x, v.faces[2].normal.y, v.faces[2].normal.z,
      );

      A.invert();

      const B = new Vector3(-rounding, -rounding, -rounding);
      const x = B.applyMatrix3(A);
      const y = new Vec3(x.x, x.y, x.z);

      assert(v.faces.every(f => Math.abs(f.normal.dot(y) + rounding) < 1e-6), 'rounding');

      return v.point.vadd(y);
    });

    for (const edge of m.edges) {
      const o1 = vertexCenters[m.vertices.indexOf(edge.vertices[0])];
      const o2 = vertexCenters[m.vertices.indexOf(edge.vertices[1])];

      const q1 = new Quat().setFromVectors(edge.faces[0].normal, edge.faces[0].normal);
      const q2 = new Quat().setFromVectors(edge.faces[0].normal, edge.faces[1].normal);
      const q = new Quat();

      const a = q1.vmult(Vec3.UNIT_X);
      const b = q2.vmult(Vec3.UNIT_X);

      const width = Math.acos(a.dot(b)) * rounding / edgeDetail;
      const height = o1.vsub(o2).length();

      for (let i = 0; i < edgeDetail; ++i) {
        q1.slerp(q2, i / edgeDetail, q);
        const v11 = o1.vadd(q.vmult(edge.faces[0].normal.scale(rounding)));
        const v21 = o2.vadd(q.vmult(edge.faces[0].normal.scale(rounding)));
        const normal1 = q.vmult(edge.faces[0].normal);

        q1.slerp(q2, (i + 1) / edgeDetail, q);
        const v12 = o1.vadd(q.vmult(edge.faces[0].normal.scale(rounding)));
        const v22 = o2.vadd(q.vmult(edge.faces[0].normal.scale(rounding)));
        const normal2 = q.vmult(edge.faces[0].normal);

        q1.slerp(q2, (i + 0.5) / edgeDetail, q);
        const normal = q.vmult(edge.faces[0].normal);

        const points = [v11, v21, v22, v12];
        const normals = [normal1, normal1, normal2, normal2];

        const test = v21.vsub(v11).cross(v12.vsub(v11));
        if (test.dot(normal) < 0) {
          points.reverse();
          normals.reverse();
        }

        allFaces.push(points.map((p, i) => [p, normals[i], new Vector2]));
      }
    }

    for (let i = 0; i < m.faces.length; ++i) {
      const inset = m.faces[i].vertices.map(v => vertexCenters[m.vertices.indexOf(v)].vadd(m.faces[i].normal.scale(rounding)));
      const ccw = sortCCW(inset, m.faces[i].normal);

      const center = new Vec3();
      for (const v of ccw) center.vadd(v, center);
      center.scale(1 / ccw.length, center);

      const u0 = ccw[1].vsub(center).unit();
      const u1 = u0.cross(m.faces[i].normal);

      const offsets = ccw.map(c => {
        const diff = c.vsub(center);
        const x = diff.dot(u1);
        const y = diff.dot(u0);

        return [c, new Vector2(x, y)] as [Vec3, Vector2];
      });

      const min = offsets.reduce((min, v) => new Vector2(Math.min(min.x, v[1].x), Math.min(min.y, v[1].y)), new Vector2);
      const max = offsets.reduce((max, v) => new Vector2(Math.max(max.x, v[1].x), Math.max(max.y, v[1].y)), new Vector2);

      const range = Math.max(-min.x, -min.y, max.x, max.y);

      for (const o of offsets) {
        o[1].multiplyScalar(1 / range);
        o[1].x = (o[1].x / 2 + 0.5 + i) / m.faces.length;
        o[1].y = o[1].y / 2 + 0.5;
      }

      allFaces.push(offsets.map(v => [v[0], m.faces[i].normal, v[1]]));
    }

    const threeTextures: number[] = [];
    const threeVertices: number[] = [];
    const threeNormals: number[] = [];
    const threeFaces: number[] = [];

    for (let i = 0; i < allFaces.length; ++i) {
      const i0 = threeVertices.length / 3;

      for (const [v, n, uv] of allFaces[i]) {
        threeVertices.push(v.x, v.y, v.z);
        threeTextures.push(uv.x, uv.y);
        threeNormals.push(n.x, n.y, n.z);
      }

      threeFaces.push(i0, i0 + 1, i0 + 2);
      if (allFaces[i].length >= 4) threeFaces.push(i0 + 2, i0 + 3, i0 + 0);
      if (allFaces[i].length >= 5) threeFaces.push(i0 + 3, i0 + 4, i0 + 0);
    }

    const geometries: BufferGeometry[] = [];

    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(threeVertices), 3));
    geometry.setAttribute('normal', new BufferAttribute(new Float32Array(threeNormals), 3));
    geometry.setAttribute('uv', new BufferAttribute(new Float32Array(threeTextures), 2));
    geometry.setIndex(threeFaces);

    geometries.push(geometry);

    for (const v of vertexCenters) {
      const sphere = new SphereGeometry(rounding);
      sphere.translate(v.x, v.y, v.z);
      const matrix = new Matrix4();
      matrix.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      sphere.attributes.uv.applyMatrix4(matrix);
      geometries.push(sphere);
    }

    return geometries;
  };
}

function defineDieShape(m: Model): Shape {
  return new ConvexPolyhedron({
    vertices: m.vertices.map(v => v.point),
    normals: m.faces.map(f => f.normal),
    faces: m.faces.map(f => f.vertices.map(v => m.vertices.indexOf(v))),
  });
}

function defineDieModel(numFaces: number, fn: (scale: number) => [Vec3[], ...number[]]): Model {
  const [points, ...edgeLengths] = fn(1);

  const vertices: Vertex[] = [];
  const edges: Edge[] = [];
  const faces: Face[] = [];

  for (let i1 = 0; i1 < points.length; ++i1) {
    const v1: Vertex = {
      point: points[i1],
      edges: [],
      faces: [],
    };

    vertices.push(v1);

    for (let i2 = 0; i2 < i1; ++i2) {
      const v2 = vertices[i2];

      const distance = v1.point.vsub(v2.point);
      if (edgeLengths.some(l => Math.abs(l - distance.length()) < 1e-6)) {
        const edge: Edge = {
          vertices: [v1, v2],
          faces: [] as any
        };

        v1.edges.push(edge);
        v2.edges.push(edge);
        edges.push(edge);
      }
    }
  }

  function findFaces(target: Vertex, origin: Vertex, maxDepth: number) {
    const cycles = [];
    const queue = [
      [origin, []] as [Vertex, Edge[]],
    ];

    while (queue.length > 0) {
      const [node, path] = queue.pop()!;

      for (const edge of node.edges) {
        const next = Edge.otherVertex(edge, node);
        if (path.includes(edge)) continue;

        if (next == target) {
          cycles.push([...path, edge]);
        } else if (path.length + 1 < maxDepth) {
          queue.push([next, [...path, edge]]);
        }
      }
    }

    return cycles;
  }

  const edgesPerFace = 2 * edges.length / numFaces;

  const allFaces = [];
  for (const v of vertices) {
    allFaces.push(...findFaces(v, v, edgesPerFace));
  }

  for (const faceEdges of allFaces) {
    const set = new Set<Vertex>();
    for (const e of faceEdges) for (const p of e.vertices) set.add(p);
    const faceVertices = [...set];

    const normal = (faceVertices[1].point.vsub(faceVertices[0].point)).cross(faceVertices[2].point.vsub(faceVertices[0].point)).unit();
    if (faces.find(f => f.normal.almostEquals(normal))) continue;

    const center = new Vec3();
    for (const v of faceVertices) center.vadd(v.point, center);
    center.scale(1 / faceVertices.length, center);

    if (center.dot(normal) < 0) continue;

    const face = {
      normal,
      edges: faceEdges,
      vertices: faceVertices,
    };

    for (const v of faceVertices) v.faces.push(face);
    for (const e of faceEdges) e.faces.push(face);
    faces.push(face);
  }

  assert(edges.every(e => e.faces.length == 2), 'valid die');
  return { vertices, edges, faces };
}

function defineDieTexture(m: Model, fn: (ctx: CanvasRenderingContext2D, face: (text: string, face: number, rotation: number, offset: number) => void) => void): () => Texture {
  return () => {
    const canvas = document.createElement('canvas');
    canvas.width = m.faces.length * 512;
    canvas.height = 512;

    const context = canvas.getContext('2d');
    assert(context != null, 'context');

    // context.fillStyle = '#333';
    // context.fillRect(0, 0, m.faces.length * 512, 512);
    context.clearRect(0, 0, m.faces.length * 512, 512);

    context.fillStyle = '#eee';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    fn(context, (text, face, rotation, offset) => {
      context.translate(256 + 512 * face, 256);
      context.rotate(rotation * Math.PI);
      context.translate(0, offset);
      context.fillText(text, 0, 0);
      context.resetTransform();
    });

    const texture = new CanvasTexture(canvas);
    return texture;
  };
}

function defineDie(model: Model, shape: Shape, textureFn: () => Texture, geometryFn: GeometryFn, results: number[]) {
  return (rounding: number, edgeDetail: number): Die => {
    const texture = textureFn();
    const geometry = geometryFn(rounding, edgeDetail);

    return { model, shape, texture, geometry, results };
  };
}

export const d4Model = defineDieModel(4, scale => {
  const edge = scale * 20 / 16;

  const q2 = new Quat().setFromAxisAngle(Vec3.UNIT_Z, -Math.acos(-1 / 3));
  const q3 = new Quat().setFromAxisAngle(Vec3.UNIT_Y, Math.PI * 2 / 3).mult(q2);
  const q4 = new Quat().setFromAxisAngle(Vec3.UNIT_Y, -Math.PI * 2 / 3).mult(q2);

  const leg = Vec3.UNIT_Y.scale(edge * Math.sqrt(6) / 4);

  const points = [
    leg,
    q2.vmult(leg),
    q3.vmult(leg),
    q4.vmult(leg),
  ];

  return [points, edge];
});

export const d4Shape = defineDieShape(d4Model);

export const d4Texture = defineDieTexture(d4Model, (ctx, face) => {
  ctx.font = 'bold 130px Roboto';

  face('1', 0, 0, -125);
  face('2', 0, 2 / 3, -125);
  face('3', 0, 4 / 3, -125);

  face('1', 1, 0, -125);
  face('4', 1, 4 / 3, -125);
  face('3', 1, 2 / 3, -125);

  face('1', 2, 0, -125);
  face('4', 2, 2 / 3, -125);
  face('2', 2, 4 / 3, -125);

  face('4', 3, 0, -125);
  face('2', 3, 4 / 3, -125);
  face('3', 3, 2 / 3, -125);
});

export const d4Geometry = defineDieGeometry(d4Model);

export const d4Results = [4, 2, 3, 1];

export const d4 = defineDie(d4Model, d4Shape, d4Texture, d4Geometry, d4Results);

export const d6Model = defineDieModel(6, scale => {
  const edge = scale;

  const points = [];
  for (let i = 0; i < 8; ++i) {
    points.push(new Vec3(
      (i & 0b001) ? edge / 2 : -edge / 2,
      (i & 0b010) ? edge / 2 : -edge / 2,
      (i & 0b100) ? edge / 2 : -edge / 2,
    ));
  }

  return [points, edge];
});

export const d6Shape = defineDieShape(d6Model);

export const d6Texture = defineDieTexture(d6Model, (ctx, face) => {
  ctx.font = 'bold 240px Roboto';

  face('1', 0, 3 / 4, 20);
  face('2', 2, 1 / 4, 20);
  face('3', 1, 7 / 4, 20);

  face('4', 3, 1 / 4, 20);
  face('5', 5, 7 / 4, 20);
  face('6', 4, 1 / 4, 20);
});

export const d6Geometry = defineDieGeometry(d6Model);

export const d6Results = [6, 4, 5, 3, 1, 2];

export const d6 = defineDie(d6Model, d6Shape, d6Texture, d6Geometry, d6Results);

export const d8Model = defineDieModel(8, scale => {
  const edge = scale * 18.5 / 16;

  const x = edge / Math.SQRT2;
  const points = [
    new Vec3(+x, 0, 0),
    new Vec3(-x, 0, 0),
    new Vec3(0, +x, 0),
    new Vec3(0, -x, 0),
    new Vec3(0, 0, +x),
    new Vec3(0, 0, -x),
  ];

  return [points, edge];
});

export const d8Shape = defineDieShape(d8Model);

export const d8Texture = defineDieTexture(d8Model, (ctx, face) => {
  ctx.font = 'bold 200px Roboto';

  face('1', 0, 4 / 3, 0);
  face('2', 1, 4 / 3, 0);
  face('3', 2, 2 / 3, 0);
  face('4', 3, 2 / 3, 0);

  face('5', 5, 4 / 3, 0);
  face('6', 4, 4 / 3, 0);
  face('7', 6, 2 / 3, 0);
  face('8', 7, 2 / 3, 0);
});

export const d8Geometry = defineDieGeometry(d8Model);

export const d8Results = [8, 7, 6, 5, 3, 4, 2, 1];

export const d8 = defineDie(d8Model, d8Shape, d8Texture, d8Geometry, d8Results);

export const d10Model = defineDieModel(10, scale => {
  const edge1 = scale;

  const theta = Math.PI * 2 / 5;
  const a1 = Math.PI * .27;

  const r1 = Math.sin(a1) * edge1;
  const h1 = Math.cos(a1) * edge1;

  const r2 = Math.cos(theta / 2) * r1;
  const a2 = Math.atan(r2 / h1);
  const a3 = Math.PI - a1 - a2;

  const lawOfSines = edge1 / Math.sin(a2);
  const height = lawOfSines * Math.sin(a3);

  const legLength = Math.sqrt(height * height / 4 + edge1 * edge1 - height * edge1 * Math.cos(a1));
  const legAngle1 = Math.asin(edge1 * Math.sin(a1) / legLength);
  const legAngle2 = Math.PI / 2 - legAngle1;

  const q1 = new Quat().setFromAxisAngle(Vec3.UNIT_Y, theta);
  const q2 = new Quat().setFromAxisAngle(Vec3.UNIT_Z, legAngle2);

  const tall = Vec3.UNIT_Y.scale(height / 2);
  const leg = Vec3.UNIT_X.scale(legLength);

  const points = [
    tall,
    q2.vmult(leg),
    q1.vmult(q2.vmult(leg)),
    q1.vmult(q1.vmult(q2.vmult(leg))),
    q1.vmult(q1.vmult(q1.vmult(q2.vmult(leg)))),
    q1.vmult(q1.vmult(q1.vmult(q1.vmult(q2.vmult(leg))))),
    tall.negate(),
    q2.vmult(leg.negate()),
    q1.vmult(q2.vmult(leg.negate())),
    q1.vmult(q1.vmult(q2.vmult(leg.negate()))),
    q1.vmult(q1.vmult(q1.vmult(q2.vmult(leg.negate())))),
    q1.vmult(q1.vmult(q1.vmult(q1.vmult(q2.vmult(leg.negate()))))),
  ];

  return [points, points[1].vsub(points[0]).length(), points[7].vsub(points[3]).length()];
});

export const d10Shape = defineDieShape(d10Model);

export const d10Texture = defineDieTexture(d10Model, (ctx, face) => {
  ctx.font = 'bold 160px Roboto';

  face('1', 0, 0, 0);
  face('2', 8, 1, 0);
  face('3', 4, 0, 0);
  face('4', 5, 1, 0);
  face('5', 2, 0, 0);

  face('6', 9, 1, 0);
  face('7', 1, 0, 0);
  face('8', 7, 1, 0);
  face('9', 3, 0, 0);
  face('10', 6, 1, 0);
});

export const d10Geometry = defineDieGeometry(d10Model);

export const d10Results = [10, 4, 6, 2, 8, 7, 1, 3, 9, 5];

export const d10 = defineDie(d10Model, d10Shape, d10Texture, d10Geometry, d10Results);

export const d12Model = defineDieModel(12, scale => {
  const edge = scale * 0.5;
  const phi = (1 + Math.sqrt(5)) / 2;

  const points = [
    new Vec3(1, 1, 1),
    new Vec3(-1, 1, 1),
    new Vec3(1, -1, 1),
    new Vec3(1, 1, -1),
    new Vec3(-1, -1, 1),
    new Vec3(1, -1, -1),
    new Vec3(-1, 1, -1),
    new Vec3(-1, -1, -1),

    new Vec3(0, phi, 1 / phi),
    new Vec3(0, -phi, 1 / phi),
    new Vec3(0, phi, -1 / phi),
    new Vec3(0, -phi, -1 / phi),

    new Vec3(1 / phi, 0, phi),
    new Vec3(1 / phi, 0, -phi),
    new Vec3(-1 / phi, 0, phi),
    new Vec3(-1 / phi, 0, -phi),

    new Vec3(phi, 1 / phi, 0),
    new Vec3(-phi, 1 / phi, 0),
    new Vec3(phi, -1 / phi, 0),
    new Vec3(-phi, -1 / phi, 0),
  ];

  for (const point of points) point.scale(edge * phi / 2, point);

  return [points, edge];
});

export const d12Shape = defineDieShape(d12Model);

export const d12Geometry = defineDieGeometry(d12Model);

export const d12Texture = defineDieTexture(d12Model, (ctx, face) => {
  ctx.font = 'bold 240px Roboto';

  face('1', 0, 0, 20);
  face('2', 2, 8 / 5, 20);
  face('3', 1, 2 / 5, 20);
  face('4', 7, 0, 20);
  face('5', 6, 6 / 5, 20);
  face('6', 5, 6 / 5, 20);

  face('7', 3, 8 / 5, 20);
  face('8', 8, 8 / 5, 20);
  face('9', 4, 4 / 5, 20);
  face('10', 10, 4 / 5, 20);
  face('11', 9, 8 / 5, 20);
  face('12', 11, 6 / 5, 20);
});

export const d12Results = [12, 10, 11, 6, 4, 7, 8, 9, 5, 2, 3, 1];

export const d12 = defineDie(d12Model, d12Shape, d12Texture, d12Geometry, d12Results);

export const d20Model = defineDieModel(20, scale => {
  const edge = scale * 0.8;
  const phi = (1 + Math.sqrt(5)) / 2;

  const points = [
    new Vec3(0, 1, phi),
    new Vec3(0, -1, phi),
    new Vec3(0, 1, -phi),
    new Vec3(0, -1, -phi),

    new Vec3(1, phi, 0),
    new Vec3(-1, phi, 0),
    new Vec3(1, -phi, 0),
    new Vec3(-1, -phi, 0),

    new Vec3(phi, 0, 1),
    new Vec3(phi, 0, -1),
    new Vec3(-phi, 0, 1),
    new Vec3(-phi, 0, -1),
  ];

  for (const point of points) point.scale(edge / 2, point);

  return [points, 20, edge];
});

export const d20Shape = defineDieShape(d20Model);

export const d20Geometry = defineDieGeometry(d20Model);

export const d20Texture = defineDieTexture(d20Model, (ctx, face) => {
  ctx.font = 'bold 180px Roboto';

  face('1', 0, 0, 35);
  face('2', 12, 0, 35);
  face('3', 1, 2 / 3, 35);
  face('4', 13, 2 / 3, 35);
  face('5', 10, 0, 35);
  face('6', 7, 0, 35);
  face('7', 2, 4 / 3, 35);
  face('8', 18, 2 / 3, 35);
  face('9', 6, 2 / 3, 35);
  face('10', 16, 0, 35);

  face('11', 19, 0, 35);
  face('12', 9, 4 / 3, 35);
  face('13', 17, 4 / 3, 35);
  face('14', 14, 2 / 3, 35);
  face('15', 11, 0, 35);
  face('16', 5, 0, 35);
  face('17', 3, 4 / 3, 35);
  face('18', 8, 2 / 3, 35);
  face('19', 4, 2 / 3, 35);
  face('20', 15, 0, 35);
});

export const d20Results = [20, 18, 14, 4, 2, 5, 12, 15, 3, 9, 16, 6, 19, 17, 7, 1, 11, 8, 13, 10];

export const d20 = defineDie(d20Model, d20Shape, d20Texture, d20Geometry, d20Results);
