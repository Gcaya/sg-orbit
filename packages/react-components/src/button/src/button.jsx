/* eslint-disable react/forbid-foreign-prop-types */

import { ArgumentError, SemanticRef, mergeClasses, throwWhenUnsupportedPropIsProvided, useAutofocus, useCombinedRefs } from "../../shared";
import { Children, cloneElement, forwardRef, useCallback } from "react";
import { Button as SemanticButton } from "semantic-ui-react";
import { bool, element, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { createIconForControl } from "../../icons";
import { createLabelFromShorthand } from "../../label";
import { createTagFromShorthand } from "../../tag";
import { isElement } from "react-is";
import { isNil } from "lodash";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["mini", "tiny", "small", "medium", "large"];
const DEFAULT_SIZE = "medium";

const UNSUPPORTED_PROPS = ["animated", "attached", "color", "labelPosition", "floated", "inverted"];

const propTypes = {
    /**
     * A ghost button doesn't have a background color until it's hovered.
     */
    ghost: bool,
    /**
     * A button can look like a link.
     */
    link: bool,
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) for an [icon](/?path=/docs/components-icon--default-story).
     */
    icon: element,
    /**
     * An icon can appear on the left or right.
     */
    iconPosition: oneOf(["left", "right"]),
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) for a [label](/?path=/docs/components-label--default-story).
     */
    label: oneOfType([element, object]),
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) for a [tag](/?path=/docs/components-tag--default-story).
     */
    tag: oneOfType([element, object]),
    /**
     * A button can be colorless. Use this variant if you need to customize the button.
     */
    naked: bool,
    /**
     * Whether or not the checkbox should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * An input can vary in sizes.
     */
    size: oneOf(SIZES),
    /**
     * The button type.
     */
    type: oneOf(["button", "submit", "reset"]),
    /**
     * @ignore
     */
    loading: bool,
    /**
     * @ignore
     */
    disabled: bool,
    /**
     * @ignore
     */
    className: string,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

const defaultProps = {
    ghost: false,
    link: false,
    iconPosition: "left",
    naked: false,
    size: DEFAULT_SIZE,
    type: "button",
    loading: false,
    disabled: false
};

function throwWhenMutuallyExclusivePropsAreProvided({ label, tag, icon, iconPosition }) {
    if (!isNil(label) && !isNil(icon) && iconPosition === "right") {
        throw new ArgumentError("@orbit-ui/react-components/button doesn't support having a label and a right positioned icon at the same time.");
    }

    if (!isNil(tag) && !isNil(icon) && iconPosition === "left") {
        throw new ArgumentError("@orbit-ui/react-components/button doesn't support having a tag and a left positioned icon at the same time.");
    }
}

function useSetFocus(buttonRef) {
    return useCallback(() => {
        if (!isNil(buttonRef.current)) {
            buttonRef.current.focus();
        }
    }, [buttonRef]);
}

function useIconRenderer({ icon, size }) {
    return () => {
        return createIconForControl(icon, size);
    };
}

function useLabelRenderer({ label, disabled }) {
    return () => {
        const props = {
            as: "span",
            size: "mini",
            highlight: true,
            disabled: disabled
        };

        if (isElement(label)) {
            return cloneElement(label, props);
        }

        return createLabelFromShorthand({
            ...props,
            ...label
        });
    };
}

function useTagRenderer({ tag, disabled }) {
    return () => {
        const props = {
            as: "span",
            size: "mini",
            disabled: disabled
        };

        if (isElement(tag)) {
            return cloneElement(tag, props);
        }

        return createTagFromShorthand({
            ...props,
            ...tag
        });
    };
}

function useContentRenderer({ icon, iconPosition, label, tag, size, loading, disabled, children }) {
    const renderIcon = useIconRenderer({ icon, size });
    const renderLabel = useLabelRenderer({ label, disabled });
    const renderTag = useTagRenderer({ tag, disabled });

    return () => {
        if (!loading) {
            let left;
            let right;

            if (!isNil(icon)) {
                if (iconPosition === "right") {
                    right = renderIcon();
                } else {
                    left = renderIcon();
                }
            }

            if (!isNil(label)) {
                right = renderLabel();
            }

            if (!isNil(tag)) {
                left = renderTag();
            }

            if (!isNil(left) || !isNil(right)) {
                return <>{!isNil(left) && left}{children}{!isNil(right) && right}</>;
            }
        }

        return children;
    };
}

function useRenderer(
    { basic, ghost, link, naked, icon, iconPosition, label, tag, size, loading, disabled, className, children, rest },
    autofocusProps,
    innerRef,
    renderContent
) {
    return () => {
        const hasText = Children.count(children) > 0;

        const classes = mergeClasses(
            naked && "naked",
            ghost && "ghost",
            link && "link",
            !isNil(icon) && "with-icon",
            !isNil(icon) && iconPosition === "right" && "with-icon-right",
            !isNil(label) && "with-label",
            !isNil(tag) && "with-tag",
            !hasText && "without-text",
            className
        );

        return (
            <SemanticRef innerRef={innerRef}>
                <SemanticButton
                    data-testid="button"
                    {...rest}
                    {...autofocusProps}
                    basic={basic}
                    size={size}
                    loading={loading}
                    disabled={disabled}
                    className={classes}
                >
                    {renderContent()}
                </SemanticButton>
            </SemanticRef>
        );
    };
}

export function InnerButton(props) {
    const {
        basic,
        ghost,
        link,
        naked,
        icon,
        iconPosition,
        label,
        tag,
        autofocus,
        autofocusDelay,
        size,
        loading,
        disabled,
        className,
        forwardedRef,
        children,
        ...rest
    } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/button");
    throwWhenMutuallyExclusivePropsAreProvided(props);

    const innerRef = useCombinedRefs(forwardedRef);

    const setFocus = useSetFocus(innerRef);
    const autofocusProps = useAutofocus(autofocus, autofocusDelay, disabled, setFocus);

    const renderContent = useContentRenderer({ icon, iconPosition, label, tag, size, loading, disabled, children });

    const render = useRenderer(
        { basic, ghost, link, naked, icon, iconPosition, label, tag, size, loading, disabled, className, children, rest },
        autofocusProps,
        innerRef,
        renderContent
    );

    // Without a fragment, react-docgen doesn't work.
    return <>{render()}</>;
}

InnerButton.propTypes = propTypes;
InnerButton.defaultProps = defaultProps;

export const Button = forwardRef((props, ref) => (
    <InnerButton { ...props } forwardedRef={ref} />
));

// Button.Or is not supported yet.
[InnerButton, Button].forEach(x => {
    x.Content = SemanticButton.Content;
    x.Group = SemanticButton.Group;
});

if (!isNil(SemanticButton.propTypes)) {
    SemanticButton.propTypes.size = oneOf(SIZES);
}
