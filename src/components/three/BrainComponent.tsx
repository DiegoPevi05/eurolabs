// @ts-nocheck
import {OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber"
import  { data} from "./data";
import * as THREE from "three";
import { Tubes } from "./BrainTubes";
import { shaderMaterial } from "@react-three/drei";
import {extend} from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const PATHS = data.biology[0].paths;

const randomRange = (min:number,max:number) => Math.random()* (max-min) + min;
//curves
let curves:any[] = [];

for(let i= 0; i<100; i++){
	let points = [];
	let length = randomRange(0.5,1);
	for( let j =0 ; j < 100; j++){
		points.push(
			new THREE.Vector3().setFromSphericalCoords(
				1,
				Math.PI - (j/100) * Math.PI*length,
				(i/100)*Math.PI *2
			)
		)
	}
	let tempcurve = new THREE.CatmullRomCurve3(points);
	curves.push(tempcurve);
	
}

//AdnCurves
let AdnCurves:any[] = [];

PATHS.forEach((path)=>{
	let points = [];
	for(let i = 0; i < path.length; i+=3){
		points.push(new THREE.Vector3(path[i],path[i+1],path[i+2]))
	}
	let tempcurve = new THREE.CatmullRomCurve3(points);
	AdnCurves.push(tempcurve)
})


function BrainParticles({allcurves}:any){
	let density = 60;
	let numberOfPoints = density*allcurves.length;
	const myPoints = useRef([]);
	const adnGeo = useRef();
	let positions = useMemo(()=>{
		let positions = [];
		for(let i = 0; i < numberOfPoints; i++){
			positions.push(
				randomRange(-1,1),
				randomRange(-1,1),
				randomRange(-1,1)
			)
		}
		return new Float32Array(positions);
	},[])

	let randoms = useMemo(()=>{
		let randoms  = [];
		for(let i = 0; i < numberOfPoints; i++){
			randoms .push(
				randomRange(0.3,1.),
			)
		}
		return new Float32Array(randoms);
	},[])

	useEffect(()=>{
		for(let i = 0; i < allcurves.length; i++){
			for(let j = 0; j < density; j++){

  			// @ts-ignore
				myPoints.current.push({
					currentOffset:Math.random(),
					speed: Math.random()*0.01,
					curve: allcurves[i],
					curPosition: Math.random()
				})
			}
		}

	})

	useFrame(({clock})=>{

  	// @ts-ignore
		let curpositions = adnGeo.current.attributes.position.array;
		for ( let i=0; i< myPoints.current.length; i++){
  		// @ts-ignore
			myPoints.current[i].curPosition += myPoints.current[i].speed;
  		// @ts-ignore

			myPoints.current[i].curPosition = myPoints.current[i].curPosition%1;
  		// @ts-ignore
			let curPoint = myPoints.current[i].curve.getPointAt(myPoints.current[i].curPosition)

			curpositions[i*3] = curPoint.x
			curpositions[i*3+1] = curPoint.y
			curpositions[i*3+2] = curPoint.z

		}

  	// @ts-ignore
		adnGeo.current.attributes.position.needsUpdate = true;
	})

	const BrainParticleMaterial = shaderMaterial(
		{ time: 0, color: new THREE.Color(1, 0.0, 0.0) },
		// vertex shader
		/*glsl*/`
		  varying vec2 vUv;
		  uniform float time;
		  varying float vProgress;
		  attribute float randoms;
		  void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
			vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
			gl_PointSize = randoms*6. * (1./ -mvPosition.z);
			//gl_PointSize = 50.;
		  }
		`,
		// fragment shader
		/*glsl*/`
		  uniform float time;
		  void main() {
			float disc = length(gl_PointCoord.xy - vec2(0.5));
			float opacity = 0.3*smoothstep(0.5,0.4,disc);
			gl_FragColor.rgba = vec4(vec3(opacity),1.);
		  }
		`
	)
	extend ({ BrainParticleMaterial  })

	return<>
		<points>
			<bufferGeometry attach="geometry" ref={adnGeo}>
				<bufferAttribute
					attach='attributes-position'
					count={positions.length/3}
					array={positions}
					itemSize={3}
				>
				</bufferAttribute>
				<bufferAttribute
					attach='attributes-randoms'
					count={randoms.length}
					array={randoms}
					itemSize={1}
				>
				</bufferAttribute>
			</bufferGeometry>
			<brainParticleMaterial 
					attach="material"
					depthTest={false}
					transparent={true}
					depthWrite={false}
					blending={THREE.AdditiveBlending}
				/>
		</points>
	</>
}

const BrainComponent = () => {
	return(
		<Canvas camera={{position:[0,0,0.25]}}>
			<color attach="background" args={["#020617"]} />
			<ambientLight/>
			<pointLight position={[10,10,10]} />
			<Tubes allcurves={AdnCurves} />
			<BrainParticles allcurves={AdnCurves}/>
			<OrbitControls/>
		</Canvas>
	)
}

export default BrainComponent;
