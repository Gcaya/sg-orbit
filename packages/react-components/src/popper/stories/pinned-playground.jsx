import { Boundary } from "./boundary";
import { Children, cloneElement, useState } from "react";
import { Toggle } from "@react-components/toggle";

export function PinnedPlayground({ children }) {
    const [isPinned, setIsPinned] = useState(true);

    const popper = cloneElement(Children.only(children), {
        pinned: isPinned,
        noPortal: true
    });

    return (
        <div>
            <Boundary>
                {popper}
            </Boundary>
            <div className="mt4">
                <Toggle text="Pinned" checked={isPinned} onChange={() => { setIsPinned(!isPinned); }} />
            </div>
        </div>
    );
}
