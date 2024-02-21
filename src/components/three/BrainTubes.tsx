// @ts-nocheck
import {extend} from "@react-three/fiber"
import { useRef} from "react";
import { shaderMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

function Tube({curve}:any){

	const AdnMat = useRef();
    const { viewport } = useThree();

	useFrame(({clock,pointer}) => {
			AdnMat.current.uniforms.time.value = clock.getElapsedTime();
			AdnMat.current.uniforms.mouse.value = new THREE.Vector3(
					pointer.x*viewport.width/2,
					pointer.y*viewport.height/2,
					0
			)
	})

	const BrainMaterial = shaderMaterial(
		{ time: 0, color: new THREE.Color(0.996, 0.804, 0.827), mouse : new THREE.Vector3(0,0,0) },
		// vertex shader
		/*glsl*/`
		  varying vec2 vUv;
		  uniform float time;
          uniform  vec3 mouse;
		  varying float vProgress;
		  void main() {
			vUv = uv;
			vProgress = smoothstep(-1.,1.,sin(vUv.x*8. + time*3.));
            vec3 p = position;
            float maxDist = 0.05;
            float dist = length(mouse - p);
            if(dist < maxDist){
                vec3 dir = normalize(mouse - p);
                dir*= (1.-dist/maxDist);
                p -= dir*0.01;                                                                 
            }
			gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
		  }
		`,
		// fragment shader
		/*glsl*/`
		  uniform float time;
		  uniform vec3 color;
		  varying vec2 vUv;
		  varying float vProgress;
		  void main() {
			vec3 finalColor = mix(color, color*0.75, vProgress);
			float hideCorners = smoothstep(0.,0.5,vUv.x);
			float hideCorners1 = smoothstep(1.,0.9,vUv.x);
			gl_FragColor.rgba = vec4(vec3(vProgress),1.);
			gl_FragColor.rgba = vec4(finalColor,hideCorners*hideCorners1);
		  }
		`
	)
	extend ({ BrainMaterial })
	return (
		<>
			<mesh>
				<tubeGeometry args={[curve,64,0.003,3,false]} />
				<brainMaterial 
					ref={AdnMat} 
					side={THREE.DoubleSide}
					transparent={true}
					depthTest={false}
					depthWrite={false}
					wireframe={true}
				/>
			</mesh>
		</>
	)
}

export function Tubes({allcurves}:any){
	return(
		<>
			{allcurves.map((curve:any,index:any)=>(
				<Tube curve={curve} key={index}/>
			))}
		</>
	)
}
