import React from "react";
import styles from "./styles.module.css";

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <nav>Navigation</nav>
            <main className={styles.main}>
                {children}
            </main>
        </>
    )
}
