import { LegendForm, LegendOrientation, LegendVerticalAlignment, LegendHorizontalAlignment } from '@nativescript-community/ui-chart/components/Legend';
import { ScatterShape } from '@nativescript-community/ui-chart/charts/ScatterChart';
import { YAxisLabelPosition } from '@nativescript-community/ui-chart/components/YAxis';
import { XAxisPosition } from "@nativescript-community/ui-chart/components/XAxis";

/** 通用设置
 * 各种图都可能用到的设置
 */
export interface ChartSetting {
    drawFrameRate: boolean; //显示fps
    drawGridBackground: boolean; //有网格背景
    touchEnabled: boolean; //允许触控操作
    maxHighlightDistance: number; //最大高亮显示距离
    dragEnabled: boolean; // 允许拖拽操作
    scaleEnabled: boolean; // 允许缩放操作
    maxVisibleValueCount: number; //最大可视值计数
    pinchZoom: boolean; //允许收缩旋转操作
    hardwareAccelerated?: boolean;
}

export const DefaultChartSetting: ChartSetting = {
    drawFrameRate: false,
    drawGridBackground: false,
    touchEnabled: false,
    maxHighlightDistance: 50,
    dragEnabled: false,
    scaleEnabled: false,
    maxVisibleValueCount: 200,
    pinchZoom: false
}
/** 图例设置
 * 
*/
export interface LegendSetting {
    enabled: boolean;
    verticalAlignment: string;
    horizontalAlignment: string;
    orientation: string;
    drawInside: boolean;
    xOffset: number;
}

interface LegendConfig {
    enabled: boolean;
    verticalAlignment: LegendVerticalAlignment;
    horizontalAlignment: LegendHorizontalAlignment;
    orientation: LegendOrientation;
    drawInside: boolean;
    xOffset: number;
}

export const DefaultLegendSetting = {
    enabled: true,
    verticalAlignment: "top",
    horizontalAlignment: "right",
    orientation: "vertical",
    drawInside: false,
    xOffset: 5
}

export function LegendSettingToConfig(setting: LegendSetting): LegendConfig {
    let verticalAlignment = LegendVerticalAlignment.TOP
    switch (setting.verticalAlignment.toLowerCase()) {
        case "top":
            {
                verticalAlignment = LegendVerticalAlignment.TOP
            }
            break;
        case "center":
            {
                verticalAlignment = LegendVerticalAlignment.CENTER
            }
            break;
        case "bottom":
            {
                verticalAlignment = LegendVerticalAlignment.BOTTOM
            }
            break;
    }
    let horizontalAlignment = LegendHorizontalAlignment.LEFT
    switch (setting.horizontalAlignment.toLowerCase()) {
        case "left":
            {
                horizontalAlignment = LegendHorizontalAlignment.LEFT
            }
            break;
        case "center":
            {
                horizontalAlignment = LegendHorizontalAlignment.CENTER
            }
            break;
        case "right":
            {
                horizontalAlignment = LegendHorizontalAlignment.RIGHT
            }
            break;
    }
    let orientation = LegendOrientation.HORIZONTAL

    switch (setting.orientation.toLowerCase()) {
        case "horizontal":
            {
                orientation = LegendOrientation.HORIZONTAL
            }
            break;
        case "vertical":
            {
                orientation = LegendOrientation.VERTICAL
            }
            break;
    }

    return {
        enabled: setting.enabled,
        verticalAlignment: verticalAlignment,
        horizontalAlignment: horizontalAlignment,
        orientation: orientation,
        drawInside: setting.drawInside,
        xOffset: setting.xOffset
    }
}

/** Y轴设置
 * 
*/
export interface AxisYSetting {
    axisRightEnable: boolean;
    spaceTop?: number;
    spaceBottom?: number;
    drawZeroLine?: boolean;
    minimum?: number;
    maximum?: number;
    lineWidth?: number;
    lineColor?: string;
    labelPosition?: string;
    withGridLine?: boolean;
}
interface AxisYConfig {
    axisRightEnable: boolean;
    spaceTop?: number;
    spaceBottom?: number;
    drawZeroLine?: boolean;
    minimum?: number;
    maximum?: number;
    lineWidth?: number;
    lineColor?: string;
    labelPosition?: YAxisLabelPosition;
    withGridLine?: boolean;
}
export const DefaultAxisYSetting: AxisYSetting = {
    axisRightEnable: false
}

