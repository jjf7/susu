"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  nombre: string;
};

export default function Home() {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [personas, setPersonas] = useState<string[]>([]);

  const asignarPuestos = () => {
    const puestos = personas.map((_, i) => i + 1);
    const mezclaPuestos = (array: number[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };
    mezclaPuestos(puestos);
    setPersonas(
      personas.map((persona, i) => `${persona} - Puesto ${puestos[i]}`)
    );
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setPersonas([...personas, data.nombre]);
    reset();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div>
          <h1 className="text-4xl font-bold text-center text-gray-800 mt-8 mb-4">
            Aplicación de asignación de puestos (SUSU)
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              Nombre:
              <input
                className="mt-5 border border-gray-400 py-2 px-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="text"
                {...register("nombre", { required: true })}
              />
            </label>
            <div className="mt-5">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Agregar persona
              </button>
            </div>
          </form>
          <button
            onClick={asignarPuestos}
            className="mt-5 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Asignar puestos
          </button>
          {personas.length > 0 ? (
            <ul className="mt-5 list-disc pl-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8 list-none">
              {personas.map((persona, index) => (
                <li key={index}>{persona}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white p-4 flex justify-center items-center">
        <h1>
          Elaborado por{" "}
          <a
            style={{ color: "blue" }}
            target="_blank"
            href="https://jfdesousa.com"
          >
            Jose Fuentes
          </a>
        </h1>
      </div>
    </main>
  );
}
