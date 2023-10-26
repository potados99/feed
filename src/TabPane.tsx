import React, {PropsWithChildren} from "react";
import PropTypes from "prop-types";

const TabPane = (props: PropsWithChildren) => {
    return <div className="tab-pane">{props.children}</div>;
};
TabPane.propTypes = {
    name: PropTypes.string
};

export default TabPane;
