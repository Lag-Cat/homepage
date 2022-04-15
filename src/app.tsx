import { RouteContextType } from "@ant-design/pro-layout";
import { Route } from "umi/node_modules/@types/react-router";

interface IRouteChange {
    location: Location
    routes: Route[],
    action: "PUSH" | "POP" | "REPLACE" | undefined
}

export const onRouteChange = (route: IRouteChange) => {
    const { location, routes, action } = route;
    switch (location.pathname) {
        case "/settings":
            document.title = "设置";
            break;
        default:
            document.title = "首页";
            break;

    }
}