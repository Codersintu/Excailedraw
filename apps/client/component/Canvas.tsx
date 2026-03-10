
import { Game } from "@/draw/game"
import { ArrowRight, Circle, Eraser, Hand, JoystickIcon, LineChart, Minus, Pencil, Pentagon, PersonStanding, PersonStandingIcon, RectangleCircle, Square, Triangle } from "lucide-react"
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
        const game = new Game(
            canvasRef.current,
            roomId,
            socket,
            toolRef
        );
        return () => {
            (game as any).destroy?.();
        };

    }, [canvasRef, socket, roomId])
    return (
        <div className="relative  overflow-hidden ">
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}></canvas>
           {/* inviteperson Icon */}
            <div className="fixed top-4  right-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-white cursor-pointer font-bold hover:text-gray-400"><path d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" /></svg></div>
        {/* shape Icon */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2  bg-white flex gap-6 p-2 rounded-full shadow-md cursor-pointer">
                <Square onClick={() => setSelectedTool("rect")} className={`w-8 h-8 hover:bg-gray-300 rounded-md p-1 ${selectedTool === "rect" ? "bg-gray-500" : ""}`} />
                <Circle onClick={() => setSelectedTool("circle")} className={`w-8 h-8 hover:bg-gray-300 rounded-md p-1 ${selectedTool === "circle" ? "bg-gray-500" : ""}`} />
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