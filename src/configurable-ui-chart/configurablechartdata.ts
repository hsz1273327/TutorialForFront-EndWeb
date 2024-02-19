import { LegendForm, LegendOrientation, LegendVerticalAlignment, LegendHorizontalAlignment } from '@nativescript-community/ui-chart/components/Legend';
import { ScatterShape } from '@nativescript-community/ui-chart/charts/ScatterChart';
import { YAxisLabelPosition, AxisDependency } from '@nativescript-community/ui-chart/components/YAxis';
import { XAxisPosition } from "@nativescript-community/ui-chart/components/XAxis";
import { LimitLabelPosition } from '@nativescript-community/ui-chart/components/LimitLine';
import { Font } from '@nativescript/core';
import { Style } from "@nativescript-community/ui-canvas";
import { ColorTemplate } from "@nativescript-community/ui-chart/utils/ColorTemplate";
import { PieEntry } from "@nativescript-community/ui-chart/data/PieEntry";
import { RadarEntry } from "@nativescript-community/ui-chart/data/RadarEntry";
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
    font?: FontSetting;
    xEntrySpace?: number;
    yEntrySpace?: number;
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
        xOffset: setting.xOffset,
        xEntrySpace: setting?.xEntrySpace,
        yEntrySpace: setting?.yEntrySpace
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
    xEntrySpace?: number;
    yEntrySpace?: number;
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
    spaceTop?: number;
    spaceBottom?: number;
    drawZeroLine?: boolean;
    minimum?: number;
    maximum?: number;
    lineWidth?: number;
    lineColor?: string;
    labelPosition?: string;
    withGridLine?: boolean;
    labelCount?: LableCountSetting;
    suggestedAxisMinimum?: number;
    suggestedAxisMaximum?: number;
    spaceMin?: number;
    spaceMax?: number;
    textSize?: number;
    textColor?: string;
}
export interface AxisYWithRightAxisSetting extends AxisYSetting {
    axisRightEnable?: boolean; //对纵向图,比如HorizontalBar无效
}
export const DefaultAxisYWithRightAxisSetting: AxisYWithRightAxisSetting = {
    axisRightEnable: false
}
interface LableCountSetting {
    count: number;
    force?: boolean;
}

