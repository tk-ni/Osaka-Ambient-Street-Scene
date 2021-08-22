import React, { useEffect } from "react";
import {
    WebGLRenderer,
    PerspectiveCamera,
    AmbientLight,
    DirectionalLight,
    Color,
    Scene
} from "three";

import 'Styles/main_scene.css';

interface MainSceneProps { }

const MainScene: React.FC<MainSceneProps> = () => {
    const divRef: React.RefObject<any> = React.createRef();
    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    const scene = new Scene();
    const camera = new PerspectiveCamera(30, 0, 0.1, 1000);

    const initiateScene = (): void => {
        //Renderer
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.autoClear = false;
        renderer.setClearColor(new Color(0x222222));
        renderer.setSize(divRef.current.offsetWidth, divRef.current.offsetHeight);
        divRef.current.appendChild(renderer.domElement);

        //Scene
        scene.background = new Color(0x222222);

        //Camera
        camera.position.z = 50;
        camera.aspect = divRef.current.offsetWidth / divRef.current.offsetHeight;

        //Lights
        const ambientLight = new AmbientLight(0x07215c);
        ambientLight.color.setRGB(0.02, 0.02, 0.07);
        ambientLight.intensity = 5;

        const directionalLight = new DirectionalLight(0xe8f7ff, 1);
        directionalLight.position.set(1, 0, 5);

        scene.add(directionalLight);
        scene.add(ambientLight);
    }

    //Animation Loop
    const animate = (): void => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    useEffect(() => {
        initiateScene();
        animate();
    }, [])

    return (<div className="three-container" ref={divRef} />)
}

export default MainScene;