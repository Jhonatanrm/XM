export class IElementSend {
    requiredStorage?: boolean;
    xmEnvironmentalInfoMeasuringElementMrid: number;
}

export interface IElement extends IElementSend {
    measuringElementMrid?: string;
    measuringElementCode?: string;
    xposition?: number;
    yposition?: number;
    zposition?: number;
    xmHubHeight?: number;
    tag_pi?: string;
}

