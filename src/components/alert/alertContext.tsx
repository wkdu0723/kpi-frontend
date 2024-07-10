import { createContext, useContext } from "react";

export type AlertType = "success" | "info" | "warning" | "error";

export interface AlertProps {
    id: string;
    type: AlertType;
    message: string;
}

interface AlertContextProps {
    alerts: AlertProps[];
    addAlert: (type: AlertType, message: string) => void;
    removeAlert: (id: string) => void;
}

/** alert 상태와 제어 메서드를 제공합니다. */
export const AlertContext = createContext<AlertContextProps | undefined>(undefined);

/** AlertContext를 사용하여 알림을 추가, 제거할 수 있는 훅입니다. */
export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
};