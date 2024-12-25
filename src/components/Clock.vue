<template>
    <div class="clock" :style="{ width: String(size) + 'px' }">
        <canvas :width="size" :height="size" ref="clockCanvas" />
    </div>
</template>

<script>
import { ref, onMounted } from "vue"

export default {
    name: "Clock",
    props: {
        size: {
            type: Number,
            default: 400,
        },
        timeFormat: {
            type: String,
            default: "24hour",
        },
        hourFormat: {
            type: String,
            default: "standard",
        },
    },
    setup (props) {
        const time = ref({})
        const radius = ref(props.size / 2)
        const drawingContext = ref(null)
        const clockCanvas = ref({})
        const draw24hour = ref(props.timeFormat.toLowerCase().trim() === "24hour")
        const drawRoman = ref(
            !draw24hour.value && props.hourFormat.toLowerCase().trim() === "roman"
        )
        const timerId = ref({})

        const drawFace = (ctx, radius) => {
            ctx.beginPath()
            ctx.arc(0, 0, radius, 0, 2 * Math.PI)
            ctx.fillStyle = "white"
            ctx.fill()

            const grad = ctx.createRadialGradient(
                0,
                0,
                radius * 0.95,
                0,
                0,
                radius * 1.05
            )
            grad.addColorStop(0, "#333")
            grad.addColorStop(0.5, "white")
            grad.addColorStop(1, "#333")
            ctx.strokeStyle = grad
            ctx.lineWidth = radius * 0.1
            ctx.stroke()
        }

        const drawNumbers = (ctx, radius) => {
            const romans = [
                "I",
                "II",
                "III",
                "IV",
                "V",
                "VI",
                "VII",
                "VIII",
                "IX",
                "X",
                "XI",
                "XII",
            ]
            const fontBig = radius * 0.15 + "px Arial"
            const fontSmall = radius * 0.075 + "px Arial"
            let ang, num

            ctx.textBaseline = "middle"
            ctx.textAlign = "center"
            for (num = 1; num < 13; num++) {
                ang = (num * Math.PI) / 6
                ctx.rotate(ang)
                ctx.translate(0, -radius * 0.78)
                ctx.rotate(-ang)
                ctx.font = fontBig
                ctx.fillStyle = "black"
                ctx.fillText(drawRoman.value ? romans[ num - 1 ] : num.toString(), 0, 0)
                ctx.rotate(ang)
                ctx.translate(0, radius * 0.78)
                ctx.rotate(-ang)

                // Draw inner numerals for 24 hour time format
                if (draw24hour.value) {
                    ctx.rotate(ang)
                    ctx.translate(0, -radius * 0.6)
                    ctx.rotate(-ang)
                    ctx.font = fontSmall
                    ctx.fillStyle = "red"
                    ctx.fillText((num + 12).toString(), 0, 0)
                    ctx.rotate(ang)
                    ctx.translate(0, radius * 0.6)
                    ctx.rotate(-ang)
                }
            }

            // Write author text
            ctx.font = fontSmall
            ctx.fillStyle = "#3D3B3D"
            ctx.translate(0, radius * 0.3)
            ctx.translate(0, -radius * 0.3)
        }

        const drawTicks = (ctx, radius) => {
            let numTicks, tickAng, tickX, tickY

            for (numTicks = 0; numTicks < 60; numTicks++) {
                tickAng = (numTicks * Math.PI) / 30
                tickX = radius * Math.sin(tickAng)
                tickY = -radius * Math.cos(tickAng)

                ctx.beginPath()
                ctx.lineWidth = radius * 0.01
                ctx.moveTo(tickX, tickY)
                if (numTicks % 5 === 0) {
                    ctx.lineTo(tickX * 0.88, tickY * 0.88)
                } else {
                    ctx.lineTo(tickX * 0.92, tickY * 0.92)
                }
                ctx.stroke()
            }
        }

        const drawHand = (ctx, position, length, width, color) => {
            color = color || "black"
            ctx.beginPath()
            ctx.lineWidth = width
            ctx.lineCap = "round"
            ctx.fillStyle = color
            ctx.strokeStyle = color
            ctx.moveTo(0, 0)
            ctx.rotate(position)
            ctx.lineTo(0, -length)
            ctx.stroke()
            ctx.rotate(-position)
        }

        const drawTime = (ctx, radius) => {
            const now = time.value
            let hour = now.getHours()
            let minute = now.getMinutes()
            let second = now.getSeconds()

            // hour
            hour %= 12
            hour =
                (hour * Math.PI) / 6 +
                (minute * Math.PI) / (6 * 60) +
                (second * Math.PI) / (360 * 60)
            drawHand(ctx, hour, radius * 0.5, radius * 0.05)
            // minute
            minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60)
            drawHand(ctx, minute, radius * 0.8, radius * 0.05)
            // second
            second = (second * Math.PI) / 30
            drawHand(ctx, second, radius * 0.9, radius * 0.02, "red")
        }

        const tick = () => {
            time.value = new Date()
            const r = radius.value
            let ctx = drawingContext.value
            drawFace(ctx, r)
            drawNumbers(ctx, r)
            drawTicks(ctx, r)
            drawTime(ctx, r)
        }

        onMounted(() => {
            drawingContext.value = clockCanvas.value.getContext("2d")
            drawingContext.value.translate(radius.value, radius.value)
            radius.value *= 0.9

            timerId.value = setInterval(() => tick(), 1000)
        })

        return { clockCanvas }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clock {
    padding: 5px;
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
}
</style>