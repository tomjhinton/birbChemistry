
import * as Tone from 'tone'
import { gsap } from 'gsap'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import './style.scss'

import vertexShader from './shaders/vertex.glsl'
import liquid1Frag from './shaders/liquid1Frag.glsl'
import liquid2Frag from './shaders/liquid2Frag.glsl'
import liquid3Frag from './shaders/liquid3Frag.glsl'
import liquid4Frag from './shaders/liquid4Frag.glsl'
import beaker from './shaders/beaker.glsl'




/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
const textureLoader = new THREE.TextureLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()

/**
 * Base
 */
// Debug

const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// import vertexShader from './shaders/vertex.glsl'
// import fragmentShader from './shaders/fragment.glsl'

/**
 * Update all materials
 */
const updateAllMaterials = () =>
{
    scene.traverse((child) =>
    {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            // child.material.envMap = environmentMap
            child.material.envMapIntensity = debugObject.envMapIntensity
            child.material.needsUpdate = true
            child.castShadow = true
            child.receiveShadow = true
        }
    })
}

let titular = document.getElementById('titular')


titular.addEventListener('click', function (e) {
  text.material = flameMaterial
});
/**
 * Models
 */
let raphMixer = null

const roomTexture = textureLoader.load('baked2.jpg')
roomTexture.flipY = false
roomTexture.encoding = THREE.sRGBEncoding

const bakedMaterial = new THREE.MeshBasicMaterial({ map: roomTexture,
  side: THREE.DoubleSide})

let room, button1, flame1, beaker1, liquid1, button2,  flame2,  beaker2,  liquid2, button3, flame3, beaker3, liquid3, button4, flame4, beaker4, liquid4, text, intersectsArr


let flameMaterial = new THREE.MeshBasicMaterial({ color: 'red', name: 'flame'})

let invMaterial = new THREE.MeshBasicMaterial({ transparent: true,
opacity: 0})


let  beakerMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: beaker,
  transparent: true,
  depthWrite: false,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: {
      value: 0
    },
    uResolution: { type: 'v2', value: new THREE.Vector2() }

  }
})


let  liquid1Mat = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: liquid1Frag,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: {
      value: 0
    },  uValueA: {
      value: 0
    },
    uValueB: {
      value: 0
    },
    uValueC: {
      value: 0
    },
    uValueD: {
      value: 0
    },
    uResolution: { type: 'v2', value: new THREE.Vector2() }

  }
})

let  liquid2Mat = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: liquid2Frag,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: {
      value: 0
    }, uValueA: {
      value: 0
    },
    uValueB: {
      value: 0
    },
    uValueC: {
      value: 0
    },
    uValueD: {
      value: 0
    },

    uResolution: { type: 'v2', value: new THREE.Vector2() }

  }
})

let  liquid3Mat = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: liquid3Frag,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: {
      value: 0
    }, uValueA: {
      value: 0
    },
    uValueB: {
      value: 0
    },
    uValueC: {
      value: 0
    },
    uValueD: {
      value: 0
    },
    uResolution: { type: 'v2', value: new THREE.Vector2() }

  }
})

let  liquid4Mat = new THREE.ShaderMaterial({
  vertexShader: vertexShader,
  fragmentShader: liquid4Frag,
  transparent: true,
  depthWrite: true,
  clipShadows: true,
  wireframe: false,
  side: THREE.DoubleSide,
  uniforms: {
    uTime: {
      value: 0
    }, uValueA: {
      value: 0
    },
    uValueB: {
      value: 0
    },
    uValueC: {
      value: 0
    },
    uValueD: {
      value: 0
    },
    uResolution: { type: 'v2', value: new THREE.Vector2() }

  }
})

let materials = [liquid1Mat, liquid2Mat, liquid3Mat, liquid4Mat]


