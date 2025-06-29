"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import html2canvas from "html2canvas";

const templates = [
  // {
  //   id: 1,
  //   name: "你尽管说话",
  //   image: "https://ext.same-assets.com/863987727/3631327722.jpeg",
  //   active: true,
  //   defaultTexts: [
  //     { id: "top", text: "你尽管说话", position: { x: 0, y: -100 }, fontSize: 24 },
  //     { id: "bottom", text: "听一句算我输", position: { x: 0, y: 100 }, fontSize: 24 }
  //   ]
  // },
  {
    id: 2,
    name: "我尽力忍住唔笑",
    image: "/meme-templates/cat.jpg",
    active: true,
    defaultTexts: [{ id: "top", text: "我尽力忍住唔笑", position: { x: 0, y: 100 }, fontSize: 22 }],
  },
  {
    id: 3,
    name: "边个明星粤语讲得好？",
    image: "/meme-templates/stars.jpeg",
    active: false,
    defaultTexts: [
      { id: "top", text: "边个明星粤语讲得好？", position: { x: 40, y: -270 }, fontSize: 20 },
      { id: "middle", text: "周星驰", position: { x: -160, y: -55 }, fontSize: 20 },
      { id: "middle2", text: "林雪", position: { x: -40, y: -55 }, fontSize: 20 },
      { id: "bottom", text: "朱军", position: { x: 120, y: -35 }, fontSize: 20 },
    ],
  },
  {
    id: 4,
    name: "当有人讲",
    image: "/meme-templates/talking.jpeg",
    active: false,
    defaultTexts: [
      { id: "top", text: "当有人讲", position: { x: 0, y: -100 }, fontSize: 24 },
      { id: "bottom", text: "粤韵风华", position: { x: 0, y: 100 }, fontSize: 24 },
    ],
  },
  {
    id: 5,
    name: "走囖，濑尿虾！",
    image: "/meme-templates/shrimp.jpeg",
    active: false,
    defaultTexts: [{ id: "bottom", text: "走囖，濑尿虾！", position: { x: 0, y: 100 }, fontSize: 24 }],
  },
  {
    id: 6,
    name: "吔屎啦，梁非凡！",
    image: "/meme-templates/eat.jpg",
    active: false,
    defaultTexts: [
      { id: "top", text: "吔屎啦，", position: { x: -140, y: 40 }, fontSize: 20 },
      { id: "middle", text: "梁非凡！", position: { x: -140, y: 60 }, fontSize: 20 },
      { id: "bottom", text: "哈哈哈哈哈", position: { x: 130, y: 35 }, fontSize: 12 },
    ],
  },
  {
    id: 7,
    name: "有人唔想讲嘢，",
    image: "/meme-templates/throw.jpg",
    active: false,
    defaultTexts: [
      { id: "left", text: "有人唔想讲嘢，", position: { x: -140, y: -130 }, fontSize: 20 },
      { id: "right", text: "并向你掟咗嗰「茄哩啡」", position: { x: -140, y: -100 }, fontSize: 20 },
    ],
  },

  {
    id: 8,
    name: "讲D乜?",
    image: "/meme-templates/what1.jpg",
    active: false,
    defaultTexts: [],
  },
  {
    id: 9,
    name: "讲D乜?",
    image: "/meme-templates/bird.jpg",
    active: false,
    defaultTexts: [],
  },
  {
    id: 10,
    name: "讲D乜?",
    image: "/meme-templates/girl2.jpg",
    active: false,
    defaultTexts: [],
  },
  // {
  //   id: 9,
  //   name: "惊讶脸",
  //   image: "https://ext.same-assets.com/863987727/1351087523.jpeg",
  //   active: false,
  //   defaultTexts: [
  //     { id: "top", text: "什么！", position: { x: 0, y: -100 }, fontSize: 28 },
  //     { id: "bottom", text: "怎么会这样", position: { x: 0, y: 100 }, fontSize: 20 }
  //   ]
  // },
  // {
  //   id: 10,
  //   name: "无奈表情",
  //   image: "https://ext.same-assets.com/863987727/2222615403.png",
  //   active: false,
  //   defaultTexts: [
  //     { id: "top", text: "又是这样", position: { x: 0, y: -100 }, fontSize: 24 },
  //     { id: "middle", text: "我太难了", position: { x: 0, y: 0 }, fontSize: 26 },
  //     { id: "bottom", text: "😔", position: { x: 0, y: 100 }, fontSize: 32 }
  //   ]
  // },
];

