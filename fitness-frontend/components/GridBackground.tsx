import { cn } from "@/lib/utils";
import React from "react";

export default function GridBackground() {
    return (
        <div className="absolute inset-0 z-[-10]">
            { /* Grid Pattern */}
            <div
                className={cn(
                    "absolute inset-0",
                    "[background-size:20px_20px]",
                    "[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
                )}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a]/90 pointer-events-none" />
        </div>
    )
}