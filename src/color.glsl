float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

float ulerp(float x0, float x1, float x) {
  return (x - x0) * (1.0 / (x1 - x0));
}

struct GradientStop { float value; vec3 color; };

vec3 gradient(float value, GradientStop stops[5]) {
  int index = 0;
  while (value > stops[index + 1].value) index += 1;

  float v = ulerp(stops[index].value, stops[index + 1].value, value);
  return mix(stops[index].color, stops[index + 1].color, v);
}

vec4 mfroColorMap() {
  float value = noise(mPosition * 2.4);

  vec3 c0 = vec3(0.0, 0.0, 0.0);
  vec3 c1 = vec3(0.3, 0.3, 0.3);
  vec3 c2 = vec3(0.4, 0.4, 0.4);

  vec3 color = gradient(value, GradientStop[5] (
    GradientStop(0.0, c0),
    GradientStop(0.44, c1),
    GradientStop(0.5, c2),
    GradientStop(0.56, c1),
    GradientStop(1.0, c0)
  ));

  return vec4(color, 1.0);
}