export function AxisYSettingToConfig(setting: AxisYSetting): AxisYConfig {
    let config = {
        spaceTop: setting?.spaceTop,
        spaceBottom: setting?.spaceBottom,
        drawZeroLine: setting?.drawZeroLine,
        minimum: setting?.minimum,
        maximum: setting?.maximum,
        lineWidth: setting?.lineWidth,
        lineColor: setting?.lineColor,
        withGridLine: setting?.withGridLine,
        labelCount: setting?.labelCount,
        suggestedAxisMinimum: setting?.suggestedAxisMinimum,
        suggestedAxisMaximum: setting?.suggestedAxisMaximum,
        spaceMin: setting?.spaceMin,
        spaceMax: setting?.spaceMax,
        textSize: setting?.textSize,
        textColor: setting?.textColor
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

export function AxisYWithRightAxisSettingToConfig(setting: AxisYWithRightAxisSetting): AxisYWithRightAxisConfig {
    let result: AxisYWithRightAxisConfig = {
        axisRightEnable: setting?.axisRightEnable,
    }
    Object.assign(result, AxisYSettingToConfig(setting))
    return result
}
interface AxisYConfig {
    spaceTop?: number;
    spaceBottom?: number;
    drawZeroLine?: boolean;
    minimum?: number;
    maximum?: number;
    lineWidth?: number;
    lineColor?: string;
    labelPosition?: YAxisLabelPosition;
    withGridLine?: boolean;
    labelCount?: LableCountSetting;
    suggestedAxisMinimum?: number;
    suggestedAxisMaximum?: number;
    spaceMin?: number;
    spaceMax?: number;
    textSize?: number;
    textColor?: string;
}
interface AxisYWithRightAxisConfig extends AxisYConfig {
    axisRightEnable: boolean;
}
/** X轴设置
 * 
*/
export interface AxisXSetting {
    position?: string;
    minimum?: number;
    maximum?: number;
    lineWidth?: number;
    lineColor?: string;
    labelRotationAngle?: number;
    avoidFirstLastClipping?: boolean;
    withGridLine?: boolean;
    valueFormat?: string; // 提供weekday,date,datetime,utcdatetime
    suggestedAxisMinimum?: number;
    suggestedAxisMaximum?: number;
    spaceMin?: number;
    spaceMax?: number;
    textSize?: number;
    textColor?: string;

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
        withGridLine: setting?.withGridLine,
        suggestedAxisMinimum: setting?.suggestedAxisMinimum,
        suggestedAxisMaximum: setting?.suggestedAxisMaximum,
        spaceMin: setting?.spaceMin,
        spaceMax: setting?.spaceMax,
        textSize: setting?.textSize,
        textColor: setting?.textColor
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
    suggestedAxisMinimum?: number;
    suggestedAxisMaximum?: number;
    spaceMin?: number;
    spaceMax?: number;
    textSize?: number;
    textColor?: string;
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

function FormStringToForm(formstr: string): LegendForm {
    let form = LegendForm.NONE
    switch (formstr.toLowerCase()) {
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
    return form
}

function AxisDependencyStringToAxisDependency(axisdependencystr: string): AxisDependency {
    let axisDependency = AxisDependency.LEFT
    switch (axisdependencystr.toLowerCase()) {
        case "left":
            {
                axisDependency = AxisDependency.LEFT
            }
            break;
        case "right":
            {
                axisDependency = AxisDependency.RIGHT
            }
            break;
    }
    return axisDependency
}
/**  基础的data数据设置
 * 
*/
export interface DataSetting {
    valueTextSize?: number;
    valueTextColor?: string;
    highlight?: boolean;
}
/**  ScatterChart数据集设置
 * 
*/
export interface ScatterDataSetSetting {
    values: Point[];
    label: string;
    form: string;
    shape: string;
    color?: string;
    shapeholeColor?: string;
    shapeholeRadius?: number;
    shapesize?: number;
    axisDependency?: string; //从左向右还是从右向左
}

export function ScatterDataSetSettingToConfig(setting: ScatterDataSetSetting): ScatterDataSetConfig {
    let shape = ScatterShape.SQUARE
    switch (setting.shape.toLowerCase()) {
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
    let result: ScatterDataSetConfig = {
        values: setting.values,
        label: setting.label,
        form: FormStringToForm(setting.form),
        shape: shape,
        color: setting?.color,
        shapeholeColor: setting?.shapeholeColor,
        shapeholeRadius: setting?.shapeholeRadius,
        shapesize: setting?.shapesize,
    }
    if (typeof (setting.axisDependency) != "undefined") {
        let axisDependency = AxisDependencyStringToAxisDependency(setting.axisDependency)
        Object.assign(result, { axisDependency: axisDependency })
    }
    return result
}

interface ScatterDataSetConfig {
    values: Point[];
    label: string;
    form: LegendForm;
    shape: ScatterShape;
    color?: string;
    shapeholeColor?: string;
    shapeholeRadius?: number;
    shapesize?: number;
    axisDependency?: AxisDependency;
}
interface Point {
    x: number;
    y: number;
}

/**  BubbleChart数据设置
 * 
*/
export interface BubbleDataSetting extends DataSetting {
    highlightCircleWidth?: number;
}

export interface BubbleDataSetSetting {
    values: SizedPoint[];
    label: string;
    form: string;
    color?: string;
    drawValues?: boolean;
    axisDependency?: string;
}

export function BubbleDataSetSettingToConfig(setting: BubbleDataSetSetting): BubbleDataSetConfig {
    let result = {
        values: setting.values,
        label: setting.label,
        form: FormStringToForm(setting.form),
        color: setting?.color,
        drawValues: setting?.drawValues,
    }
    if (typeof (setting.axisDependency) != "undefined") {
        let axisDependency = AxisDependencyStringToAxisDependency(setting.axisDependency)
        Object.assign(result, { axisDependency: axisDependency })
    }
    return result
}

interface SizedPoint {
    x: number;
    y: number;
    size: number;
}

interface BubbleDataSetConfig {
    values: SizedPoint[];
    label: string;
    form: LegendForm;
    color?: string;
    drawValues?: boolean;
    axisDependency?: AxisDependency;
}

/**  LineChart数据集设置
 * 
*/
export function LineDataSetSettingToConfig(setting: LineDataSetSetting): LineDataSetConfig {
    let result = {
        values: setting.values,
        label: setting.label,
        form: FormStringToForm(setting.form),
        color: setting?.color,
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
        fillColor: setting?.fillColor,
        fillAlpha: setting?.fillAlpha
    }
    if (typeof (setting.axisDependency) != "undefined") {
        let axisDependency = AxisDependencyStringToAxisDependency(setting.axisDependency)
        Object.assign(result, { axisDependency: axisDependency })
    }
    return result
}
export interface LineDataSetSetting {
    values: Point[];
    label: string;
    form: string;
    color?: string; //设置线条颜色
    lineWidth?: number;// 设置线条宽度
    dashedLine?: DashlineSetting;/// 设置使用虚线,参数为线条长度,空白长度,阶段
    circleColor?: string;// 设置点颜色
    circleRadius?: number;// 设置点的直径
    drawCircleHole?: boolean;// 设置点为空心点
    formLineWidth?: number;// 设置图标宽度
    formSize?: number; //设置图标尺寸
    valueTextSize?: number; //设置值的文本字体大小
    dashedHighlightLine?: DashlineSetting;// 将选择线画为虚线
    drawFilled?: boolean;// 设置填充区
    fillColor?: string;// 设置填充区颜色set color of filled area
    fillAlpha?: number;
    axisDependency?: string;
}
interface LineDataSetConfig {
    values: Point[];
    label: string;
    form: LegendForm;
    color?: string; //设置线条颜色
    lineWidth?: number;// 设置线条宽度
    dashedLine?: DashlineSetting;/// 设置使用虚线,参数为线条长度,空白长度,阶段
    circleColor?: string;// 设置点颜色
    circleRadius?: number;// 设置点的直径
    drawCircleHole?: boolean;// 设置点为空心点
    formLineWidth?: number;// 设置图标宽度
    formSize?: number; //设置图标尺寸
    valueTextSize?: number; //设置值的文本字体大小
    dashedHighlightLine?: DashlineSetting;// 将选择线画为虚线
    drawFilled?: boolean;// 设置填充区
    fillColor?: string;// 设置填充区颜色set color of filled area
    fillAlpha?: number;
    axisDependency?: AxisDependency;
}

/**  BarChart数据设置
 * 
*/
export interface BarDataSetting extends DataSetting {
    barWidth?: number; //柱宽
    groupBars?: BarGroupSetting //柱组设置
}

interface BarGroupSetting {
    fromX: number;
    groupSpace: number;
    barSpace: number;
}
export function BarDataSetSettingToConfig(setting: BarDataSetSetting): BarDataSetConfig {
    let result = {
        values: setting.values,
        label: setting.label,
        form: FormStringToForm(setting.form),
        color: setting?.color,
        formLineWidth: setting?.formLineWidth,
        formSize: setting?.formSize,
        valueTextSize: setting?.valueTextSize,
        stackLabels: setting?.stackLabels,
        barShadowColor: setting?.barShadowColor,
        barBorderWidth: setting?.barBorderWidth,
        barBorderColor: setting?.barBorderColor,
        highLightAlpha: setting?.highLightAlpha
    }
    if (typeof (setting.axisDependency) != "undefined") {
        let axisDependency = AxisDependencyStringToAxisDependency(setting.axisDependency)
        Object.assign(result, { axisDependency: axisDependency })
    }
    return result
}

export interface BarDataSetSetting {
    values: Point[];
    label: string;
    form: string;
    color?: string; //设置线条颜色
    formLineWidth?: number;// 设置图标宽度
    formSize?: number; //设置图标尺寸
    valueTextSize?: number; //设置值的文本字体大小
    stackLabels?: string[]; //柱标签
    barShadowColor?: string; //柱阴影颜色
    barBorderWidth?: number; //柱边框宽
    barBorderColor?: string; //柱边颜色
    highLightAlpha?: number; //高亮透明度
    axisDependency?: string;
}
interface BarDataSetConfig {
    values: Point[];
    label: string;
    form: LegendForm;
    color?: string; //设置线条颜色
    formLineWidth?: number;// 设置图标宽度
    formSize?: number; //设置图标尺寸
    valueTextSize?: number; //设置值的文本字体大小
    stackLabels?: string[]; //柱标签
    barShadowColor?: string; //柱阴影颜色
    barBorderWidth?: number; //柱边框宽
    barBorderColor?: string; //柱边颜色
    highLightAlpha?: number; //高亮透明度
    axisDependency?: AxisDependency;
}

/**  CandleStick数据集设置
 * 
*/
export interface CandleStickDataSetSetting {
    values: KPoint[];
    label: string;
    //设置open<close
    decreasingColor?: string;
    decreasingPaintStyle?: string;
    //设置open>close
    increasingColor?: string;
    increasingPaintStyle?: string;
    //设置当open==close的情况
    neutralColor?: string;
    //设置影线
    shadowColor?: string;
    shadowColorSameAsCandle?: boolean;
    shadowWidth?: number
    //
    barSpace?: number;
    showCandleBar?: boolean;
    //
    axisDependency?: string;
}

export function CandleStickDataSetSettingToConfig(setting: CandleStickDataSetSetting): CandleStickDataSetConfig {
    let decreasingColor
    if (typeof (setting.decreasingColor) != "undefined") {
        decreasingColor = "green"
    } else {
        decreasingColor = setting.decreasingColor
    }
    let increasingColor
    if (typeof (setting.increasingColor) != "undefined") {
        increasingColor = "red"
    } else {
        increasingColor = setting.increasingColor
    }
    let result = {
        values: setting.values,
        label: setting.label,
        decreasingColor: decreasingColor,
        increasingColor: increasingColor,
        neutralColor: setting?.neutralColor,
        //设置影线
        shadowColor: setting?.shadowColor,
        shadowColorSameAsCandle: setting?.shadowColorSameAsCandle,
        shadowWidth: setting?.shadowWidth,
        //
        barSpace: setting?.barSpace,
        showCandleBar: setting?.showCandleBar
    }

    if (typeof (setting.axisDependency) != "undefined") {
        let axisDependency = AxisDependencyStringToAxisDependency(setting.axisDependency)
        Object.assign(result, { axisDependency: axisDependency })
    }
    if (typeof (setting.decreasingPaintStyle) != "undefined") {
        let decreasingPaintStyle = StyleStringToStyle(setting.decreasingPaintStyle)
        Object.assign(result, { decreasingPaintStyle: decreasingPaintStyle })
    }
    if (typeof (setting.increasingPaintStyle) != "undefined") {
        let increasingPaintStyle = StyleStringToStyle(setting.increasingPaintStyle)
        Object.assign(result, { increasingPaintStyle: increasingPaintStyle })
    }
    return result
}
interface CandleStickDataSetConfig {
    values: KPoint[];
    label: string;
    //设置open<close
    decreasingColor: string;
    decreasingPaintStyle?: any;
    //设置open>close
    increasingColor: string;
    increasingPaintStyle?: any;
    //设置当open==close的情况
    neutralColor?: string;
    //设置影线
    shadowColor?: string;
    shadowColorSameAsCandle?: boolean;
    shadowWidth?: number
    //
    barSpace?: number;
    showCandleBar?: boolean;
    //
    axisDependency?: AxisDependency;
}
interface KPoint {
    x: number,//横轴上的值,一般是时间日期等
    high: number,
    low: number,
    open: number,
    close: number,
}
function StyleStringToStyle(stylestr: string): any {
    let style = Style.FILL
    switch (stylestr.toLowerCase()) {
        case "fill":
            {
                style = Style.FILL
            }
            break;
        case "stroke":
            {
                style = Style.STROKE
            }
            break;
        case "fill_and_stroke":
            {
                style = Style.FILL_AND_STROKE
            }
            break;
    }
    return style
}

/**  Pie图设置
 * 
*/
export interface PieChartSetting {
    // 实际设置在chart上
    drawFrameRate: boolean; //显示fps
    touchEnabled?: boolean; //允许触控操作
    maxHighlightDistance?: number; //最大高亮显示距离
    backgroundColor?: string
    usePercentValues?: boolean;
    extraOffsets?: [number, number, number, number];
    dragDecelerationFrictionCoef?: number;
    // 设置中心文本
    centerText?: string;
    // 中间留出空洞和空洞样式
    drawHoleEnabled?: boolean;//中心留空洞
    holeColor?: string;
    holeRadius?: number;
    //透明环样式
    transparentCircleColor?: string;
    transparentCircleAlpha?: number;
    transparentCircleRadius?: number;
    //触摸旋转样式设置
    rotationEnabled?: boolean;
    rotationAngle?: number;
    // 设置点击高亮
    highlightPerTapEnabled?: boolean;
    entryLabelColor?: string;
    entryLabelTextSize?: number;
    drawEntryLabels?: boolean;
}

export const DefaultPieChartSetting: PieChartSetting = {
    drawFrameRate: false,
    highlightPerTapEnabled: false,
    usePercentValues: true,
    // 中间留出空洞和空洞样式
    drawHoleEnabled: false,
    //透明环样式
    transparentCircleColor: "white",
    transparentCircleAlpha: 110,
    transparentCircleRadius: 61,
    //触摸旋转样式设置
    rotationEnabled: false,
}


// Pie数据集设置
export interface PieDataSetSetting {
    values: PieValue[];
    label: string;
    form?: string;
    sliceSpace?: number;
    iconsOffset?: Point;
    selectionShift?: number;
    colorTemplates?: string[];//设置颜色范围,颜色从ColorTemplate中获取,渲染时按位置获取颜色
    drawValues?: boolean;
    valueFormatter?: string; //value,label-value,percent,label-value
}


export function PieDataSetSettingToConfig(setting: PieDataSetSetting): PieDataSetConfig {
    let result: PieDataSetConfig = {
        values: setting.values,
        label: setting.label,
        sliceSpace: setting?.sliceSpace,
        iconsOffset: setting?.iconsOffset,
        selectionShift: setting?.selectionShift,
        drawValues: setting?.drawValues
    }
    if (typeof (setting.form) != "undefined") {
        let form = FormStringToForm(setting.form)
        Object.assign(result, { form: form })
    }

    if (typeof (setting.colorTemplates) != "undefined") {
        let colorTemplates = []
        for (const colortemplate of setting.colorTemplates) {
            switch (colortemplate.toLowerCase()) {
                case "liberty_colors":
                    {
                        colorTemplates.push(...ColorTemplate.LIBERTY_COLORS)
                    }
                    break;
                case "joyful_colors":
                    {
                        colorTemplates.push(...ColorTemplate.JOYFUL_COLORS)
                    }
                    break;
                case "pastel_colors":
                    {
                        colorTemplates.push(...ColorTemplate.PASTEL_COLORS)
                    }
                    break;
                case "colorful_colors":
                    {
                        colorTemplates.push(...ColorTemplate.COLORFUL_COLORS)
                    }
                    break;
                case "vordiplom_colors":
                    {
                        colorTemplates.push(...ColorTemplate.VORDIPLOM_COLORS)
                    }
                    break;
                case "material_colors":
                    {
                        colorTemplates.push(...ColorTemplate.MATERIAL_COLORS)
                    }
                    break;
                case "holoblue":
                    {
                        colorTemplates.push(ColorTemplate.getHoloBlue())
                    }
                    break;
            }
        }
        Object.assign(result, { colorTemplates: colorTemplates })
    }
    if (typeof (setting.valueFormatter) != "undefined") {
        let valueFormatter: (value: number, entry: PieEntry) => string
        switch (setting.valueFormatter.toLowerCase()) {
            case "value":
                {
                    valueFormatter = (value: number, entry: PieEntry): string => {
                        return `${value}`
                    }
                }
                break;
            case "label-value":
                {
                    valueFormatter = (value: number, entry: PieEntry): string => {
                        return `${entry.label}-${value}`
                    }
                }
                break;
            case "percent":
                {
                    valueFormatter = (value: number, entry: PieEntry): string => {
                        return `${value.toFixed(2)}%`
                    }
                }
                break;
            case "label-percent":
                {
                    valueFormatter = (value: number, entry: PieEntry): string => {
                        return `${entry.label}-${value.toFixed(2)}%`
                    }
                }
                break;
        }
        Object.assign(result, { valueFormatter: valueFormatter })
    }
    return result
}

interface PieDataSetConfig {
    values: PieValue[];
    label: string;
    form?: LegendForm;
    sliceSpace?: number;
    iconsOffset?: Point;
    selectionShift?: number;
    colorTemplates?: any[];//设置颜色范围,颜色从ColorTemplate中获取,渲染时按位置获取颜色
    drawValues?: boolean;
    valueFormatter?: (value: number, entry: PieEntry) => string; //value,label-value,percent,label-value
}
interface PieValue {
    y: number,
    label: string,
}


/** Radar图设置
 * 
*/
export interface RadarChartSetting {
    // 实际设置在chart上
    drawFrameRate?: boolean; //显示fps
    touchEnabled?: boolean; //允许触控操作
    maxHighlightDistance?: number; //最大高亮显示距离
    backgroundColor?: string

    extraOffsets?: [number, number, number, number];
    dragDecelerationFrictionCoef?: number;


    //触摸旋转样式设置
    rotationEnabled?: boolean;
    rotationAngle?: number;
    // 设置点击高亮
    highlightPerTapEnabled?: boolean;

    // radar独有
    webLineWidth?: number;
    webLineWidthInner?: number;
    webAlpha?: number;
    webColor?: string;
    webColorInner?: string
    drawWeb?: boolean;
    skipWebLineCount?: number;
}


export const DefaultRadarChartSetting: RadarChartSetting = {
    drawFrameRate: false,
    highlightPerTapEnabled: false,
    //触摸旋转样式设置
    rotationEnabled: false,
}


//Radar数据设置
export interface RadarDataSetting extends DataSetting {
    labels: string[];
}
// Radar数据集设置
export interface RadarDataSetSetting {
    values: RadarValue[];
    label: string;
    form?: string;
    color?: string; //设置线条颜色
    lineWidth?: number;// 设置线条宽度
    formLineWidth?: number;// 设置图标宽度
    formSize?: number; //设置图标尺寸
    valueTextSize?: number; //设置值的文本字体大小
    dashedHighlightLine?: DashlineSetting;// 将选择线画为虚线
    drawFilled?: boolean;// 设置填充区
    fillColor?: string;// 设置填充区颜色set color of filled area
    fillAlpha?: number;
    drawValues?: boolean;
    axisDependency?: string;
    drawHighlightCircleEnabled?: boolean;
    highlightCircleFillColor?: string;
    highlightCircleStrokeColor?: string;
    highlightCircleStrokeAlpha?: number;
    highlightCircleInnerRadius?: number;
    highlightCircleOuterRadius?: number;
    highlightCircleStrokeWidth?: number;
    valueFormatter?: string;
}
export function RadarDataSetSettingToConfig(setting: RadarDataSetSetting): RadarDataSetConfig {
    let result: RadarDataSetConfig = {
        values: setting.values,
        label: setting.label,
        color: setting?.color,
        lineWidth: setting?.lineWidth,
        formLineWidth: setting?.formLineWidth,
        formSize: setting?.formSize,
        valueTextSize: setting?.valueTextSize,
        dashedHighlightLine: setting?.dashedHighlightLine,
        drawFilled: setting?.drawFilled,
        fillColor: setting?.fillColor,
        drawValues: setting?.drawValues,

        drawHighlightCircleEnabled: setting?.drawHighlightCircleEnabled,
        highlightCircleFillColor: setting?.highlightCircleFillColor,
        highlightCircleStrokeColor: setting?.highlightCircleStrokeColor,
        highlightCircleStrokeAlpha: setting?.highlightCircleStrokeAlpha,
        highlightCircleInnerRadius: setting?.highlightCircleInnerRadius,
        highlightCircleOuterRadius: setting?.highlightCircleOuterRadius,
        highlightCircleStrokeWidth: setting?.highlightCircleStrokeWidth
    }
    if (typeof (setting.form) != "undefined") {
        let form = FormStringToForm(setting.form)
        Object.assign(result, { form: form })
    }
    if (typeof (setting.axisDependency) != "undefined") {
        let axisDependency = AxisDependencyStringToAxisDependency(setting.axisDependency)
        Object.assign(result, { axisDependency: axisDependency })
    }
    if (typeof (setting.valueFormatter) != "undefined") {
        let valueFormatter: (value: number, entry: PieEntry) => string

        switch (setting.valueFormatter.toLowerCase()) {
            case "value":
                {
                    valueFormatter = (value: number, entry: RadarEntry): string => {
                        return `${value}`
                    }
                }
                break;
            case "label-value":
                {
                    valueFormatter = (value: number, entry: RadarEntry): string => {
                        return `${entry.label}-${value}`
                    }
                }
                break;
        }
        Object.assign(result, { valueFormatter: valueFormatter })
    }
    return result
}

interface RadarDataSetConfig {
    values: RadarValue[];
    label: string;
    form?: LegendForm;
    color?: string; //设置线条颜色
    lineWidth?: number;// 设置线条宽度
    formLineWidth?: number;// 设置图标宽度
    formSize?: number; //设置图标尺寸
    valueTextSize?: number; //设置值的文本字体大小
    dashedHighlightLine?: DashlineSetting;// 将选择线画为虚线
    drawFilled?: boolean;// 设置填充区
    fillColor?: string;// 设置填充区颜色set color of filled area
    fillAlpha?: number;
    axisDependency?: AxisDependency;
    drawValues?: boolean;
    //radar特有
    drawHighlightCircleEnabled?: boolean;
    highlightCircleFillColor?: string;
    highlightCircleStrokeColor?: string;
    highlightCircleStrokeAlpha?: number;
    highlightCircleInnerRadius?: number;
    highlightCircleOuterRadius?: number;
    highlightCircleStrokeWidth?: number;
    valueFormatter?: (value: number, entry: RadarEntry) => string;
}


export interface RadarValue {
    y: number
}