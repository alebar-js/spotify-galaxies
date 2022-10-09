import * as THREE from 'three';
import { useSprings, animated } from '@react-spring/three';
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { Track } from '../types';
import { getTargets } from '../lib/layouts';

type LayoutsProps = {
  items: Track[];
  position: THREE.Vector3;
  layout: 'helix' | 'sphere' | 'table';
};
const targets = getTargets(50, new THREE.Vector3());

const Layouts = ({ items, position, layout }: LayoutsProps) => {
  const [springs, api] = useSprings(
    items.length,
    (i) => ({
      position: targets[layout][i].position,
      x: targets[layout][i].position.x,
      y: targets[layout][i].position.y,
      z: targets[layout][i].position.z,
      rx: targets[layout][i].rotation.x,
      ry: targets[layout][i].rotation.y,
      rz: targets[layout][i].rotation.z,
      rotation: targets[layout][i].rotation,
    }),
    [layout]
  );

  return (
    <>
      {springs.map(
        ({ position, x, y, z, rx, ry, rz, rotation }, i) =>
          items && (
            <animated.mesh
              position={position}
              rotation={rotation}
              key={i}
              onClick={() => console.log(x, y, z)}
            >
              <sphereGeometry />
              <meshBasicMaterial />
            </animated.mesh>
          )
      )}
    </>
  );
};

export default Layouts;
