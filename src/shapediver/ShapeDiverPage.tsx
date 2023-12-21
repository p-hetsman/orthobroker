
import * as  shapediverViewer from "@shapediver/viewer";
import * as interactionFeatures from '@shapediver/viewer.features.interaction'

import { useRef, useEffect } from "react";
import * as THREE from "three";


const ShapeDiverModelPage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const initializeShapeDiver = async () => {
      // create a viewport
      const viewport = await shapediverViewer.createViewport({
        canvas: document.getElementById("canvas") as HTMLCanvasElement,
        id: 'myViewport',
      });

      // create a session
      const session = await shapediverViewer.createSession({
        ticket: '64a05c454890d970439263c2badededdc851fdf9748fa1fe99de51eeda833455b835f3554b7d78dc61ccfef423554866798f2f656dea1d5650913643dbf3d2866b2fe5e480a9b4d4a6fd34ac87fc5e37173177dab55b56ddd37e36d2d3b6406457f8f44139bdcf-d1a29782ade1df82c1fe5b9ac6db981b',
        modelViewUrl: 'https://sdr7euc1.eu-central-1.shapediver.com',
        id: 'mySession',
      });


      // create a node that contains our data
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
      viewport.update();
      // event listener for SELECT_ON
      shapediverViewer.addListener(shapediverViewer.EVENTTYPE.INTERACTION.SELECT_ON, (e) => {
        console.log("SELECT_ON");
        const node = (e).node;
        console.log(node);
        const output = session.outputs[node.name];
        console.log(output);
      });

      // event listener for HOVER_ON
      shapediverViewer.addListener(shapediverViewer.EVENTTYPE.INTERACTION.HOVER_ON, (e) => {
        console.log("HOVER_ON");
        const node = (e).node;
        console.log(node);
        const output = session.outputs[node.name];
        console.log(output);
      });

      // create the interactionEngine and provide it the viewport object
      const interactionEngine = new interactionFeatures.InteractionEngine(viewport);

      // create the selectionManager and add it
      const selectManger = new interactionFeatures.SelectManager();
      interactionEngine.addInteractionManager(selectManger);
      selectManger.effectMaterial = new shapediverViewer.MaterialStandardData({ color: "#ff0000" });

      // create the hoverManager and add it
      const hoverManager = new interactionFeatures.HoverManager();
      interactionEngine.addInteractionManager(hoverManager);
      hoverManager.effectMaterial = new shapediverViewer.MaterialStandardData({ color: "#00ff00" });

      // assign InteractionData to all outputs, and re-assign once they get updated
      for (let o in session.outputs) {
        const output = session.outputs[o];

        // the updateCallback is called whenever the output is updated
        output.updateCallback = (newNode?: shapediverViewer.ITreeNode, oldNode?: shapediverViewer.ITreeNode) => {
          if (!newNode) return;
          newNode.data.push(new interactionFeatures.InteractionData({ select: true, hover: true }));
          newNode.updateVersion();
        };

        // we call it manually once in the beginning to apply the changes
        output.updateCallback(output.node);

      };
    }

    initializeShapeDiver();
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} id="canvas"></canvas>
    </div>
  );
};

export default ShapeDiverModelPage;
