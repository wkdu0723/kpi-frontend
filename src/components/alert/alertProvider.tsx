"use client";
import React, { useState } from "react";
import { AlertContext, AlertProps, AlertType } from "./alertContext";
import { v4 } from 'uuid';
import { Alert } from "@mui/material";
import style from "./style.module.scss";

/** 
 * AlertProvider 컴포넌트
 * 
 * 알림을 표시하고 관리할 수 있는 컨텍스트를 제공합니다.
 * 
 * @example
 * const { addAlert } = useContext(AlertContext);
 * addAlert("success", "This is a success message");
 */
export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
    const [alerts, setAlerts] = useState<AlertProps[]>([]);

    const addAlert = (type: AlertType, message: string) => {
        const id = v4();
        setAlerts((prevAlerts) => [...prevAlerts, { id, type, message }]);
        setTimeout(() => {
            removeAlert(id);
        }, 5000);
    };

    const removeAlert = (id: string) => {
        setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
    };

    return (
        <AlertContext.Provider value={{ alerts, addAlert, removeAlert }}>
            {children}
            <div className={style.alert}>
                {alerts.map((alert) => (
                    <Alert key={alert.id} severity={alert.type} onClose={() => removeAlert(alert.id)}>
                        {alert.message}
                    </Alert>
                ))}
            </div>
        </AlertContext.Provider>
    );
};