import React from "react";
import { Triangle } from "react-loader-spinner";

interface Props {
    loaderProps: {
        color: string,
        height: string,
        width: string,
    };
};

const CustomLoader = ({ loaderProps }: Props) => (
    <div style={{
        width: "100%", justifyContent: "center", display: "flex"
    }}>
        <Triangle
            visible={true}
            height={loaderProps.height}
            width={loaderProps.width}
            color={loaderProps.color}
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    </div>
);

CustomLoader.defaultProps = {
    loaderProps: {
        color: "#1900ff",
        height: "30",
        width: "30",
    }
};

export default CustomLoader;