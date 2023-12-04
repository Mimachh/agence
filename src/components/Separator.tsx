import React from 'react'

interface SeparatorProps {
    text: string;
}

export default function Separator(props: SeparatorProps) {
    const {text} = props;
    return (
        <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-muted/80" />
            </div>
            <div className="relative flex justify-center">
                <span className="bg-background px-2 text-sm text-primary">{text}</span>
            </div>
        </div>
    )
}
