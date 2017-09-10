// console.log('in globe js')
//
// var express = require('express');
// var router = express.Router();
// var THREE = require('three.js')
//
//
//
// var container = document.getElementById('world')
//
// var POS_X = 1800;
// var POS_Y = 500;
// var POS_Z = 1800;
// var WIDTH = 1000;
// var HEIGHT = 600;
//
// var FOV = 45;
// var NEAR = 1;
// var FAR = 4000;
//
// //basic renderer
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(WIDTH, HEIGHT);
// renderer.setClearColorHex(0x111111);
//
// var mapDiv = document.getElementById("globe");
// mapDiv.appendChild(renderer.domElement);
//
// var camera = new THREE.PerspectiveCamera(FOV,WIDTH/HEIGHT,NEAR,FAR);
// camera.position.set(POS_X,POS_Y, POS_Z);
// camera.lookAt(new THREE.Vector3(0,0,0));
//
// var scene = new THREE.Scene();
// scene.add(camera);
//
// container.appendChild( renderer.domElement );
//
// render();
//
// module.exports = router;
