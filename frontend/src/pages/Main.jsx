import Header from "../components/Header";
import { FcTemplate } from "react-icons/fc";
import { FaShapes } from "react-icons/fa6";
import { RiUploadCloudFill } from "react-icons/ri";
import { BiLeftIndent, BiText } from "react-icons/bi";
import { FaProjectDiagram } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { TbBackground } from "react-icons/tb";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useEffect, useState } from "react";

import TemplateDesign from "../components/main/TemplateDesign";
import MyImages from "../components/MyImages";
import Projects from "../components/Projects";
import Image from "../components/Image";
import CreateComponent from "../components/CreateComponent";
import api from "../util/api";
import { useParams } from "react-router-dom";
import BackgroundImages from "../components/BackgroundImages";
import InitialImage from "../components/InitiaImage";

const Main = () => {
  const { design_id } = useParams();
  const [state, setState] = useState("");
  const [current_component, setCurrentComponent] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [rotate, setRotate] = useState(0);
  const [left, setLeft] = useState("");
  const [top, setTop] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [padding, setPadding] = useState("");
  const [font, setFont] = useState("");
  const [weight, setWeight] = useState("");
  const [text, setText] = useState("");
  const [opacity, setOpacity] = useState("");
  const [zIndex, setZIndex] = useState("");
  const [radius, setRadius] = useState(0);

  const [show, setShow] = useState({ status: true, name: "" });

  const setElements = (type, name) => {
    setState(type);
    setShow({
      status: false,
      name,
    });
  };

  const [components, setComponents] = useState([
    {
      name: "main_frame",
      type: "rect",
      id: Math.floor(Math.random() * 100 + 1),
      height: 500,
      width: 650,
      z_index: 1,
      color: "#fff",
      image: "",
      setCurrentComponent: (a) => setCurrentComponent(a),
    },
  ]);

  useEffect(() => {
    if (current_component) {
      const index = components.findIndex((c) => c.id === current_component.id);

      const temp = components.filter((c) => c.id !== current_component.id);

      if (current_component.name !== "text") {
        components[index].width = width || current_component.width;
        components[index].height = height || current_component.height;
        components[index].rotate = rotate || current_component.rotate;
      }

      if (current_component.name === "text") {
        components[index].font = font || current_component.font;
        components[index].padding = padding || current_component.padding;
        components[index].weight = weight || current_component.weight;
        components[index].title = text || current_component.title;
      }

      if (current_component.name === "main_frame" && image) {
        components[index].image = image || current_component.image;
      }

      if (current_component.name === "image") {
        components[index].radius = radius || current_component.radius;
      }

      if (current_component.name !== "main_frame") {
        components[index].left = left || current_component.left;
        components[index].top = top || current_component.top;
        components[index].opacity = opacity || current_component.opacity;
        components[index].z_index = zIndex || current_component.zIndex;
      }

      components[index].color = color || current_component.color;

      setComponents([...temp, components[index]]);
      setColor("");
      setLeft("");
      setTop("");
      setWidth("");
      setHeight("");
      setRotate(0);
      setOpacity("");
      setZIndex("");
      setText("");
    }
  }, [
    color,
    image,
    left,
    top,
    width,
    height,
    opacity,
    padding,
    font,
    weight,
    text,
    radius,
  ]);

  const createShape = (name, type) => {
    const style = {
      id: Date.now(),
      name: name,
      type,
      left: 10,
      top: 10,
      opacity: 1,
      width: 200,
      height: 150,
      rotate,
      z_index: 2,
      color: "#3c3c3d",
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    };
    setComponents([...components, style]);
  };

  const moveElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);
    let isMoving = true;

    const currentDiv = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(currentDiv);
      const left = parseInt(getStyle.left);
      const top = parseInt(getStyle.top);
      if (isMoving) {
        currentDiv.style.left = `${left + movementX}px`;
        currentDiv.style.top = `${top + movementY}px`;
      }
    };

    const mouseUp = (e) => {
      let isMoving = false;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setLeft(parseInt(currentDiv.style.left));
      setTop(parseInt(currentDiv.style.top));
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  const resizeElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);
    let isMoving = true;

    const currentDiv = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(currentDiv);
      const width = parseInt(getStyle.width);
      const height = parseInt(getStyle.height);
      if (isMoving) {
        currentDiv.style.width = `${width + movementX}px`;
        currentDiv.style.height = `${height + movementY}px`;
      }
    };

    const mouseUp = (e) => {
      let isMoving = false;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setWidth(parseInt(currentDiv.style.width));
      setHeight(parseInt(currentDiv.style.height));
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  // const resizeElement = () => {
  //   console.log('resize element');
  // };

  const rotateElement = (id, currentInfo) => {
    setCurrentComponent("");
    setCurrentComponent(currentInfo);
    const target = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(target);
      const trans = getStyle.transform;

      const values = trans.split("(")[1].split(")")[0].split(",");
      const angle = Math.round(
        Math.atan2(values[1], values[0]) * (180 / Math.PI)
      );

      let deg = angle < 0 ? angle + 360 : angle;
      if (movementX) {
        deg = deg + movementX;
      }
      target.style.transform = `rotate(${deg}deg)`;
    };

    const mouseUp = (e) => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);

      const getStyle = window.getComputedStyle(target);
      const values = trans.split("(")[1].split(")")[0].split(",");
      const angle = Math.round(
        Math.atan2(values[1], values[0]) * (180 / Math.PI)
      );

      let deg = angle < 0 ? angle + 360 : angle;
      setRotate(deg);
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  const removeComponent = (id) => {
    const temp = components.filter((c) => c.id !== id);
    setCurrentComponent("");
    setComponents(temp);
  };

  const remove_background = () => {
    const com = components.find((c) => c.id === current_component.id);
    const temp = components.filter((c) => c.id !== current_component.id);
    com.image = "";
    setImage("");
    setComponents([...temp, com]);
  };

  const add_text = (name, type) => {
    const style = {
      id: Date.now(),
      name: name,
      type,
      left: 10,
      top: 10,
      opacity: 1,
      rotate,
      z_index: 10,
      padding: 6,
      font: 22,
      title: "Write Something..",
      weight: 400,
      color: "#3c3c3d",
      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    };
    setWeight("");
    setFont("");

    setCurrentComponent(style);
    setComponents([...components, style]);
  };

  const add_image = (img) => {
    setCurrentComponent("");
    const style = {
      id: Date.now(),
      name: "image",
      type: "image",
      left: 10,
      top: 10,
      opacity: 1,
      width: 200,
      height: 150,
      rotate,
      z_index: 2,
      radius: 0,
      font: 22,
      image: img,

      setCurrentComponent: (a) => setCurrentComponent(a),
      moveElement,
      resizeElement,
      rotateElement,
    };

    setCurrentComponent(style);
    setComponents([...components, style]);
  };

  useEffect(() => {
    const get_design = async () => {
      try {
        const { data } = await api.get(`/api/user-design/${design_id}`);
        const { design } = data;
        for (let index = 0; index < design.length; index++) {
          design[index].setCurrentComponent = (a) => setCurrentComponent(a);
          design[index].moveElement = moveElement;
          design[index].resizeElement = resizeElement;
          design[index].rotateElement = rotateElement;
          design[index].remove_background = remove_background;
        }
        setComponents(design);
      } catch (error) {
        console.log(error);
      }
    };
    get_design();
  }, [design_id]);

  const opacityHandle = (e) => {
    setOpacity(parseFloat(e.target.value));
  };

  return (
    <div className="min-w-screen h-screen bg-black">
      <Header components={components} design_id={design_id} />
      <div className="flex h-[calc(100%-60px)] w-screen">
        <div className="w-[80px] bg-[#18191b] z-50 text-gray-400 overflow-y-auto">
          <div
            onClick={() => setElements("design", "design")}
            className={`${
              show.name === "design" ? "bg-[#252627]" : ""
            }  w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl">
              <FcTemplate />
            </span>
            <span className="text-xs font-medium">Design</span>
          </div>
          <div
            onClick={() => setElements("shape", "shape")}
            className={`${
              show.name === "shape" ? "bg-[#252627]" : ""
            }    w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl text-blue-400">
              <FaShapes />
            </span>
            <span className="text-xs font-medium">Shapes</span>
          </div>
          <div
            onClick={() => setElements("upload", "uploadImage")}
            className={`${
              show.name === "uploadImage" ? "bg-[#252627]" : ""
            }   w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl text-blue-400">
              <RiUploadCloudFill />
            </span>
            <span className="text-xs font-medium">Upload</span>
          </div>
          <div
            onClick={() => setElements("text", "text")}
            className={`${
              show.name === "text" ? "bg-[#252627]" : ""
            }   w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl text-blue-400">
              <BiText />
            </span>
            <span className="text-xs font-medium">Text</span>
          </div>

          <div
            onClick={() => setElements("project", "projects")}
            className={` ${
              show.name === "projects" ? "bg-[#252627]" : ""
            }   w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl text-blue-400">
              <FaFolderOpen />
            </span>
            <span className="text-xs font-medium">Project</span>
          </div>
          <div
            onClick={() => setElements("initImage", "images")}
            className={`${
              show.name === "images" ? "bg-[#252627]" : ""
            }   w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl text-blue-400">
              <FaImage />
            </span>
            <span className="text-xs font-medium">Image</span>
          </div>
          <div
            onClick={() => setElements("background", "background")}
            className={`${
              show.name === "background" ? "bg-[#252627]" : ""
            }   w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
          >
            <span className="text-2xl text-blue-400">
              <TbBackground />
            </span>
            <span className="text-xs font-medium">Background</span>
          </div>
        </div>
        <div className="h-full w-[calc(100%-75px)] ">
          <div
            className={`${
              show.status ? "p-0 -left-[350px]" : "px-8 left-[75px] py-5"
            } bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-700 `}
          >
            <div
              onClick={() => setShow({ name: "", status: true })}
              className="flex absolute justify-center items-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full"
            >
              <MdKeyboardArrowLeft />
            </div>
            {state === "design" && (
              <div className="grid grid-cols-2 gap-2">
                <TemplateDesign type="main" />
              </div>
            )}
            {state === "shape" && (
              <div className="grid grid-cols-3 gap-2">
                <div
                  className="h-[90px] bg-[#3c3c3d] cursor-pointer"
                  onClick={() => createShape("shape", "rect")}
                >
                  {" "}
                </div>
                <div
                  onClick={() => createShape("shape", "circle")}
                  className="h-[90px] bg-[#3c3c3d]  cursor-pointer rounded-full"
                ></div>
                <div
                  onClick={() => createShape("shape", "triangle")}
                  className="h-[90px] bg-[#3c3c3d]  cursor-pointer "
                  style={{ clipPath: "polygon(50% 0,100% 100%,0 100%)" }}
                ></div>
              </div>
            )}
            {state === "upload" && <MyImages add_image={add_image} />}
            {state === "text" && (
              <div>
                <div className="grid grid-cols-1 gap-2">
                  <div
                    onClick={() => add_text("text", "title")}
                    className="bg-[#3c3c3d] cursor-pointer font-bold p-3 text-white text-xl rounded-sm"
                  >
                    <h2>Add a Text</h2>
                  </div>
                </div>
              </div>
            )}
            {state === "project" && (
              <Projects type="main" design_id={design_id} />
            )}

            {state === "initImage" && (
              <div className="h-[88vh]  overflow-x-auto flex justify-start items-start scrollbar-hide">
                <InitialImage add_image={add_image} />
              </div>
            )}
            {state === "background" && (
              <div className="h-[88vh]  overflow-x-auto flex justify-start items-start scrollbar-hide ">
                <BackgroundImages type="background" setImage={setImage} />
              </div>
            )}
          </div>
          <div className="w-full flex h-full">
            <div
              className={`flex justify-center relative items-center h-full ${
                !current_component
                  ? "w-full"
                  : "w-[calc(100%-250px)] overflow-hidden"
              }`}
            >
              <div className="m-w-[650px] m-h-[500px] flex justify-center items-center overflow-hidden">
                <div
                  id="main_design"
                  className="w-auto relative h-auto overflow-hidden"
                >
                  {components.map((c, i) => (
                    <CreateComponent
                      key={i}
                      info={c}
                      current_component={current_component}
                      removeComponent={removeComponent}
                    />
                  ))}
                </div>
              </div>
            </div>

            {current_component && (
              <div className="h-full w-[250px] text-gray-300 bg-[#252627] px-3 py-2">
                <div className="flex gap-6 flex-col items-start h-full px-3 justify-start">
                  <div className="flex gap-4 justify-start items-start mt-4">
                    <span>Color:</span>
                    <label
                      className="w-[30px] h-[30px] cursor-pointer rounded-sm"
                      style={{
                        background: `${
                          current_component.color &&
                          current_component.color !== "#fff"
                            ? current_component.color
                            : "gray"
                        }`,
                      }}
                      htmlFor="color"
                    ></label>
                    <input
                      onChange={(e) => setColor(e.target.value)}
                      type="color"
                      id="color"
                      className="invisible"
                    />
                  </div>
                  {current_component.name === "main_frame" &&
                    current_component.image && (
                      <div
                        className="p-[6px] bg-slate-600 text-white cursor-pointer"
                        onClick={remove_background}
                      >
                        Remove Background
                      </div>
                    )}
                  {current_component.name !== "main_frame" && (
                    <div className="flex flex-col gap-6">
                      <div className="flex gap-1 justify-normal items-start">
                        <span className="text-md w-[70px]">Opacity</span>
                        <input
                          onChange={opacityHandle}
                          className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                          type="number"
                          step={0.1}
                          min={0.1}
                          max={1}
                          value={current_component.opacity}
                        />
                      </div>

                      <div className="flex gap-1 justify-normal items-start">
                        <span className="text-md w-[70px]">Z-Index</span>
                        <input
                          onChange={(e) => setZIndex(parseInt(e.target.value))}
                          className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                          type="number"
                          step={1}
                          value={current_component.z_index}
                        />
                      </div>

                      {current_component.name === "image" && (
                        <div className="flex gap-1 justify-normal items-start">
                          <span className="text-md w-[70px]">Radius</span>
                          <input
                            onChange={(e) =>
                              setRadius(parseInt(e.target.value))
                            }
                            className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                            type="number"
                            step={1}
                            value={current_component.radius}
                          />
                        </div>
                      )}

                      {current_component.name === "text" && (
                        <>
                          <div className="flex gap-1 justify-normal items-start">
                            <span className="text-md w-[70px]">Padding:</span>
                            <input
                              onChange={(e) =>
                                setPadding(parseInt(e.target.value))
                              }
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={1}
                              value={current_component.padding}
                            />
                          </div>

                          <div className="flex gap-1 justify-normal items-start">
                            <span className="text-md w-[70px]">Font Size:</span>
                            <input
                              onChange={(e) =>
                                setFont(parseInt(e.target.value))
                              }
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={1}
                              value={current_component.font}
                            />
                          </div>
                          <div className="flex gap-1 justify-normal items-start">
                            <span className="text-md w-[70px]">Weight</span>
                            <input
                              onChange={(e) =>
                                setWeight(parseInt(e.target.value))
                              }
                              className="w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md"
                              type="number"
                              step={100}
                              min={100}
                              max={900}
                              value={current_component.weight}
                            />
                          </div>

                          <div className="flex gap-2 flex-col justify-normal items-start">
                            <input
                              onChange={(e) =>
                                setCurrentComponent({
                                  ...current_component,
                                  title: e.target.value,
                                })
                              }
                              className="border border-gray-700 bg-transparent outline-none p-2 rounded-md"
                              type="text"
                              value={current_component.title}
                            />
                            <button
                              onClick={() => setText(current_component.title)}
                              className="px-4 py-2 bg-purple-500 text-xs rounded-sm"
                            >
                              Add Text
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Main;
