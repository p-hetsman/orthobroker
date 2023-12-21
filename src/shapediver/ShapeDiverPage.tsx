
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
        ticket: '41639793e6220bd3c2a7ad08376dc75b43cf34c0611f3e69fbfe09b75dc507cdcfe747a6fe8c00eb1fddf5c33912fe1249e1deee26a84ca87feca245a012aad71e2be9f65b6f83fbaeb0de14db7dbba29be67269d8e352f3ae5a0714d78f3d43167abe8ef981360d7d11a8757c075882417052fcc57b7491-9c47f5a9e42bcb70c7262a9cc549fcf1',
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
