
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




void main(){
  float alpha = 1.;
  vec2 uv = (gl_FragCoord.xy - uResolution * .5) / uResolution.yy ;
  uv = vUv;


  vec3 color = vec3(uv.x, uv.y, uValueA);




 gl_FragColor = vec4(color, alpha)  ;

}
