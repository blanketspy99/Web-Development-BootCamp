import React from "react";



export default function Footer() {
    let date = new Date();
    const year = date.getFullYear();
    return <footer> <p> copyright © {year} </p> </footer>
}