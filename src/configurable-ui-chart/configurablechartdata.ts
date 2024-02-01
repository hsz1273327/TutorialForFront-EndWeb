import { LegendForm, LegendOrientation, LegendVerticalAlignment, LegendHorizontalAlignment } from '@nativescript-community/ui-chart/components/Legend';
import { ScatterShape } from '@nativescript-community/ui-chart/charts/ScatterChart';
import { YAxisLabelPosition } from '@nativescript-community/ui-chart/components/YAxis';
import { XAxisPosition } from "@nativescript-community/ui-chart/components/XAxis";
import { LimitLine, LimitLabelPosition } from '@nativescript-community/ui-chart/components/LimitLine';
import { Font } from '@nativescript/core';

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
    pinchZoom: boolean; //允许强制捏合手势用于聚焦
    highlightPerTapEnabled: boolean; //设置启用每次点击突出显示
    highlightPerDragEnabled: boolean;//设置启用每次拖拽突出显示
    backgroundColor?: string
}

export const DefaultChartSetting: ChartSetting = {
    drawFrameRate: false,
    drawGridBackground: false,
    touchEnabled: false,
    maxHighlightDistance: 50,
    dragEnabled: false,
    scaleEnabled: false,
    maxVisibleValueCount: 200,
    pinchZoom: false,
    highlightPerTapEnabled: false,
    highlightPerDragEnabled: false
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
    font?: FontSetting
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
    let result: LegendConfig = {
        enabled: setting.enabled,
        verticalAlignment: verticalAlignment,
        horizontalAlignment: horizontalAlignment,
        orientation: orientation,
        drawInside: setting.drawInside,
        xOffset: setting.xOffset
    }
    if (typeof (setting.font) != "undefined") {
        let style = undefined
        if (typeof (setting.font.style) != "undefined" && ['normal', 'italic'].includes(setting.font.style)) {
            style = setting.font.style
        }
        let weight = undefined
        if (typeof (setting.font.weight) != "undefined" && ['100', '200', '300', 'normal', '400', '500', '600', 'bold', '700', '800', '900'].includes(setting.font.weight)) {
            weight = setting.font.weight
        }
        let font = new Font(setting.font.family, setting.font.size, style, weight, setting.font.scale)
        result = Object.assign(result, { font: font })
    }
    return result
}

interface LegendConfig {
    enabled: boolean;
    verticalAlignment: LegendVerticalAlignment;
    horizontalAlignment: LegendHorizontalAlignment;
    orientation: LegendOrientation;
    drawInside: boolean;
    xOffset: number;
    font?: Font;
}
interface FontSetting {
    family: string,
    size: number,
    style?: string,
    weight?: string,
    scale?: number,
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
    valueFormat?: string; // 提供weekday,date,datetime,utcdatetime
}
export const DefaultAxisXSetting: AxisXSetting = {
    position: "bottom",
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
    let result: AxisXConfig = {
        position: position,
        minimum: setting?.minimum,
        maximum: setting?.maximum,
        lineWidth: setting?.lineWidth,
        lineColor: setting?.lineColor,
        labelRotationAngle: setting?.labelRotationAngle,
        avoidFirstLastClipping: setting?.avoidFirstLastClipping,
        withGridLine: setting?.withGridLine
    }
    if (typeof (setting.valueFormat) != "undefined") {
        switch (setting.valueFormat.toLowerCase()) {
            case "weekday":
                {
                    //取值范围0~6
                    result = Object.assign(result, {
                        valueFormat: (value: number): string => {
                            switch (value) {
                                case 1:
                                    {
                                        return "Mon"
                                    }
                                    break;
                                case 2:
                                    {
                                        return "Tue"
                                    }
                                    break;
                                case 3:
                                    {
                                        return "Wed"
                                    }
                                    break;
                                case 4:
                                    {
                                        return "Thu"
                                    }
                                    break;
                                case 5:
                                    {
                                        return "Fri"
                                    }
                                    break;
                                case 6:
                                    {
                                        return "Sat"
                                    }
                                    break;
                                case 0:
                                    {
                                        return "Sun"
                                    }
                                    break;
                                default:
                                    {
                                        return "Unknown"
                                    }
                                    break;
                            }
                        }
                    })
                }
                break;
            case "date":
                {
                    // 取值范围,13位时间戳
                    result = Object.assign(result, {
                        valueFormat: (value: number): string => {
                            const date = new Date(value)
                            // return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
                            return date.toLocaleDateString()
                        }
                    })
                }
                break;
            case "datetime":
                {
                    // 取值范围,13位时间戳
                    result = Object.assign(result, {
                        valueFormat: (value: number): string => {
                            const date = new Date(value)
                            return date.toLocaleString()
                        }
                    })
                }
                break;
            case "utcdatetime":
                {
                    // 取值范围,13位时间戳
                    result = Object.assign(result, {
                        valueFormat: (value: number): string => {
                            const date = new Date(value)
                            return date.toUTCString()
                        }
                    })
                }
                break;
        }
    }
    return result
}
type Formater = (value: number) => string
interface AxisXConfig {
    position: XAxisPosition;
    minimum?: number;
    maximum?: number;
    lineWidth?: number;
    lineColor?: string;
    labelRotationAngle?: number;
    avoidFirstLastClipping?: boolean;
    withGridLine?: boolean;
    valueFormat?: Formater;
}

