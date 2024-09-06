"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Matter from "matter-js";

export default function InteractivePhysicsPlayground() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const [gravity, setGravity] = useState(1);
  const [shapeType, setShapeType] = useState<"rectangle" | "circle">(
    "rectangle"
  );
  const [sightPosition, setSightPosition] = useState({ x: 0, y: 0 });

  const createShape = useCallback(
    (x: number, y: number) => {
      if (!engineRef.current) return;

      const world = engineRef.current.world;
      let body;

      if (shapeType === "rectangle") {
        body = Matter.Bodies.rectangle(x, y, 40, 40, {
          render: { fillStyle: "#3498db" },
        });
      } else {
        body = Matter.Bodies.circle(x, y, 20, {
          restitution: 0.7,
          render: { fillStyle: "#e74c3c" },
        });
      }

      Matter.World.add(world, body);
    },
    [shapeType]
  );

  useEffect(() => {
    if (!sceneRef.current || !canvasRef.current) return;

    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create({
      gravity: { x: 0, y: gravity * 9.81, scale: 0.001 },
    });
    engineRef.current = engine;
    const world = engine.world;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = sceneRef.current.clientWidth;
    canvas.height = sceneRef.current.clientHeight;

    const ground = Bodies.rectangle(
      canvas.width / 2,
      canvas.height - 10,
      canvas.width,
      20,
      {
        isStatic: true,
        render: { fillStyle: "#2ecc71" },
      }
    );

    World.add(world, [ground]);

    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    World.add(world, mouseConstraint);

    canvas.addEventListener("mousedown", (event) => {
      if (event.button === 0) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        createShape(x, y);
      }
    });

    canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const bodyToDelete = Matter.Query.point(world.bodies, { x, y })[0];
      if (bodyToDelete && !bodyToDelete.isStatic) {
        World.remove(world, bodyToDelete);
      }
    });

    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: canvas.width,
        height: canvas.height,
        wireframes: false,
        background: "#f0f0f0",
      },
    });

    Render.run(render);

    const handleResize = () => {
      canvas.width = sceneRef.current!.clientWidth;
      canvas.height = sceneRef.current!.clientHeight;
      Matter.Body.setPosition(ground, {
        x: canvas.width / 2,
        y: canvas.height - 10,
      });
      Matter.Body.setVertices(ground, [
        { x: 0, y: canvas.height },
        { x: canvas.width, y: canvas.height },
        { x: canvas.width, y: canvas.height - 20 },
        { x: 0, y: canvas.height - 20 },
      ]);
      if (renderRef.current) {
        Matter.Render.setPixelRatio(renderRef.current, window.devicePixelRatio);
        renderRef.current.bounds.max.x = canvas.width;
        renderRef.current.bounds.max.y = canvas.height;
        renderRef.current.options.width = canvas.width;
        renderRef.current.options.height = canvas.height;
        renderRef.current.canvas.width = canvas.width;
        renderRef.current.canvas.height = canvas.height;
      }
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setSightPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      World.clear(world, false);
      Engine.clear(engine);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      Render.stop(render);
    };
  }, [gravity, createShape]);

  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.world.gravity.y = gravity * 9.81;
      Matter.Engine.update(engineRef.current, 0);
    }
  }, [gravity]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="mb-4 space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setShapeType("rectangle")}
        >
          Rectangle
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => setShapeType("circle")}
        >
          Circle
        </button>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={gravity}
          onChange={(e) => setGravity(parseFloat(e.target.value))}
          className="ml-4"
        />
        <span>Gravity: {gravity.toFixed(1)}</span>
      </div>
      <div
        ref={sceneRef}
        className="relative border border-gray-300 rounded-lg shadow-lg w-full h-[600px]"
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Physics Playground
          </h1>
        </div>
        <div
          className="sight absolute pointer-events-none"
          style={{
            left: `${sightPosition.x}px`,
            top: `${sightPosition.y}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-8 h-8 border-2 border-red-500 rounded-full"></div>
          <div
            className="absolute left-1/2 top-0 w-0.5 h-full bg-red-500"
            style={{ transform: "translateX(-50%)" }}
          ></div>
          <div
            className="absolute left-0 top-1/2 w-full h-0.5 bg-red-500"
            style={{ transform: "translateY(-50%)" }}
          ></div>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        Left-click to create shapes. Right-click to delete shapes.
      </div>
    </div>
  );
}
