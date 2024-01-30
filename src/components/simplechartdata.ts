import { LegendForm, LegendOrientation, LegendVerticalAlignment, LegendHorizontalAlignment } from '@nativescript-community/ui-chart/components/Legend';
import { ScatterShape } from '@nativescript-community/ui-chart/charts/ScatterChart';
import { YAxisLabelPosition } from '@nativescript-community/ui-chart/components/YAxis';
export interface ChartSetting {
    drawFrameRate: boolean; //显示fps
    setDrawGridBackground: boolean; //有网格背景
    setTouchEnabled: boolean; //允许触控操作
    setMaxHighlightDistance: number; //最大高亮显示距离
    setDragEnabled: boolean; // 允许拖拽操作
    setScaleEnabled: boolean; // 允许缩放操作
    setMaxVisibleValueCount: number; //最大可视值计数
    setPinchZoom: boolean; //允许收缩旋转操作
}

export const DefaultChartSetting: ChartSetting = {
    drawFrameRate: false,
    setDrawGridBackground: false,
    setTouchEnabled: false,
    setMaxHighlightDistance: 50,
    setDragEnabled: false,
    setScaleEnabled: false,
    setMaxVisibleValueCount: 200,
    setPinchZoom: false
}

export interface LegendSetting {
    setEnabled: boolean;
    setVerticalAlignment: string;
    setHorizontalAlignment: string;
    setOrientation: string;
    setDrawInside: boolean;
    setXOffset: number;
}

interface LegendConfig {
    setEnabled: boolean;
    setVerticalAlignment: LegendVerticalAlignment;
    setHorizontalAlignment: LegendHorizontalAlignment;
    setOrientation: LegendOrientation;
    setDrawInside: boolean;
    setXOffset: number;
}

export const DefaultLegendSetting = {
    setEnabled: true,
    setVerticalAlignment: "top",
    setHorizontalAlignment: "right",
    setOrientation: "vertical",
    setDrawInside: false,
    setXOffset: 5
}

export function LegendSettingToConfig(setting: LegendSetting): LegendConfig {
    let setVerticalAlignment = LegendVerticalAlignment.TOP
    switch (setting.setVerticalAlignment.toLowerCase()) {
        case "top":
            {
                setVerticalAlignment = LegendVerticalAlignment.TOP
            }
            break;
        case "center":
            {
                setVerticalAlignment = LegendVerticalAlignment.CENTER
            }
            break;
        case "bottom":
            {
                setVerticalAlignment = LegendVerticalAlignment.BOTTOM
            }
            break;
    }
    let setHorizontalAlignment = LegendHorizontalAlignment.LEFT
    switch (setting.setVerticalAlignment.toLowerCase()) {
        case "left":
            {
                setHorizontalAlignment = LegendHorizontalAlignment.LEFT
            }
            break;
        case "center":
            {
                setHorizontalAlignment = LegendHorizontalAlignment.CENTER
            }
            break;
        case "right":
            {
                setHorizontalAlignment = LegendHorizontalAlignment.RIGHT
            }
            break;
    }
    let setOrientation = LegendOrientation.HORIZONTAL

    switch (setting.setOrientation.toLowerCase()) {
        case "horizontal":
            {
                setOrientation = LegendOrientation.HORIZONTAL
            }
            break;
        case "vertical":
            {
                setOrientation = LegendOrientation.VERTICAL
            }
            break;
    }

    return {
        setEnabled: setting.setEnabled,
        setVerticalAlignment: setVerticalAlignment,
        setHorizontalAlignment: setHorizontalAlignment,
        setOrientation: setOrientation,
        setDrawInside: setting.setDrawInside,
        setXOffset: setting.setXOffset
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



export interface AxisYSetting {
    axisRightEnable: boolean;
    SpaceTop?: number;
    SpaceBottom?: number;
    DrawZeroLine?: boolean;
    Minimum?: number;
    Maximum?: number;
    lineWidth?: number;
    lineColor?: string;
    position?: string;//inside_chart
}
interface AxisYConfig {
    axisRightEnable: boolean;
    SpaceTop?: number;
    SpaceBottom?: number;
    DrawZeroLine?: boolean;
    Minimum?: number;
    Maximum?: number;
    lineWidth?: number;
    lineColor?: string;
    position?: YAxisLabelPosition;
}
export const DefaultAxisYSetting: AxisYSetting = {
    axisRightEnable: false
}

export function AxisYSettingToConfig(setting: AxisYSetting): AxisYConfig {
    let config = {
        axisRightEnable: setting.axisRightEnable,
        SpaceTop: setting?.SpaceTop,
        SpaceBottom: setting?.SpaceBottom,
        DrawZeroLine: setting?.DrawZeroLine,
        Minimum: setting?.Minimum,
        Maximum: setting?.Maximum,
        lineWidth: setting?.lineWidth,
        lineColor: setting?.lineColor
    }
    if (setting.position) {
        switch (setting.position.toLowerCase()) {
            case "inside_chart":
                {
                    Object.assign(config, { position: YAxisLabelPosition.INSIDE_CHART })
                }
                break;

            default:
                {
                    Object.assign(config, { position: YAxisLabelPosition.OUTSIDE_CHART })
                }
                break;
        }
    }
    return config

}

interface AxisXSetting {

}