<template>
    <Frame>
        <Page>
            <ActionBar title="Solar System {N}-Vue"></ActionBar>
            <GridLayout columns="*" rows="*">

                <!-- because this controlPanel layout is "below" the AR node (z-index-wise) it's not shown to the user -->
                <StackLayout ref="controlPanel" id="controlPanel" class="control-panel">
                    <Label text="Orbit Speed:" horizontalAlignment="center"></Label>
                    <Slider v-model="orbitSpeed" width="100%" minValue="-30" maxValue="50" horizontalAlignment="center">
                    </Slider>
                    <Label text="Rotation Speed:" horizontalAlignment="center"></Label>
                    <Slider v-model="rotationSpeed" width="100%" minValue="-20" maxValue="50"
                        horizontalAlignment="center"></Slider>
                    <Label text="Sun size:" horizontalAlignment="center"></Label>
                    <Slider v-model="sunSize" width="100%" minValue="0" maxValue="100" horizontalAlignment="center">
                    </Slider>
                </StackLayout>

                <!-- same comment as above -->
                <StackLayout id="orbitalName" class="orbital-name" horizontalAlignment="center"
                    verticalAlignment="center">
                    <Label :text="orbitalName" horizontalAlignment="center" verticalAlignment="center"></Label>
                </StackLayout>

                <!-- this will hide the above layouts during the time the app is loaded and the AR camera view is showing -->
                <StackLayout class="cover">
                </StackLayout>

                <AR debugLevel="FEATURE_POINTS" planeDetection="HORIZONTAL" planeOpacity="0.25"
                    :planeMaterial="planeMaterial" @arLoaded="arLoaded" @planeTapped="loadSolarSystem">
                </AR>

                <!-- adding 'isUserInteractionEnabled' makes sure this layer doesn't steal taps from layers below (esp. the AR one) -->
                <AbsoluteLayout isUserInteractionEnabled="false" v-if="gameEnabled">
                    <Img src="~/assets/images/crosshair.png" width="32" height="32" opacity="0.75" :left="center.x - 16"
                        :top="center.y - center.yCompensation" />
                    <Img src="~/assets/images/arrow.png" @loaded="gameArrowLoaded" width="32" height="32"
                        :left="game.objectPositionOffscreenIndicator.x"
                        :top="game.objectPositionOffscreenIndicator.y" />
                </AbsoluteLayout>

                <!-- because this bit is "above" the AR node, it _is_ visible -->
                <GridLayout rows="auto, auto" columns="*, auto" class="ar-info" verticalAlignment="top">
                    <Label row="0" col="0" :text="arLabel" verticalAlignment="top"></Label>
                    <StackLayout row="0" col="1" orientation="horizontal" horizontalAlignment="right"
                        verticalAlignment="top" v-if="solarSystemLoaded">
                        <Img src="~/assets/images/telescope.png" width="32" height="32" marginRight="10" />
                        <Switch v-model="gameEnabled" color="white" verticalAlignment="top"></Switch>
                    </StackLayout>

                    <Label row="1" col="0" :text="simulatedDateFormatted" style="font-size: 12"></Label>
                    <Label row="1" col="1" :text="game.elapsedTimeFormatted" style="font-size: 12"
                        horizontalAlignment="right" v-if="solarSystemLoaded"></Label>
                </GridLayout>

            </GridLayout>
        </Page>
    </Frame>

</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'nativescript-vue'
import { Page, isIOS, Color, Screen } from "@nativescript/core"
import { AR } from "nativescript-ar"
import { TNSPlayer } from "@nativescript-community/audio"
import { ToastPosition, Toasty } from "@triniwiz/nativescript-toasty"
import { Vibrate } from "nativescript-vibrate"



declare const SCNTransaction: any

let vibrator
let audioPlayer

const width = Screen.mainScreen.widthDIPs
const height = Screen.mainScreen.heightDIPs
const centerX = width / 2
const centerY = height / 2

console.log(`::::: screen = ${width} x ${height}`)

const materialPrefix = isIOS ? "Orbitals.scnassets/" : ""
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const DAY_MS = 24 * 60 * 60 * 1000

