import { Label as SemanticLabel } from "semantic-ui-react";
import { SemanticRef, mergeClasses, throwWhenUnsupportedPropIsProvided } from "../../shared";
import { bool, func, object, oneOf, oneOfType } from "prop-types";
import { forwardRef } from "react";

const UNSUPPORTED_PROPS = ["attached", "color", "circular", "corner", "floating", "horizontal", "image", "onClick", "onRemove", "pointing", "prompt", "removeIcon", "ribbon", "tag"];

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const DEFAULT_SIZE = "medium";

const propTypes = {
    /**
     * A tag can vary in sizes.
     */
    size: oneOf(["mini", "tiny", "small", "medium", "large", "big", "huge", "massive"]),
    /**
     * A tag can have a disabled look.
     */
    disabled: bool,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    size: DEFAULT_SIZE,
    disabled: false
};

export function InnerTag({ forwardedRef, className, disabled, ...props }) {
    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/tag");

    const classes = mergeClasses(
        disabled && "disabled",
        className
    );

    return (
        <SemanticRef innerRef={forwardedRef}>
            <SemanticLabel tag circular empty className={classes} {...props} />
        </SemanticRef>
    );
}

InnerTag.propTypes = propTypes;
InnerTag.defaultProps = defaultProps;

export const Tag = forwardRef((props, ref) => (
    <InnerTag { ...props } forwardedRef={ref} />
));

