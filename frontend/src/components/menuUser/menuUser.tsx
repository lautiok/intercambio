"use client";
import { useState } from "react";
import style from "./menuuser.module.css";
import { User } from "lucide-react";
import { useAuth } from "@/context/authContext";

export default function MenuUser() {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const {logout, user} = useAuth();
  return (
    <div className={style.menu}>
        <button className={style.button} onClick={() => setShowMenu(!showMenu)}>
        <User size={30} />
        </button>

        {showMenu && (
            <section className={style.menuContainer}>
                <div className={style.menuUser}>
                    <h3>Hola {user?.user.name}</h3>
                    <p>Este usuario tiene permisos {user?.user.role}</p>
                </div>
                <div className={style.menuButtons}>
                    <button onClick={logout}>Cerrar sesión</button>
                </div>
            </section>
        )}
    </div>
    );
    }