// if this is set to 1 (which is more realistic), you'd have a hard time seeing all planets
const SCALE_FACTOR = 5

const SUN_DEFAULT_SCALE = .9
const ONE_AU = 0.75 // 1 AU (Astronomical Unit), which is ~150 million km (the distance from the Earth to the Sun)
const EARTH_TO_MOON_METERS = 0.15
const EARTH_ORBIT_SPEED = 26

const GAME_OBJECTS = ["Mars", "Earth", "Neptune", "Saturn", "Venus", "Earth's moon", "Mercury", "Jupiter", "Uranus"]

// Saturn now officially has 82 moons, so let's add some )
const NR_OF_SATURN_MOONS = isIOS ? 82 : 20 // not sure how performance is affected on Android, so using a safer number
const saturnMoonColors = ["red", "yellow", "blue", "green", "purple", "orange", "pink", "gray", "brown", "black"]
const saturnMoonNColors: Color[] = []

saturnMoonColors.forEach(s => saturnMoonNColors.push(new Color(s)))

interface StarMaterial {
    diffuse: string;
    normal: string;
    roughness: string;
    emission: Color;
}

interface StarInfoBase {
    distance: number;
    orbitSpeed: number;
    scale: number;
    tilt: number;
    materials: StarMaterial[] | Color[]
}
interface Vec3D {
    x: number;
    y: number;
    z: number;
}
interface StarLifeInfo {
    name: string;
    position: Vec3D;
    rotation: Vec3D;
    scale: number;
}
interface StarInfo extends StarInfoBase {
    name?: string;
    children?: StarInfo[];
    life?: StarLifeInfo[];
}
const saturnMoons: StarInfo[] = []

for (let i = 0; i < NR_OF_SATURN_MOONS; i++) {
    saturnMoons.push({
        distance: 0.35 + (Math.random() / 5),
        orbitSpeed: -150 * Math.random(),
        scale: (Math.random() / 50) * SCALE_FACTOR,
        tilt: i * 17,
        materials: isIOS ? [{
            diffuse: materialPrefix + "Luna_Mat_baseColor.png",
            normal: materialPrefix + "Luna_Mat_normal.png",
            roughness: materialPrefix + "Luna_Mat_occlusionRoughnessMetallic.png",
            emission: saturnMoonNColors[Math.round(Math.random() * 9)]
        }] : [saturnMoonNColors[Math.round(Math.random() * 9)]],
    })
}

