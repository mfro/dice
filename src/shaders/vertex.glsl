varying vec3 mPosition;
varying vec3 wPosition;
varying vec3 wNormal;

void main()
{
  mPosition = position;
  wPosition = (modelMatrix * vec4(position, 1.0)).xyz;
  wNormal = (modelMatrix * vec4(normal, 0.0)).xyz;

  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_Position = projectionMatrix * mvPosition;
}