/** 辅助线
 * 
 */
export interface LimitLinesSetting {
    axisX?: LimitLineOnAxisSetting;
    axisY?: LimitLineOnAxisSetting;
}

export function LimitLinesSettingToConfig(setting: LimitLinesSetting): LimitLinesConfig {
    let result: LimitLinesConfig = {}
    if (typeof (setting.axisX) != "undefined") {
        let axisXResult: LimitLineOnAxisConfig = {
            lines: setting.axisX.lines.map((line) => LimitLineSettingToConfig(line)),
            linesBehindData: setting.axisX?.linesBehindData
        }
        Object.assign(result, { axisX: axisXResult })
    }
    if (typeof (setting.axisY) != "undefined") {
        let axisYResult: LimitLineOnAxisConfig = {
            lines: setting.axisY.lines.map((line) => LimitLineSettingToConfig(line)),
            linesBehindData: setting.axisY?.linesBehindData
        }
        Object.assign(result, { axisY: axisYResult })
    }
    return result
}

interface LimitLinesConfig {
    axisX?: LimitLineOnAxisConfig;
    axisY?: LimitLineOnAxisConfig;
}

interface LimitLineOnAxisSetting {
    lines: LimitLineSetting[];
    linesBehindData?: boolean;
}
interface LimitLineOnAxisConfig {
    lines: LimitLineConfig[];
    linesBehindData?: boolean;
}
interface LimitLineSetting {
    limit: number;
    label: string;
    width?: number;
    labelPosition?: string; //(LimitLabelPosition.RIGHT_TOP);
    dashedLine?: DashlineSetting;
    textSize?: number;
    lineColor?: string;
}
export interface LimitLineConfig {
    limit: number;
    label: string;
    width?: number;
    labelPosition?: LimitLabelPosition;
    dashedLine?: DashlineSetting;
    textSize?: number;
    lineColor?: string;
}

function LimitLineSettingToConfig(setting: LimitLineSetting): LimitLineConfig {
    let result: LimitLineConfig = {
        limit: setting.limit,
        label: setting.label,
        width: setting?.width,
        dashedLine: setting?.dashedLine,
        textSize: setting?.textSize,
        lineColor: setting?.lineColor
    }
    if (typeof (setting.labelPosition) != "undefined") {
        let labelPosition = LimitLabelPosition.LEFT_TOP
        switch (setting.labelPosition.toLowerCase()) {
            case "left_top":
                {
                    labelPosition = LimitLabelPosition.LEFT_TOP
                }
                break;
            case "left_bottom":
                {
                    labelPosition = LimitLabelPosition.LEFT_BOTTOM
                }
                break;
            case "center_top":
                {
                    labelPosition = LimitLabelPosition.CENTER_TOP
                }
                break;
            case "center_bottom":
                {
                    labelPosition = LimitLabelPosition.CENTER_BOTTOM
                }
                break;
            case "right_top":
                {
                    labelPosition = LimitLabelPosition.RIGHT_TOP
                }
                break;
            case "right_bottom":
                {
                    labelPosition = LimitLabelPosition.RIGHT_BOTTOM
                }
                break;
        }
        Object.assign(result, {
            labelPosition: labelPosition
        })
    }
    return result
}
interface DashlineSetting {
    lineLength: number;
    spaceLength: number;
    phase: number;
}

/**  ScatterChart数据设置
 * 
*/
export interface ScatterDataSetting {
    data: ScatterDataSetSetting[];
    valueTextSize?: number;
    valueTextColor?: string;
    highlight?: boolean;
}

interface ScatterDataConfig {
    data: ScatterDataSetConfig[];
    valueTextSize?: number;
    valueTextColor?: string;
    highlight?: boolean;
}
interface ScatterDataSetSetting {
    values: Point[];
    label: string;
    form: string;
    shape: string;
    color?: string;
    shapeholeColor?: string;
    shapeholeRadius?: number;
    shapesize: number;
}

interface ScatterDataSetConfig {
    values: Point[];
    label: string;
    form: LegendForm;
    shape: ScatterShape;
    color?: string;
    shapeholeColor?: string;
    shapeholeRadius?: number;
    shapesize: number;
}
interface Point {
    x: number;
    y: number;
}