const solarSystemDefinition: StarInfo = {
    name: "Sun",
    distance: 0,
    orbitSpeed: 0,
    scale: SUN_DEFAULT_SCALE,
    materials: [{
        diffuse: materialPrefix + "Sol_Opaque_Mat_baseColor.png",
        emission: materialPrefix + "Sol_Opaque_Mat_emissive.png"
    }],
    tilt: 0,
    children: [{
        name: "Mercury",
        distance: 0.4 * ONE_AU,
        orbitSpeed: 47,
        materials: [{
            diffuse: materialPrefix + "Mercury_Mat_baseColor.png",
            normal: materialPrefix + "Mercury_Mat_normal.png",
            roughness: materialPrefix + "Mercury_Mat_occlusionRoughnessMetallic.png"
        }],
        scale: 0.019 * SCALE_FACTOR,
        tilt: 0.03
    }, {
        name: "Venus",
        distance: 0.7 * ONE_AU,
        orbitSpeed: 35,
        materials: [{
            diffuse: materialPrefix + "Venus_Atmosphere_Mat_baseColor.png",
            roughness: materialPrefix + "Venus_Atmosphere_Mat_occlusionRoughnessMetallic.png"
        }],
        scale: 0.0475 * SCALE_FACTOR,
        tilt: 2.64
    }, {
        name: "Earth",
        distance: ONE_AU,
        orbitSpeed: EARTH_ORBIT_SPEED,
        scale: 0.05 * SCALE_FACTOR,
        tilt: 23.4,
        materials: [{
            diffuse: materialPrefix + "Earth_Mat_baseColor.png",
            normal: materialPrefix + "Earth_Mat_normal.png",
            roughness: materialPrefix + "Earth_Mat_occlusionRoughnessMetallic.png"
        }],
        children: [{
            name: "Earth's moon",
            distance: EARTH_TO_MOON_METERS,
            orbitSpeed: 0, // "locked" with Earth
            scale: 0.018 * SCALE_FACTOR,
            tilt: 6.68,
            materials: [{
                diffuse: materialPrefix + "Luna_Mat_baseColor.png",
                normal: materialPrefix + "Luna_Mat_normal.png",
                roughness: materialPrefix + "Luna_Mat_occlusionRoughnessMetallic.png"
            }],
            life: [{
                // Snorlax is on the dark side of the moon - that's why we've never seen him!
                name: "Snorlax",
                position: { x: .27, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: -90 },
                scale: 0.001 * (isIOS ? 1 : 100)
            }]
        }]
    }, {
        name: "Mars",
        distance: 1.5 * ONE_AU,
        orbitSpeed: 24,
        materials: [{
            diffuse: materialPrefix + "Mars_mat_baseColor.png",
            normal: materialPrefix + "Mars_mat_normal.png"
        }],
        scale: 0.0265 * SCALE_FACTOR,
        tilt: 25.19,
        // Elon's mission is foobar as the place is crawling with nasty creatures!
        life: [
            {
                name: "Caterpie",
                position: { x: -.3, y: 0, z: 0 },
                rotation: { x: 0, y: 90, z: 0 },
                scale: 0.005 * (isIOS ? 1 : 50)
            },
            {
                name: "Caterpie",
                position: { x: .3, y: 0, z: 0 },
                rotation: { x: 0, y: 90, z: 0 },
                scale: 0.003 * (isIOS ? 1 : 50)
            },
            {
                name: "Caterpie",
                position: { x: 0, y: .3, z: 0 },
                rotation: { x: 0, y: 90, z: 90 },
                scale: 0.004 * (isIOS ? 1 : 50)
            },
            {
                name: "Caterpie",
                position: { x: 0, y: 0, z: .3 },
                rotation: { x: 0, y: 90, z: 90 },
                scale: 0.006 * (isIOS ? 1 : 50)
            }]
    }, {
        name: "Jupiter",
        distance: 3 * ONE_AU, // IRL this is 5 AU
        orbitSpeed: 30,
        materials: [{
            diffuse: materialPrefix + "Jupiter_Mat_baseColor.png"
        }],
        scale: 0.16 * SCALE_FACTOR,
        tilt: 3.13,
        life: [
            {
                name: "Spider",
                position: { x: 0.263, y: 0, z: 0 },
                rotation: { x: 0, y: 0, z: -90 },
                scale: 0.0005 * (isIOS ? 1 : 2000)
            }, {
                name: "WalkingBoy",
                position: { x: 0, y: 0.263, z: 0 },
                rotation: { x: 0, y: 90, z: 0 },
                scale: 0.001 * (isIOS ? 1 : 70)
            }
        ]
    }, {
        name: "Saturn",
        distance: 6 * ONE_AU, // IRL this is 10 AU
        orbitSpeed: 9,
        materials: [{
            diffuse: materialPrefix + "SaturnPlanet_Opaque_Mat_baseColor.png"
        }],
        scale: 0.1325 * SCALE_FACTOR,
        tilt: 26.73,
        children: saturnMoons
    }, {
        name: "Uranus",
        distance: 9 * ONE_AU, // IRL this is 20 AU
        orbitSpeed: 7,
        materials: [{
            diffuse: materialPrefix + "UranusGlobe_Mat_baseColor.png"
        }],
        scale: 0.1 * SCALE_FACTOR,
        tilt: 82.23
    }, {
        name: "Neptune",
        distance: 12 * ONE_AU, // IRL this is 30 AU
        orbitSpeed: 5,
        materials: [{
            diffuse: materialPrefix + "NeptuneGlobe_Mat_baseColor.png"
        }],
        scale: 0.074 * SCALE_FACTOR,
        tilt: 28.32
    }]
}

