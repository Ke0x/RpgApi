import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import axios from "axios";
import react, { useEffect, useState } from "react";

const username = "test23";
const password = "test23";

const game = [
  {
    question:
      "Vous voyez un trésor devant vous avec un enorme ID : 1 au dessus, que faites vous ?",
    btn1: { text: "je me mefie et passe mon chemin", valid: false },
    btn2: { text: "je vais recuperer le tresor", valid: true },
    btn3: { text: "j'ai peur et je rentre chez moi", valid: false },
    btn4: {
      text: "j'attend que quelqu'un d'autre le recupere pour moi",
      valid: false,
    },
  },
  {
    question:
      "Vous vous approchez du cadenas, il y est écrit un etrange message ' La clé est le nom de l'inventeur de REST 6d6cc50e4ff16c20cbed53036f87a59587715f205180989111288751' vous inspectez le coffre plus en detail, sur le haut du coffre il est écrit cipher aes-256-ctr. A votre avis comment faut t-il decrypter ce message",
    btn1: {
      text: "grace a la clé Roy Felding et l'algorithme aes-256-ctr",
      valid: true,
    },
    btn2: {
      text: "grace a la clé Roy Felding et l'algorithme aes-256-ctb",
      valid: false,
    },
    btn3: { text: "J'essaye de brut force le cryptage", valid: false },
    btn4: { text: "j'abbandonne", valid: false },
  },
  {
    question:
      "Vous arrivez devant un couloir, une porte avec un '1' au dessus vous attend au bout, que faites vous ?",
    btn1: {
      text: "je suis dans un donjon, c'est dangereux, je barricade la porte",
      valid: false,
    },
    btn2: {
      text: "J'ouvre la porte, il y a evidement un trésor derriere",
      valid: true,
    },
    btn3: {
      text: "le couloir semble glauque je passe mon chemin et continue",
      valid: false,
    },
    btn4: { text: "j'ai peur, je fais demi-tour", valid: false },
  },
  {
    question:
      "En un mot, quelle est la notion de HTTP qui différencie la méthode POST et PUT",
    btn1: { text: "idempotent", valid: true },
    btn2: { text: "Restful", valid: false },
    btn3: { text: "interopérabilité", valid: false },
    btn4: { text: "je sais pas", valid: false },
  },
  {
    question:
      "l'idempotence signifie qu'on obtient le meme resultat quand on réplique une operation, vous etes sur qu'il ne vous reste rien a faire ici ?",
    btn1: {
      text: "il ne me reste rien a faire ici je m'en vais",
      valid: false,
    },
    btn2: { text: "je lui redonne la meme réponse", valid: true },
    btn3: {
      text: "il semble senile mieux vaut ne pas l'ecouter",
      valid: false,
    },
    btn4: {
      text: "Un trésor est déja bien suffisant, je m'en vais",
      valid: false,
    },
  },
  {
    question:
      "Un dragon semble vous barrer le passage. Si je peux donner mon avis essayer de PRENDRE un dragon n'est pas une bonne idée",
    btn1: {
      text: "Je suis plus malin que les autres et je le supprime",
      valid: true,
    },
    btn2: {
      text: "je continue d'essayer de le prendre, il bougera a un moment",
      valid: false,
    },
    btn3: {
      text: "j'essaye de le mettre a jour, il sera peut etre plus gentil",
      valid: false,
    },
    btn4: {
      text: "j'essaye d'en creer un a coté de lui j'aurai peut etre plus de chance ainsi",
      valid: false,
    },
  },
  {
    question:
      "Vous etes redescendu, vous vous souvenez de la note et vous cherchez ce chemin caché.",
    btn1: {
      text: "je tape chaque mur pour trouver celui qui sonne creux",
      valid: false,
    },
    btn2: {
      text: "je cherche un trésor, le chemin caché est forcément 'trésor' !",
      valid: true,
    },
    btn3: { text: "j'attend que quelqu'un le trouve pour moi", valid: false },
    btn4: {
      text: "j'ai déja 6 trésors, je m'en vais ainsi, je ne suis pas avare",
      valid: false,
    },
  },
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [tresors, setTresors] = useState(0);
  const [token, setToken] = useState("");
  const [firstToken, setFirstToken] = useState("");

  const btn1 = () => {
    switch (step) {
      case 1:
        coffre();
        break;
      case 3:
        vieux();
        break;
      case 5:
        dragon();
        break;
      default:
      // code block
    }
  };

  const btn2 = () => {
    switch (step) {
      case 0:
        first();
        break;
      case 2:
        couloir();
        break;
      case 4:
        vieux();
        break;
      case 6:
        tresor();
        break;
      default:
      // code block
    }
  };

  useEffect(() => {
    axios
      .get("/inscription", {
        headers: {},
        auth: {
          username: username,
          password: password,
        },
      })
      .then((result) => {
        setFirstToken(result.headers["x-subject-token"]);
        setToken(result.headers["x-subject-token"]);
      });
  }, []);

  useEffect(() => {
    if (token) numbers();
  }, [step]);

  const first = () => {
    axios
      .get("/1", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then(setStep(step + 1));
  };

  const numbers = () => {
    axios
      .get("/reset", {
        headers: {
          "x-auth-token": firstToken,
        },
      })
      .then((result) => {
        setTresors(result.data.retreived_tresors.length);
      });
  };

  const tresor = () => {
    axios
      .get("/inscription", {
        headers: {},
        auth: {
          username: username,
          password: password,
        },
      })
      .then((result) =>
        axios
          .get("/tresor", {
            headers: {
              "x-auth-token": result.headers["x-subject-token"],
            },
          })
          .then((result) => {
            numbers();
          })
      );
  };

  const coffre = () => {
    var config = {
      method: "get",
      url: "/coffre",
      headers: {
        "x-auth-token": token,
      },
    };

    axios(config)
      .then(function (response) {
        setStep(step + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
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
        setStep(step + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const couloir = () => {
    axios
      .get("/inscription2", {
        headers: {},
        auth: {
          username: username,
          password: password,
        },
      })
      .then((result) => {
        setToken(result.headers["x-subject-token"]);
        axios
          .get("/couloir", {
            headers: {
              "x-auth-token": result.headers["x-subject-token"],
            },
          })
          .then(setStep(step + 1));
      });
  };

  const dragon = () => {
    axios
      .get("/inscription3", {
        headers: {},
        auth: {
          username: username,
          password: password,
        },
      })
      .then((result) => {
        axios
          .delete("/dragon", {
            headers: {
              "x-auth-token": result.headers["x-subject-token"],
            },
          })
          .then(setStep(step + 1));
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>RpgApi</title>
        <meta name="description" content="RPG API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.mainContainer}>
        <h1 className={styles.amount}>{tresors}</h1>
        <h2 className={styles.question}>{game[step].question}</h2>
        <div className={styles.btnContainer}>
          <div className={styles.btn} onClick={btn1}>
            <p className={styles.btnText}>{game[step].btn1.text}</p>
          </div>
          <div className={styles.btn} onClick={btn2}>
            <p className={styles.btnText}>{game[step].btn2.text}</p>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <div className={styles.btn}>
            <p className={styles.btnText}>{game[step].btn3.text}</p>
          </div>
          <div className={styles.btn}>
            <p className={styles.btnText}>{game[step].btn4.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
