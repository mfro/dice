const vec3 lightDir = normalize(vec3(2.0, 3.0, -1.0));
const vec3 lightColor = vec3(1.0, 1.0, 1.0);

varying vec3 mPosition;
varying vec3 wPosition;
varying vec3 wNormal;

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

vec3 gradient(float value, GradientStop stops[4]) {
  int index = 0;
  while (value > stops[index + 1].value) index += 1;

  float v = ulerp(stops[index].value, stops[index + 1].value, value);
  return mix(stops[index].color, stops[index + 1].color, v);
}

void main(void) {
  vec3 viewDir = normalize(cameraPosition - wPosition);
  vec3 reflectDir = reflect(-lightDir, normalize(wNormal));

  float value = noise(mPosition * 4.0);
  float split = 0.5;

  vec3 c0 = vec3(0.1, 0.1, 0.1);
  vec3 c1 = vec3(89.0, 60.0, 143.0) / 255.0;
  vec3 c2 = vec3(2.0, 128.0, 144.0) / 255.0;

  vec3 color = gradient(value, GradientStop[4] (
    GradientStop(0.0, c0),
    GradientStop(0.49, c1),
    GradientStop(0.51, c2),
    GradientStop(1.0, c0)
  ));

  vec3 white = vec3(1.0, 1.0, 1.0);

  vec3 ambient = color * 0.4;
  vec3 diffuse = color * 0.6 * max(0.0, dot(lightDir, normalize(wNormal)));
  vec3 specular = white * 0.6 * pow(max(0.0, dot(viewDir, reflectDir)), 32.0);

  gl_FragColor = vec4((ambient + diffuse + specular), 1.0);
}