const fps = 60

// data part
const msg = ref('Hello World!')
const arLabel = ref('Find a surface and tap it')
const planeMaterial = ref(new Color("white"))
const solarSystemLoaded = ref(false)
const orbitalName = ref(undefined)
const simulatedDate = ref(new Date())
const simulatedDateFormatted = ref(undefined)
const gameEnabled = ref(false)

const game = ref({
    objectsToFind: [],
    interval: undefined,
    startTime: undefined,
    objectToFind: undefined,
    elapsedTimeFormatted: "Play Game",
    objectPositionOffscreenIndicator: {
        x: -1000,
        y: -1000
    },
    arrow: undefined
})
const orbitSpeed = ref(-15)
const rotationSpeed = ref(-15)
const sunSize = ref(50)
const hasControlPanel = ref(false)
const ar = ref(undefined)
const orbitals = ref([])
const rotators = ref([])
const center = ref({
    x: centerX,
    y: centerY,
    yCompensation: isIOS ? 104 : 180
})

// ref part

const controlPanel = ref()

// method part 
function gameArrowLoaded(event): void {
    game.value.arrow = event.object
}

function enableNativeAnimationsWithDurationOfSeconds(sec) {
    // TODO add animations (like this) to the plugin (this is a global setting, so only enabling it briefly
    if (isIOS) {
        SCNTransaction.animationDuration = sec
    }
}
function disableNativeAnimations() {
    if (isIOS) {
        SCNTransaction.animationDuration = 0
    }
}
function updateSimulatedDate(speed: number) {
    const d = new Date(simulatedDate.value.getTime() + ((speed / 2.3) * DAY_MS))
    simulatedDate.value = d
    simulatedDateFormatted.value = MONTHS[d.getMonth()] + " " + d.getFullYear()
}
function updateElapsedGameTime() {
    game.value.elapsedTimeFormatted = `${getElapsedGameTime()} sec`
}
function getElapsedGameTime() {
    return Math.round((new Date().getTime() - game.value.startTime) / 1000)
}
function findNextGameObject() {
    const nextObject = game.value.objectsToFind.length === 0 ? undefined : game.value.objectsToFind.pop()
    if (nextObject) {
        arLabel.value = `Try to find ${nextObject}`
        game.value.objectToFind = nextObject
        new Toasty({
            text: `Try to find ${nextObject}`
        }).setToastPosition(ToastPosition.CENTER).show()
    } else {
        giveFeedback()
        arLabel.value = `FINISHED in ${getElapsedGameTime()} seconds 🎉`
        gameEnabled.value = false
        new Toasty({
            text: `${getElapsedGameTime()} seconds 💪`
        }).setToastPosition(ToastPosition.CENTER).show()
    }
}
// 给与反馈
function giveFeedback() {
    getVibrator().vibrate()
    getAudioPlayer().play()
}
//获取并初始化震动
function getVibrator() {
    if (!vibrator) {
        vibrator = new Vibrate()
    }
    return vibrator
}
// 获取并初始化音频播放器
function getAudioPlayer() {
    if (!audioPlayer) {
        audioPlayer = new TNSPlayer()
        audioPlayer.initFromFile({
            audioFile: '~/assets/audio/success.mp3',
            loop: false
        })
    }
    return audioPlayer
}
//ar加载好后将对象注册到代码空间
function arLoaded(arLoadedEventData) {
    ar.value = arLoadedEventData.object
}
// 加载太阳系的数据
async function loadSolarSystem(arPlaneTappedEventData) {
    // we only need one solar system in our lives, right?
    if (solarSystemLoaded.value) {
        return
    }
    solarSystemLoaded.value = true

    const ar: AR = arPlaneTappedEventData.object

    const solarSystemNode = await ar.addNode({
        position: {
            x: arPlaneTappedEventData.position.x,
            y: arPlaneTappedEventData.position.y + 1.3, // a bit above the plane we tapped (in meters)
            z: arPlaneTappedEventData.position.z
        }
    })
    renderSolarSystemObject(ar, solarSystemDefinition, solarSystemNode)
    arLabel.value = "Now tap the sun for controls.."
    ar.togglePlaneVisibility(false)
    ar.setPlaneDetection("NONE")
    ar.setDebugLevel("NONE")
}

