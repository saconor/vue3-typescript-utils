export enum IconPlacement {
    LEFT = 0,
    MIDDLE = 1,
    RIGHT = 2
}

export interface CardObject {
    header: {
        title: string,
        iconUrl?: string,
        iconPlacement?: IconPlacement
        customCss?:string
    };
    body: {
        text: string
        additionalData?: { key: string, value: string }[]
        customCss?:string
        additionalSections?: {
            text: string
            additionalData?: { key: string, value: string }[]
        }[]
    };
    footer?: {
        content: string,
        buttonFunktion?: (value: CardObject) => void
        buttonTitle?:string
        customCss?:string

    };
    options?: any
}