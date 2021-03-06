import { Button } from "@react-components/button";
import { Popper } from "@react-components/popper";
import { bool } from "prop-types";
import { forwardRef, useState } from "react";
import { isNil } from "lodash";

function InnerRedBox({ forwardedRef, ...rest }) {
    return (
        <div
            className="w12 h12 bg-red"
            tabIndex="0"
            ref={forwardedRef}
            {...rest}
        >
        </div>
    );
}

export const RedBox = forwardRef((props, ref) => (
    <InnerRedBox { ...props } forwardedRef={ref} />
));

function InnerRedBoxPopper({ defaultShow, forwardedRef, ...rest }) {
    const [triggerElement, setTriggerElement] = useState();
    const [isVisible, setVisibility] = useState(defaultShow);

    return (
        <>
            <Button
                fluid
                onClick={() => setVisibility(!isVisible)}
                ref={setTriggerElement}
            >
                Open
            </Button>
            <If condition={!isNil(triggerElement)}>
                <Popper
                    show={isVisible}
                    triggerElement={triggerElement}
                    ref={forwardedRef}
                    {...rest}
                >
                    <RedBox />
                </Popper>
            </If>
        </>
    );
}

export const RedBoxPopper = forwardRef((props, ref) => (
    <InnerRedBoxPopper { ...props } forwardedRef={ref} />
));

RedBoxPopper.propTypes = {
    defaultShow: bool
};

RedBoxPopper.defaultProps = {
    defaultShow: false
};