async function renderSolarSystemObject(ar, solarSystemObject, _parentNode) {
    try {
        const orbitNode = await ar.addNode({
            parentNode: _parentNode,
            rotation: {
                x: 0,
                y: 0,
                z: solarSystemObject.tilt
            }
        })
        orbitals.value.push({
            node: orbitNode,
            speed: solarSystemObject.orbitSpeed
        })
        try {
            const objectNode = await ar.addNode({
                parentNode: orbitNode,
                position: {
                    x: 0,
                    y: 0,
                    z: -solarSystemObject.distance
                }
            })
            rotators.value.push({
                node: objectNode,
                speed: solarSystemObject.orbitSpeed
            })
            const radius = 0.28
            try {
                const parentNode = ar.addSphere({
                    parentNode: objectNode,
                    scale: solarSystemObject.scale,
                    radius,
                    segmentCount: Math.min(80, Math.round(150 * solarSystemObject.scale)), // we want fewer segments for small objects (note: on iOS, the default is 48)
                    materials: solarSystemObject.materials,
                    position: solarSystemObject.position,
                    onTap: async () => {
                        if (!solarSystemObject.name) {
                            return
                        }

                        if (gameEnabled.value) {
                            new Toasty({
                                text: `${solarSystemObject.name} tapped`
                            }).setToastPosition(ToastPosition.BOTTOM).show()
                        } else {
                            arLabel.value = `${solarSystemObject.name} tapped`
                        }

                        // a bit of visual feedback
                        if (solarSystemObject.name !== "Sun" || hasControlPanel.value) {
                            growShrinkNode(objectNode)
                        }

                        if (solarSystemObject.name === "Sun") {
                            if (!hasControlPanel.value) {
                                hasControlPanel.value = true

                                const view = await ar.addUIView({
                                    position: { x: 0, y: .33, z: 0 },
                                    parentNode: objectNode,
                                    view: controlPanel.value._nativeView,
                                    scale: 0.5
                                })
                                setInterval(() => {
                                    try {
                                        let p = view.getWorldPosition()
                                        let c = ar.getCameraPosition()
                                        view.lookAtWorldPosition({
                                            x: c.x,
                                            y: p.y, // use the y of the view itself, otherwise it would tilt (look down at the camera) which is a bit weird
                                            z: c.z
                                        })
                                    } catch (e) {
                                        console.error(e)
                                    }
                                }, 1000 / fps / 4) // every fourth frame should suffice
                            }
                        }
                    }
                })

                // if a planet is near the center of the screen, we assume the user is 👀 at it
                if (solarSystemObject.name && solarSystemObject.name !== "Sun") {
                    let shouldFindNext = true

                    setInterval(() => {
                        if (gameEnabled.value && solarSystemObject.name === game.value.objectToFind) {
                            const positionOnScreen = objectNode.getPositionOnScreen()
                            const inRange = isInFocusRange(positionOnScreen.x, positionOnScreen.y)
                            if (inRange) {
                                if (shouldFindNext) {
                                    growShrinkNode(objectNode)
                                    arLabel.value = `You found ${solarSystemObject.name} 🥳`
                                    giveFeedback()
                                    shouldFindNext = false
                                    setTimeout(() => {
                                        findNextGameObject()
                                        shouldFindNext = true
                                    }, 1600)
                                }
                            } else {
                                const distL = objectNode.getDistanceTo({ x: 0, y: height / 2, z: 0 })
                                const distR = objectNode.getDistanceTo({ x: width, y: height / 2, z: 0 })
                                const distT = objectNode.getDistanceTo({ x: 0, y: 0, z: 0 })
                                const distB = objectNode.getDistanceTo({ x: 0, y: height, z: 0 })
                                const isOnLeftSide = distL < distR
                                const isOnTopSide = distT < distB

                                if (positionOnScreen.x < 0 || positionOnScreen.x > width) {
                                    game.value.objectPositionOffscreenIndicator.x = isOnLeftSide ? 0 : width
                                } else if (positionOnScreen.y < 0 || positionOnScreen.y > height) {
                                    game.value.objectPositionOffscreenIndicator.x = positionOnScreen.x
                                } else {
                                    game.value.objectPositionOffscreenIndicator.x = -1000 // place off screen
                                }
                                if (positionOnScreen.y < 0 || positionOnScreen.y > height) {
                                    game.value.objectPositionOffscreenIndicator.y = isOnTopSide ? 0 : height
                                } else if (positionOnScreen.x < 0 || positionOnScreen.x > width) {
                                    game.value.objectPositionOffscreenIndicator.y = positionOnScreen.y
                                } else {
                                    game.value.objectPositionOffscreenIndicator.y = -1000 // place off screen
                                }

                                if (game.value.objectPositionOffscreenIndicator.x >= 0 && game.value.objectPositionOffscreenIndicator.y >= 0) {
                                    let arrowRotation = Math.atan2(game.value.objectPositionOffscreenIndicator.y - (height / 2), game.value.objectPositionOffscreenIndicator.x - (width / 2))
                                    arrowRotation = arrowRotation * 180 / Math.PI
                                    game.value.arrow.style.transform = `rotate(${arrowRotation})`

                                    // make sure the arrow is shown
                                    if (game.value.objectPositionOffscreenIndicator.x === width) {
                                        game.value.objectPositionOffscreenIndicator.x -= 32
                                    }
                                    if (game.value.objectPositionOffscreenIndicator.y > 0) {
                                        game.value.objectPositionOffscreenIndicator.y -= 114
                                    }
                                }
                            }
                        }
                    }, 1000 / fps / 4) // every fourth frame
                }

                // add some life to planets )
                if (solarSystemObject.life) {
                    for (let life of solarSystemObject.life) {
                        try {
                            const name = isIOS
                                ? `PokemonModels.scnassets/${life.name}/${life.name}.dae`
                                : `${life.name}.glb`
                            await ar.addModel({
                                name,
                                parentNode,
                                position: life.position,
                                rotation: life.rotation,
                                scale: life.scale
                            })
                        } catch (error) {
                            console.log(`Error adding life: ${error}`)
                        }
                    }
                }

                // adding planet-specific tweaks here, just for fun/show :)
                if (solarSystemObject.name === "Earth") {
                    try {
                        let cloudDegreesPerSecond = 12
                        const earthClouds = await ar.addSphere({
                            position: { x: -.0001, y: 0, z: 0 },
                            parentNode,
                            radius: radius + (isIOS ? 0.015 : 0.05), // TODO this platform difference is not so nice
                            materials: [{
                                diffuse: materialPrefix + "Earth_Clouds_mat_baseColor.png"
                            }],
                            onTap: () => {
                                arLabel.value = solarSystemObject.name + " tapped, reversing clouds ☁ 🔁"
                                orbitalName.value = solarSystemObject.name
                                // GodMode: reverse the clouds!
                                cloudDegreesPerSecond = -1 * cloudDegreesPerSecond
                            }
                        })
                        setInterval(() => {
                            earthClouds.rotateBy({ x: 0, y: cloudDegreesPerSecond / fps, z: 0 })
                        }, 1000 / fps)
                    } catch (error) {
                        console.error(`Earth get error ${error}`)
                    }
                } else if (solarSystemObject.name === "Saturn") {
                    ar.addTube({
                        parentNode,
                        innerRadius: 0.1,
                        outerRadius: 1,
                        height: 0.01,
                        materials: [{
                            diffuse: materialPrefix + "saturn_loop.png",
                            transparency: 0.5
                        }]
                    }).catch(console.error)

                } else if (solarSystemObject.name === "Sun") {
                    let lastSunSize = sunSize.value
                    setInterval(() => {
                        if (lastSunSize !== sunSize.value) {
                            // let's animate this scaleTo this way, until we're able to pass in an animate object
                            enableNativeAnimationsWithDurationOfSeconds(.3)
                            setTimeout(() => disableNativeAnimations(), 350)
                            lastSunSize = sunSize.value
                            parentNode.scaleTo(0.016 * sunSize.value)
                        }
                    }, 500)
                }
            } catch (error) {
                console.error(`error adding sphere: ${error}`)
            }
            if (solarSystemObject.children) {
                solarSystemObject.children.forEach(child => {
                    renderSolarSystemObject(ar, child, objectNode)
                })
            }
        } catch (error) {
            console.error(`error adding objectNode: ${error}`)
        }
    } catch (error) {
        console.error(`error adding orbitNode: ${error}`)

    }
}
function isInFocusRange(x: number, y: number): boolean {
    return Math.abs(x - centerX) < 20 &&
        Math.abs(y - centerY) < 20
}

