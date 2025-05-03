"use client";
import { useEffect } from "react";
import style from "./exchangeAllOwner.module.css";
import { useExchange } from "@/context/exchangeContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ExchangeAllOwner() {
  const {
    exchangeOwner,
    findByOwner,
    acceptExchanges,
    acceptExchange,
    deleteExchange,
    findByRequester,
    exchangeRequester,
  } = useExchange();

  const router = useRouter();

  useEffect(() => {
    findByOwner();
    findByRequester();
  }, []);

  const handleAccept = async (id: string) => {
    try {
      const response = await acceptExchanges(id);
      if (response === true && acceptExchange._id) {
        router.push(`/intercambio/chat/${acceptExchange._id}`);
      }
    } catch (error) {
      console.log("Error al aceptar la solicitud de intercambio:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteExchange(id);
      if (response === true) {
        router.push(`/intercambio`);
      }
    } catch (error) {
      console.log("Error al eliminar la solicitud de intercambio:", error);
    }
  };

  return (
    <section className={style.exchangeAllOwner}>
      <h2>Solicitudes de intercambio</h2>
      <div className={style.container}>
        <div className={style.table}>
          <table>
            <thead>
              <tr>
                <th>Solicitante</th>
                <th>Solicitado</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {exchangeOwner.map((exchange: any) => (
                <tr key={exchange._id}>
                  <td>{exchange.owner}</td>
                  <td>{exchange.requestedBook}</td>
                  <td>{exchange.status}</td>
                  <td>
                    {exchange.status === "pending" && (
                      <button
                        className={style.acceptButton}
                        onClick={() => handleAccept(exchange._id)}
                      >
                        Aceptar
                      </button>
                    )}
                    {exchange.status === "accepted" && (
                      <Link href={`/intercambio/chat/${exchange.idChat}`}>
                        Mensajes
                      </Link>
                    )}
                    <button
                      className={style.cancelButton}
                      onClick={() => handleDelete(exchange._id)}
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))}

              {exchangeRequester
                .filter((exchange: any) => exchange.status === "accepted")
                .map((exchange: any) => (
                  <tr key={exchange._id}>
                    <td>{exchange.owner}</td>
                    <td>{exchange.requestedBook}</td>
                    <td>{exchange.status}</td>
                    <td className={style.accion}>
                      <Link href={`/intercambio/chat/${exchange.idChat}`}>
                        Mensajes
                      </Link>
                      <button
                        className={style.cancelButton}
                        onClick={() => handleDelete(exchange._id)}
                      >
                        Cancelar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