interface TextElement {
  id: string;
  text: string;
  position: { x: number; y: number };
  fontSize: number;
  color: string;
}

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [textElements, setTextElements] = useState<TextElement[]>(
    templates[0].defaultTexts.map(defaultText => ({
      id: defaultText.id,
      text: defaultText.text,
      position: defaultText.position,
      fontSize: defaultText.fontSize,
      color: "black",
    })),
  );
  const [newText, setNewText] = useState("");
  const [newTextFontSize, setNewTextFontSize] = useState(24);
  const [newTextColor, setNewTextColor] = useState("black");

  // Drag state
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // Modal state for generated meme
  const [showMemeModal, setShowMemeModal] = useState(false);
  const [generatedMemeUrl, setGeneratedMemeUrl] = useState<string | null>(null);

  const imageRef = useRef<HTMLImageElement>(null);
  const memeContainerRef = useRef<HTMLDivElement>(null);

  const handleRandomTemplate = () => {
    const randomIndex = Math.floor(Math.random() * templates.length);
    selectTemplate(templates[randomIndex]);
  };

  const handleGenerateMeme = async () => {
    if (!imageRef.current) return;

    try {
      // Create an iframe to completely isolate the rendering context
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.left = '-9999px';
      iframe.style.top = '-9999px';
      iframe.style.width = '800px';
      iframe.style.height = '600px';
      iframe.style.border = 'none';
      document.body.appendChild(iframe);

      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) throw new Error('Cannot access iframe document');

      // Create minimal HTML structure in iframe
      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: system-ui, -apple-system, sans-serif; }
            .container { position: relative; display: inline-block; }
            .meme-img { display: block; }
            .watermark { 
              position: absolute; top: 8px; right: 8px; 
              font-size: 12px; color: #9CA3AF; opacity: 0.6; 
            }
            .text-element { 
              position: absolute; text-align: center; line-height: 1.2;
              font-weight: 900; pointer-events: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <img class="meme-img" src="${selectedTemplate.image}" 
                 width="${imageRef.current.offsetWidth}" 
                 height="${imageRef.current.offsetHeight}" 
                 crossorigin="anonymous">
            <!-- <div class="watermark">@leeduckgo</div> -->
          </div>
        </body>
        </html>
      `);
      iframeDoc.close();

      // Wait for image to load
      const img = iframeDoc.querySelector('.meme-img') as HTMLImageElement;
      const container = iframeDoc.querySelector('.container') as HTMLElement;
      
      await new Promise((resolve, reject) => {
        if (img.complete) {
          resolve(true);
        } else {
          img.onload = () => resolve(true);
          img.onerror = () => reject(new Error('Image failed to load'));
          // Timeout after 10 seconds
          setTimeout(() => reject(new Error('Image load timeout')), 10000);
        }
      });

      // Add text elements
      textElements.forEach(element => {
        const textDiv = iframeDoc.createElement('div');
        textDiv.className = 'text-element';
        textDiv.textContent = element.text;
        textDiv.style.left = '50%';
        textDiv.style.top = '50%';
        textDiv.style.transform = `translate(calc(-50% + ${element.position.x}px), calc(-50% + ${element.position.y}px))`;
        textDiv.style.color = element.color;
        textDiv.style.fontSize = element.fontSize + 'px';
        textDiv.style.whiteSpace = element.text.length <= 15 ? 'nowrap' : 'normal';
        textDiv.style.wordBreak = element.text.length > 15 ? 'break-word' : 'normal';
        textDiv.style.textShadow = element.color === 'white' 
          ? '2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black'
          : '2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white';
        container.appendChild(textDiv);
      });

      // Small delay to ensure everything is rendered
      await new Promise(resolve => setTimeout(resolve, 100));

      // Capture with html2canvas on the iframe content
      const canvas = await html2canvas(container, {
        allowTaint: true,
        useCORS: true,
        scale: 2,
        backgroundColor: null,
        logging: false,
        windowWidth: iframe.offsetWidth,
        windowHeight: iframe.offsetHeight,
      });

      // Clean up iframe
      document.body.removeChild(iframe);

      // Convert canvas to blob and create URL
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setGeneratedMemeUrl(url);
          setShowMemeModal(true);
        }
      }, 'image/png');

    } catch (error) {
      console.error('Error generating meme:', error);
      alert('生成梗图时出错，请重试！');
      // Clean up iframe in case of error
      const iframe = document.querySelector('iframe[style*="-9999px"]');
      if (iframe) {
        document.body.removeChild(iframe);
      }
    }
  };

  const selectTemplate = (template: (typeof templates)[0]) => {
    setSelectedTemplate(template);

    // Replace all text elements with template's default texts
    setTextElements(() => {
      return template.defaultTexts.map(defaultText => ({
        id: defaultText.id,
        text: defaultText.text,
        position: defaultText.position,
        fontSize: defaultText.fontSize,
        color: "black",
      }));
    });
  };

  const addText = () => {
    if (!newText.trim()) return;

    const newTextElement: TextElement = {
      id: `text-${Date.now()}`,
      text: newText,
      position: { x: 0, y: 0 },
      fontSize: newTextFontSize,
      color: newTextColor,
    };

    setTextElements(prev => [...prev, newTextElement]);
    setNewText("");
  };

  const updateTextElement = (id: string, updates: Partial<TextElement>) => {
    setTextElements(prev => prev.map(element => (element.id === id ? { ...element, ...updates } : element)));
  };

  const deleteTextElement = (id: string) => {
    setTextElements(prev => prev.filter(element => element.id !== id));
  };

  const downloadMeme = () => {
    if (!generatedMemeUrl) return;
    
    const link = document.createElement('a');
    link.href = generatedMemeUrl;
    link.download = `粤语梗图_${selectedTemplate.name}_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeMemeModal = () => {
    setShowMemeModal(false);
    if (generatedMemeUrl) {
      URL.revokeObjectURL(generatedMemeUrl);
      setGeneratedMemeUrl(null);
    }
  };

  // Drag handlers
  const handleTextMouseDown = useCallback(
    (e: React.MouseEvent, elementId: string) => {
      e.preventDefault();
      setDraggingId(elementId);
      if (!imageRef.current) return;

      const imageRect = imageRef.current.getBoundingClientRect();
      const imageCenterX = imageRect.left + imageRect.width / 2;
      const imageCenterY = imageRect.top + imageRect.height / 2;

      const element = textElements.find(el => el.id === elementId);
      if (!element) return;

      // Calculate offset from current position to mouse
      setDragOffset({
        x: e.clientX - (imageCenterX + element.position.x),
        y: e.clientY - (imageCenterY + element.position.y),
      });
    },
    [textElements],
  );

  // Mouse move handler
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!imageRef.current || !draggingId) return;

      const imageRect = imageRef.current.getBoundingClientRect();
      const imageCenterX = imageRect.left + imageRect.width / 2;
      const imageCenterY = imageRect.top + imageRect.height / 2;

      // Calculate new position relative to image center
      const newX = e.clientX - imageCenterX - dragOffset.x;
      const newY = e.clientY - imageCenterY - dragOffset.y;

      // Constrain within image bounds
      const constrainedX = Math.max(-imageRect.width / 2 + 50, Math.min(imageRect.width / 2 - 50, newX));
      const constrainedY = Math.max(-imageRect.height / 2 + 20, Math.min(imageRect.height / 2 - 20, newY));

      updateTextElement(draggingId, { position: { x: constrainedX, y: constrainedY } });
    },
    [draggingId, dragOffset],
  );

  // Mouse up handler
  const handleMouseUp = useCallback(() => {
    setDraggingId(null);
  }, []);

  return (
    <div className="min-h-screen bg-[#e6e9ea] font-sans">
      {/* Header */}
      <header className="text-center py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">粤语梗图生成器</h1>
        <p className="text-gray-600 text-sm">所見即所得，生成你嘅粵式 meme</p>
      </header>

      {/* Template Gallery */}
      <div className="px-4 mb-8">
        <div className="flex justify-center overflow-x-auto gap-2 pb-2">
          {templates.map(template => (
            <div
              key={template.id}
              className={`flex-shrink-0 w-20 h-20 rounded cursor-pointer border-2 transition-all ${
                selectedTemplate.id === template.id ? "border-blue-500" : "border-transparent"
              }`}
              onClick={() => selectTemplate(template)}
            >
              <img src={template.image} alt={template.name} className="w-full h-full object-cover rounded" />
            </div>
          ))}
          <div
            className="flex-shrink-0 w-20 h-20 rounded border-2 border-dashed border-gray-400 flex items-center justify-center cursor-pointer text-black text-xs hover:bg-gray-100 transition-colors"
            onClick={handleRandomTemplate}
          >
            随机一张
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex justify-center mb-8">
        <div className="relative bg-white p-12 rounded-lg shadow-lg">
          <div className="relative inline-block">
            {/* Watermark */}
            <div className="absolute top-2 right-2 text-xs text-gray-400 opacity-60">@神奇海螺</div>

            {/* Main meme image */}
            <div
              ref={memeContainerRef}
              className="relative"
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <img
                ref={imageRef}
                src={selectedTemplate.image}
                alt="Meme template"
                className="max-w-md h-auto rounded"
              />

              {/* Dynamic text elements - all draggable */}
              {textElements.map(element => (
                <div
                  key={element.id}
                  className="absolute cursor-move select-none group"
                  style={{
                    left: `50%`,
                    top: `50%`,
                    transform: `translate(calc(-50% + ${element.position.x}px), calc(-50% + ${element.position.y}px))`,
                    userSelect: "none",
                  }}
                  onMouseDown={e => handleTextMouseDown(e, element.id)}
                >
                  <div
                    className="text-center leading-tight pointer-events-none"
                    style={{
                      color: element.color,
                      fontSize: `${element.fontSize}px`,
                      fontWeight: "900",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      whiteSpace: element.text.length <= 15 ? "nowrap" : "normal",
                      wordBreak: element.text.length > 15 ? "break-word" : "normal",
                      textShadow: element.color === 'white' 
                        ? '2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black, -2px 2px 0px black, 0px 2px 0px black, 2px 0px 0px black, 0px -2px 0px black, -2px 0px 0px black'
                        : '2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white, 0px 2px 0px white, 2px 0px 0px white, 0px -2px 0px white, -2px 0px 0px white',
                    }}
                  >
                    {element.text}
                  </div>

                  {/* Delete button for all text elements */}
                  <button
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-auto"
                    onClick={e => {
                      e.stopPropagation();
                      deleteTextElement(element.id);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}

              {/*TODO: 配件 */}
              {/* {selectedTemplate.id === 1 && (
                <div className="absolute top-24 left-32">
                  <img
                    src="https://ext.same-assets.com/863987727/1902629164.png"
                    alt="Sunglasses"
                    className="w-16 h-8"
                    style={{ transform: "rotate(-4deg)" }}
                  />
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>

      {/* Form Controls */}
      <div className="max-w-md mx-auto px-4 mb-8">
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-4 text-center text-black">{selectedTemplate.name}</h2>

          <div className="space-y-4">
            {/* Add new text */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="输入新文字..."
                  value={newText}
                  onChange={e => setNewText(e.target.value)}
                  className="flex-1"
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      addText();
                    }
                  }}
                />
                <Button
                  className="bg-green-500 hover:bg-green-600 text-white px-4"
                  onClick={addText}
                  disabled={!newText.trim()}
                >
                  添加
                </Button>
              </div>
              <div className="flex gap-2 items-center">
                <label className="text-xs text-gray-600 w-12">字号:</label>
                <input
                  type="range"
                  min="12"
                  max="48"
                  value={newTextFontSize}
                  onChange={e => setNewTextFontSize(parseInt(e.target.value))}
                  className="flex-1"
                />
                <span className="text-xs text-gray-600 w-8">{newTextFontSize}</span>
                <div className="flex gap-1">
                  <button
                    className="text-xs px-1 py-0.5 bg-gray-100 hover:bg-gray-200 rounded"
                    onClick={() => setNewTextFontSize(16)}
                  >
                    小
                  </button>
                  <button
                    className="text-xs px-1 py-0.5 bg-gray-100 hover:bg-gray-200 rounded"
                    onClick={() => setNewTextFontSize(24)}
                  >
                    中
                  </button>
                  <button
                    className="text-xs px-1 py-0.5 bg-gray-100 hover:bg-gray-200 rounded"
                    onClick={() => setNewTextFontSize(32)}
                  >
                    大
                  </button>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <label className="text-xs text-gray-600 w-12">颜色:</label>
                <input
                  type="color"
                  value={newTextColor}
                  onChange={e => setNewTextColor(e.target.value)}
                  className="w-8 h-6 rounded border border-gray-300"
                />
                <div className="flex gap-1 flex-1">
                  <button
                    className="w-6 h-6 rounded border border-gray-300 bg-black"
                    onClick={() => setNewTextColor("black")}
                    title="黑色"
                  />
                  <button
                    className="w-6 h-6 rounded border border-gray-300 bg-white"
                    onClick={() => setNewTextColor("white")}
                    title="白色"
                  />
                  <button
                    className="w-6 h-6 rounded border border-gray-300 bg-red-500"
                    onClick={() => setNewTextColor("#ef4444")}
                    title="红色"
                  />
                  <button
                    className="w-6 h-6 rounded border border-gray-300 bg-blue-500"
                    onClick={() => setNewTextColor("#3b82f6")}
                    title="蓝色"
                  />
                  <button
                    className="w-6 h-6 rounded border border-gray-300 bg-yellow-500"
                    onClick={() => setNewTextColor("#eab308")}
                    title="黄色"
                  />
                  <button
                    className="w-6 h-6 rounded border border-gray-300 bg-green-500"
                    onClick={() => setNewTextColor("#22c55e")}
                    title="绿色"
                  />
                </div>
              </div>
            </div>

            {/* Additional text elements list */}
            {textElements.length > 0 && (
              <div className="border-t pt-4">
                <h3 className="text-sm font-medium mb-2 text-gray-700">已有文本:</h3>
                {textElements.map(element => (
                  <div key={element.id} className="space-y-2 mb-4 p-2 border rounded">
                    <div className="flex gap-2">
                      <Input
                        value={element.text}
                        onChange={e => updateTextElement(element.id, { text: e.target.value })}
                        className="flex-1 text-sm"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-500 hover:text-red-600"
                        onClick={() => deleteTextElement(element.id)}
                      >
                        删除
                      </Button>
                    </div>
                    <div className="flex gap-2 items-center">
                      <label className="text-xs text-gray-600 w-12">字号:</label>
                      <input
                        type="range"
                        min="12"
                        max="48"
                        value={element.fontSize}
                        onChange={e => updateTextElement(element.id, { fontSize: parseInt(e.target.value) })}
                        className="flex-1"
                      />
                      <span className="text-xs text-gray-600 w-8">{element.fontSize}</span>
                      <div className="flex gap-1">
                        <button
                          className="text-xs px-1 py-0.5 bg-gray-100 hover:bg-gray-200 rounded"
                          onClick={() => updateTextElement(element.id, { fontSize: 16 })}
                        >
                          小
                        </button>
                        <button
                          className="text-xs px-1 py-0.5 bg-gray-100 hover:bg-gray-200 rounded"
                          onClick={() => updateTextElement(element.id, { fontSize: 24 })}
                        >
                          中
                        </button>
                        <button
                          className="text-xs px-1 py-0.5 bg-gray-100 hover:bg-gray-200 rounded"
                          onClick={() => updateTextElement(element.id, { fontSize: 32 })}
                        >
                          大
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <label className="text-xs text-gray-600 w-12">颜色:</label>
                      <input
                        type="color"
                        value={element.color}
                        onChange={e => updateTextElement(element.id, { color: e.target.value })}
                        className="w-8 h-6 rounded border border-gray-300"
                      />
                      <div className="flex gap-1 flex-1">
                        <button
                          className="w-6 h-6 rounded border border-gray-300 bg-black"
                          onClick={() => updateTextElement(element.id, { color: "black" })}
                          title="黑色"
                        />
                        <button
                          className="w-6 h-6 rounded border border-gray-300 bg-white"
                          onClick={() => updateTextElement(element.id, { color: "white" })}
                          title="白色"
                        />
                        <button
                          className="w-6 h-6 rounded border border-gray-300 bg-red-500"
                          onClick={() => updateTextElement(element.id, { color: "#ef4444" })}
                          title="红色"
                        />
                        <button
                          className="w-6 h-6 rounded border border-gray-300 bg-blue-500"
                          onClick={() => updateTextElement(element.id, { color: "#3b82f6" })}
                          title="蓝色"
                        />
                        <button
                          className="w-6 h-6 rounded border border-gray-300 bg-yellow-500"
                          onClick={() => updateTextElement(element.id, { color: "#eab308" })}
                          title="黄色"
                        />
                        <button
                          className="w-6 h-6 rounded border border-gray-300 bg-green-500"
                          onClick={() => updateTextElement(element.id, { color: "#22c55e" })}
                          title="绿色"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 py-4">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6" onClick={handleGenerateMeme}>
                生成梗图
              </Button>
              {/* <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-5 rounded-full cursor-pointer transition-colors ${
                    showOptions ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  onClick={() => setShowOptions(!showOptions)}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full mt-0.5 transition-transform ${
                      showOptions ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </div>
                <span className="text-sm text-black">选项</span>
              </div> */}
            </div>

            {/* <div>
              <Button variant="outline" size="sm">
                新建梗图模板
              </Button>
            </div> */}
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-black pb-8">
        <div className="space-x-4">
          <a
            href="https://leeduckgo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            个人主页
          </a>
          <span>Twitter:</span>
          <a
            href="https://x.com/0xleeduckgo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            0xleeduckgo
          </a>
        </div>
        <div className="mt-2 space-x-4">
          <a
            href="https://aidimsum.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            AI 点心实验室
          </a>
          {/* <span>打赏：</span>
          <a
            href="https://lab.magiconch.com/nbnhhsh/sponsor.png"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            二维码
          </a> */}
        </div>
      </footer>

      {/* Meme Generation Modal */}
      {showMemeModal && generatedMemeUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-screen overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-black">梗图生成完成！</h3>
              <button
                onClick={closeMemeModal}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="text-center mb-4">
              <img
                src={generatedMemeUrl}
                alt="Generated Meme"
                className="max-w-full h-auto rounded shadow-lg mx-auto"
              />
            </div>
            
            <div className="flex gap-3 justify-center">
              <Button
                onClick={downloadMeme}
                className="bg-green-500 hover:bg-green-600 text-white px-6"
              >
                下载梗图
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
