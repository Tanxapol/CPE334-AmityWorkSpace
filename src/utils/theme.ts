import type { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
    token: {
        fontFamily: "IBM Plex Sans",
        // colorPrimary: "#55BDCA",
        colorPrimaryActive: "#C7EEF5",
        // colorText: "#04244A",
    },
    components: {
        Button: {
            colorPrimary: "#55BDCA",
            primaryColor: "#04244A",
            colorPrimaryHover: "#73C9D3",
            // colorPrimaryTextHover: "#55BDCA",
            // colorPrimaryBorderHover: "#55BDCA",
        },
        Input: {
            colorText: "#04244A",
            colorTextPlaceholder: "rgba(4, 36, 74, 0.50)",
            colorBorder: "#55bdca",
            activeBorderColor: "#55bdca",
        },
        Table: {
            headerBg: "#04244A",
            headerColor: "#ffffff",
        },
        DatePicker: {
            colorPrimary: "#04244A",
            colorPrimaryHover: "#55BDCA",
            colorPrimaryActive: "#55BDCA",
        }

    }
}