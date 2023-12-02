"use client";

import { useEffect, useState } from "react";
import { Roulette } from ".";
import Countdown from "react-countdown";
import { AnimatePresence } from "framer-motion";
import { EntryColor } from "./EntryList";

enum ResponseTypes {
  ROULETTE_RESULT = "roulette_result",
  ROULETTE_COOLDOWN = "roulette_cooldown",
}

type ResponseData =
  | {
      type: ResponseTypes.ROULETTE_COOLDOWN;
      data: {
        duration: number;
      };
    }
  | {
      type: ResponseTypes.ROULETTE_RESULT;
      data: {
        number: number;
      };
    };

export default function RouletteRoot() {
  const [isConnecting, setConnecting] = useState<boolean>(true);
  const [isUnableToConnect, setUnableToConnect] = useState<boolean>(false);
  const [rouletteResult, setRouletteResult] = useState<number | null>(null);
  const [rouletteCooldown, setRouletteCooldown] = useState<number | null>(null);

  function onCountdownEnd() {
    console.log("Countdown completed");
    setRouletteResult(null);
    setRouletteCooldown(null);
  }

  function connectWebSocket() {
    const socket = new WebSocket("ws://localhost:3001");

    socket.addEventListener("open", (ev) => {
      console.log("Conectado ao websocket!");
      setConnecting(false);
    });

    socket.addEventListener("close", (ev) => {
      console.log("Desconectado do websocket!");
    });

    socket.addEventListener("error", (ev) => {
      console.log("Erro ao conectar ao websocket!");
      setUnableToConnect(true);
      setConnecting(false);
    });

    socket.addEventListener("message", (ev) => {
      const parsedResponse = JSON.parse(ev.data);
      const data: ResponseData = parsedResponse;

      setUnableToConnect(false);
      setConnecting(false);

      console.log(data);

      if (data.type === ResponseTypes.ROULETTE_RESULT) {
        setRouletteResult(data.data.number);
      }

      if (data.type === ResponseTypes.ROULETTE_COOLDOWN) {
        setRouletteCooldown(data.data.duration);
        setTimeout(() => {
          onCountdownEnd();
        }, data.data.duration);
      }
    });
  }

  useEffect(() => {
    connectWebSocket();
  }, []);

  if (!!isUnableToConnect) {
    return <div>Não foi possível conectar ao websocket</div>;
  }

  if (!!isConnecting) {
    return <div>Conectando ao websocket...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center w-full justify-center h-8">
        {rouletteCooldown && (
          <Roulette.CooldownTimer endDate={Date.now() + rouletteCooldown} />
        )}
      </div>

      <div className="flex overflow-hidden gap-4 items-center justify-center relative h-28">
        <AnimatePresence>
          {rouletteResult && (
            <Roulette.Slot number={rouletteResult} key={rouletteResult} />
          )}
        </AnimatePresence>
      </div>

      <div className="flex w-full items-center gap-2 justify-between bg-neutral-800 border border-neutral-600 rounded-md p-2 mx-auto">
        <input
          type="number"
          name="betAmount"
          id="betAmount"
          step={0.01}
          min={0.0}
          placeholder="Digite o valor da sua aposta!"
          className="w-full bg-transparent"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Roulette.Button>
          <h1 className="text-white text-xs text-center lg:text-base">
            Apostar no vermelho
          </h1>
          <p className="text-xs text-white/40">2x</p>
        </Roulette.Button>

        <Roulette.Button>
          <h1 className="text-white text-xs text-center lg:text-base">
            Apostar no verde
          </h1>
          <p className="text-xs text-white/40">15x</p>
        </Roulette.Button>

        <Roulette.Button>
          <h1 className="text-white text-xs text-center lg:text-base">
            Apostar no preto
          </h1>
          <p className="text-xs text-white/40">2x</p>
        </Roulette.Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Roulette.EntryList
          color={EntryColor.Red}
          title="Apostas no vermelho"
          entries={[
            {
              avatarUrl:
                "https://cdn.discordapp.com/avatars/753365063288750144/0440bab4ff9252f2d9efff53cd890498.png?size=2048",
              username: "pedroosz",
              coins: 5000,
            },
          ]}
        />

        <Roulette.EntryList
          color={EntryColor.Green}
          title="Apostas no verde"
          entries={[]}
        />

        <Roulette.EntryList
          color={EntryColor.Black}
          title="Apostas no preto"
          entries={[]}
        />
      </div>
    </div>
  );
}
