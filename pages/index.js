import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import react, { useEffect, useState } from "react";

const game = [
  {
    question: "la question",
    btn1: { text: "text", valid: true },
    btn2: { text: "text", valid: false },
    btn3: { text: "text", valid: false },
    btn4: { text: "text", valid: false },
  },
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [token, setToken] = useState("");

  useEffect(() => {
    axios
      .get("/inscription", {
        headers: {},
        auth: {
          username: "test",
          password: "test",
        },
      })
      .then((result) => setToken(result.headers["x-subject-token"]));
  }, []);

  const premierTresor = () => {
    console.log(token);
    axios
      .get("/coffre", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((result) => console.log(result));
  };

  const tresor = () => {
    axios
      .get("/inscription", {
        headers: {},
        auth: {
          username: "test",
          password: "test",
        },
      })
      .then((result) =>
        axios
          .get("/tresor", {
            headers: {
              "x-auth-token": result.headers["x-subject-token"],
            },
          })
          .then((result) => console.log(result))
      );
  };

  const deuxiemeAuth = () => {
    axios
      .get("/inscription2", {
        headers: {},
        auth: {
          username: "test",
          password: "test",
        },
      })
      .then((result) => setToken(result.headers["x-subject-token"]));
  };

  const vieux = () => {
    var config = {
      method: "post",
      url: "/vieux",
      headers: {
        "x-auth-token": token,
        "Content-Type": "text/plain",
      },
      data: "idempotent",
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const couloir = () => {
    axios
      .get("/couloir", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((result) => console.log(result));
  };

  const dragon = () => {
    axios
      .delete("/dragon", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((result) => console.log(result));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>RpgApi</title>
        <meta name="description" content="RPG API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mainContainer}>
        <h2 className={styles.question}>{game[step].question}</h2>
        <div className={styles.btnContainer}>
          <div className={styles.btn} onClick={deuxiemeAuth}>
            <p className={styles.btnText}>{game[step].btn1.text}</p>
          </div>
          <div className={styles.btn} onClick={vieux}>
            <p className={styles.btnText}>{game[step].btn2.text}</p>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <div className={styles.btn}>
            <p className={styles.btnText}>{game[step].btn3.text}</p>
          </div>
          <div className={styles.btn} onClick={premierTresor}>
            <p className={styles.btnText}>{game[step].btn4.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