function growShrinkNode(objectNode): void {
    const scaleChange = .3
    enableNativeAnimationsWithDurationOfSeconds(.3)
    objectNode.scaleBy(scaleChange)
    setTimeout(() => {
        objectNode.scaleBy(-scaleChange)
        setTimeout(() => disableNativeAnimations(), .35)
    }, 300)
}

// watch part

watch(gameEnabled, (enabled: boolean) => {
    if (enabled) {
        new Toasty({
            text: `Hang on, shuffling...`
        }).setToastPosition(ToastPosition.CENTER).show()

        setTimeout(() => {
            orbitSpeed.value = 100
            setTimeout(() => {
                orbitSpeed.value = 0.13

                new Toasty({
                    text: `All set. Let's go 🚀`
                }).setToastPosition(ToastPosition.CENTER).show()

                game.value.objectsToFind.push(...GAME_OBJECTS)
                game.value.objectsToFind.sort(() => Math.random() - 0.5)

                setTimeout(() => {
                    game.value.startTime = new Date().getTime()
                    game.value.interval = setInterval(() => updateElapsedGameTime(), 1000)
                    findNextGameObject()
                    updateElapsedGameTime()
                }, 1200)
            }, 2000)
        }, 700)

    } else {
        if (game.value.interval) {
            clearInterval(game.value.interval)
            game.value.interval = undefined
            game.value.elapsedTimeFormatted = undefined
            game.value.objectsToFind = []
        }
    }
})

