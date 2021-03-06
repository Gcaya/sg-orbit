import { Button } from "@react-components/button";
import { PopperTrigger } from "@react-components/popper";
import { useState } from "react";

export function ControlledPopper() {
    const [isVisible, setIsVisible] = useState(false);

    const labelStyle = {
        width: "80px"
    };

    return (
        <>
            <div className="mb6">
                <span className="dib fw6" style={labelStyle}>open:</span> {isVisible ? "true" : "false"}
            </div>
            <PopperTrigger.Button
                button={<Button>Toggle</Button>}
                show={isVisible}
                onVisibilityChange={() => { setIsVisible(!isVisible); }}
            >
                <div className="bg-primary-300 white pa2">A comet is an icy, small Solar System body.</div>
            </PopperTrigger.Button>
        </>
    );
}
