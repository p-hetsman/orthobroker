
import * as  shapediverViewer from "@shapediver/viewer";
import * as interactionFeatures from '@shapediver/viewer.features.interaction'

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { mat4, vec3 } from "gl-matrix";



const ShapeDiverModelPage = () => {
  const canvasRef = useRef(null);
  const divRef = useRef(null);

  useEffect(() => {
    const initializeShapeDiver = async () => {
      // create a viewport
      const viewport = await shapediverViewer.createViewport({
        canvas: document.getElementById("canvas") as HTMLCanvasElement,
        id: 'myViewport',
      });

      // create a session
      const session = await shapediverViewer.createSession({
        ticket: '69fb5edae3532d2931bab1ea78d49e8a27cce8d2d1b2f342c3b4b8ac599ee305e86fa530ae945f5aa1b8b92c21c1ec33161394bb08b259c56f392311776a39498c68a289d79d2143812408bf9f8de834fa6a0ccb5045a04295fa7a3718e2ced9c5b6ad58e19d67c22e2a876874cdf3f34783de141b847906-75b0d6e65f5e6ecb96ce466a022462e6',
        modelViewUrl: 'https://sdr7euc1.eu-central-1.shapediver.com',
        id: 'mySession',
      });



      /*  // create a node that contains our data
       const threejsNode = new shapediverViewer.TreeNode();
 
       // create an Object3D and add it to the node as a data item
       const obj = new THREE.Object3D();
       threejsNode.data.push(new shapediverViewer.ThreejsData(obj));
 
       // add any kind of three js items to that object
       const geometry = new THREE.SphereGeometry(1, 32, 32);
       const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
       const sphere = new THREE.Mesh(geometry, material);
       obj.add(sphere);
 
       // add the node to the scene tree and update
       shapediverViewer.sceneTree.root.addChild(threejsNode);
       shapediverViewer.sceneTree.root.updateVersion();
 
 
       // create the interactionEngine and provide it the viewport object
       const interactionEngine = new interactionFeatures.InteractionEngine(viewport);
       // create the dragManager and add it
       const dragManager = new interactionFeatures.DragManager();
       dragManager.effectMaterial = new shapediverViewer.MaterialStandardData({ color: "#00ff00" });
       interactionEngine.addInteractionManager(dragManager);
 
       // add the interaction data to the session
       session.node.data.push(new interactionFeatures.InteractionData({ drag: true }));
       session.node.updateVersion();
 
       // add a plane constraint
       const planeConstraint = new interactionFeatures.PlaneConstraint([0, 0, 1], [0, 0, 0]);
       // use the token to remove the constraint again (removeDragConstraint)
       const token = dragManager.addDragConstraint(planeConstraint);
  */


    };

    initializeShapeDiver();
  }, []);

  return (
    <div ref={divRef} style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} id="canvas"></canvas>
    </div>
  );
};

export default ShapeDiverModelPage;