gltfLoader.load(
    'chemistry.glb',
    (gltf) =>
    {
        // Model
        //gltf.scene.scale.set(0.02, 0.02, 0.02)
        scene.add(gltf.scene)

        // Animation
        raphMixer = new THREE.AnimationMixer(gltf.scene)
        const raphAction = raphMixer.clipAction(gltf.animations[0])
        raphAction.play()



        // Update materials
        updateAllMaterials()

        room = gltf.scene.children.find((child) => {
    return child.name === 'room'
  })
    room.material = bakedMaterial


    button1 = gltf.scene.children.find((child) => {
      return child.name === 'button1'
    })
    button1.material = bakedMaterial

    button2 = gltf.scene.children.find((child) => {
      return child.name === 'button2'
    })
    button2.material = bakedMaterial

    button3 = gltf.scene.children.find((child) => {
      return child.name === 'button3'
    })
    button3.material = bakedMaterial

    button4 = gltf.scene.children.find((child) => {
      return child.name === 'button4'
    })
    button4.material = bakedMaterial

    flame1 = gltf.scene.children.find((child) => {
      return child.name === 'flame1'
    })
    flame1.material = invMaterial

    flame2 = gltf.scene.children.find((child) => {
      return child.name === 'flame2'
    })
    flame2.material = invMaterial

    flame3 = gltf.scene.children.find((child) => {
      return child.name === 'flame3'
    })
    flame3.material = invMaterial

    flame4 = gltf.scene.children.find((child) => {
      return child.name === 'flame4'
    })
    flame4.material = invMaterial

    text = gltf.scene.children.find((child) => {
      return child.name === 'Text'
    })
    text.material = invMaterial

    beaker1 = gltf.scene.children.find((child) => {
      return child.name === 'beaker1'
    })
    beaker1.material = beakerMaterial

    beaker2 = gltf.scene.children.find((child) => {
      return child.name === 'beaker2'
    })
    beaker2.material = beakerMaterial

    beaker3 = gltf.scene.children.find((child) => {
      return child.name === 'beaker3'
    })
    beaker3.material = beakerMaterial

    beaker4 = gltf.scene.children.find((child) => {
      return child.name === 'beaker4'
    })
    beaker4.material = beakerMaterial


    liquid1 = gltf.scene.children.find((child) => {
      return child.name === 'liquid1'
    })
    liquid1.material = liquid1Mat

    liquid2 = gltf.scene.children.find((child) => {
      return child.name === 'liquid2'
    })
    liquid2.material = liquid2Mat

    liquid3 = gltf.scene.children.find((child) => {
      return child.name === 'liquid3'
    })
    liquid3.material = liquid3Mat

    liquid4 = gltf.scene.children.find((child) => {
      return child.name === 'liquid4'
    })
    liquid4.material = liquid4Mat


     intersectsArr = [button1, button2, button3, button4]
  }
)


/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 4)
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 15
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(3.5, 2, - 1.25)
scene.add(directionalLight)

// /**

const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );
 // * Sizes
 // */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.set(6, 4, 8)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
//controls.enableZoom = false;
controls.maxPolarAngle = Math.PI / 2 - 0.1



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.CineonToneMapping
renderer.toneMappingExposure = 1.75
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setClearColor('#211d20')
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))



const raycaster = new THREE.Raycaster()
raycaster.layers.set(0);
const mouse = new THREE.Vector2()



renderer.domElement.addEventListener( 'pointerdown', onClick, false )

let button1Move = false
let button2Move = false
let button3Move = false
let button4Move = false


function button1Still(){
 button1Move = false

}
function button2Still(){
 button2Move = false
}
function button3Still(){
 button3Move = false
}
function button4Still(){
 button4Move = false
}

function reset1(){
  gsap.to(button1.position, { duration: .5, z: button1.position.z + 0.03, delay: 0, onComplete: button1Still  })

}

function reset2(){
  gsap.to(button2.position, { duration: .5, z: button2.position.z + 0.03, delay: 0, onComplete: button2Still  })

}

function reset3(){
  gsap.to(button3.position, { duration: .5, z: button3.position.z + 0.03, delay: 0, onComplete: button3Still  })

}

function reset4(){
  gsap.to(button4.position, { duration: .5, z: button4.position.z + 0.03, delay: 0, onComplete: button4Still  })

}