export function AxisYSettingToConfig(setting: AxisYSetting): AxisYConfig {
    let config = {
        axisRightEnable: setting.axisRightEnable,
        spaceTop: setting?.spaceTop,
        spaceBottom: setting?.spaceBottom,
        drawZeroLine: setting?.drawZeroLine,
        minimum: setting?.minimum,
        maximum: setting?.maximum,
        lineWidth: setting?.lineWidth,
        lineColor: setting?.lineColor,
        withGridLine: setting?.withGridLine
    }
    if (setting.labelPosition) {
        switch (setting.labelPosition.toLowerCase()) {
            case "inside_chart":
                {
                    Object.assign(config, { labelPosition: YAxisLabelPosition.INSIDE_CHART })
                }
                break;

            default:
                {
                    Object.assign(config, { labelPosition: YAxisLabelPosition.OUTSIDE_CHART })
                }
                break;
        }
    }
    return config

}
/** X轴设置
 * 
*/
export interface AxisXSetting {
    position: string;
    minimum?: number;
    maximum?: number;
    lineWidth?: number;
    lineColor?: string;
    labelRotationAngle?: number;
    avoidFirstLastClipping?: boolean;
    withGridLine?: boolean;
}
export const DefaultAxisXSetting: AxisXSetting = {
    position: "bottom",
}
interface AxisXConfig {
    position: XAxisPosition;
    minimum?: number;
    maximum?: number;
    lineWidth?: number;
    lineColor?: string;
    labelRotationAngle?: number;
    avoidFirstLastClipping?: boolean;
    withGridLine?: boolean;
}


export function AxisXSettingToConfig(setting: AxisXSetting): AxisXConfig {
    let position = XAxisPosition.BOTTOM
    switch (setting.position.toLowerCase()) {
        case "top":
            {
                position = XAxisPosition.TOP
            }
            break;
        case "bottom":
            {
                position = XAxisPosition.BOTTOM
            }
            break;
        case "both_sided":
            {
                position = XAxisPosition.BOTH_SIDED
            }
            break;
        case "top_inside":
            {
                position = XAxisPosition.TOP_INSIDE
            }
            break;
        case "bottom_inside":
            {
                position = XAxisPosition.BOTTOM_INSIDE
            }
            break;
    }
    return {
        position: position,
        minimum: setting?.minimum,
        maximum: setting?.maximum,
        lineWidth: setting?.lineWidth,
        lineColor: setting?.lineColor,
        labelRotationAngle: setting?.labelRotationAngle,
        avoidFirstLastClipping: setting?.avoidFirstLastClipping,
        withGridLine: setting?.withGridLine
    }
}


interface Point {
    x: number;
    y: number;
}

interface ScatterDataConfig {
    values: Point[];
    label: string;
    form: LegendForm;
    shape: ScatterShape;
    color?: string;
    shapeholeColor?: string;
    shapeholeRadius?: number;
    shapesize: number;
}
/**  ScatterChart数据设置
 * 
*/
export interface ScatterDataSetting {
    values: Point[];
    label: string;
    form: string;
    shape: string;
    color?: string;
    shapeholeColor?: string;
    shapeholeRadius?: number;
    shapesize: number;
}

export function ScatterDataSettingToConfig(setting: ScatterDataSetting): ScatterDataConfig {
    let form = LegendForm.NONE
    switch (setting.form.toLowerCase()) {
        case "empty":
            {
                form = LegendForm.EMPTY
            }
            break;
        case "default":
            {
                form = LegendForm.DEFAULT
            }
            break;
        case "square":
            {
                form = LegendForm.SQUARE
            }
            break;
        case "circle":
            {
                form = LegendForm.CIRCLE
            }
            break;
        case "line":
            {
                form = LegendForm.LINE
            }
            break;
    }

    let shape = ScatterShape.SQUARE
    switch (setting.form.toLowerCase()) {
        case "square":
            {
                shape = ScatterShape.SQUARE
            }
            break;
        case "circle":
            {
                shape = ScatterShape.CIRCLE
            }
            break;
        case "triangle":
            {
                shape = ScatterShape.TRIANGLE
            }
            break;
        case "cross":
            {
                shape = ScatterShape.CROSS
            }
            break;
        case "x":
            {
                shape = ScatterShape.X
            }
            break;
        case "chevron_up":
            {
                shape = ScatterShape.CHEVRON_UP
            }
            break;
        case "chevron_down":
            {
                shape = ScatterShape.CHEVRON_DOWN
            }
            break;
    }
    return {
        values: setting.values,
        label: setting.label,
        form: form,
        shape: shape,
        color: setting?.color,
        shapeholeColor: setting?.shapeholeColor,
        shapeholeRadius: setting?.shapeholeRadius,
        shapesize: setting.shapesize
    }
}