uniform float uTime;
uniform vec3 uColor;

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

struct GradientStop { float value; vec4 color; };

#define GRADIENT(result, N, VALUE, STOPS){                                \
  float _v = VALUE;                                                       \
  GradientStop _s[N] = GradientStop[N] STOPS;                             \
  int index = 0;                                                          \
  while (_v > _s[index + 1].value) index += 1;                            \
                                                                          \
  float v = ulerp(_s[index].value, _s[index + 1].value, _v);              \
  result = mix(_s[index].color, _s[index + 1].color, v);                  \
}

// white on black smoky pattern
vec4 design0() {
  float value = noise(mPosition * 2.4 + uTime * 0.2);

  vec4 c0 = vec4(uColor * 0.05, 1.0);
  vec4 c1 = vec4(uColor * 0.1, 1.0);
  vec4 c2 = vec4(uColor, 1.0);
  // vec4 c1 = vec4(mix(uColor, vec3(0.0, 0.0, 0.0), 0.2), 1.0);
  // vec4 c2 = vec4(mix(uColor, vec3(0.0, 0.0, 0.0), 1.0), 1.0);
  // vec4 c1 = vec4(mix(uColor, vec3(1.0, 1.0, 1.0), 0.1), 1.0);
  // vec4 c2 = vec4(mix(uColor, vec3(1.0, 1.0, 1.0), 0.2), 1.0);
  // vec4 c0 = vec4(vec3(0.0, 0.0, 0.0), 1.0);
  // vec4 c1 = vec4(vec3(0.0, 0.0, 0.0), 1.0);
  // vec4 c2 = vec4(vec3(0.0, 0.0, 0.0), 1.0);

  vec4 color;
  GRADIENT(color, 5, value, (
    GradientStop(0.0, c0),
    GradientStop(0.44, c1),
    GradientStop(0.5, c2),
    GradientStop(0.56, c1),
    GradientStop(1.0, c0)
  ));

  return color;
}

vec4 design1() {
  float value = noise(mPosition * 4.0 + uTime * 0.2);

  vec4 c1 = vec4(0.6, 0.6, 1.0, 1.0);
  vec4 c0 = vec4(c1.rgb, 0.0);

  vec4 color;
  GRADIENT(color, 3, value, (
    GradientStop(0.0, c0),
    GradientStop(0.6, c0),
    GradientStop(1.0, c1)
  ));

  return color;
}

vec4 design2() {
  float value = noise(mPosition * 4.0 + uTime * 0.2 + 200.0);

  vec4 c1 = vec4(0.6, 1.0, 0.6, 1.0);
  vec4 c0 = vec4(c1.rgb, 0.0);

  vec4 color;
  GRADIENT(color, 3, value, (
    GradientStop(0.0, c0),
    GradientStop(0.6, c0),
    GradientStop(1.0, c1)
  ));

  return color;
}

vec4 design3() {
  float value = noise(mPosition * 4.0 + uTime * 0.2 + 400.0);

  vec4 c1 = vec4(1.0, 0.6, 0.6, 1.0);
  vec4 c0 = vec4(c1.rgb, 0.0);

  vec4 color;
  GRADIENT(color, 3, value, (
    GradientStop(0.0, c0),
    GradientStop(0.6, c0),
    GradientStop(1.0, c1)
  ));

  return color;
}

vec4 overlay(vec4 base, vec4 overlay) {
  float alpha = overlay.a + base.a * (1.0 - overlay.a);
  vec3 color = (base.rgb * (1.0 - overlay.a) + overlay.rgb * overlay.a) / alpha;

  return vec4(color, alpha);
}

vec4 mfroColorMap() {
  vec4 a = design0();
  // vec4 b = design1();
  // vec4 c = design2();
  // vec4 d = design3();

  return a;
}