function onClick() {

  event.preventDefault()
  // console.log(mouse.x)
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1
  // console.log(mouse.x)
  raycaster.setFromCamera( mouse, camera )

  var intersects = raycaster.intersectObjects( intersectsArr, true )

  if ( intersects.length > 0 ) {

    if(intersects[0].object.name === 'button1'){

      if(!button1Move ){
        if(flame1.material === invMaterial ){
          flame1.material = flameMaterial
            gsap.to(liquid1Mat.uniforms.uValueA, { duration: 1., value: 1, delay: 0   })

              gsap.to(liquid1Mat.uniforms.uValueB, { duration: 1., value: 1, delay: 0   })

                gsap.to(liquid1Mat.uniforms.uValueC, { duration: 1., value: 1, delay: 0   })
        }

        else if(flame1.material === flameMaterial ){
          flame1.material = invMaterial
          gsap.to(liquid1Mat.uniforms.uValueA, { duration: 1., value: 0, delay: 0   })

            gsap.to(liquid1Mat.uniforms.uValueB, { duration: 1., value: 0, delay: 0   })

              gsap.to(liquid1Mat.uniforms.uValueC, { duration: 1., value: 0, delay: 0   })
        }
        button1Move = true
    gsap.to(button1.position, { duration: .5, z: button1.position.z - 0.03, delay: 0  , onComplete: reset1  })


  }





    }

    if(intersects[0].object.name === 'button2'){
      if(!button2Move ){
        if(flame2.material === invMaterial ){
          flame2.material = flameMaterial
            gsap.to(liquid2Mat.uniforms.uValueA, { duration: 1., value: 1, delay: 0   })

              gsap.to(liquid2Mat.uniforms.uValueB, { duration: 1., value: 1, delay: 0   })

                gsap.to(liquid2Mat.uniforms.uValueC, { duration: 1., value: 1, delay: 0   })
        }

        else if(flame2.material === flameMaterial ){
          flame2.material = invMaterial
          gsap.to(liquid2Mat.uniforms.uValueA, { duration: 1., value: 0, delay: 0   })

            gsap.to(liquid2Mat.uniforms.uValueB, { duration: 1., value: 0, delay: 0   })

              gsap.to(liquid2Mat.uniforms.uValueC, { duration: 1., value: 0, delay: 0   })
        }
        button2Move = true
    gsap.to(button2.position, { duration: .5, z: button1.position.z - 0.03, delay: 0  , onComplete: reset2  })


  }



    }

    if(intersects[0].object.name === 'button3'){
      if(!button3Move ){
        if(flame3.material === invMaterial ){
          flame3.material = flameMaterial
            gsap.to(liquid3Mat.uniforms.uValueA, { duration: 1., value: 1, delay: 0   })

              gsap.to(liquid3Mat.uniforms.uValueB, { duration: 1., value: 1, delay: 0   })

                gsap.to(liquid3Mat.uniforms.uValueC, { duration: 1., value: 1, delay: 0   })
        }

        else if(flame3.material === flameMaterial ){
          flame3.material = invMaterial
          gsap.to(liquid3Mat.uniforms.uValueA, { duration: 1., value: 0, delay: 0   })

            gsap.to(liquid3Mat.uniforms.uValueB, { duration: 1., value: 0, delay: 0   })

              gsap.to(liquid3Mat.uniforms.uValueC, { duration: 1., value: 0, delay: 0   })
        }
        button3Move = true
    gsap.to(button3.position, { duration: .5, z: button3.position.z - 0.03, delay: 0  , onComplete: reset3  })


  }



    }

    if(intersects[0].object.name === 'button4'){
      if(!button4Move ){
        if(flame4.material === invMaterial ){
          flame4.material = flameMaterial
            gsap.to(liquid4Mat.uniforms.uValueA, { duration: 1., value: 1, delay: 0   })

              gsap.to(liquid4Mat.uniforms.uValueB, { duration: 1., value: 1, delay: 0   })

                gsap.to(liquid4Mat.uniforms.uValueC, { duration: 1., value: 1, delay: 0   })
        }

        else if(flame4.material === flameMaterial ){
          flame4.material = invMaterial
          gsap.to(liquid4Mat.uniforms.uValueA, { duration: 1., value: 0, delay: 0   })

            gsap.to(liquid4Mat.uniforms.uValueB, { duration: 1., value: 0, delay: 0   })

              gsap.to(liquid4Mat.uniforms.uValueC, { duration: 1., value: 0, delay: 0   })
        }
        button4Move = true
    gsap.to(button4.position, { duration: .5, z: button1.position.z - 0.03, delay: 0  , onComplete: reset4  })


  }



    }

  }


}

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()



    if(raphMixer)
    {
        raphMixer.update(deltaTime)
    }



    if(liquid1Mat.uniforms.uResolution.value.x === 0 && liquid1Mat.uniforms.uResolution.value.y === 0 ){

      materials.map(x=> {
        x.uniforms.uResolution.value.x = renderer.domElement.width
        x.uniforms.uResolution.value.y = renderer.domElement.height

      })

  }
  //
  //
  //
  //
  materials.map(x=> {
    x.uniforms.uTime.value = elapsedTime


  })
  // shaderMaterial.uniforms.u_time.value = elapsedTime

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
