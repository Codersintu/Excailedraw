
import { Game } from "@/draw/game"
import { ArrowRight, Circle, Eraser, Hand, LineChart, Minus, Pencil, Pentagon, RectangleCircle, Square, Triangle } from "lucide-react"
import { useEffect, useRef, useState } from "react"

function Canvas({ roomId, socket }: {
    roomId: string,
    socket: WebSocket
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [selectedTool, setSelectedTool] = useState<"rect" | "circle" | "line" | "arrow" | "triangle" | "pentagon" | "pencil" | "eraser" | "hand">("rect");
    const toolRef = useRef(selectedTool);
    useEffect(() => {
         toolRef.current = selectedTool;
    }, [selectedTool])
    useEffect(() => {
        if (!canvasRef.current || !socket) return;
         const game=   new Game(
                canvasRef.current,
                roomId,
                socket,
                toolRef
            );
        return () => {
            (game as any).destroy?.();
        };

    }, [canvasRef,socket, roomId])
    return (
        <div className="relative  overflow-hidden ">
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2  bg-white flex gap-6 p-2 rounded-full shadow-md cursor-pointer">
                <Square onClick={() => setSelectedTool("rect")} className={`w-8 h-8 hover:bg-gray-300 rounded-md p-1 ${selectedTool === "rect" ? "bg-gray-500" : ""}`} />
                <Circle onClick={()=> setSelectedTool("circle")} className={`w-8 h-8 hover:bg-gray-300 rounded-md p-1 ${selectedTool === "circle" ? "bg-gray-500" : ""}`} />
                <Minus onClick={() => setSelectedTool("line")} className={`w-8 h-8 hover:bg-gray-300 rounded-md p-1 ${selectedTool === "line" ? "bg-gray-500" : ""}`} />       
                <ArrowRight onClick={() => setSelectedTool("arrow")} className={`w-8 h-8 hover:bg-gray-300 rounded-md p-1 ${selectedTool === "arrow" ? "bg-gray-500" : ""}`} />  
                <Triangle onClick={() => setSelectedTool("triangle")} className={`w-8 h-8 hover:bg-gray-300 rounded-md p-1 ${selectedTool === "triangle" ? "bg-gray-500" : ""}`} />   
                <Pentagon onClick={() => setSelectedTool("pentagon")} className={`w-8 h-8 hover:bg-gray-300 rounded-md p-1 ${selectedTool === "pentagon" ? "bg-gray-500" : ""}`} />    
                <Pencil onClick={() => setSelectedTool("pencil")} className={`w-8 h-8 hover:bg-gray-300 rounded-md p-1 ${selectedTool === "pencil" ? "bg-gray-500" : ""}`} /> 
                <Eraser onClick={() => setSelectedTool("eraser")} className={`w-8 h-8 hover:bg-gray-300 rounded-md p-1 ${selectedTool === "eraser" ? "bg-gray-500" : ""}`} />   
                <Hand onClick={() => setSelectedTool("hand")} className={`w-8 h-8 hover:bg-gray-300 rounded-md p-1 ${selectedTool === "hand" ? "bg-gray-500" : ""}`} />  
            </div>
        </div>
    )
}

export default Canvas