// hooks part

onMounted(() => {
    const animator = setInterval(() => {
        // this makes the orbitals rotate around their parent
        const orbitSpeedCompensation = orbitSpeed.value > 0 ? orbitSpeed.value : 1 / Math.max(1.5, Math.abs(orbitSpeed.value))
        orbitals.value.forEach(orbit => {
            orbit.node.rotateBy({
                x: 0,
                y: orbitSpeedCompensation * orbit.speed / fps,
                z: 0
            })
        })

        // and this makes the planets and moons rotate around their own axis
        const rotationSpeedCompensation = rotationSpeed.value > 0 ? rotationSpeed.value : 1 / Math.max(1.5, Math.abs(rotationSpeed.value))
        rotators.value.forEach(orbit => {
            orbit.node.rotateBy({
                x: 0,
                // TODO not happy with this difference between platforms
                y: (isIOS ? 6 : 2) * rotationSpeedCompensation * orbit.speed / fps,
                z: 0
            })
        })

        if (solarSystemLoaded.value) {
            updateSimulatedDate(orbitSpeedCompensation)
        }
    }, 1000 / fps)
})

</script>

<style scoped>
ActionBar {
    background-color: #53ba82;
    color: #ffffff;
}

.ar-info {
    padding: 14 16;
    color: black;
    background-color: white;
    opacity: .7;
}

.control-panel {
    width: 320;
    height: 320;
    padding: 24;
    opacity: 0.8;
    font-size: 24;
    color: white;
    border-radius: 10;
    background-color: cornflowerblue;
}

.control-panel Label {
    padding: 16;
}

.orbital-name {
    width: 240;
    height: 60;
    background-color: cornflowerblue;
    opacity: 0.5;
}

.orbital-name Label {
    font-size: 24;
    color: white;
    padding: 8;
}

.cover {
    background-color: black;
}
</style>