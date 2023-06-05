import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

// import logo from './logo.svg';
// import './App.css';
import Nav from "../components/nav";
import Main from "../components/main";

export default function Home({ wholedata }) {
    console.log(wholedata);
    const [data, setdata] = useState("");


    useEffect(() => {
        // fetchData()
    }, []);

    return (
        <div>
        <Nav />
        <Main />
        </div>
    );
}