export function ScatterDataSettingToConfig(setting: ScatterDataSetting): ScatterDataConfig {
    let config = {
        valueTextSize: setting?.valueTextSize,
        valueTextColor: setting?.valueTextColor,
        highlight: setting?.highlight
    }
    let data = []
    for (const dataset of setting.data) {
        let form = LegendForm.NONE
        switch (dataset.form.toLowerCase()) {
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
        switch (dataset.form.toLowerCase()) {
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
        data.push({
            values: dataset.values,
            label: dataset.label,
            form: form,
            shape: shape,
            color: dataset?.color,
            shapeholeColor: dataset?.shapeholeColor,
            shapeholeRadius: dataset?.shapeholeRadius,
            shapesize: dataset.shapesize
        })
    }
    let conf = Object.assign({ data: data }, config)
    return conf
}

interface SizedPoint {
    x: number;
    y: number;
    size: number;
}
/**  BubbleChart数据设置
 * 
*/
export interface BubbleDataSetting {
    data: BubbleDataSetSetting[];
    valueTextSize?: number;
    valueTextColor?: string;
    highlightCircleWidth?: number;
}
interface BubbleDataConfig {
    data: BubbleDataSetConfig[];
    valueTextSize?: number;
    valueTextColor?: string;
    highlightCircleWidth?: number;
}
interface BubbleDataSetSetting {
    values: SizedPoint[];
    label: string;
    form: string;
    color?: string;
    drawValues?: boolean;
}
interface BubbleDataSetConfig {
    values: SizedPoint[];
    label: string;
    form: LegendForm;
    color?: string;
    drawValues?: boolean;
}

export function BubbleDataSettingToConfig(setting: BubbleDataSetting): BubbleDataConfig {
    let config = {
        valueTextSize: setting?.valueTextSize,
        valueTextColor: setting?.valueTextColor,
        highlightCircleWidth: setting?.highlightCircleWidth
    }
    let data = []
    for (const dataset of setting.data) {
        let form = LegendForm.NONE
        switch (dataset.form.toLowerCase()) {
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
        data.push({
            values: dataset.values,
            label: dataset.label,
            form: form,
            color: dataset?.color,
            drawValues: dataset?.drawValues,
        })
    }
    let conf = Object.assign({ data: data }, config)
    return conf
}


export interface LineDataSetting {
    data: LineDataSetSetting[];
    valueTextSize?: number;
    valueTextColor?: string;
    highlight?: boolean;
}
export function LineDataSettingToConfig(setting: LineDataSetting): LineDataConfig {
    let result: LineDataConfig = {
        data: setting.data.map((s) => LineDataSetSettingToConfig(s)),
        valueTextSize: setting?.valueTextSize,
        valueTextColor: setting?.valueTextColor,
        highlight: setting?.highlight
    }
    return result
}
interface LineDataConfig {
    data: LineDataSetConfig[];
    valueTextSize?: number;
    valueTextColor?: string;
    highlight?: boolean;
}

function LineDataSetSettingToConfig(setting: LineDataSetSetting): LineDataSetConfig {
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
    return {
        values: setting.values,
        label: setting.label,
        form: form,
        color: setting?.color,
        drawIcons: setting?.drawIcons,
        dashedLine: setting?.dashedLine,
        circleColor: setting?.circleColor,
        lineWidth: setting?.lineWidth,
        circleRadius: setting?.circleRadius,
        drawCircleHole: setting?.drawCircleHole,
        formLineWidth: setting?.formLineWidth,
        formSize: setting?.formSize,
        valueTextSize: setting?.valueTextSize,
        dashedHighlightLine: setting?.dashedHighlightLine,
        drawFilled: setting?.drawFilled,
        fillColor: setting?.fillColor
    }
}
interface LineDataSetSetting {
    values: Point[];
    label: string;
    form: string;
    color?: string; //设置线条颜色
    drawIcons?: boolean;// 设置是否开启y轴图标
    dashedLine?: DashlineSetting;/// 设置使用虚线,参数为线条长度,空白长度,阶段
    circleColor?: string;// 设置点颜色
    lineWidth?: number;// 设置线条宽度
    circleRadius?: number;// 设置点的直径
    drawCircleHole?: boolean;// 设置点为空心点
    formLineWidth?: number;// 设置图标宽度
    formSize?: number; //设置图标尺寸
    valueTextSize?: number; //设置值的文本字体大小
    dashedHighlightLine?: DashlineSetting;// 将选择线画为虚线
    drawFilled?: boolean;// 设置填充区
    fillColor?: string;// 设置填充区颜色set color of filled area
}

interface LineDataSetConfig {
    values: Point[];
    label: string;
    form: LegendForm;
    color?: string; //设置线条颜色
    drawIcons?: boolean;// 设置是否开启y轴图标
    dashedLine?: DashlineSetting;/// 设置使用虚线,参数为线条长度,空白长度,阶段
    circleColor?: string;// 设置点颜色
    lineWidth?: number;// 设置线条宽度
    circleRadius?: number;// 设置点的直径
    drawCircleHole?: boolean;// 设置点为空心点
    formLineWidth?: number;// 设置图标宽度
    formSize?: number; //设置图标尺寸
    valueTextSize?: number; //设置值的文本字体大小
    dashedHighlightLine?: DashlineSetting;// 将选择线画为虚线
    drawFilled?: boolean;// 设置填充区
    fillColor?: string;// 设置填充区颜色set color of filled area
}