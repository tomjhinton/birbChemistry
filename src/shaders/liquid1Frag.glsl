
const float PI = 3.1415926535897932384626433832795;
const float TAU = PI * 2.;

uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform sampler2D uTexture2;

uniform float uValueA;
uniform float uValueB;
uniform float uValueC;
uniform float uValueD;

varying vec2 vUv;
varying float vTime;

void coswarp(inout vec3 trip, float warpsScale ){

  float t = vTime +length(vUv) + sin(vUv.x * 20.);

  trip.xyz += warpsScale * .1 * cos(3. * trip.yzx + (t * .25));
  trip.xyz += warpsScale * .05 * cos(11. * trip.yzx + (t * .25));
  trip.xyz += warpsScale * .025 * cos(17. * trip.yzx + (t * .25));

}



void main(){
  float alpha = 1.;
  vec2 uv = (gl_FragCoord.xy - uResolution * .5) / uResolution.yy ;
  uv = vUv;


  vec3 color = vec3(uv.x, uv.y, uValueA);

  coswarp(color, uValueB * 3.);



 gl_FragColor = vec4(color, alpha)  ;

}
