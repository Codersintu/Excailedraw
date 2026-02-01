
import existingCanvasShape from "./http"

export type Shape = {
    type: "rect",
    startX: number,
    startY: number,
    width: number,
    height: number
} | {
    type: "circle",
    centerX: number,
    centerY: number,
    radius: number
} | {
    type: "line",
    startX: number,
    startY: number,
    endX: number,
    endY: number
} | {
    type: "arrow",
    startX: number,
    startY: number,
    endX: number,
    endY: number
} | {
    type: "triangle",
    point1X: number,
    point1Y: number,
    point2X: number,
    point2Y: number,
    point3X: number,
    point3Y: number

} | {
    type: "pentagon",
    centerX: number,
    centerY: number,
    radius: number
} | {
    type: "pencil",
    points: { x: number, y: number }[]
} | {
    type: "eraser",
    points: { x: number, y: number }[]
}

export class Game {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private roomId: string
    private socket: WebSocket
    private startX: number
    private startY: number
    private clicked: boolean
    private toolRef: React.RefObject<string>
    private existingShape: Shape[]
    private viewPortTransform: { x: number, y: number, scale: number }
    private isPanning: boolean = false;

    private async boot() {
        await this.init();
        this.clearCanvas();
        this.initHandler();
        this.mouseHandler();
    }
    private activeStroke: Shape | null = null;
    constructor(
        canvas: HTMLCanvasElement,
        roomId: string,
        socket: WebSocket,
        toolRef: React.RefObject<string>
    ) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.existingShape = [];
        this.socket = socket;
        this.roomId = roomId;
        this.startX = 0;
        this.startY = 0;
        this.clicked = false;
        this.toolRef = toolRef;
        void this.boot();
        this.viewPortTransform = { x: 0, y: 0, scale: 1 };
    }


    async init() {
        this.existingShape = await existingCanvasShape(this.roomId);
    }

    initHandler() {
        this.socket.onmessage = (event) => {
            const messages = JSON.parse(event.data);
            if (!messages || messages.type !== "chat") return;
            if (messages.type === "chat") {
                const parsed = JSON.parse(messages.message);
                if (!parsed?.shape) return;
                this.existingShape.push(parsed.shape);
                this.clearCanvas();
            }

            if (messages.type === "pan") {
                this.viewPortTransform.x = messages.x;
                this.viewPortTransform.y = messages.y;

                this.clearCanvas();
            }
        };
    }

    clearCanvas() {
        const ctx = this.ctx;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.fillStyle = "rgba(0,0,0)";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.setTransform(
            this.viewPortTransform.scale,
            0,
            0,
            this.viewPortTransform.scale,
            this.viewPortTransform.x,
            this.viewPortTransform.y
        );

        this.existingShape.map((shape) => {
            if (!shape) return;
            this.ctx.strokeStyle = "rgba(255,255,255)";
            if (shape.type === "rect") {
                this.ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height)
            } else if (shape.type === "circle") {
                this.ctx.beginPath()
                this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2)
                this.ctx.stroke()
            } else if (shape.type === "line") {
                this.ctx.beginPath()
                this.ctx.moveTo(shape.startX, shape.startY)
                this.ctx.lineTo(shape.endX, shape.endY)
                this.ctx.stroke()
            } else if (shape.type === "triangle") {
                this.ctx.beginPath()
                this.ctx.moveTo(shape.point1X, shape.point1Y)
                this.ctx.lineTo(shape.point2X, shape.point2Y)
                this.ctx.lineTo(shape.point3X, shape.point3Y)
                this.ctx.lineTo(shape.point1X, shape.point1Y)
                this.ctx.stroke()
            } else if (shape.type === "pentagon") {
                const centerX = shape.centerX;
                const centerY = shape.centerY;
                const radius = shape.radius;
                this.ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                    const xPos = centerX + radius * Math.cos(angle);
                    const yPos = centerY + radius * Math.sin(angle);
                    if (i === 0) {
                        this.ctx.moveTo(xPos, yPos);
                    } else {
                        this.ctx.lineTo(xPos, yPos);
                    }
                }
                this.ctx.closePath();
                this.ctx.stroke();
            } else if (shape.type === "pencil") {
                if (shape.points.length < 2) return;
                this.ctx.beginPath();
                this.ctx.moveTo(shape.points[0].x, shape.points[0].y);
                for (let i = 1; i < shape.points.length; i++) {
                    this.ctx.lineTo(shape.points[i].x, shape.points[i].y);
                }
                this.ctx.stroke();
            } else if (shape.type === "eraser") {
                if (shape.points.length < 2) return;
                this.ctx.save();
                this.ctx.globalCompositeOperation = 'destination-out';
                this.ctx.lineWidth = 15;
                this.ctx.lineCap = 'round';
                this.ctx.beginPath();
                this.ctx.moveTo(shape.points[0].x, shape.points[0].y);
                for (let i = 1; i < shape.points.length; i++) {
                    this.ctx.lineTo(shape.points[i].x, shape.points[i].y);
                }
                this.ctx.stroke();
                this.ctx.restore();
            }


        })
    }
    getMousePos(e?: MouseEvent) {

        if (!e) return { x: 0, y: 0 };
        const rect = this.canvas.getBoundingClientRect();
        console.log("viewPortTransform:", this.viewPortTransform);
        console.log("Mouse Event Client:", e.clientX, e.clientY);
        console.log("Canvas Rect:", rect.left, rect.top);
        return { x: (e.clientX - rect.left - this.viewPortTransform.x) / this.viewPortTransform.scale, y: (e.clientY - rect.top - this.viewPortTransform.y) / this.viewPortTransform.scale };

    }


    mouseHandler() {
        // mouseDown event
        const onMouseDown = (e: MouseEvent) => {
            this.clicked = true;
            const { x, y } = this.getMousePos(e);

            this.startX = x;
            this.startY = y;

            if (this.toolRef.current === "pencil") {
                this.activeStroke = { type: "pencil", points: [{ x: this.startX, y: this.startY }] };
            }
            if (this.toolRef.current === "eraser") {
                this.activeStroke = { type: "eraser", points: [{ x, y }] };
            }
            if (this.toolRef.current === "hand") {
                this.isPanning = true;
                return;
            }
        };

        // mouseUp event
        const onMouseUp = (e: MouseEvent) => {
            this.clicked = false;
            const { x, y } = this.getMousePos(e);
            const width = x - this.startX;
            const height = y - this.startY;

            let shape: Shape | null = null;


            if (this.toolRef.current === "rect") {
                shape = { type: "rect", startX: this.startX, startY: this.startY, width, height };
            } else if (this.toolRef.current === "circle") {
                shape = { type: "circle", centerX: this.startX, centerY: this.startY, radius: Math.hypot(width, height) };
            } else if (this.toolRef.current === "line") {
                shape = { type: "line", startX: this.startX, startY: this.startY, endX: x, endY: y };
            } else if (this.toolRef.current === "triangle") {
                shape = { type: "triangle", point1X: this.startX, point1Y: this.startY, point2X: x, point2Y: y, point3X: this.startX - (x - this.startX), point3Y: y };
            } else if (this.toolRef.current === "pentagon") {
                const radius = Math.hypot(width, height);
                shape = { type: "pentagon", centerX: this.startX, centerY: this.startY, radius };
            } else if (this.toolRef.current === "pencil" && this.activeStroke?.type === "pencil") {
                if (this.activeStroke.points.length >= 2) {
                    shape = this.activeStroke;
                }

            } else if (this.toolRef.current === "eraser") {
                shape = this.activeStroke;
            } else if (this.toolRef.current === "hand") {
                this.isPanning = false;
                return;
            }
            if (!shape) return;

            this.existingShape.push(shape);
            this.clearCanvas();

            this.socket.send(JSON.stringify({
                type: "chat",
                message: JSON.stringify({ shape }),
                roomId: Number(this.roomId),
            }));
        };

        // mouseMove event
        const onMouseMove = (e: MouseEvent) => {
            if (!this.clicked) return;
            const { x, y } = this.getMousePos(e);
            const width = x - this.startX;
            const height = y - this.startY;

            this.clearCanvas();
            this.ctx.strokeStyle = "rgba(255,255,255)";

            if (this.toolRef.current === "rect") {
                this.ctx.strokeRect(this.startX, this.startY, width, height);
            } else if (this.toolRef.current === "circle") {
                const radius = Math.hypot(width, height);
                this.ctx.beginPath();
                this.ctx.arc(this.startX, this.startY, radius, 0, Math.PI * 2);
                this.ctx.stroke();
            } else if (this.toolRef.current === "line") {
                this.ctx.beginPath();
                this.ctx.moveTo(this.startX, this.startY);
                this.ctx.lineTo(x, y);
                this.ctx.stroke();
            } else if (this.toolRef.current === "triangle") {
                const point1X = this.startX;
                const point1Y = this.startY;
                const point2X = x;
                const point2Y = y;
                const point3X = this.startX - (x - this.startX);
                const point3Y = y;
                this.ctx.beginPath();
                this.ctx.moveTo(point1X, point1Y);
                this.ctx.lineTo(point2X, point2Y);
                this.ctx.lineTo(point3X, point3Y);
                this.ctx.lineTo(point1X, point1Y);
                this.ctx.stroke();
            } else if (this.toolRef.current === "pentagon") {
                const radius = Math.hypot(width, height);
                const centerX = this.startX;
                const centerY = this.startY;
                this.ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
                    const xPos = centerX + radius * Math.cos(angle);
                    const yPos = centerY + radius * Math.sin(angle);
                    if (i === 0) {
                        this.ctx.moveTo(xPos, yPos);
                    } else {
                        this.ctx.lineTo(xPos, yPos);
                    }
                }
                this.ctx.closePath();
                this.ctx.stroke();
            }

            if (this.toolRef.current === "pencil" && this.activeStroke?.type === "pencil") {
                const points = this.activeStroke.points;
                const last = points[points.length - 1];
                if (Math.hypot(x - last.x, y - last.y) >= 2) {
                    points.push({ x, y });
                }
                this.ctx.beginPath();
                this.ctx.moveTo(points[0].x, points[0].y);
                for (let i = 1; i < points.length; i++) {
                    this.ctx.lineTo(points[i].x, points[i].y);
                }
                this.ctx.stroke();
            }
            if (this.toolRef.current === "eraser" && this.activeStroke?.type === "eraser") {
                const points = this.activeStroke.points;
                const last = points[points.length - 1];
                if (Math.hypot(x - last.x, y - last.y) >= 2) {
                    points.push({ x, y });
                }

                if (points.length < 2) return;
                this.ctx.save();
                this.ctx.globalCompositeOperation = 'destination-out';
                this.ctx.lineWidth = 15;
                this.ctx.lineCap = 'round';

                this.ctx.beginPath();
                this.ctx.moveTo(points[0].x, points[0].y);
                for (let i = 1; i < points.length; i++) {
                    this.ctx.lineTo(points[i].x, points[i].y);
                }

                this.ctx.stroke();
                this.ctx.restore();

            }

            if (this.toolRef.current === "hand" && this.isPanning) {
                this.viewPortTransform.x += e.movementX;
                this.viewPortTransform.y += e.movementY;
                this.clearCanvas();
                this.socket.send(JSON.stringify({
                    type: "pan",
                    x: this.viewPortTransform.x,
                    y: this.viewPortTransform.y,
                    roomId: Number(this.roomId)
                }));
                return;
            }
        };

        this.canvas.addEventListener("wheel", (e) => {
            e.preventDefault();

            const zoomIntensity = 0.1;

            const rect = this.canvas.getBoundingClientRect();

            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const worldX = (mouseX - this.viewPortTransform.x) / this.viewPortTransform.scale;
            const worldY = (mouseY - this.viewPortTransform.y) / this.viewPortTransform.scale;

            // change scale
            const direction = e.deltaY > 0 ? -1 : 1;
            const factor = 1 + zoomIntensity * direction;

            this.viewPortTransform.scale *= factor;

            this.viewPortTransform.x = mouseX - worldX * this.viewPortTransform.scale;
            this.viewPortTransform.y = mouseY - worldY * this.viewPortTransform.scale;

            this.clearCanvas();
        });



        this.canvas.addEventListener("mousedown", onMouseDown);
        this.canvas.addEventListener("mouseup", onMouseUp);
        this.canvas.addEventListener("mousemove", onMouseMove);
    }


}